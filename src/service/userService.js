import { prisma } from '../app/database.js';
import { ResponseError } from '../error/ResponseError.js';
import {
  loginUserValidation,
  registerUserValidation,
  updateUserValidation,
} from '../validation/userValidation.js';
import { validate } from '../validation/validation.js';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
const register = async (request) => {
  const user = validate(registerUserValidation, request);

  const userCount = await prisma.user.count({
    where: {
      username: user.username,
    },
  });

  if (userCount) {
    throw new ResponseError(400, 'username already exists');
  }

  user.password = await bcrypt.hash(user.password, 10);

  const createUser = await prisma.user.create({
    data: user,
    select: {
      username: true,
      name: true,
    },
  });

  await prisma.cart.create({
    data: {
      username: user.username,
    },
  });

  return createUser;
};

const login = async (request) => {
  const loginRequest = validate(loginUserValidation, request);

  const user = await prisma.user.findUnique({
    where: {
      username: loginRequest.username,
    },
  });
  if (!user) {
    throw new ResponseError(400, 'username or password already exists');
  }

  const checkPassword = await bcrypt.compare(
    loginRequest.password,
    user.password
  );

  if (!checkPassword) {
    throw new ResponseError(400, 'username or password already exists');
  }

  const token = uuid().toString();

  return prisma.user.update({
    where: {
      username: user.username,
    },
    data: {
      token: token,
    },
    select: {
      token: true,
    },
  });
};

const get = async (user) => {
  return prisma.user.findUnique({
    where: {
      username: user.username,
    },
    select: {
      username: true,
      name: true,
    },
  });
};

const update = async (user, request) => {
  const req = validate(updateUserValidation, request);

  const data = {};
  if (req.name) {
    data.name = req.name;
  }
  if (req.password) {
    data.password = await bcrypt.hash(req.password, 10);
  }

  return prisma.user.update({
    where: {
      username: user.username,
    },
    data: data,
    select: {
      username: true,
      name: true,
    },
  });
};

const logout = async (user) => {
  return prisma.user.update({
    where: {
      username: user.username,
    },
    data: {
      token: null,
    },
  });
};

export default { register, login, get, update, logout };
