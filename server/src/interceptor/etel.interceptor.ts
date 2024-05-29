import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class EtelInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next.handle().pipe(
      map((val) => {
        console.log(val);
        if (Array.isArray(val)) {
          return val.map(this.format);
        }
        return this.format(val);
      }),
    );
  }

  private format(etel: any) {
    return {
      ...etel,
      allergenek: etel.allergenek.map((a) => ({ ...a.allergen })),
    };
  }
}
