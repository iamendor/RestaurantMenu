import { Injectable } from '@nestjs/common';
import { CreateMenu, UpdateEtelOnMenu, UpdateMenu } from 'src/dto/menu.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UtilService } from 'src/util/util.service';

@Injectable()
export class MenuService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly util: UtilService,
  ) {}

  async create(data: CreateMenu) {
    const menu = await this.prisma.menu.create({
      data: {
        ...data,
        etelek: {
          createMany: {
            data: data.etelek.map((id) => ({ etelId: id })),
          },
        },
      },
      include: {
        etelek: {
          include: {
            etel: {
              include: {
                allergenek: {
                  include: {
                    allergen: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return menu;
  }

  async update(id: number, data: UpdateMenu) {
    const { etelek, ...update } = data;

    if (update.date || update.letter) {
      await this.prisma.menu.update({
        where: { id },
        data: update,
      });
    }

    if (etelek.length > 0) {
      const { ADD, REMOVE } = this.util.groupBy(etelek, 'action');

      if (ADD && ADD.length > 0) {
        await this.addEtel(id, ADD);
      }

      if (REMOVE && REMOVE.length > 0) {
        await this.deleteEtel(id, REMOVE);
      }
    }

    return this.find(id);
  }

  async find(id: number) {
    const menu = await this.prisma.menu.findUnique({
      where: { id },
      include: {
        etelek: {
          include: {
            etel: {
              include: {
                allergenek: {
                  include: {
                    allergen: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return menu;
  }

  async findByDate(date: Date) {
    const menus = await this.prisma.menu.findMany({
      where: {
        date,
      },
      include: {
        etelek: {
          include: {
            etel: {
              include: { allergenek: { include: { allergen: true } } },
            },
          },
        },
      },
    });

    return menus;
  }
  async list() {
    const menus = await this.prisma.menu.findMany({
      include: {
        etelek: {
          include: {
            etel: {
              include: { allergenek: { include: { allergen: true } } },
            },
          },
        },
      },
    });

    return menus;
  }
  delete(id: number) {
    return this.prisma.menu.delete({ where: { id } });
  }

  private async addEtel(id: number, ADD: UpdateEtelOnMenu[]) {
    return this.prisma.menu.update({
      where: { id },
      data: {
        etelek: {
          createMany: {
            data: ADD.map((e) => ({ etelId: e.id })),
          },
        },
      },
    });
  }

  private async deleteEtel(id: number, REMOVE: UpdateEtelOnMenu[]) {
    return this.prisma.etelOnMenu.deleteMany({
      where: { menuId: id, etelId: { in: REMOVE.map((e) => e.id) } },
    });
  }
}
