import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { PrismaModule } from 'src/prisma.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
    imports :[PrismaModule,CloudinaryModule],
  controllers: [CompanyController],
  providers: [CompanyService]
})
export class CompanyModule {}
