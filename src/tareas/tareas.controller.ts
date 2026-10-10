import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    UseGuards,
  } from '@nestjs/common';
  import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  import { RolesGuard } from '../auth/roles.guard';
  import { Roles } from '../auth/roles.decorator';
  import { Rol } from '../generated/prisma/client';
  import { UsuarioActual } from '../auth/usuario-actual.decorator';
  import { TareasService } from './tareas.service';
  import { CrearTareaDto } from './dto/crear-tarea.dto';
  import { ActualizarTareaDto } from './dto/actualizar-tarea.dto';
  
  @ApiTags('tareas')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Controller('tareas')
  export class TareasController {
    constructor(private readonly tareasService: TareasService) {}
  
    @Post()
    crear(
      @Body() dto: CrearTareaDto,
      @UsuarioActual() usuario: { id: number },
    ) {
      return this.tareasService.crear(dto, usuario.id);
    }
  
    @Get()
    obtenerMias(@UsuarioActual() usuario: { id: number }) {
      return this.tareasService.obtenerMias(usuario.id);
    }
  
    @Get('admin/todas')
    @UseGuards(RolesGuard)
    @Roles([Rol.ADMIN])
    obtenerTodasAdmin() {
      return this.tareasService.obtenerTodasAdmin();
    }
  
    @Get(':id')
    obtenerUna(
      @Param('id', ParseIntPipe) id: number,
      @UsuarioActual() usuario: { id: number },
    ) {
      return this.tareasService.obtenerUna(id, usuario.id);
    }
  
    @Patch(':id')
    actualizar(
      @Param('id', ParseIntPipe) id: number,
      @Body() dto: ActualizarTareaDto,
      @UsuarioActual() usuario: { id: number },
    ) {
      return this.tareasService.actualizar(id, dto, usuario.id);
    }
  
    @Delete(':id')
    eliminar(
      @Param('id', ParseIntPipe) id: number,
      @UsuarioActual() usuario: { id: number },
    ) {
      return this.tareasService.eliminar(id, usuario.id);
    }
  }