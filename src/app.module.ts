import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { TareasModule } from './tareas/tareas.module';

@Module({
  imports: [PrismaModule, AuthModule, TareasModule],
})
export class AppModule {}