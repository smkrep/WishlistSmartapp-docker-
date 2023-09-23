FROM node:18-alpine

WORKDIR /frontend

RUN npx create-react-app .

RUN npm install @salutejs/client

COPY ./src .

CMD ["npm", "start"]
