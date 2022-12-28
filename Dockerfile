FROM node

RUN mkdir -p /var/www/the-wall-december

WORKDIR /var/www/the-wall-december

COPY package.json ./

RUN npm install

RUN npm install -g nodemon 

COPY . .

EXPOSE 3000
