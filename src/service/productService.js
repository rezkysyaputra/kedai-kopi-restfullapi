import { prisma } from '../app/database.js';
import { ResponseError } from '../error/ResponseError.js';
import {
  getProductValidation,
  listProductValidation,
  searchProductValidation,
} from '../validation/productValidation.js';
import { validate } from '../validation/validation.js';

const list = async (paging) => {
  paging = validate(listProductValidation, paging);

  const skip = (paging.page - 1) * paging.size;
  const totalProducts = await prisma.product.count({});

  if (!totalProducts) {
    throw new ResponseError(404, 'product is not found');
  }

  const products = await prisma.product.findMany({
    take: paging.size,
    skip: skip,
  });

  return {
    data: products,
    paging: {
      page: paging.page,
      totalItems: totalProducts,
      totalPage: Math.ceil(totalProducts / paging.size),
    },
  };
};

const get = async (productId) => {
  productId = validate(getProductValidation, productId);

  const product = await prisma.product.findFirst({
    where: {
      id: productId,
    },
    select: {
      id: true,
      name: true,
      price: true,
      stock: true,
    },
  });

  if (!product) {
    throw new ResponseError(404, 'product is not found');
  }

  return product;
};

const search = async (request) => {
  request = validate(searchProductValidation, request);

  const skip = (request.page - 1) * request.size;
  const totalProducts = await prisma.product.count({
    where: {
      name: {
        contains: request.name,
      },
    },
  });

  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: request.name,
      },
    },
    take: request.size,
    skip: skip,
  });

  if (!totalProducts) {
    throw new ResponseError(404, 'products is not found');
  }

  return {
    data: products,
    paging: {
      page: request.page,
      totalItems: totalProducts,
      totalPage: Math.ceil(totalProducts / request.size),
    },
  };
};

export default { list, get, search };
