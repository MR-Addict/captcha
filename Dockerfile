FROM nikolaik/python-nodejs:latest
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install -ci
EXPOSE 8000
COPY . .
CMD ["node", "index.js"]
