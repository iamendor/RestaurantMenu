import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilService {
  groupBy(
    array: any[],
    key: string,
    transformKey: (key: any) => string = (key) => key,
  ) {
    return array.reduce((acc, n) => {
      const val = transformKey(n[key]);
      if (!acc[val]) {
        acc[val] = [];
      }

      acc[val].push(n);
      return acc;
    }, Object.create(null));
  }
}
