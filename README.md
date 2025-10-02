# 🚌 MORDOR: AutobusesDeColombia API with NestJS

## 📌 Description

This project is an API built with the **NestJS framework**, used to provide and manage data for the **AutobusesDeColombia** website.
It is designed to store data in the **Moria database** and integrate with external services such as the **Rivendel API** (for photo marking and metadata).

## 🛠️ Tech Stack

* **NestJS** – Backend framework for Node.js
* **PostgreSQL** – Relational database
* **TypeORM** – Object-relational mapper
* **Redis** – In-memory data store
* **Docker / Docker Compose** – Container orchestration & local development

## ⚙️ Installation & Setup

Clone the repository:

```bash
git clone https://github.com/Dieghoatc/autobusesdecolombia-mordor.git
cd autobusesdecolombia-mordor
```

Install dependencies:

```bash
npm install
```

## ▶️ Running the App

Development mode:

```bash
npm run start:dev
```

Production build:

```bash
npm run build
npm run start:prod
```

## 🧪 Testing

Run unit tests:

```bash
npm run test
```

E2E tests:

```bash
npm run test:e2e
```

Coverage:

```bash
npm run test:cov
```

## 🐳 Docker

Start services with Docker Compose:

```bash
docker compose up -d
```

Stop services:

```bash
docker compose down
```

## 🗄️ Database Restore (Moria)

This project includes a PostgreSQL database named **Moria**.

## 📄 License

This project is licensed under the MIT License.
