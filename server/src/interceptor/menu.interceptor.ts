import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class MenuInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next.handle().pipe(
      map((val) => {
        if (Array.isArray(val)) {
          return val.map(this.format);
        }
        return this.format(val);
      }),
    );
  }

  private format(menu: any) {
    return {
      ...menu,
      etelek: menu.etelek.map((e) => {
        return {
          ...e.etel,
          allergenek: e.etel.allergenek.map((a) => a.allergen),
        };
      }),
    };
  }
}
