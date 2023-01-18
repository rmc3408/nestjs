import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Session } from 'express-session';
import { UserEntity } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

type SessionWithUser = Session & 
  { 
    userId?: number;
    currentUser?: UserEntity;
  };

export type RequestWithCustomSession = Request & {
  session?: SessionWithUser;
};

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private userService: UserService) {}

  async use(req: RequestWithCustomSession, res: Response, next: NextFunction) {
    // console.log('Request from middleware - current user.', req.session);

    const { userId } = req.session || {};
    const user = await this.userService.findOneUser(userId);
    req.session.currentUser = user;
    next();
  }
}
