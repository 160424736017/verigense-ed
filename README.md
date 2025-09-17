This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Role-Based Access Control (Development)

During development, role-based access is simulated using query parameters:
- Student pages: Add `?role=student` to URLs (default)
- Teacher pages: Add `?role=teacher` to URLs
- Admin pages: Add `?role=admin` to URLs

Example: http://localhost:3000/teacher/dashboard?role=teacher

Once you've accessed a page with a role parameter, that role will be preserved for subsequent navigation within the same browser session.

In production, roles are determined by the authentication system.

## Routing Strategy

This project implements a comprehensive routing strategy for an education platform with role-based access:

- **Global Routes**: Login, search, profile, settings
- **Student Routes**: Dashboard, classes, grades, attendance, fees
- **Teacher Routes**: Dashboard, classes management, attendance, grades
- **Admin Routes**: Full system management
- **API Layer**: Versioned API endpoints for all roles

See `ROUTING_STRATEGY.md` and `ROUTING_IMPLEMENTATION.md` for detailed documentation.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.