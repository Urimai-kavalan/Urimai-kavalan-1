import { Request, Response, NextFunction } from 'express';
import { ZodError, ZodIssue } from 'zod';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(`[Error] ${req.method} ${req.url}`, err);

  if (err instanceof ZodError) {
    return res.status(400).json({
      error: 'Validation Error',
      details: err.errors.map((e: ZodIssue) => ({ path: e.path.join('.'), message: e.message }))
    });
  }

  // Handle generic JWT errors
  if (err.name === 'UnauthorizedError' || err.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'Invalid or missing authentication token' });
  }

  // Handle Prisma not found errors (if applicable)
  if (err.code === 'P2025') {
    return res.status(404).json({ error: 'Resource not found' });
  }

  // Fallback 500 error, never expose stack traces to client
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'An unexpected error occurred'
  });
};
