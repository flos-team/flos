FROM node:18.12.1 AS build
RUN mkdir -p /home/flos
WORKDIR /home/flos
COPY . .
RUN mkdir -p build
RUN npm install react-lottie --force
RUN npm install framer-motion --force
RUN npm run build

FROM nginx
RUN rm -rf /etc/nginx/conf.d
RUN mkdir -p /etc/nginx/conf.d
COPY ./flos.conf /etc/nginx/conf.d/default.conf
COPY --from=build /home/flos/build /usr/share/nginx/html
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]