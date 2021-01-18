FROM node:lts-slim as build

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY ./ /app/

ENV PATH /app/node_modules/.bin:$PATH

RUN npm run build


FROM nginx:alpine

COPY --from=build /app/build/ /usr/share/nginx/html

COPY --from=build /app/conf/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]