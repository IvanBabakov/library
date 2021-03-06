FROM node:alpine
WORKDIR /library

COPY package*.json ./
RUN npm install
COPY *.js ./
COPY middleware/ ./middleware/
COPY models/ ./models/
COPY routers/ ./routers/
COPY views/ ./views/

CMD ["npm", "run", "start"]