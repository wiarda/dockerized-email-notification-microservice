FROM node:12-alpine

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

# USER root

## RUN addgroup -S node && adduser -S -G node node

USER node

RUN mkdir ~/.npm-global \
    && npm install -g pm2

WORKDIR /home/node

COPY --chown=node:node package-lock.json package.json ./

RUN npm ci && npm audit fix

COPY --chown=node:node . .

# CMD ["node", "./app/index.js"]
CMD ["./.npm-global/bin/pm2-runtime", "./app/index.js"]