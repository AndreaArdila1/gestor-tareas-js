import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { EstadoTarea, Prioridad } from '../../generated/prisma/client';

export class ActualizarTareaDto {
  @ApiPropertyOptional({ example: 'Preparar la guía de la clase 4 (revisada)' })
  @IsOptional()
  @IsString()
  @MinLength(3, { message: 'El título debe tener al menos 3 caracteres' })
  @MaxLength(120, { message: 'El título no puede superar 120 caracteres' })
  titulo?: string;

  @ApiPropertyOptional({ example: 'Agregar sección de pruebas en producción' })
  @IsOptional()
  @IsString()
  @MaxLength(500, { message: 'La descripción no puede superar 500 caracteres' })
  descripcion?: string;

  @ApiPropertyOptional({ enum: EstadoTarea, example: 'EN_PROGRESO' })
  @IsOptional()
  @IsEnum(EstadoTarea, {
    message: 'El estado debe ser PENDIENTE, EN_PROGRESO o COMPLETADA',
  })
  estado?: EstadoTarea;

  @ApiPropertyOptional({ enum: Prioridad, example: 'MEDIA' })
  @IsOptional()
  @IsEnum(Prioridad, { message: 'La prioridad debe ser BAJA, MEDIA o ALTA' })
  prioridad?: Prioridad;
}