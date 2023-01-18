import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    // console.log(request.session);

    if (request.session?.currentUser?.admin) {
      return true;
    } else {
      return false;
    }
  }
}