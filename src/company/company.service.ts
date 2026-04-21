import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { PrismaService } from 'src/prisma.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService, private cloudinary: CloudinaryService) { }
  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-');
  }

  private async generateUniqueSlug(name: string) {
    let slug = this.generateSlug(name);
    let counter = 1;

    while (await this.prisma.company.findUnique({ where: { slug } })) {
      slug = `${this.generateSlug(name)}-${counter}`;
      counter++;
    }

    return slug;
  }
  async create(createCompanyDto: CreateCompanyDto, userId: number, file) {
    try {
      const {
        name,
        description,
        address,
        email,
        phone,
        whatsapp,
        website,
        country,
        city,
        isActive,
        isVerified,
      } = createCompanyDto;

      // 1. Check duplicate email
      const existingCompany = await this.prisma.company.findUnique({
        where: { email },
      });

      if (existingCompany) {
        throw new BadRequestException('Company email already exists');
      }

      // 2. Generate slug
      const slug = await this.generateUniqueSlug(name);

      // 3. Upload logo (if exists)
      let logoUrl: string | null = null;

      if (file) {
        const uploadResult: any = await this.cloudinary.uploadImage(file);
        logoUrl = uploadResult.secure_url;
      }

      // 4. Create company
      const company = await this.prisma.company.create({
        data: {
          name,
          slug,
          description,
          email,
          phone,
          whatsapp,
          website,
          logo: logoUrl,
          country,
          city,
          address,
          isActive: isActive ?? true,
          isVerified: isVerified ?? false,
          userId,
        },
      });

      return {
        success: true,
        message: 'Company created successfully',
        data: company,
      };
    } catch (error) {
      throw error
    }
  }
}
