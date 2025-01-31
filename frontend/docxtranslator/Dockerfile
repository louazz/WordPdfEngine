FROM node:lts-alpine as build

WORKDIR /app

COPY package*.json ./

COPY dist .

RUN npm i -g serve

EXPOSE 3000

CMD ["serve","-p", "3000"]