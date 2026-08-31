# Full Stack Open 🚀

This repository contains my solutions, notes, and projects for the **[Full Stack Open](https://fullstackopen.com/en/)** course offered by the University of Helsinki.

The course covers modern full-stack web development with JavaScript and TypeScript, focusing on building Single Page Applications (SPAs) with React, robust backends with Node.js/Express, REST & GraphQL APIs, database integration, testing, and deployment.

---

## 📁 Repository Structure

```text
.
├── part0/   # Fundamentals of Web apps (HTTP requests, DOM, SPA diagrams)
├── part1/   # Introduction to React (components, state, event handlers)
├── part2/   # Communicating with server (REST, axios, forms, phonebook, country data)
├── part3/   # Programming a server with NodeJS and Express (REST API, MongoDB, Mongoose)
├── part4/   # Testing Express servers, user administration (token auth, bcrypt, supertest)
├── part5/   # Testing React apps (Jest, React Testing Library, Playwright/Cypress)
├── part6/   # Advanced state management (Redux, Redux Toolkit, React Query / Zustand)
├── part7/   # React router, custom hooks, styling (UI libraries, Webpack)
├── part8/   # GraphQL (Apollo Server & Client, queries, mutations, subscriptions)
├── part9/   # TypeScript (typed React & Express apps, production setup)
├── part11/  # CI/CD (GitHub Actions)
├── part12/  # Containers (Docker, docker-compose)
└── part13/  # Relational databases (PostgreSQL, Sequelize)
```

**NOTES:**

Instead of using MongoDB atlas I run a local docker container and use [Mongo Compass](https://www.mongodb.com/try/download/compass) GUI

- [Docker desktop download](https://www.docker.com/products/docker-desktop/)

- Mongo build & run (exec where Dockerfile is placed)
```bash
docker build -t local-mongo .
docker run -d --name mongo-local -p 27017:27017 local-mongo
```

Backend MongoDB connectin with [Mongooses](https://mongoosejs.com/index.html)

``` npm install mongoose```