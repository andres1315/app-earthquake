# Aplicacion Earthquake Past 30 Days

**La aplicacion consume la api earthquake creada con ruby on rails, por defecto consuma la api desde http://localhost:3000/api. no se configuraron variables de entorno**

**Para cambiar la url de la api se hace desde el origen src/api/earthquake.ts. constante URL_API**

## Instalacion

```bash
$ npm install
```
**Pasos para correr aplicacion**

## Correr en ambiente de desarrollo 

```bash
$ npm run dev
```

## Desplegar a productivo 

```bash
$ npm run build
```




## Endpoints

**Obtener features**
```bash
  http://127.0.0.1:3000/api/features?page=1&per_page=2%27
```
**Obtener features filtrados por mag_type :Ejemplo md y ml** 
```bash
  http://127.0.0.1:3000/api/features?page=1&per_page=20&mag_type%5B%5D=md&mag_type%5B%5D=ml%27
```

**Agregar Comentario**
```bash
  http://127.0.0.1:3000/api/features/1/comments
```

# APLICACION WEB

**https://github.com/andres1315/app-earthquake**

* Ruby version  3.2.3

* Rails version 7.1.3.2
