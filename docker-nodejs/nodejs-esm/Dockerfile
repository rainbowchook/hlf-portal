FROM alpine:3.22

RUN apk add --update nodejs npm curl

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --only=production

COPY server.js ./

EXPOSE 8080
CMD ["node", "server.js"]