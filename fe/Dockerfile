FROM nginx
RUN mkdir /home/flos
WORKDIR /home/flos
COPY . .
RUN mkdir /etc/nginx/sites-available
RUN mkdir /etc/nginx/sites-enabled
RUN mv flos.conf /etc/nginx/sites-available/flos.conf
RUN ln -s /etc/nginx/sites-available/flos.conf /etc/nginx/sites-enabled/flos.conf
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
RUN . ~/.nvm/nvm.sh `nvm install node`
RUN . ~/.nvm/nvm.sh `nvm install 18.12.1`
RUN . ~/.nvm/nvm.sh `npm install`
RUN . ~/.nvm/nvm.sh `npm run build`
RUN service nginx restart
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]