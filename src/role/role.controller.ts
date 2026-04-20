import { Controller, Post, Body } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';

@Controller('roles')
export class RoleController {
    constructor(private readonly roleService: RoleService) {}
    @Post('create')
    async createRole(@Body() body: CreateRoleDto) {
        return this.roleService.create(body);
    }
}
