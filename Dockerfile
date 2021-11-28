FROM node:16.1.0
WORKDIR /booking
RUN npm install
COPY . .
CMD npm start