FROM node:16.1.0
WORKDIR /booking
COPY package.json .
RUN npm install
COPY . .
CMD npm start