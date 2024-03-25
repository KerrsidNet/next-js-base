// Import Prisma client
const { PrismaClient } = require('@prisma/client');

// Instantiate Prisma client
const prisma = new PrismaClient();

// TODO remove this when perms crud is made
// Function to add permission to role
async function addPermissionToRole(roleName, permissionName) {
  try {
    // Find the role by name
    const role = await prisma.role.findUnique({
      where: { name: roleName },
      include: { permissions: true },
    });

    if (!role) {
      throw new Error(`Role "${roleName}" not found`);
    }

    // Check if the permission is already assigned to the role
    if (role.permissions.some(p => p.name === permissionName)) {
      console.log(`Permission "${permissionName}" already assigned to role "${roleName}"`);
      return;
    }

    // Find the permission by name
    const permission = await prisma.rolePermission.findUnique({
      where: { name: permissionName },
    });

    if (!permission) {
      throw new Error(`Permission "${permissionName}" not found`);
    }

    // Assign the permission to the role
    await prisma.role.update({
      where: { id: role.id },
      data: { permissions: { connect: { id: permission.id } } },
    });

    console.warn(`Permission "${permissionName}" assigned to role "${roleName}"`);
  } catch (error) {
    console.error('Error assigning permission to role:', error);
  } finally {
    // Disconnect Prisma client
    await prisma.$disconnect();
  }
}

// Extract command line arguments
const [, , roleName, permissionName] = process.argv;

// Call the function with provided arguments
addPermissionToRole(roleName, permissionName);
