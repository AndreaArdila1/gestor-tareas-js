import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { Prioridad } from '../../generated/prisma/client';

export class CrearTareaDto {
  @ApiProperty({ example: 'Preparar la guía de la clase 4' })
  @IsString()
  @MinLength(3, { message: 'El título debe tener al menos 3 caracteres' })
  @MaxLength(120, { message: 'El título no puede superar 120 caracteres' })
  titulo!: string;

  @ApiPropertyOptional({ example: 'Incluir deploy en Render y Docker' })
  @IsOptional()
  @IsString()
  @MaxLength(500, { message: 'La descripción no puede superar 500 caracteres' })
  descripcion?: string;

  @ApiPropertyOptional({ enum: Prioridad, example: 'ALTA' })
  @IsOptional()
  @IsEnum(Prioridad, { message: 'La prioridad debe ser BAJA, MEDIA o ALTA' })
  prioridad?: Prioridad;
}