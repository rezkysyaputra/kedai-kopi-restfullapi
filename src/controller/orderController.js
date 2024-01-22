import orderService from '../service/orderService.js';

const create = async (req, res, next) => {
  try {
    const result = await orderService.create(req.user, req.body.addressId);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const request = {
      orderId: req.params.orderId,
      addressId: req.body.addressId,
      status: req.body.status,
    };
    const result = await orderService.update(req.user, request);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const result = await orderService.get(req.user, req.params.orderId);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const list = async (req, res, next) => {
  try {
    const result = await orderService.list(req.user);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const remove = async (req, res, next) => {
  try {
    await orderService.remove(req.user, req.params.orderId);
    res.status(200).json({
      data: 'success',
    });
  } catch (error) {
    next(error);
  }
};

export default { create, get, update, list, remove };
