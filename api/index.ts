import type { Request, Response } from 'express';
import app from '../server';

// Export handler for Vercel Serverless Functions
export default function handler(req: Request, res: Response) {
  return app(req, res);
}
