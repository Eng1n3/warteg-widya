import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './database/data-source';
import { ConfigModule } from './config/config.module';
import { GraphqlModule } from './graphql/graphql.module';
import { AppResolver } from './app.resolver';

@Module({
  imports: [
    ConfigModule.register(),
    TypeOrmModule.forRoot(dataSourceOptions),
    GraphqlModule,
  ],
  providers: [AppService, AppResolver],
})
export class AppModule {}
