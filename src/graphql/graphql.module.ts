import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { DirectiveLocation, GraphQLDirective } from 'graphql';
import * as depthLimit from 'graphql-depth-limit';
import GraphQLJSON from 'graphql-type-json';
import { join } from 'path';
import { customDirectiveTransformer } from 'src/common/directives/custom.directive';
import { DirectiveTranform } from 'src/common/enums/directive.enum';
import { ComplexityPlugin } from 'src/common/plugins/complexity.plugin';
import { ConfigModule } from 'src/config/config.module';
import { ConfigService } from 'src/config/config.service';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ConfigModule.register()],
      useFactory: (configService: ConfigService) => {
        console.log(configService, 20);
        return {
          autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
          playground: configService.get<boolean>('PLAYGROUND')
            ? {
                settings: {
                  'request.credentials': 'include',
                },
              }
            : false,
          context: ({ req, res, connection }) => {
            return { req, res, connection };
          },
          csrfPrevention: false,
          validationRules: [depthLimit(3)],
          // resolvers: { JSON: GraphQLJSON },
          introspection:
            configService.get<string>('NODE_ENV') === 'production'
              ? false
              : true,
          transformSchema: (schema) => customDirectiveTransformer(schema),
          buildSchemaOptions: {
            directives: [
              new GraphQLDirective({
                name: DirectiveTranform.BaseUrlProd,
                locations: [DirectiveLocation.FIELD_DEFINITION],
              }),
            ],
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [ComplexityPlugin],
})
export class GraphqlModule {}
