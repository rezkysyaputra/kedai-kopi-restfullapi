import addressService from '../service/addressService.js';

const create = async (req, res, next) => {
  try {
    const result = await addressService.create(req.user, req.body);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const request = req.body;
    request.id = req.params.addressId;

    const result = await addressService.update(req.user, request);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const result = await addressService.get(req.user, req.params.addressId);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const list = async (req, res, next) => {
  try {
    const result = await addressService.list(req.user);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    await addressService.remove(req.user, req.params.addressId);
    res.status(200).json({
      data: 'success',
    });
  } catch (error) {
    next(error);
  }
};

export default { create, update, get, list, remove };
