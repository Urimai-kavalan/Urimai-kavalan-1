import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export const validateRequest = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Replace the body with the parsed result so dates are converted,
      // defaults are applied, and unknown fields are dropped.
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      next(error); // Passes to centralized errorHandler which handles ZodError
    }
  };
};