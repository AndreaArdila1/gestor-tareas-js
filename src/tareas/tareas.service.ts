import {
    ForbiddenException,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  import { PrismaService } from '../prisma/prisma.service';
  import { CrearTareaDto } from './dto/crear-tarea.dto';
  import { ActualizarTareaDto } from './dto/actualizar-tarea.dto';
  
  @Injectable()
  export class TareasService {
    constructor(private readonly prisma: PrismaService) {}
  
    crear(dto: CrearTareaDto, usuarioId: number) {
      return this.prisma.tarea.create({
        data: {
          titulo: dto.titulo,
          descripcion: dto.descripcion,
          prioridad: dto.prioridad,
          usuarioId,
        },
      });
    }
  
    obtenerMias(usuarioId: number) {
      return this.prisma.tarea.findMany({
        where: { usuarioId },
        orderBy: { id: 'asc' },
      });
    }
  
    obtenerTodasAdmin() {
      return this.prisma.tarea.findMany({
        include: {
          usuario: { select: { id: true, nombre: true, email: true } },
        },
        orderBy: { id: 'asc' },
      });
    }
  
    async obtenerUna(id: number, usuarioId: number) {
      const tarea = await this.prisma.tarea.findUnique({ where: { id } });
  
      if (!tarea) {
        throw new NotFoundException('La tarea no existe');
      }
  
      if (tarea.usuarioId !== usuarioId) {
        throw new ForbiddenException('Esta tarea no es tuya');
      }
  
      return tarea;
    }
  
    async actualizar(id: number, dto: ActualizarTareaDto, usuarioId: number) {
      await this.obtenerUna(id, usuarioId);
      return this.prisma.tarea.update({ where: { id }, data: dto });
    }
  
    async eliminar(id: number, usuarioId: number) {
      await this.obtenerUna(id, usuarioId);
      return this.prisma.tarea.delete({ where: { id } });
    }
  }