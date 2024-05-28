import { Injectable } from '@nestjs/common';
import { CreateAllergen } from 'src/dto/allergen.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AllergenService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateAllergen) {
    return this.prisma.allergen.create({ data });
  }

  list() {
    return this.prisma.allergen.findMany();
  }

  find(id: number) {
    return this.prisma.allergen.findUnique({ where: { id } });
  }

  update({ id, data }: { id: number; data: CreateAllergen }) {
    return this.prisma.allergen.update({ where: { id }, data });
  }

  delete(id: number) {
    return this.prisma.allergen.delete({ where: { id } });
  }
}
