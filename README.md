# NextJs base application

## Introduction
This is a quickstart application to be built upon to speed up the development process.

# Contents

1. [Global requisites for standard installation](#global-requisites-for-standard-installation)
2. [App Structure](#app-structure)
3. [Install, Configure & Run](#install-configure--run)
    - [Standard Method](#standard-method)
    - [Docker Method](#docker-method)
4. [Preparing the database](#preparing-the-database)
    - [Docker Version](#docker-version)
    - [Standard Version](#standard)
5. [Prisma](#prisma)
    - [Migrations](#migrations)
    - [ORM](#orm)
6. [Routing](#routing)
7. [API Routing](#api-routing)
8. [Directives](#directives)
    - ["use client"](#use-client)
    - ["use server"](#use-server)
9. [Testing](#testing)
10. [Styling](#styling)
11. [Middleware](#middleware)
12. [Data Validation](#data-validation)
13. [Logging](#logging)

# Global requisites for standard installation
* Node (v20.11.1)
* typescript (^5.4.2)
* mysql (^3.9.2)

# App Structure
```bash
.
|____middleware.ts
|____app
| |____favicon.ico
| |____dashboard
| | |____api-example
| | | |____page.tsx
| | |____layout.tsx
| | |____users
| | | |____page.tsx
| | |____page.tsx
| |____components
| | |____ThemeSwitcher.tsx
| | |____Navbar.tsx
| | |____GeneralBreadcrumbs.tsx
| | |____Searchbar.tsx
| | |____SSEClient.tsx
| | |____users
| | | |____addEditModal.tsx
| | | |____deleteConfirmationModal.tsx
| | |____Sidebar.tsx
| | |____Table.tsx
| | |____PNotify.tsx
| | |____sidebarItems.js
| |____layout.tsx
| |____api
| | |____auth
| | | |____[...nextauth]
| | | | |____authOptions.ts
| | | | |____route.ts
| | |____users
| | | |____userService.ts
| |____(auth)
| | |____layout.tsx
| | |____login
| | | |____page.tsx
| | | |____form.tsx
| |____page.tsx
| |____globals.css
| |____providers.tsx
|____Dockerfile
|____README2.md
|____next.config.mjs
|____prisma
| |____migrations
| | |____migration_lock.toml
| | |____20240321104157_init
| | | |____migration.sql
| | |____20240321141206_added_roles_and_permissions_auth
| | | |____migration.sql
| |____schema.prisma
| |____seeder.ts
|____utils
| |____helpers.ts
| |____addPermsToRoles.js
|____next-env.d.ts
|____README.md
|____tailwind.config.ts
|____.dockerignore
|____public
| |____vercel.svg
| |____next.svg
|______tests__
| |____api
| | |____users
| | | |____userService.test.ts
|____.gitignore
|____package-lock.json
|____package.json
|____.env
|____lib
| |____prisma.ts
| |____eventEmitter.ts
|____tsconfig.json
|____docker-compose.yml
|____postcss.config.js
|____.eslintrc.json
|____auth.ts
|____jest.config.ts
```

# Install, Configure & Run
The steps mentioned below are required for a successful installation of the project.

There are 2 ways of getting the project, depending on the operating system that is used.

### Standard Method

1. **Clone the repository**
    ```bash
    git clone https://github.com/KerrsidNet/next-js-base.git
    ```

2. **Go to the cloned directory**
    ```bash
    cd <target-directyory>
    ```

3. **Install NPM dependencies**

    ```bash
    npm install
    ```
4. **Add or Edit the .env file**
5. **Run the app**
    ```bash
    npm run dev
    ```
6. **Prepare the app for production**
    ```bash
    npm run build
    ```

7. **Run the app in production**
    ```bash
    npx prisma generate && npx prisma migrate deploy --preview-feature && npm start
    # or if the database is already set and up to date
    npm start
    ```

### Docker Method

1. **Clone the Repository:**
   ```bash
   git clone <repository_url>
   ```

2. **Navigate to the Project Directory:**
   ```bash
   cd <project_directory>
   ```

3. **Build and Run Docker Containers:**
   Ensure Docker is installed on your system. Then, run the following command to build and start the Docker containers:
   ```bash
   docker-compose up --build
   ```

   This command will create and start the Docker containers defined in the `docker-compose.yml` file.

4. **Seed the Database:**
To seed the database with initial data, run the following command:
```bash
 npm run seed 
 ```
After which you can check inside the seeder file, and choose any of the seeded accounts to login into the app


# Preparing the database

This section is fully dependent on what installation method was chosen. We will start with the Docker version since that is the easiest to get up and running.

### Docker Version

The *docker-compose.yml* file takes care of the creation of the database. The only thing that needs to be supplied in order to work is the *DB_PASSWORD* variable inside your .env file as can be seen in this line

```yml
MYSQL_ROOT_PASSWORD: ${DB_PASSWORD}
```
Note that the .env file needs to be in the same directory as the docker-compose.yml file.

### Standard

To set up the database for your project, you'll need to ensure that you have MySQL installed on your local machine. If you haven't already installed MySQL, you can download it from the official website and follow the installation instructions for your operating system.

Once MySQL is installed, you'll need to make sure that you have the MySQL Command-Line Interface (CLI) ready. This allows you to interact with your MySQL server from the terminal or command prompt.

While it's not required, using a graphical tool such as MySQL Workbench can provide a more user-friendly interface for managing your databases, tables, and data. However, you can perform all necessary tasks using the MySQL CLI if you prefer.

To create a database using the MySQL CLI, follow these steps:

1. **Open the MySQL CLI**: Launch your terminal or command prompt and log in to MySQL using your username and password:

   ```bash
   mysql -u your_username -p
   ```

   Replace `your_username` with your MySQL username.

2. **Create a Database**: Once you're logged in, you can create a new database using the `CREATE DATABASE` command. Choose a name for your database, for example:

   ```sql
   CREATE DATABASE next_js_prisma;
   ```

   Replace `next_js_prisma` with your desired database name.

3. **Optional: Grant Permissions**: If you want to grant specific permissions to a user for accessing the database, you can use the `GRANT` command. This step is optional, but it's recommended for setting up user privileges:

   ```sql
   GRANT ALL PRIVILEGES ON next_js_prisma.* TO 'your_username'@'localhost' IDENTIFIED BY 'your_password';
   ```

   Replace `'your_username'` and `'your_password'` with the username and password you want to use.

With the database created, you can now configure your project to connect to this database. Update your project's `.env` file with the appropriate database URL, the structure of which you can find in the .env.sample file and will be used here

```prisma
datasource db {
    provider          = "mysql"
    url               = env("DATABASE_URL")
    shadowDatabaseUrl = env("SHADOW_DATABASE_URL")
}
```

Next, we need to manually run the migrations and seeders. Luckily, we have some helper scripts in the package.json file.

For starters, the project will most likely already have some migrations ready to go. All that is needed is for you to run 
```bash 
npm run migrate
```

Then, we run the next script to seed the database

```bash
npm run seed
```

Once the database has successfully been created, migrated, and seeded, you can use any of the users inside the seeder to get past the login stage of the application.

# Prisma

## Migrations

Any changes made in the prisma.schema file constitutes a possible migration. Once you have done the necessary changes, you can follow the next steps.

**Note: If Prisma warns about potential data deletion during a migration, it's crucial to reconsider the migration. This warning indicates that the database schema is not synchronized with the Prisma schema, which could result in data loss. It's essential to address any inconsistencies before proceeding with the migration, especially in production environments. Developer comunication is paramanount in this instance.**

In order to create your own migrations, all you need to do is run
```bash
npm run migration:create
```

You may notice that this command uses the --create-only tag. This is because you may want to create a migration without actually running it. This is useful in cases where, for example, you want to specify a new column and it's position in the specified table. After making changes to the migration file (when needed), you can then use the following command to run the migration.
```bash
npm run migrate
```

## Seeders

The main seeder can be run using
```bash
npm run seed
```
and will run the seeder.ts file inside the prisma folder, because it has been defined as such in package.json

```json
  "prisma": {
    "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seeder.ts"
  },
```

To run another seeder, one would have to run the command manually with another file since support for named seeds has not yet been implemented.

# ORM

Prisma ORM provides a powerful and intuitive way to interact with your database in your Next.js application. It simplifies database access by generating type-safe query builders based on your database schema.

## Querying Data

Once you have generated the Prisma Client, you can start querying data from your database using Prisma's fluent API. Here's a simple example:

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getUsers() {
  const users = await prisma.user.findMany();
  return users;
}
```

In this example, `prisma.user.findMany()` fetches all users from the database.

## Filtering Data

You can filter data returned by Prisma queries using various filter options. For example, to find users with a specific name:

```typescript
async function getUserByName(name: string) {
  const user = await prisma.user.findFirst({
    where: {
      name: name,
    },
  });
  return user;
}
```

## Relationships

Prisma makes it easy to work with relationships between tables in your database. If you have defined relationships in your Prisma schema, Prisma automatically generates methods to traverse these relationships. For example, assuming a `Post` model has a relationship with a `User` model:

```typescript
async function getUserPosts(userId: number) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      posts: true, // This includes all posts related to the user
    },
  });
  return user.posts;
}
```

## Updating Data

To update data in your database, you can use Prisma's update methods. For example, to update a user's name:

```typescript
async function updateUserName(userId: number, newName: string) {
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      name: newName,
    },
  });
  return updatedUser;
}
```

## Deleting Data

Deleting data is also straightforward with Prisma. For example, to delete a user:

```typescript
async function deleteUser(userId: number) {
  const deletedUser = await prisma.user.delete({
    where: { id: userId },
  });
  return deletedUser;
}
```
For more information regarding Prisma ORM, you can use their extensive documentation that you can find [here](https://www.prisma.io/docs)

# Routing

The application uses the more recent App Router, as part of the NextJS Framework. Everything that is located inside the app folder is accessible as long as the naming convention is kept.

The convention is as follows:
1. **layout**
    This handles the layout applied to all other routes under this specific layout. For example, we can see we have a layout.tsx file inside the app folder. That layout will be applied to the page.tsx, as well as any page.tsx files that are located inside subfolders. 
    <br>
    The only exception to this rule is if there is another layout.tsx file inside a subfolder, in our case we can use the dashboard as an example since it has both a page.tsx file and a layout.tsx file, which is applied to everything inside the dashboard folder and the respective subfolders (e.g. /users)
    <br>
2. **page**
    This file is what is rendered when it's specific route is called (e.g. /dashboard/users will render the page.tsx inside the dashboard/users folder).
    <br>
    Any other file not part of this convention will be ignored when trying to access it.
    <br>
3. **Dynamic routing**
    Dynamic routing allows for parameterized URLs, enabling dynamic content rendering based on URL parameters.
    Parameters in the URL path can be defined using bracket syntax ([]) within file names.
    For instance, [id].tsx represents a dynamic route that can match paths like /posts/1.

### Exceptions
There are certain exceptions to this convention. We can see that the auth subfolder is encased in parantheses. This just means that instead of going through /auth/login to get to the login page.tsx, we can just type /login and it has the same effect. This is important when the folder tree needs to be clean without impacting the final url used to access said section.

# API Routing

Route Handlers allow you to create custom request handlers for a given route using the Web Request and Response APIs.

A route file allows you to create custom request handlers for a given route. The following HTTP methods are supported: GET, POST, PUT, PATCH, DELETE, HEAD, and OPTIONS.

```typescript
export async function GET(request: Request) {}
 
export async function HEAD(request: Request) {}
 
export async function POST(request: Request) {}
 
export async function PUT(request: Request) {}
 
export async function DELETE(request: Request) {}
 
export async function PATCH(request: Request) {}
 
// If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and  set the appropriate Response `Allow` header depending on the other methods defined in the route handler.
export async function OPTIONS(request: Request) {}
```

This project uses the /api/<specific_api> routing. Currently, there are no open API routes since all the fetching is done using Prisma, without a way of accessing the pure json object like in other applications.

If one wishes to implement an API route, all that is needed is to create a new folder inside the api folder, and then create a file inside that folder with the name of *route.tsx*.

Example:
If we would want to have the ability of querying for the users and display them in the classic API way, we could move the getUsers functionality inside a route.ts file as a GET route, which would look like this

```typescript
export async function GET(
  request: Request,
  page = 1,
  pageSize = 1,
  filter = "",
  search = "",
  sortBy = "name",
  sortOrder = "ascending") {
  let offset = 0; // Default offset is 0

  if (page > 1) {
    offset = (page - 1) * pageSize;
  }

  const usersQuery: any = {
    take: pageSize,
    skip: offset,
    orderBy: getOrderByParams(sortBy, sortOrder)
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

  const users = await prisma.user.findMany({ include: { role: true }, ...usersQuery });
  const totalPages = Math.ceil(totalUsersCount / pageSize);

  prisma.$disconnect();

  await new Promise((resolve) => setTimeout(resolve, 500));

  return { users, totalPages };
}
```

This will technically return the same thing that simply calling the ORM internally would return, but we can now access just the data without having to render anything (like a classic API route)

Other than the caveats specified prior, the rest should be just standard React development.


# Directives

```typescript
"use client"
```
In the context of Next.js, "use client" typically refers to functionality or code that runs on the client-side, within the user's web browser. This includes components, hooks, or logic that are executed on the client after the initial page load.

Examples of "use client" behavior in Next.js include:

1. *React components that interact with browser APIs (e.g., window, document).
2. Client-side data fetching using methods like fetch or libraries like axios.
3. UI interactivity and state management using React hooks such as useState and useEffect.
4. Browser-specific functionality such as local storage, session storage, or cookies.

```typescript
"use server"
```
Similarly, "use server" in the context of Next.js refers to functionality or code that runs on the server-side, typically during the server-rendering process. This includes server-side rendering (SSR) logic, API routes, and other server-side operations.

Examples of "use server" behavior in Next.js include:

1. Server-side rendering of React components using Next.js's getServerSideProps or getInitialProps functions.
2. Handling HTTP requests and responses in API routes (/pages/api directory).
3. Accessing server-side resources such as databases, file systems, or environment variables.
4. Implementing server-side authentication and authorization logic.
### Use Cases:
Client-side Operations ("use client"):

Managing client-side state and UI interactions.
Fetching data dynamically in response to user actions or events.
Implementing client-side routing and navigation.
Server-side Operations ("use server"):

Rendering dynamic content on the server for initial page load.
Handling server-side data fetching and authentication.
Implementing server-side logic for processing form submissions or API requests.
By understanding the distinction between client-side and server-side behavior in Next.js applications, developers can architect their applications more effectively, optimizing performance, user experience, and code organization.

If the wrong directive is used, nextjs will throw an error and will specify which directive is needed to be used in the given context.


# Testing

For testing we are using [jest](https://jestjs.io/), which can be integrated in the deployment flow as well as the development flow to ensure the consistency of the application. There is currently only one test suite used as a demo for the CRUD operations on the users.

Here is an example for a test regarding user update

```typescript
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
```

We define the test and the expected outcome in each case we want to test. In the mentioned example, it: 
1. looks to update the user when the provided data is valid
2. handles the error when the user update fails
3. handles the error when the email is already in use

This example can be expanded and added on a variety of use cases and unit tests. The tests cand be found inside the __ tests ___ folder.

To run the test, you need to run the following command
```bash
npm run test
```

# Styling

The application uses [Tailwindcss](https://tailwindcss.com/docs/installation) to style the components. Tailwind uses utility classes that are placed inline on each desired component, speeding up development time when trying to style a component.

Here is an example inside the users page

```typescript
className="cursor-pointer text-center text-base text-blue-500 hover:text-blue-300 dark:text-white dark:hover:text-blue-500"
```
This will make the component have the following styling:
1. Cursor will become pointer
2. Text will be centered
3. Text will have a fontsize of `1rem` and a line-height of `1.5rem`
4. Text will have a color of `#50a3a2`
5. Text will have a hover color of `#30817f`
6. Text will have a dark mode color of `#ffffff`
7. Text will have a dark mode hover color of `#50a3a2`

This can all be done with classic CSS, but tailwind makes it faster to do it inline, especially when more complex styling is required (such as `hover:text-blue-300`)

# Middleware

For next-auth to work we need to add the middleware to the pages that we want to protect.
This is the current middleware configuration
```typescript
/**
 * Exports NextAuth middleware and configures it to handle auth 
* for the /dashboard/:path* and / routes.
*/
export { default } from 'next-auth/middleware'

export const config = { matcher: ['/dashboard/:path*', '/'] }
```
This ensures that the middleware is only applied to the pages that we want to protect, that being anything that the dashboard contains

We also have a custom made middleware method that was used to protect a delete method, ensuring only the users with the appropriate role and role permissions can actually engage in that method. The method can be found in the auth.ts file

```typescript
export const withAuthentication = (
    handler: Function,
    functionName: string
) => async (...args: any[]) => {
    try {
        // Check if user is authenticated
        const session: any = await getServerSession(authOptions);
        if (!session) {
            return { error: true, message: "Unauthorized" }; // Return error object
        }

        // Query backend to fetch user's permissions
        const user = await prisma.user.findUnique({
            where: { id: session?.user?.id },
            include: { role: { include: { permissions: true } } }
        });

        // Check if the user has the necessary permission (function name)
        const hasPermission = user?.role?.permissions.some(
            (permission: { name: string }) => permission.name === functionName
        );

        if (!hasPermission) {
            return {
                error: true,
                message: `Insufficient permissions for ${functionName}`
            };
        }

        // Call the original handler function with the provided arguments
        return await handler(...args);
    } catch (error) {
        // Handle authentication errors
        console.error("Authentication error:", error);
        return { error: true, message: "Unauthorized" }; // Return error object
    }
};
```

and it can be seen used as such

```typescript
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
```
Once the priviliges of the users are checked, the original deleteUser method is ran, deleting the desired user from the database.

# Data validation
For data validation we use the [zod](https://zod.dev/) library. It is a lightweight library that allows us to define the data types and constraints of our data.

Here is an example use case:

```typescript
  // Define Zod schema for the form data
  const schema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email format"),
    password: !currentEntry ? z.string().min(1, "Password is required") : z.string().optional(),
  });
```

It checks for the following:
1. The name field is required
2. The email field is required and has to be a valid email
3. The password field is required if the user is creating a new user, otherwise it is optional

# Logging

For logging we use [winston](https://github.com/winstonjs/winston).
Here is an example use case for the logger

```typescript
logger.info("Deleting user with id: " + id);
```
Which will create a log file with the current date and the following message

```log
2024-04-03 16:43:10 [development] info: Deleting user with id: 88e5a09a-2917-4848-a35b-4e3a43ac43bc
```

Important to note the fact that these logs will work on server components, but not on client components, since client components do not have access to the filesystem.