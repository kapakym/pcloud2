# pCloud2 - cloud file storage (PET - PROJECT)

pCloud2 - The application is designed for deployment on a home server, cloud file storage

Web application for forking a private cloud at home. The application allows you to:

- perform operations on files (delete, upload to the server, download from the server, copy)
- share files or folders
- scan media files and view them in the gallery
- scan photos for the presence of people, perform their clustering and filter photos by clusters
- scan photos for text and filter photos by text

The application consists of three main parts:

- client (there is a version on Next.js, but it is not supported at the moment) React application. Interaction with the server via Rest API and WebSocket
- Nest JS server + ORM Prisma + Postges
- server for processing Python media. Interaction with the server via Rest API

view them in the gallery

- scan photos for the presence of people, perform their clustering and filter photos by clusters
- scan photos for text and learn how to filter photos by text

Application setup:

- the configuration file is located in the /pserver/src/config/config.ts folder
- open the file in a text editor and configure according to the example below

```
export default () => ({
  environment: process.env.NODE_ENV || 'development',
  DATABASE_URL:
  <!-- create a password for the database and replace YOU_PASSWORD with the password you created -->
    process.env.NODE_ENV === 'production'
      ? 'postgresql://postgres:YOU_PASSWORD@postgres:5432/pcloud2db?schema=public'
      : 'postgresql://postgres:YOU_PASSWORD@localhost:5432/pcloud2db?schema=public',
  <!-- create a password for the JWT token and replace YOU_JWT_SECRET with the password you created -->
  JWT_SECRET: 'YOU_JWT_SECRET',
  <!-- create a password for the JWT token and replace YOU_JWT_SECRET_SHARE with the password you created -->
  JWT_SECRET_SHARE: 'YOU_JWT_SECRET_SHARE',
  PORT: process.env.NODE_ENV === 'production' ? 5554 : 5555,
  STATIC_FOLDER: 'static',
  CLOUD_PATH:
    process.env.NODE_ENV === 'production'
      ? '/var/share'
      : '/Users/alex/cloudTest',
  TEMP_PREFIX: 'temp',
  SERVER_PYTHON:
    process.env.NODE_ENV == 'production'
      ? 'http://pythonface:6000'
      : 'http://localhost:6000',
  DOMAIN: process.env.NODE_ENV === 'production' ? 'server' : 'localhost',
  <!-- Enter the name of the domain on which the cloud storage will be located, this is necessary for the correct operation of cookies -->
  DOMAIN_COOKIES: 'localhost',
  <!-- Enter the mail hosting settings that will be responsible for sending notifications -->
  MAIL_USER: 'YOU_EMAIL',
  MAIL_PASSWORD: 'YOU_EMAIL_HOSTING_PASSWORD',
  MAIL_HOST: 'smtp.YOU_EMAIL_SERVER',
  MAIL_PORT: 465,
});

```

Application installation:

- Download and install docker compose
- Clone this repository
- Go to the folder with the source code
- Run the command [docker compose up -d --build]

![pCloud2 - application](./screenshot/1.png)
![pCloud2 - application](./screenshot/2.png)
![pCloud2 - application](./screenshot/3.png)
![pCloud2 - application](./screenshot/4.png)
