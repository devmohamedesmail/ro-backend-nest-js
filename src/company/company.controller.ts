import { Controller, Post, Body, UseGuards, Request,UploadedFile, UseInterceptors } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';



@Controller('api/companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('logo'))
  @Post('create')
  async create(@Body() createCompanyDto: CreateCompanyDto, @Request() req,@UploadedFile() file: Express.Multer.File,) {
    return this.companyService.create(createCompanyDto, req.user.userId,file);
  }
}
