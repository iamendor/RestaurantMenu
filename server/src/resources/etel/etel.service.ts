import { Injectable } from '@nestjs/common';
import { CreateEtel, UpdateAllergenOnEtel, UpdateEtel } from 'src/dto/etel.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EtelService {
  constructor(private readonly prisma: PrismaService) {}

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
    });
  }

  async list() {
    const etelek = await this.prisma.etel.findMany({
      include: {
        allergenek: {
          include: {
            allergen: true,
          },
        },
      },
    });
    return etelek.map((etel) => ({
      ...etel,
      allergenek: etel.allergenek.map((a) => ({ ...a.allergen })),
    }));
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

    return {
      ...etel,
      allergenek: etel.allergenek.map((a) => ({ ...a.allergen })),
    };
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
      const { ADD, REMOVE } = allergenek.reduce(
        (accumulator, currentObject) => {
          const keyValue = currentObject['action'];

          if (!accumulator[keyValue]) {
            accumulator[keyValue] = [];
          }

          accumulator[keyValue].push(currentObject);

          return accumulator;
        },
        {},
      ) as { ADD: UpdateAllergenOnEtel[]; REMOVE: UpdateAllergenOnEtel[] };
      if (ADD && ADD.length > 0) {
        await this.prisma.etel.update({
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
      if (REMOVE && REMOVE.length > 0) {
        await this.prisma.allergenOnEtel.deleteMany({
          where: { allergenId: { in: REMOVE.map((d) => d.id) }, etelId: id },
        });
      }
    }

    const etel = await this.prisma.etel.findUnique({
      where: { id },
      include: { allergenek: { include: { allergen: true } } },
    });
    return {
      ...etel,
      allergenek: etel.allergenek.map((a) => ({ ...a.allergen })),
    };
  }

  delete(id: number) {
    return this.prisma.etel.delete({ where: { id } });
  }
}
