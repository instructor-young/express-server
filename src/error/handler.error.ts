import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, _, res, __) => {
  res.json({ error: { message: err.message } });
};
