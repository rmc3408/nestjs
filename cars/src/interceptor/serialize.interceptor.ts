import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';


@Injectable()
export class SerializeInterceptor implements NestInterceptor {

  constructor(private genericDto: any) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    //console.log(context); // context = Request content
    //console.log('Code executed before handler which it means before goes to controller-service.');

    return next.handle()
      .pipe(
        //tap((data) => console.log('Incoming entity Data is ', data)),
        map((data) => {
          const convertedClass = plainToInstance(this.genericDto, data, { excludeExtraneousValues: true});
          return data === null ? {} : convertedClass
        })
      );
  }
}