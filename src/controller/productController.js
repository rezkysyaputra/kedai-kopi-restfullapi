import productService from '../service/productService.js';

const list = async (req, res, next) => {
  try {
    const paging = {
      page: req.query.page,
      size: req.query.size,
    };
    console.log(paging);
    const result = await productService.list(paging);
    res.status(200).json({
      data: result.data,
      paging: result.paging,
    });
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const result = await productService.get(req.params.productId);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const search = async (req, res, next) => {
  try {
    const request = {
      name: req.query.name,
      page: req.query.page,
      size: req.query.size,
    };
    console.log(request);
    const result = await productService.search(request);
    res.status(200).json({
      data: result.data,
      paging: result.paging,
    });
  } catch (error) {
    next(error);
  }
};

export default { list, get, search };
