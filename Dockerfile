FROM node:latest

# Create app directory
WORKDIR /app

COPY . /app

RUN npm i -g npm@latest

RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]