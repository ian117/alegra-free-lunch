<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

¡Hola! Soy Ian Vassallo y este es la API de prueba de 7 dias: **Jornada de almuerzo ¡gratis!**

Usé **NestJs** para realizar la prueba, un framework de **NodeJs** que ayuda a crear aplicaciones de grado empresarial, ya que abstrae muchas cosas 🧡

Aunque me esforcé por hacerlo, **por tiempos**, tal vez existan unas pequeñas que me den un poco de vergüenza 🙈😂 

(Por ejemplo, cierto CronJob que puedo refactorizar, pero lo hice así para terminar a tiempo jeje🙈😅)

Espero entiendan, ya que también tengo otros **trabajos y proyectos** en este momento, pero aún así hice este, con dedicación para demostrarles que **puedo aportar a su equipo** ❤️


## Installation

Si levantarán esto de manera local **sin Docker**, simplemente usen **pnpm** (Lo mismo que npm, pero con una p al principio 😋😝)

(Tal vez haya que cambiar cierta configuración TCP de los microservicios, asi que **recomiendo Docker**)

```bash
$ pnpm install
```

Seguido de los scripts 
de

```bash
$ pnpm run start:dev
```

## Docker

Si lo usarán **con Docker**, simplemente posicionense a nivel del **package.json** (root) y 

**1**.- Usen el **.env.example** como su **.env**
Simplemente **borren** el **_".example"_** del nombre del archivo


**2**.- corran el siguiente comando

```bash
$ docker-compose up -d --build --force-recreate
```

##### Docker - Devs

❇️ Esta **mini sección** es solo si **editarán** de manera local el proyecto ❇️

Si quieren _'moverle'_ al proyecto o editarlo:

Con gusto pueden **descomentar** los volumenes en el **docker-compose** file de cada servicio (simplemente para usar los **node_modules del contenedor**)

##### Docker - Devs - Windows

Si siguen esta forma, solo recuerden usar un entorno **WSL2**, o bien, activar el **dynamicPriorityPolling** de **TypeScript** en el **tsconfig.json** y seguir en windows

❇️ Saltar ❇️

## Corriendo el proyecto

Una vez hayan inicializado el proyecto (**asumiré que usan Docker**)

Tenemos que correr las migraciones

### Migraciones

Si todos los servicios están levantados, tambien la DB de postgres tiene que estar ok

Entonces, en nuestro proyecto de **restaurant** (nuestra api **principal** o **API gateway**) correremos las migraciones

Esto **con docker-compose**

```bash
# development
$ docker-compose exec restaurant npx sequelize-cli db:seed:all
```

Después de correrlas, todo debería de poder realizarse correctamente

**Get** - Filter
+ localhost:3000/recipes

**Get** - Filter
+ localhost:3000/shopping-history

**Get** - Filter
+ localhost:3000/orders

**Get** - Filter
+ localhost:3000/ingredients

**Post** - Add
+ localhost:3000/orders

## Ultimas Palabras

Fue un buen proyecto de inicio, en donde la **asincronía** reinaba jaja, es algo que los **microservicios** siempre tendrán presente

Una disculpa si al final repetí algo de código, me quedé sin algo de tiempo jeje 🙈😂

En verdad creo que puedo **aportarles al equipo**, pero aún así ánimos a cualquier decisión que pase ❤️💻

## License

Nest is [MIT licensed](LICENSE).
