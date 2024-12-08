### Description

# A simple blogging system where users can register with usernames, mails and passwords and create, update, fetch, delete blog posts with their categories.

# The system can:

1. Create/Update/Fetch Users
2. Create/Update/Fetch/Delete Blog Posts
3. Create/Delete Categories associated with Posts
4. Send notification to the email that was provided after post creation

### Start Project

```bash
$ docker-compose build --no-cache
$ docker-compose up -d 
```
# You can find the Postman collections JSON file in the project. Simply download it and import it into Postman.

## Basic .env file:

```bash
#Postgres Configs
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=blogPostManagement
DB_HOST=postgres
DB_PORT=5432
DATABASE_URL=postgres://postgres:postgres@postgres:5432/blogPostManagement

# Mail Configs
BREVO_API_KEY=
MAIL=
MAIL_PASSWORD=
SENDER_MAIL=
HOST_MAIL=
```