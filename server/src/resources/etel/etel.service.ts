import { Injectable } from '@nestjs/common';
import { CreateEtel, UpdateAllergenOnEtel, UpdateEtel } from 'src/dto/etel.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UtilService } from 'src/util/util.service';

@Injectable()
export class EtelService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly util: UtilService,
  ) {}

  create(data: CreateEtel) {
    const { name, allergenek } = data;
    return this.prisma.etel.create({
      data: {
        name,
        allergenek: {
          createMany: {
            data: allergenek.map((id) => ({ allergenId: id })),
          },
        },
      },
      include: {
        allergenek: {
          include: {
            allergen: true,
          },
        },
      },
    });
  }

  async list(q?: string) {
    return this.prisma.etel.findMany({
      where: {
        name: { contains: q },
      },
      include: {
        allergenek: {
          include: {
            allergen: true,
          },
        },
      },
    });
  }

  async find(id: number) {
    const etel = await this.prisma.etel.findUnique({
      where: { id },
      include: {
        allergenek: {
          include: {
            allergen: true,
          },
        },
      },
    });

    return etel;
  }

  async update({ id, data }: { id: number; data: UpdateEtel }) {
    if (data.name) {
      await this.prisma.etel.update({
        where: { id },
        data: { name: data.name },
      });
    }

    if (data.allergenek && data.allergenek.length != 0) {
      const { allergenek } = data;
      const { ADD, REMOVE } = this.util.groupBy(allergenek, 'action');
      if (ADD && ADD.length > 0) {
        await this.addAllergen(ADD, id);
      }
      if (REMOVE && REMOVE.length > 0) {
        await this.deleteAllergen(REMOVE, id);
      }
    }

    return this.find(id);
  }

  delete(id: number) {
    return this.prisma.etel.delete({ where: { id } });
  }

  private addAllergen(ADD: UpdateAllergenOnEtel[], id: number) {
    return this.prisma.etel.update({
      where: { id },
      data: {
        allergenek: {
          createMany: {
            data: ADD.map((d) => ({ allergenId: d.id })),
          },
        },
      },
    });
  }
  private deleteAllergen(REMOVE: UpdateAllergenOnEtel[], id: number) {
    return this.prisma.allergenOnEtel.deleteMany({
      where: { allergenId: { in: REMOVE.map((d) => d.id) }, etelId: id },
    });
  }
}
