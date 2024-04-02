# Introduction

**next-base-js** is a web application built using Next.js. It is designed to be a customizable dashboard template that can be used for various use cases.

The project aims to provide a starting point for building dashboard apps by providing common UI components like sidebar navigation, tables, forms, and modals out of the box. The goal is to have reusable building blocks that can kickstart dashboard development.

Some of the key features include:

- Responsive sidebar navigation
- Customizable table component
- Modals for managing data
- Forms with validation
- Dark mode support
- Basic page layouts

The project is configured to make customizing and extending the components and styles easy for your use case. The table, forms, modals, and other components can be adapted or replaced as needed.


## Installation Instructions

### Direct Installation

1. **Clone the Repository:**
   ```bash
   git clone <repository_url>
   ```

2. **Navigate to the Project Directory:**
   ```bash
   cd <project_directory>
   ```

3. **Install Dependencies:**
   Ensure you have Node.js version 20.11.1 installed on your system. Then, run the following command to install the project dependencies:
   ```bash
   npm install
   ```

4. **Set Up Environment Variables:**
   Create a `.env` file in the root directory of the project and configure the following environment variables to connect to your database:
   ```
   DATABASE_URL=<your_database_url>
   ```

5. **Start the Project:**
   Once the dependencies are installed and environment variables are configured, start the project by running:
   ```bash
   npm run start:dev
   ```

### Docker Installation

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

Once the installation process is complete, you can access the project by navigating to the specified localhost address in your web browser. (most likely localhost:3000)


