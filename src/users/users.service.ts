import { Injectable } from '@nestjs/common';

export type TUser = {
    id: number;
    name: string;
    email: string;
}

@Injectable()
export class UsersService {
    private users: TUser[] = [
        {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@example.com'
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'jane.smith@example.com'
        }

    ]

    findAll(): TUser[] | [] {
        return this.users;
    }

    findOne(id: number): TUser | {} {
        return this.users.find(user => user.id === id) || {};
    }

    create(user: Omit<TUser, 'id'>): TUser {
        const newUser: TUser = {
            id: this.users.length + 1,
            ...user
        }
        this.users.push(newUser);
        return newUser;
    }

    update(id: number, user: Partial<Omit<TUser, 'id'>>): TUser | {} {
        const existingUserIndex = this.users.findIndex(u => u.id === id);
        if (existingUserIndex === -1) {
            return {};
        }
        const updatedUser = { ...this.users[existingUserIndex], ...user };
        this.users[existingUserIndex] = updatedUser;
        return updatedUser;
    }

    delete(id: number): boolean {
        const existingUserIndex = this.users.findIndex(u => u.id === id);
        if (existingUserIndex === -1) {
            return false;
        }
        this.users.splice(existingUserIndex, 1);
        return true;
    }
}
