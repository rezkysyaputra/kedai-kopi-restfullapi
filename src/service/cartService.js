import { prisma } from '../app/database.js';
import { ResponseError } from '../error/ResponseError.js';
import {
  addCartValidation,
  removeCartValidation,
  updateCartValidation,
} from '../validation/cartValidation.js';
import { validate } from '../validation/validation.js';

const add = async (user, request) => {
  request = validate(addCartValidation, request);

  const product = await prisma.product.count({
    where: {
      id: request.productId,
    },
  });

  if (!product) {
    throw new ResponseError(404, 'product is not found');
  }

  const productInCart = await prisma.cartItem.findFirst({
    where: {
      productId: request.productId,
      cart: {
        username: user.username,
      },
    },
    select: {
      quantity: true,
      id: true,
      cartId: true,
    },
  });

  if (productInCart) {
    return prisma.cartItem.update({
      where: {
        cartId: productInCart.cartId,
        id: productInCart.id,
      },
      data: {
        quantity: productInCart.quantity + request.quantity,
      },
      select: {
        id: true,
        quantity: true,
      },
    });
  }

  return await prisma.cartItem.create({
    data: {
      cart: {
        connect: { username: user.username },
      },
      product: {
        connect: { id: request.productId },
      },
      quantity: request.quantity,
    },
    select: {
      id: true,
      quantity: true,
    },
  });
};

const list = async (user) => {
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

  if (!cartItemsWithProduct) {
    throw new ResponseError(404, 'product is not found');
  }

  const response = cartItemsWithProduct.map((cartItem) => ({
    cartItemId: cartItem.id,
    id: cartItem.product.id,
    name: cartItem.product.name,
    price: cartItem.product.price,
    totalPrice: cartItem.product.price * cartItem.quantity,
    quantity: cartItem.quantity,
  }));

  const totalAmount = response.reduce((total, product) => {
    return total + product.totalPrice;
  }, 0);

  return {
    product: response,
    totalAmount: totalAmount,
  };
};

const update = async (user, request) => {
  request = validate(updateCartValidation, request);

  const cartItem = await prisma.cartItem.findUnique({
    where: {
      id: request.cartItemId,
      cart: {
        username: user.username,
      },
    },
  });

  if (!cartItem) {
    throw new ResponseError(404, 'item cart is not found');
  }

  return prisma.cartItem.update({
    where: {
      id: request.cartItemId,
      cart: {
        username: user.username,
      },
    },
    data: {
      quantity: request.quantity,
    },
    select: {
      id: true,
      quantity: true,
    },
  });
};

const remove = async (user, cartItemId) => {
  cartItemId = validate(removeCartValidation, cartItemId);

  const cartItem = await prisma.cartItem.findUnique({
    where: {
      id: cartItemId,
      cart: {
        username: user.username,
      },
    },
  });

  if (!cartItem) {
    throw new ResponseError(404, 'item cart is not found');
  }

  return prisma.cartItem.delete({
    where: {
      id: cartItemId,
      cart: {
        username: user.username,
      },
    },
  });
};
export default { add, list, update, remove };
