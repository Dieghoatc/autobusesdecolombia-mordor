# Ejemplo usando Node 20
FROM node:20-alpine

WORKDIR /app

# Copiamos solo los manifiestos primero
COPY package.json package-lock.json ./

# Instalamos dependencias
RUN npm install --frozen-lockfile

# Ahora copiamos el resto del proyecto
COPY . .

# Build de Angular (ejemplo)
RUN npm run build

CMD ["npm", "run", "start:dev"]
