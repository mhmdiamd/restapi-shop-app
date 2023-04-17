<br />
<p align="center">
<div align="center">
<img height="150" src="./documentation/logo.png" alt="Blanja" border="0"/>
</div>
  <h3 align="center">Backend Blanja</h3>
  <p align="center">
    <a href="https://github.com/mhmdiamd/restapi-shop-app"><strong>Explore the docs »</strong></a>
    <br />
    <a href="https://kind-blue-angelfish-boot.cyclic.app">View Demo</a>
    ·
  </p>
</p>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [Table of Contents](#table-of-contents)
- [About The Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Setup .env example](#setup-env-example)
- [Rest Api](#rest-api)
- [Contributing](#contributing)
- [Related Project](#related-project)
- [Contact](#contact)

<!-- ABOUT THE PROJECT -->

## About The Project

Blanja is an E-commerce website project that aims to provide an easy and convenient online shopping experience for users in Indonesia. The site offers a wide range of products, including fashion, beauty, electronics, and food and beverages.

To use Blanja's services, users only need to create an account and enter their payment details. After that, users can browse products, add them to their shopping cart, and choose their preferred payment method.

With all the features and security provided, Blanja is expected to provide a safe, easy, and convenient online shopping experience for users across Indonesia.

### Built With

- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [JSON Web Tokens](https://jwt.io/)
- and other


<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

- [nodejs](https://nodejs.org/en/download/)


| Thrid Party     | npm install         |
| --------------- | ------------------- |
| [Express]       | npm i express       |
| [Nodemon]       | npm i nodemon       |
| [Morgan]        | npm i morgan        |
| [PostgresSQL]   | npm i pg            |
| [Dotenv]        | npm i dotenv        |
| [CORS]          | npm i cors          |
| [Eslint]        | npm i eslint        |
| [Joi]           | npm i joi           |
| [jsonwebtoken]  | npm i jsonwebtoken  |
| [cookie-parser] | npm i cookie-parser |
| [googleapis]    | npm i googleapis    |
| [nodemailer]    | npm i nodemailer    |

[express]: http://expressjs.com
[nodemon]: https://www.npmjs.com/package/nodemon
[morgan]: https://www.npmjs.com/package/morgan
[postgressql]: https://node-postgres.com
[dotenv]: https://www.npmjs.com/package/dotenv
[cors]: https://www.npmjs.com/package/cos
[eslint]: https://eslint.org/
[joi]: https://www.npmjs.com/package/joi
[jsonwebtoken]: https://www.npmjs.com/package/jsonwebtoken
[cookie-parser]: https://www.npmjs.com/package/cookie-parser
[googleapis]: https://www.npmjs.com/package/cookie-parser
[nodemailer]: https://www.npmjs.com/package/cookie-parser

### Requirements

- [Node.js](https://nodejs.org/en/)
- [Postman](https://www.getpostman.com/) for testing

### Installation

- Clone This Back End Repo

```
git clone https://github.com/mhmdiamd/restapi-shop-app.git
```

- Go To Folder Repo

```
cd restapi-shop-app
```

- Install Module

```
npm install
```

- <a href="#setup-env-example">Setup .env</a>
- Starting application

```
  <!-- Run App -->
  npm run start:dev
```

```
  <!-- Run Linter -->
  npm run lint
```

### Setup .env example

Create .env file in your root project folder.

```env
# Postgre SQL Configuration
PG_NAME 
PG_USER 
PG_PASSWORD 
PG_PORT 
PG_HOST 

# Token Secret
ACCESS_TOKEN_SECRET  
REFRESH_TOKEN_SECRET 
EMAIL_ACTIVATION_TOKEN 

# Email User For Send Email
EMAIL_SENDER
EMAIL_SENDER_PASSWORD 

# Origin Domain 
ORIGIN_DOMAIN 

# Google Service Credentials
GOOGLE_DRIVE_TYPE
GOOGLE_DRIVE_PROJECT_ID
GOOGLE_DRIVE_PRIVATE_KEY_ID
GOOGLE_DRIVE_PRIVATE_KEY 
GOOGLE_DRIVE_CLIENT_EMAIL 
GOOGLE_DRIVE_CLIENT_ID
GOOGLE_DRIVE_AUTH_URI
GOOGLE_DRIVE_TOKEN_URI 
GOOGLE_DRIVE_AUTH_PROVIDER
GOOGLE_DRIVE_CLIENT_URL
PORT 
HOST
DRIVE_CLIENT_ID 
DRIVE_CLIENT_SECRET
```

## Endpoint List

[![Run in Postman](https://run.pstmn.io/button.svg)]
<!-- (https://documenter.getpostman.com/view/23292228/2s93RUvsMo) -->

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Related Project

:rocket: [`Backend Blanja`](https://github.com/mhmdiamd/restapi-shop-app)

:rocket: [`Frontend Blanja`](https://github.com/mhmdiamd/ui-shop-app)

:rocket: [`Demo Blanja`](https://iam-blanja.vercel.app/)

<!-- CONTACT -->

## Contact

My Email : darmawanilham34@gmail.com

Project Link: [https://github.com/mhmdiamd/restapi-shop-app/](https://github.com/mhmdiamd/restapi-shop-app)

