import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log({
      body: req.body,
      headers: req.headers,
      baseUrl: req.baseUrl,
      url: req.url,
      method: req.method
    });
    next();
  }
}
