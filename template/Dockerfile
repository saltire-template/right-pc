FROM node:10.22.0-buster

RUN echo 'Asia/Shanghai' > /etc/timezone
COPY deploy/localtime /etc/localtime

WORKDIR /usr/src/app

RUN npm config set registry https://registry.npmjs.org
RUN npm config set puppeteer_download_host=https://npm.taobao.org/mirrors

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

CMD [ "npm", "run", "start" ]

EXPOSE 8080
