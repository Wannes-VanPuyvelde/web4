import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const register = async ({ username, email, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return prisma.user.create({
    data: { username, email, password: hashedPassword },
  });
};

const login = async ({ username, password }) => {
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) throw new Error("User not found");
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid password");
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
  return { user, token };
};

export default { register, login };
