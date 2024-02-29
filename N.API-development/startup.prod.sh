#!/usr/bin bash
set -e

npm run prisma:generate
npm run migrate:deploy
npm run seed:run
npm run start:prod
