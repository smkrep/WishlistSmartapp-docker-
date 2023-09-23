FROM node:18-alpine

WORKDIR /frontend

RUN npx create-react-app .

RUN npm install @salutejs/client

COPY ./public ./public

COPY ./src ./src

CMD ["npm", "start"]
