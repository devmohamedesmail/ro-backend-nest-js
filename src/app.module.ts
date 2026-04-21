import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { ConfigModule } from '@nestjs/config';
import { PermissionModule } from './permission/permission.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { CompanyModule } from './company/company.module';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
  }),AuthModule, RoleModule, PermissionModule, CloudinaryModule, CompanyModule,PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
