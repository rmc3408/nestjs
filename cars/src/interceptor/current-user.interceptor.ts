import { Injectable, NestInterceptor, ExecutionContext, CallHandler, NotFoundException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from 'src/user/user.service';

//Interceptor run before and after controller is trigger
@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {

  constructor(private userService: UserService) {}

  async intercept(context: ExecutionContext, callhandler: CallHandler): Promise<Observable<any>> {
    //before reach controller
    const request = context.switchToHttp().getRequest();
    const { userId } = request.session || {};
    const user = await this.userService.findOneUser(userId);
    request.session.currentUser = user;

    return callhandler.handle();
  }
}