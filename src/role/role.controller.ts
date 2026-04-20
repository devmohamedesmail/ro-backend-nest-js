import { Controller, Post, Body, Patch,Param ,Get} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('roles')
export class RoleController {
    constructor(private readonly roleService: RoleService) {}

    @Get('all')
    async allRoles() {
        return this.roleService.allRoles();
    }
    
    @Post('create')
    async createRole(@Body() body: CreateRoleDto) {
        return this.roleService.create(body);
    }



    @Patch('update/:id')
    async update(@Param('id') id: string, @Body() body: UpdateRoleDto){
        return this.roleService.update(+id,body)
    }
}
