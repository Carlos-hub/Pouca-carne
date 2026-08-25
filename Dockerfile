FROM node:18-bullseye

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

# o Vite injeta a URL da API no bundle, então ela precisa existir no build
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

EXPOSE 5173
CMD ["npm", "start"]
