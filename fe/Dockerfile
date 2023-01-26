FROM nginx
RUN mkdir fe
WORKDIR /fe
RUN mkdir ./build
ADD ./build ./build
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]