FROM nikolaik/python-nodejs:latest
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install -ci
EXPOSE 8000
COPY . .
RUN pip install -r requirements.txt
CMD ["node", "index.js"]
