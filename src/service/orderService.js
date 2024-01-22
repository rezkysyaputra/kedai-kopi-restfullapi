import { prisma } from '../app/database.js';
import { ResponseError } from '../error/ResponseError.js';
import {
  createOrderValidation,
  getOrderValidation,
  updateOrderValidation,
} from '../validation/orderValidation.js';

import { validate } from '../validation/validation.js';

const create = async (user, addressId) => {
  addressId = validate(createOrderValidation, addressId);

  const address = await prisma.address.findUnique({
    where: {
      id: addressId,
      username: user.username,
    },
  });

  if (!address) {
    throw new ResponseError(404, 'address is not found');
  }

  const cartItemsWithProduct = await prisma.cartItem.findMany({
    where: {
      cart: {
        username: user.username,
      },
    },
    include: {
      product: true,
      cart: true,
    },
  });

  if (!cartItemsWithProduct.length) {
    throw new ResponseError(404, 'product item is not found');
  }

  const totalAmount = cartItemsWithProduct.reduce((total, cartItem) => {
    return total + cartItem.product.price * cartItem.quantity;
  }, 0);

  const cart = await prisma.cart.findUnique({
    where: {
      username: user.username,
    },
    include: {
      cartItems: {
        include: {
          product: true,
        },
      },
    },
  });

  const orderItems = cart.cartItems.map((cartItem) => ({
    productId: cartItem.productId,
    quantity: cartItem.quantity,
  }));

  const order = await prisma.order.create({
    data: {
      cartId: cart.id,
      addressId: address.id,
      totalAmount: totalAmount,
      orders: {
        create: orderItems,
      },
    },
  });

  await prisma.cartItem.deleteMany({
    where: {
      cart: {
        username: user.username,
      },
    },
  });

  return {
    id: order.id,
    status: order.status,
    createdAt: order.createdAt,
    totalAmount: order.totalAmount,
  };
};

const update = async (user, request) => {
  request = validate(updateOrderValidation, request);

  const order = await prisma.order.findUnique({
    where: {
      id: request.orderId,
      cart: {
        username: user.username,
      },
    },
  });

  if (!order) {
    throw new ResponseError(404, 'order is not found');
  }

  const data = {};
  if (request.addressId) {
    const address = await prisma.address.findUnique({
      where: {
        id: request.addressId,
        username: user.username,
      },
    });

    if (!address) {
      throw new ResponseError(404, 'address is not found');
    }

    data.addressId = request.addressId;
  }
  if (request.status) {
    data.status = request.status;
  }

  if ((request.status = 'DELIVERED') || (request.status = 'CANCELLED')) {
    data.completedAt = new Date();
  }

  return prisma.order.update({
    where: {
      id: request.orderId,
      cart: {
        username: user.username,
      },
    },
    data: data,
    select: {
      id: true,
      status: true,
      createdAt: true,
      totalAmount: true,
    },
  });
};

const get = async (user, orderId) => {
  orderId = validate(getOrderValidation, orderId);

  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
      cart: {
        username: user.username,
      },
    },
    include: {
      address: true,
      orders: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!order) {
    throw new ResponseError(404, 'order is not found');
  }

  return order;
};

const list = async (user) => {
  const orders = await prisma.order.findMany({
    where: {
      cart: {
        username: user.username,
      },
    },
    include: {
      address: true,
      orders: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!orders.length) {
    throw new ResponseError(404, 'order is not found');
  }

  return orders;
};

const remove = async (user, orderId) => {
  orderId = validate(getOrderValidation, orderId);

  const order = await prisma.order.count({
    where: {
      id: orderId,
      cart: {
        username: user.username,
      },
    },
  });

  if (!order) {
    throw new ResponseError(404, 'order is not found');
  }

  await prisma.orderItem.deleteMany({
    where: {
      orderId: orderId,
      order: {
        cart: {
          username: user.username,
        },
      },
    },
  });

  return prisma.order.delete({
    where: {
      id: orderId,
      cart: {
        username: user.username,
      },
    },
  });
};

export default { create, update, get, list, remove };
