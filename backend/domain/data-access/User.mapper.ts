import { User as PrismaUser } from '@prisma/client';
import { User } from '../model/User';

export const userMapper = (prismaUser: PrismaUser): User => ({
  id: prismaUser.id,
  username: prismaUser.username,
  email: prismaUser.email,
  password: prismaUser.password,
});
