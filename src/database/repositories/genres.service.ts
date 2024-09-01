import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";

@Injectable()
export class GenresRepository {
    constructor(private prisma: PrismaService) {}

    async getAll() {
        const data = await this.prisma.genre.findMany();
        return data;
    }

    async getByGenres(genres: string[]) {
        const data = await this.prisma.genre.findMany({
            where: { name: { in: genres } }
        });
        return data;
    }
    async getByGenre(genre: string) {
        const data = await this.prisma.genre.findFirst({ where: { name: genre } });
        return data;
    }

    async getById(id: number) {
        return await this.prisma.genre.findFirst({ where: { id } });
    }
    async insert(genre: string) {
        const { id } = await this.prisma.genre.create({
            data: {
                name: genre
            }
        });

        return id;
    }

    async deleteById(genreid: number) {
        const { id } = await this.prisma.genre.delete({
            where: {
                id: genreid
            }
        });
        return id;
    }
}
