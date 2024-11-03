import { IsNumber, Min, IsOptional, IsString } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { ApiPropertyOptional } from '@nestjs/swagger';

@Injectable()
export class Pagination {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({ default: 10 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  limit?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Min(10)
  sortBy?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Min(10)
  searchBy?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Min(3)
  search?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  sortType?: 'asc' | 'desc';
}
