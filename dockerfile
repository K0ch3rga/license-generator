FROM node:20-alpine AS build-stage
LABEL stage=build
RUN mkdir /app
WORKDIR /app
COPY ./ ./
RUN npm ci
RUN npm run build

FROM nginx:alpine
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]