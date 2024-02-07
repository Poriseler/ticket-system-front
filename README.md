# Welcome to ticket-system-front 👋

> Frontend intended specifically to use in conjuction with ticket-system-api available separately.

## Install

After downloading repository, only requirement is to install all dependecies

```sh
# Clone the repository
git clone https://github.com/Poriseler/ticket-system-api.git

# Navigate to the project directory
cd ticket-system-api

# Install dependencies
npm install
```

## Usage

By default session time after login is set to 6 minutes and all requests are made to locally hosted backend on 8080 port. These settings may be changed by `.env` file in root directory. Application is run by command

```sh
npm run start
```

## Used libraries

- [React Query](https://www.npmjs.com/package/react-query)
- [React Router](https://reactrouter.com/en/main)
- [HeroIcons](https://heroicons.com/)
- [React Hot Toast](https://react-hot-toast.com/docs)
- [Recharts](https://recharts.org/en-US/)
- [StyledComponents](https://www.npmjs.com/package/styled-components)
- [Axios](https://www.npmjs.com/package/axios)
- [React Error Boundary](https://www.npmjs.com/package/react-error-boundary)

## Tests

> In progress

## Credentials

Emails:

- user1@example.com
- user2@example.com (non staff account)
- user3@example.com
- user4@example.com
- user5@example.com

Password for each account is the same: `Userpass!2`

## Project status

Completed but soon enhanced with tests and additional page dedicated for admins.
