### Gym Management GraphQL Application

This repository houses a NestJS GraphQL application designed for gym subscription management, progress tracking, and nutrition monitoring. The system includes QR code authentication for secure access and integrates a Telegram webhook accessible at the `/webhook` endpoint.

### Installation

1. Install dependencies: `npm install`
2. Generate TypeScript type definitions for the GraphQL schema: `npm run generate:typings`
3. Create an SQLite database and tables: `npx prisma db push`
4. Start the server: `npm run start:dev`

### GraphQL Playground

Access the GraphQL Playground by navigating to [http://localhost:3000/graphql](http://localhost:3000/graphql) when the application is running. For more details on using the Playground, refer to the [NestJS documentation](https://docs.nestjs.com/graphql/quick-start#playground).

### Features

- Gym Subscription Management
- Progress Tracking
- Nutrition Monitoring
- QR Code Authentication
- Telegram Webhook Integration at `/webhook`

Feel free to explore and customize the application based on your specific needs. For any questions or further assistance, refer to the [NestJS documentation](https://docs.nestjs.com/) and [Prisma documentation](https://www.prisma.io/docs/).

**Note:** Ensure to configure the necessary environment variables, security settings, and database connection details as per your deployment requirements.
