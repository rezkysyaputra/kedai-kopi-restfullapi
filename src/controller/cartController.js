import cartService from '../service/cartService.js';

const add = async (req, res, next) => {
  try {
    const request = {
      quantity: req.body.quantity,
      productId: req.params.productId,
    };

    const result = await cartService.add(req.user, request);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const list = async (req, res, next) => {
  try {
    const result = await cartService.list(req.user);
    res.status(200).json({
      data: {
        products: result.product,
        totalAmount: result.totalAmount,
      },
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const request = {
      quantity: req.body.quantity,
      cartItemId: req.body.cartItemId,
    };
    const result = await cartService.update(req.user, request);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    await cartService.remove(req.user, req.body.cartItemId);
    res.status(200).json({
      data: 'success',
    });
  } catch (error) {
    next(error);
  }
};
export default { add, list, update, remove };
