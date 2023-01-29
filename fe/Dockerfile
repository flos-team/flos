FROM nginx
RUN mkdir /home/flos
WORKDIR /home/flos
COPY . .
RUN mkdir /etc/nginx/sites-available
RUN mkdir /etc/nginx/sites-enabled
RUN mv flos.conf /etc/nginx/sites-available/flos.conf
RUN ln -s /etc/nginx/sites-available/flos.conf /etc/nginx/sites-enabled/flos.conf
RUN npm install
RUN npm run build
RUN service nginx restart
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]