FROM node:18.12.1 AS build
RUN mkdir /home/flos
WORKDIR /home/flos
COPY . .
RUN mkdir -p build
RUN npm install -- silent
RUN npx create-react-app flos-app
RUN npm run build

FROM nginx
RUN rm -rf /etc/nginx/conf.d
COPY ./flos.conf /etc/nginx/conf.d/default.conf
COPY --from=build /home/flos/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]