import { ResponseError } from '../error/ResponseError.js';

export const errorMiddleware = async (err, req, res, next) => {
  if (!err) {
    next();
    return;
  } else if (err instanceof ResponseError) {
    res.status(err.status).json({
      errors: err.message,
    });
  } else {
    res.status(500).json({
      errors: err.message,
    });
  }
};
