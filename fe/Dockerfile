FROM nginx
RUN mkdir ./fe
WORKDIR /fe
COPY . .
RUN npm install
RUN npm run build
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]