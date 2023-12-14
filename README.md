
![Logo](public/image.png)

# PulseChat

PulseChat is an application allowing its users to create, share and vote polls. 
This application is hosted on [Vercel](https://vercel.com). It is connected to a PostgreSQL database hosted on [NEON](https://neon.tech).

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework for building web applications.
- [Tailwind CSS](https://tailwindcss.com/) - Cadre CSS utilitaire.
- [Clerk](https://clerk.com) - Authentication and user management.
- [Shadcn UI](https://ui.shadcn.com) - Responsive user interface library.
- [next-themes](https://www.npmjs.com/package/next-themes?activeTab=readme) - Theme manager for Next.js.


## Installation

1. Clone the repository :
```bash
  git clone https://github.com/garerim/PulseChat.git
  cd PulseChat
```
2. Install dependencies and run project :
```bash
  npm install
  npm run dev
```
## Features

- Light/dark mode toggle
- Create, Edit, Delete or share polls
- Search and filter the public polls.
- Responsive design



## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL` - Link to a PostgreSQL Database.

`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk public key

`CLERK_SECRET_KEY` - Clerk secret key

`NEXT_PUBLIC_CLERK_SIGN_IN_URL`

`NEXT_PUBLIC_CLERK_SIGN_UP_URL`

`NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL`

`NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL`


## License

This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/)

