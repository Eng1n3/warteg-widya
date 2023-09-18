import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils';
import { defaultFieldResolver, GraphQLSchema } from 'graphql';
import { DirectiveTranform } from '../enums/directive.enum';
import { ConfigService } from 'src/config/config.service';

const configService = new ConfigService();

export function customDirectiveTransformer(schema: GraphQLSchema) {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const baseUrlProdDirective = getDirective(
        schema,
        fieldConfig,
        DirectiveTranform.BaseUrlProd,
      )?.[0];

      if (baseUrlProdDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig;

        // Replace the original resolver with a function that *first* calls
        // the original resolver, then converts its result to upper case
        fieldConfig.resolve = async function (source, args, context, info) {
          const result = await resolve(source, args, context, info);
          if (typeof result === 'string') {
            const baseUrlProd = configService.get<string>('BASE_URL_PROD');
            return `${baseUrlProd}/${result}`;
          }
          return result;
        };
        return fieldConfig;
      }
    },
  });
}
