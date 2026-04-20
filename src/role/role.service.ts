import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { PrismaService } from 'src/prisma.service';


// import { PrismaService } from '../prisma.service';
@Injectable()
export class RoleService {
    constructor(private prisma: PrismaService){}
    async create(body: CreateRoleDto) {
        try{

        }catch(error){}
        
    }
}
