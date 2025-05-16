
FROM node:18

WORKDIR /app

COPY ./src ./src
COPY package*.json ./

RUN npm install

EXPOSE 5000
CMD ["node", "src/app.js"]
