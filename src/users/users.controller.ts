import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { type TUser, UsersService } from './users.service';


class CreateUserDto {
    name: string;
    email: string;
}

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) { }

    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.usersService.findOne(Number(id));
    }


    @Post("create")
    create(@Body() createUserDto: CreateUserDto): TUser {
        return this.usersService.create(createUserDto);
    }





}
