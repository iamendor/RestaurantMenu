FROM node:alpine

RUN npm install -g prisma

COPY . .

CMD ["prisma", "migrate", "deploy"]