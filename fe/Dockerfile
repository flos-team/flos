FROM nginx
RUN mkdir /home/flos
WORKDIR /home/flos
COPY . .
RUN rm /etc/nginx/sites-available/default
RUN rm /etc/nginx/sites-enabled/default
RUN mv flos.conf /etc/nginx/sites-available/flos.conf
RUN ln -s /etc/nginx/sites-available/flos.conf /etc/nginx/sites-enabled/flos.conf
RUN npm install
RUN npm run build
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]