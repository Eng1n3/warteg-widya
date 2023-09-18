import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import Redis from 'ioredis';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';
import { CACHE_KEY_METADATA, CACHE_TTL_METADATA } from '@nestjs/cache-manager';

@Injectable()
export class GraphQLRedisCacheInterceptor implements NestInterceptor {
  constructor(
    @InjectRedis() private readonly client: Redis,
    private reflector: Reflector,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const gqlCtx = GqlExecutionContext.create(context);
    const typeGraphql = gqlCtx.getInfo().operation.operation;
    const resolverName = gqlCtx.getInfo().fieldName;
    const getCacheKey = this.reflector.get<string>(
      CACHE_KEY_METADATA,
      context.getHandler(),
    );

    const getCacheTTL = this.reflector.get<string>(
      CACHE_TTL_METADATA,
      context.getHandler(),
    );

    const checkArgs = Object.keys(gqlCtx.getArgs()).length;

    const getArgs = checkArgs ? `:${JSON.stringify(gqlCtx.getArgs())}` : '';

    const cacheKey = `${typeGraphql}:${getCacheKey || resolverName}${getArgs}`;

    const cached = await this.client.get(cacheKey);

    if (cached) {
      return of(JSON.parse(cached));
    }

    return next
      .handle()
      .pipe(
        tap(
          async (data) =>
            await this.client.set(
              cacheKey,
              JSON.stringify(data),
              'EX',
              getCacheTTL || 3600,
            ),
        ),
      );
  }
}
