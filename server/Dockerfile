FROM node:16-alpine
WORKDIR /app
COPY package.json yarn.lock ./
# RUN npm ci --omit=dev
RUN yarn install --production=true
COPY . .
CMD [ "node", "index.js" ]
