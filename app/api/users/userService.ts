"use server";
import prisma from "@/lib/prisma";
import { withAuthentication } from "@/auth";
import { hash } from "bcrypt";

interface GetUsersOptions {
  page?: number;
  pageSize?: number;
  filter?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: string;
}

/**
 * Retrieves paginated users from the database.
 * 
 * Allows filtering, searching, sorting and pagination.
 * 
 * @param options - Options object with:
 * - page - Page number, defaults to 1
 * - pageSize - Page size, defaults to 1
 * - filter - Filter string 
 * - search - Search string
 * - sortBy - Sort by field, defaults to 'id'
 * - sortOrder - Sort order, defaults to 'asc'
 * @returns Object with:
 * - users - Array of user objects
 * - totalPages - Total number of pages for pagination
 */
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

  await new Promise((resolve) => setTimeout(resolve, 500));

  return { users, totalPages };
};

/**
 * Updates a user by ID with the provided data.
 * 
 * Checks if email already exists on another user before updating.
 * Hashes password if provided before updating.
 * 
 * Returns an object with the updated user data, success/error messages, and a boolean error flag.
 */
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

    if (data.password) {
      data.password = await hash(data.password, 10);
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

/**
 * Creates a new user with the provided data.
 * 
 * Checks if email already exists before creating user. 
 * Returns object with new user data, success/error messages, and error flag.
 */
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

/**
 * Deletes a user by ID.
 * 
 * This is an exported API route that is protected by the withAuthentication middleware. 
 * 
 * It accepts the user ID as a parameter.
 * 
 * It calls the Prisma delete method to delete the user by ID.
 * 
 * It returns an object with a message and error flag. 
 * The message is the deleted user on success, or an error message on failure.
 * 
 * The withAuthentication middleware checks for a valid JWT token before allowing the request.
 * It is used to protect routes that require authentication.
 *
 */
export const deleteUser = withAuthentication(async (id: any) => {
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
}, "deleteUser");

