import { Injectable } from '@nestjs/common';
import { CreateProfilesDto, UpdateProfilesDto } from './dto/index.dto';

import { randomUUID } from 'crypto';

@Injectable()
export class ProfilesService {
  private profiles = [
    {
      u_id: randomUUID(),
      name: 'John Doe',
      email: 'john.doe@example.com',
      age: 30,
    },
    {
      u_id: randomUUID(),
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      age: 27,
    },
    {
      u_id: randomUUID(),
      name: 'Michael Brown',
      email: 'michael.brown@example.com',
      age: 35,
    },
    {
      u_id: randomUUID(),
      name: 'Emily Johnson',
      email: 'emily.johnson@example.com',
      age: 22,
    },
    {
      u_id: randomUUID(),
      name: 'David Wilson',
      email: 'david.wilson@example.com',
      age: 41,
    },
  ];

  findMany() {
    return this.profiles;
  }

  findUnique(u_id: string) {
    const profile = this.profiles.find((profile) => {
      return profile.u_id === u_id;
    });
    if (!profile) {
      return { message: `Profile with u_id ${u_id} not found` };
    }

    return {
      success: true,
      message: `Profile with u_id ${u_id} found`,
      data: profile,
    };
  }

  create(createProfileDto: CreateProfilesDto) {
    const newProfile = {
      u_id: randomUUID(),
      name: createProfileDto.name,
      email: createProfileDto.email,
      age: createProfileDto.age,
    };
    this.profiles.push(newProfile);
    return newProfile;
  }

  update(u_id: string, updateProfileDto: UpdateProfilesDto) {
    const findIndex = this.profiles.findIndex(
      (profile) => profile.u_id === u_id,
    );
    if (findIndex === -1) {
      return { message: `Profile with u_id ${u_id} not found` };
    }
    this.profiles[findIndex] = {
      u_id: this.profiles[findIndex].u_id,
      name: updateProfileDto.name || this.profiles[findIndex].name,
      email: updateProfileDto.email || this.profiles[findIndex].email,
      age: updateProfileDto.age || this.profiles[findIndex].age,
    };

    return this.profiles[findIndex];
  }
}
