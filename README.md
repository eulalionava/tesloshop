# Next TesloShop
Para correr localmente, se necesita la base de datos

```
docker-compose up -d
```
* El -d, significa __detached__


## Configurar las variables de entorno

Rembrar el archivo __.env.template__ a __.env__

* MongoDB URL Local
```
mongodb://localhost:27017/teslodb
```

## Reconstruir los modulos de node y levantar NEXT

```
npm install
npm run dev
```

## Llenar la base de datos con información de pruebas

```
http://localhost:3000/api/seed
```
