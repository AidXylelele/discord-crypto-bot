FROM node:16

USER node

WORKDIR /app

COPY --chown=node package.json .
COPY --chown=node package-lock.json .

RUN npm install

COPY --chown=node . .

RUN chmod +x /app/src/db/scripts/migration.sh

COPY --chown=node knexfile.js ./
COPY --chown=node src/db/migrations ./

CMD [ "node", "src/index.js" ]
