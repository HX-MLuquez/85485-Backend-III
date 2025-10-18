# Dockerfile for App Logic Deployment

FROM node:20.11.0
WORKDIR /app
COPY package*.json ./
RUN npm install 
COPY ./src ./src
EXPOSE 3000
CMD ["npm", "start"]
# docker login

# docker build -t mauricio776/app-pcmany-image:1.0.10 .

# docker pull pepeArgento/app-family:1.2.41
# docker push mauricio776/app-pcmany-image:1.0.10
# docker pull mauricio776/app-pcmany-image:1.0.10

# docker run -d --name app-pcmany-container -p 8080:3000 mauricio776/app-pcmany-image:1.0.10
