FROM node:14.18.1-alpine AS base
WORKDIR /src
COPY package*.json .

FROM base AS dependencies
RUN npm ci --only=production
RUN cp -R node_modules prod_node_modules
RUN npm install

FROM dependencies AS build
COPY . .

FROM base AS release
COPY --from=dependencies /src/prod_node_modules ./node_modules
COPY . .
EXPOSE 8080
CMD ["node", "index.js"]
