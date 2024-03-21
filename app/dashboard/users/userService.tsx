"use server";
import prisma from "@/utils/prismaClient";
import { User } from "@prisma/client";

interface GetUsersOptions {
  page?: number;
  pageSize?: number;
  filter?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: string;
}

export const getUsers = async ({
  page = 1,
  pageSize = 1,
  filter = "",
  search = "",
  sortBy = "id", // Default sorting by user id
  sortOrder = "asc", // Default sorting order
}: GetUsersOptions) => {
  let offset = 0; // Default offset is 0

  if (page > 1) {
    offset = (page - 1) * pageSize;
  }

  const usersQuery: any = {
    take: pageSize,
    skip: offset,
    orderBy: {
      [sortBy]: sortOrder,
    },
  };

  if (search) {
    usersQuery.where = {
      OR: [
        { email: { contains: search } },
        { summary: { contains: search } },
        { name: { contains: search } },
      ],
    };
  }

  const totalUsersCount = await prisma.user.count({
    where: usersQuery.where,
  });

  const users = await prisma.user.findMany(usersQuery);
  const totalPages = Math.ceil(totalUsersCount / pageSize);

  prisma.$disconnect();

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return { users, totalPages };
};

export const updateUser = async (id: any, data: any) => {
  const toReturn: any = {
    data: "",
    message: {
      general: "",
      email: "",
      name: "",
    },
    error: false,
  };
  try {
    // Check if the email is already in use
    const existingUser = await prisma.user.findFirst({
      where: {
        email: data.email,
        NOT: { id: id }, // Exclude the current user being updated
      },
    });
    if (existingUser) {
      toReturn.message.email = "Email is already in use!";
      toReturn.error = true;
      return toReturn;
    }

    // Update the user
    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: data,
    });

    toReturn.data = updatedUser;
  } catch (exception) {
    console.error(exception);
    toReturn.message.general = "Failed to update user!";
    toReturn.error = true;
  }
  return toReturn;
};

export const addUser = async (data: any) => {
  const toReturn: any = {
    data: "",
    message: {
      general: "",
      email: "",
      name: "",
    },
    error: false,
  };
  try {
    const existingUser = await prisma.user.findFirst({
      where: { email: data.email },
    });
    if (existingUser) {
      toReturn.message.email = "Email already in use by another user!";
      toReturn.error = true;
      return toReturn;
    }
    toReturn.data = await prisma.user.create({ data });
    toReturn.message.general = "User created with success!";
  } catch (exception) {
    console.error(exception);
    toReturn.message.general = "Failed to create user!";
    toReturn.error = true;
  }
  return toReturn;
};

export const deleteUser = async (id: any) => {
  const toReturn = {
    message: "" || {},
    error: false,
  };
  try {
    const deletedUser = await prisma.user.delete({ where: { id: id } });
    toReturn.message = deletedUser;
  } catch (exception) {
    console.error(exception);
    toReturn.message = "Failed to delete user!";
    toReturn.error = true;
  }

  return toReturn;
};
