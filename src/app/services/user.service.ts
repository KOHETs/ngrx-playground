import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { UserResponse, User } from '../models/user.model';

export const mockUsers: UserResponse[] = [
  {
    id: 1,
    name: 'Test User 1',
    email: 'test1@example.com',
  },
  {
    id: 2,
    name: 'Test User 2',
    email: 'test2@example.com',
  },
  {
    id: 3,
    name: 'Test User 3',
    email: 'test3@example.com',
  },
  {
    id: 4,
    name: 'Test User 4',
    email: 'test4@example.com',
  },
  {
    id: 5,
    name: 'Test User 5',
    email: 'test5@example.com',
  },
];

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  getMe() {
    return of(mockUsers[1]);
  }
}

export function normalizeUser(user: UserResponse) {
  const normalizedUser: User = {
    id: user.id,
    email: user.email,
    name: user.name,
  };

  return normalizedUser;
}
