import { Request, Response } from 'express'

export function fallbackRouter(req: Request, res: Response) {
  res.status(404).json({
    status: 404,
    message: 'Route not found',
  })
}
