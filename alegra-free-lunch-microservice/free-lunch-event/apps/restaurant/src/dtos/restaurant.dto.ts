// import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
  ValidateIf,
} from 'class-validator';

import { ORDER_OPTIONS, PaginationQueryDTO, STATUS_OPTIONS } from '@app/common';

export class FilterOrdersQueryDto extends PaginationQueryDTO {
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  @Type(() => String)
  @Transform((params) => params.value.split(','))
  readonly ids?: string[];

  @IsString()
  @IsIn(STATUS_OPTIONS)
  @IsOptional()
  readonly status: string;

  @IsString()
  @MaxLength(254)
  @IsIn(ORDER_OPTIONS)
  @IsOptional()
  readonly created_at_order: string;
}

export class FilterRecipesQueryDto extends PaginationQueryDTO {
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  @Type(() => String)
  @Transform((params) => params.value.split(','))
  readonly ids?: string[];

  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  @Type(() => String)
  @Transform((params) => params.value.split(','))
  readonly order_ids?: string[];

  @IsString()
  @IsIn(STATUS_OPTIONS)
  @IsOptional()
  readonly status: string;

  @IsString()
  @MaxLength(254)
  @IsIn(ORDER_OPTIONS)
  @IsOptional()
  readonly created_at_order: string;
}

export class FilterShoppingHistoryQueryDto extends PaginationQueryDTO {
  @IsOptional()
  @IsArray()
  // @Min(0, { each: true })
  @Type(() => String)
  @Transform((params) => params.value.split(','))
  readonly ids?: number[];

  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  @Type(() => String)
  @Transform((params) => params.value.split(','))
  readonly ingredients_ids?: string[];

  @Type(() => Number)
  @IsInt()
  @Min(0)
  @IsOptional()
  readonly quantity_buyed: number;

  @IsString()
  @MaxLength(254)
  @IsIn(ORDER_OPTIONS)
  @IsOptional()
  readonly created_at_order: string;
}

export class FilterIngredientsQueryDto extends PaginationQueryDTO {
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  @Type(() => String)
  @Transform((params) => params.value.split(','))
  readonly ids?: string[];

  @IsString()
  @MaxLength(254)
  @IsOptional()
  readonly name: string;

  @IsInt()
  @Min(0)
  @IsOptional()
  readonly quantity_stock: number;
}
