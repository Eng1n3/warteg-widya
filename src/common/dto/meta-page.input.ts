import { Field, InputType, Int } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsNotEmpty, Min } from 'class-validator';

@InputType()
export class MetaPageInput {
  @Field(() => Int, { defaultValue: 1, nullable: true })
  @Min(1)
  @IsNotEmpty()
  @Transform(({ value }) => value || 1)
  page?: number = 1;

  @Field(() => Int, { defaultValue: 10, nullable: true })
  @Min(1)
  @IsNotEmpty()
  @Transform(({ value }) => value || 10)
  pageSize?: number = 10;
}
