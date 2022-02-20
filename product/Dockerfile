FROM node:14 as builder
LABEL stage=builder

WORKDIR /nodejs/app

COPY . ./

RUN yarn install --frozen-lockfile --no-cache
RUN yarn build

FROM node:14

WORKDIR /nodejs/app

COPY --from=builder /nodejs/app/package.json /nodejs/app/yarn.lock ./
COPY --from=builder /nodejs/app/build/index.js ./build/index.js

RUN yarn install --production --frozen-lockfile --no-cache

CMD ["yarn", "start"]
