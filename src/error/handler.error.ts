import { ErrorRequestHandler } from "express";
import CError from "./error";

export const errorHandler: ErrorRequestHandler = (err: CError, _, res, __) => {
  const response = {
    success: false,
    result: null,
    error: {
      message: err.message,
    },
  };
  res.status(err.statusCode || 500).send(response);
};
