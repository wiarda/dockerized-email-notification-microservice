FROM node:12-alpine

USER node

WORKDIR /home/node

COPY --chown=node:node package-lock.json package.json ./

RUN npm ci && npm audit fix

COPY --chown=node:node . .

CMD ["node", "./app/index.js"]