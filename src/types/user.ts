import { Prisma } from "@prisma/client";

export type User = Omit<Prisma.UserGetPayload<{}>, "password">;
