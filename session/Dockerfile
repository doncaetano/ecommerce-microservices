FROM node:14

WORKDIR /nodejs/app

COPY package.json ./
COPY yarn.lock ./

COPY index.js ./

RUN yarn install --production --frozen-lockfile

CMD ["yarn", "start"]