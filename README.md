Hola Gracias por tomarme en cuenta en el proceso de selección

El proyecto está dockerizado y levantado en una **maquina virtual de GCP (Google Cloud)** usando ubuntu 22.04 y con el buen docker-compose v1

Esta es la URL: **http://34.16.181.182:3000** 
Esta es el front: **http://34.16.181.182:3006** 

```
Get - Filter
localhost:3000/recipes

Get - Filter
localhost:3000/shopping-history

Get - Filter
localhost:3000/orders

Get - Filter
localhost:3000/ingredients

Post - Add
localhost:3000/orders
```
No me dio tiempo para poner swagger, pero no se necesita enviar nada en el post y las opciones de filtración están completas

-------------
+ **El frontend** se tendrá que correr en local, haciendo un npm install && npm start, correrá en local con los endpoints del proyecto en cloud
  + **npm install** y un **npm start** Será suficiente. Por defecto lo dejé en el puerto 3006 💚    
  + no sé por que railway (el servicio que uso) cayó, y no me deja hacer deploy del proyecto, pero no me dio el tiempo para subirlo en otra parte 😢😭
  + Mejor lo subí en google-cloud-platform también 🖥️

+ **El backend**, si gustan correrlo en local, ya dejé todo listo en su respectiva carpeta también con sus instrucciones, es solo usando docker-compose y correr las migraciones
------------

Fue un buen proyecto de inicio, en donde la asincronía reinaba jaja, es algo que los microservicios siempre tendrán presentes ♾️

Una disculpa si al final repetí algo de código, me quedé sin algo de tiempo, tenia otros proyectos 😭🙈


En verdad creo que puedo aportarles al equipo, pero aún así ánimos a cualquier decisión que pase ❤️💻

~ Ian Vassallo 💪❤️
