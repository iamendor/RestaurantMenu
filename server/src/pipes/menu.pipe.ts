import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class CreateMenuPipe implements PipeTransform {
  transform(value: any) {
    const date = new Date(value.date * 1000);
    return { ...value, date };
  }
}

@Injectable()
export class DatePipe implements PipeTransform {
  transform(value: any) {
    return new Date(value * 1000);
  }
}
