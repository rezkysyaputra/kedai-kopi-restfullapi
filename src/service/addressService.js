import { prisma } from '../app/database.js';
import { ResponseError } from '../error/ResponseError.js';
import {
  createAddressValidation,
  getAddressValidation,
  updateAddressValidation,
} from '../validation/addressValidation.js';
import { validate } from '../validation/validation.js';

const create = async (user, request) => {
  const address = validate(createAddressValidation, request);
  address.username = user.username;

  return prisma.address.create({
    data: address,
    select: {
      id: true,
      name: true,
      phone: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postalCode: true,
    },
  });
};

const update = async (user, request) => {
  const address = validate(updateAddressValidation, request);

  const checkAddressId = await prisma.address.count({
    where: {
      username: user.username,
      id: address.id,
    },
  });

  if (!checkAddressId) {
    throw new ResponseError(404, 'address is not found');
  }

  const data = {};
  const addressFields = [
    'name',
    'phone',
    'street',
    'city',
    'province',
    'country',
    'postalCode',
  ];

  for (const field of addressFields) {
    if (address[field]) {
      data[field] = address[field];
    }
  }

  return prisma.address.update({
    where: {
      id: address.id,
    },
    data: data,
    select: {
      id: true,
      name: true,
      phone: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postalCode: true,
    },
  });
};

const get = async (user, addressId) => {
  addressId = validate(getAddressValidation, addressId);

  const address = await prisma.address.findFirst({
    where: {
      id: addressId,
      username: user.username,
    },
    select: {
      id: true,
      name: true,
      phone: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postalCode: true,
    },
  });

  if (!address) {
    throw new ResponseError(404, 'address is not found');
  }

  return address;
};

const list = async (user) => {
  return await prisma.address.findMany({
    where: {
      username: user.username,
    },
    select: {
      id: true,
      name: true,
      phone: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postalCode: true,
    },
  });
};

const remove = async (user, addressId) => {
  addressId = validate(getAddressValidation, addressId);

  const checkAddressId = await prisma.address.count({
    where: {
      username: user.username,
      id: addressId,
    },
  });

  if (!checkAddressId) {
    throw new ResponseError(404, 'address is not found');
  }

  return prisma.address.delete({
    where: {
      id: addressId,
      username: user.username,
    },
  });
};

export default { create, update, get, list, remove };
