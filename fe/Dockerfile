FROM node:18.12.1 as builder
RUN mkdir /home/flos
WORKDIR /home/flos
COPY . .
RUN npm install -- silent
RUN npx create-react-app flos-app
RUN npm run build

FROM nginx
RUN rm -rf /etc/nginx/conf.d
COPY ./flos.conf /etc/ngix/conff.d/default.conf
COPY --from=builder /build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]