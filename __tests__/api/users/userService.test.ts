import {
  addUser,
  deleteUser,
  getUsers,
  updateUser,
} from "@/app/api/users/userService";
import prisma from "@/lib/prisma";

// Mock the withAuthentication function
jest.mock("@/auth", () => ({
  withAuthentication: jest.fn((handler: Function) => handler),
}));

// Mock the prisma module
jest.mock("@prisma/client", () => {
  const prismaMock = {
    user: {
      findMany: jest.fn(), // Mocking the findMany function
      count: jest.fn(), // Mocking the count function
      findFirst: jest.fn(), // Mocking the findFirst function
      update: jest.fn(), // Mocking the update function
      create: jest.fn(),
      delete: jest.fn(),
    },
    $disconnect: jest.fn(), // Mocking the $disconnect method
  };

  return {
    PrismaClient: jest.fn(() => prismaMock),
  };
});

describe("userService", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocked function calls after each test
  });

  describe("getUsers", () => {
    it("should retrieve paginated users from the database", async () => {
      // Mock Prisma client behavior for testing
      const mockUsers = [
        { id: 1, name: "User 1" },
        { id: 2, name: "User 2" },
      ];
      (prisma.user.findMany as jest.Mock).mockResolvedValue(mockUsers);

      // Test getUsers function
      const result = await getUsers({ page: 1, pageSize: 10 });

      expect(result.users).toEqual(mockUsers);
      // Add more assertions as needed
    });

    // Add more test cases for getUsers function
  });

  describe("updateUser", () => {
    it("should update user data when provided valid input", async () => {
      // Mock Prisma client behavior for testing
      (prisma.user.findFirst as jest.Mock).mockResolvedValue(null); // No existing user found
      (prisma.user.update as jest.Mock).mockResolvedValue({
        id: 1,
        name: "Updated User",
      }); // User update successful

      // Test updateUser function with valid input
      const updatedUser = await updateUser(1, { name: "Updated User" });

      expect(updatedUser.error).toBeFalsy(); // Error flag should be false
      expect(updatedUser.data).toEqual({ id: 1, name: "Updated User" }); // Updated user data should match
    });

    it("should handle error when user update fails", async () => {
      // Mock Prisma client behavior for testing
      (prisma.user.findFirst as jest.Mock).mockResolvedValue(null); // No existing user found
      (prisma.user.update as jest.Mock).mockRejectedValue(
        new Error("Failed to update user!"),
      ); // User update fails

      // Test updateUser function when user update fails
      const updatedUser = await updateUser(1, { name: "Updated User" });

      expect(updatedUser.error).toBeTruthy(); // Error flag should be true
      expect(updatedUser.message.general).toBe("Failed to update user!"); // Error message should indicate failure
    });

    it("should handle error when email is already in use", async () => {
      // Mock Prisma client behavior for testing
      (prisma.user.findFirst as jest.Mock).mockResolvedValue({
        id: 2,
        email: "existing@example.com",
      }); // Existing user found

      // Test updateUser function when email is already in use
      const updatedUser = await updateUser(1, {
        email: "existing@example.com",
      });

      expect(updatedUser.error).toBeTruthy(); // Error flag should be true
      expect(updatedUser.message.email).toBe("Email is already in use!"); // Error message should indicate email conflict
    });
  });

  describe("addUser", () => {
    it("should create a new user when provided valid input", async () => {
      // Mock Prisma client behavior for testing
      (prisma.user.findFirst as jest.Mock).mockResolvedValue(null); // No existing user found
      (prisma.user.create as jest.Mock).mockResolvedValue({
        id: 1,
        name: "New User",
      }); // User creation successful

      // Test addUser function with valid input
      const newUser = await addUser({
        name: "New User",
        email: "newuser@example.com",
      });

      expect(newUser.error).toBeFalsy(); // Error flag should be false
      expect(newUser.message.general).toBe("User created with success!"); // Success message should be returned
      expect(newUser.data).toEqual({ id: 1, name: "New User" }); // New user data should match
    });

    it("should handle error when email is already in use", async () => {
      // Mock Prisma client behavior for testing
      (prisma.user.findFirst as jest.Mock).mockResolvedValue({
        id: 2,
        email: "existing@example.com",
      }); // Existing user found

      // Test addUser function when email is already in use
      const newUser = await addUser({
        name: "New User",
        email: "existing@example.com",
      });

      expect(newUser.error).toBeTruthy(); // Error flag should be true
      expect(newUser.message.email).toBe(
        "Email already in use by another user!",
      ); // Error message should indicate email conflict
    });

    it("should handle error when user creation fails", async () => {
      // Mock Prisma client behavior for testing
      (prisma.user.findFirst as jest.Mock).mockResolvedValue(null); // No existing user found
      (prisma.user.create as jest.Mock).mockRejectedValue(
        new Error("Failed to create user"),
      ); // User creation fails

      // Test addUser function when user creation fails
      const newUser = await addUser({
        name: "New User",
        email: "newuser@example.com",
      });

      expect(newUser.error).toBeTruthy(); // Error flag should be true
      expect(newUser.message.general).toBe("Failed to create user!"); // Error message should indicate failure
    });
  });

  describe("deleteUser", () => {
    const mockId = 1;
    const mockUser = {
      id: mockId,
      name: "John Doe",
      email: "john@doe.com",
    };

    const mockDeleteUser = jest.fn();

    beforeAll(() => {
      prisma.user.delete = mockDeleteUser;
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should delete user by id", async () => {
      mockDeleteUser.mockResolvedValueOnce(mockUser);

      const result = await deleteUser(mockId);

      expect(mockDeleteUser).toHaveBeenCalledWith({
        where: { id: mockId },
      });
      expect(result.message).toEqual(mockUser);
    });

    it("should handle errors", async () => {
      mockDeleteUser.mockRejectedValueOnce("Error deleting user");

      const result = await deleteUser(mockId);

      expect(result.error).toBe(true);
      expect(result.message).toBe("Failed to delete user!");
    });
  });
});
