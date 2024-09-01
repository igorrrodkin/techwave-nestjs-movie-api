import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { MoviesModule } from "./movies/movies.module";
import { GenresModule } from "./genres/genres.module";
import { LoggerMiddleware } from "./middlewares/logger.middleware";

@Module({
    imports: [MoviesModule, GenresModule]
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes("*");
    }
}
