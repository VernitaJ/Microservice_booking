FROM node:16.1.0
WORKDIR /booking
COPY package.json .
COPY . .
RUN npm install
CMD npm start