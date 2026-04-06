import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateProfilesDto, UpdateProfilesDto } from './dto/index.dto';
import { ProfilesService } from './profiles.service';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  // GET /profiles
  @Get()
  findAllProfiles() {
    return this.profilesService.findMany();
  }

  // GET /profiles/unique/:id
  @Get('unique/:u_id')
  findUnique(@Param('u_id') u_id: string) {
    return this.profilesService.findUnique(u_id);
  }
  // POST /profiles
  @Post()
  createProfile(@Body() createProfileDto: CreateProfilesDto) {
    return this.profilesService.create(createProfileDto);
  }

  // PUT /profiles/:id
  @Put(':u_id')
  updateProfile(
    @Param('u_id') u_id: string,
    @Body() updateProfileDto: UpdateProfilesDto,
  ) {
    return this.profilesService.update(u_id, updateProfileDto);
  }

  // DELETE /profiles/:id
  @Delete(':u_id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('u_id') u_id: string) {
    return {
      message: `This action removes a #${u_id} profile`,
    };
  }
}
