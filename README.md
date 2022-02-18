# React Native App - Prestashop

_RN App, fetchin and sending data to prestashop ecommerce, using hooks like context, useReducer, added navigation and NativeBase UI library,react-navigation

- ✨Magic ✨

## Features

## Already working:
- JWT authorization/register (can't use prestashop cookies/context!)
- Categories, Products with images (slider on product page)
- Cart (add to cart, total cart)
- Placing an order (Can set delivery address, can't choose payment method or carrier)
- Custom page powered by EditorJS in module setings


## TODO:
- ## FixBug in PHP backend module proccesing the JWT token:
- --
- file backend/lelerestapi/classes/Main.php line 30 function getToken()
```sh
 public static function getToken() {
        foreach (getallheaders() as $name => $value) {
            if ($name === 'Authorization') {
                return str_replace('Bearer ', '', $value); 
            }
        }
        return false;
    }
``` 

- Favourite products (Page with a list of current FP + make a button on product page work, backend should be working already)
- Better architecture
- Orders history in profile page
- Carriers on order page

Markdown is a lightweight markup language based on the formatting conventions
that people naturally use in email.
As [John Gruber] writes on the [Markdown site][df1]

> The overriding design goal for Markdown's
> formatting syntax is to make it as readable
> as possible. The idea is that a
> Markdown-formatted document should be
> publishable as-is, as plain text, without
> looking like it's been marked up with tags
> or formatting instructions.

This text you see here is *actually- written in Markdown! To get a feel
for Markdown's syntax, type some text into the left window and
watch the results in the right.

## Tech and references

uses a number of open source projects to work properly:


| Name                                                                     |                                                                               Latest Version                                                                                |
| ------------------------------------------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| [@react-navigation/core](/packages/core)                                 |                 [![badge](https://img.shields.io/npm/v/@react-navigation/core.svg?style=flat-square)](https://www.npmjs.com/package/@react-navigation/core)
| [native-base](/packages/core)                                 |                 [^3.3.2](https://nativebase.io/)
| [redux](/packages/core)                                 |                 [^4.0.5](https://es.redux.js.org/)
| [react-native-vector-icons](/packages/core)                                 |                 [^9.0.0](https://oblador.github.io/react-native-vector-icons/)
| [react-native](/packages/core)                                 |                 [0.67.2](https://reactnative.dev/docs/getting-started)


## Installation
## Development

Want to contribute? Great!


## Docker


# Note:
change environment: var - PRESTASHOP_HOST=[--yourLANIP--] in your docker-compose.yml file

# PrestaShop packaged by Bitnami

## What is PrestaShop?

> PrestaShop is a powerful open source eCommerce platform used by over 250,000 online storefronts worldwide. It is easily customizable, responsive, and includes powerful tools to drive online sales.

[Overview of PrestaShop](http://www.prestashop.com)

## TL;DR

```console
$ curl -sSL https://raw.githubusercontent.com/bitnami/bitnami-docker-prestashop/master/docker-compose.yml > docker-compose.yml
$ docker-compose up 
```

**Warning**: This quick setup is only intended for development environments. You are encouraged to change the insecure default credentials and check out the available configuration options in the [Environment Variables](#environment-variables) section for a more secure deployment.

```sh
version: '2'
services:
  mariadb:
    image: docker.io/bitnami/mariadb:10.4
    environment:
      # ALLOW_EMPTY_PASSWORD is recommended only for development.
      - ALLOW_EMPTY_PASSWORD=yes
      - MARIADB_USER=bn_prestashop
      - MARIADB_DATABASE=bitnami_prestashop
    volumes:
      - 'mariadb_data:/bitnami/mariadb'
  prestashop:
    image: docker.io/bitnami/prestashop:1.7
    ports:
      - '80:8080'
      - '443:8443'
    environment:
      - PRESTASHOP_HOST=192.168.0.10
      - PRESTASHOP_DATABASE_HOST=mariadb
      - PRESTASHOP_DATABASE_PORT_NUMBER=3306
      - PRESTASHOP_DATABASE_USER=bn_prestashop
      - PRESTASHOP_DATABASE_NAME=bitnami_prestashop
      # ALLOW_EMPTY_PASSWORD is recommended only for development.
      - ALLOW_EMPTY_PASSWORD=yes
    volumes:
      - 'prestashop_data:/bitnami/prestashop'
    depends_on:
      - mariadb
volumes:
  mariadb_data:
    driver: local
  prestashop_data:
    driver: local
```

## How to run it (At least for Android devices)
- install Prestashop module from /backend directory (archive it to ZIP first)
- place your website link to /module/lelerestapi in Config.js (Keep in mind, your website need to have SSL in order for it to work on a final .apk/ios build)
- npm install
- yarn install
- npx react-native run-android  (android)

Requires [Node.js](https://nodejs.org/)  to run.

Install the dependencies and devDependencies and start the server.

```sh
cd app
npm i
npx react-native start
npx react-native run-android
```


## License

MIT

**Free Software, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [dill]: <https://github.com/joemccann/dillinger>
   [git-repo-url]: <https://github.com/joemccann/dillinger.git>
   [john gruber]: <http://daringfireball.net>
   [df1]: <http://daringfireball.net/projects/markdown/>
   [markdown-it]: <https://github.com/markdown-it/markdown-it>
   [Ace Editor]: <http://ace.ajax.org>
   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [jQuery]: <http://jquery.com>
   [@tjholowaychuk]: <http://twitter.com/tjholowaychuk>
   [express]: <http://expressjs.com>
   [AngularJS]: <http://angularjs.org>
   [Gulp]: <http://gulpjs.com>

   [PlDb]: <https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md>
   [PlGh]: <https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md>
   [PlGd]: <https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md>
   [PlOd]: <https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md>
   [PlMe]: <https://github.com/joemccann/dillinger/tree/master/plugins/medium/README.md>
   [PlGa]: <https://github.com/RahulHP/dillinger/blob/master/plugins/googleanalytics/README.md>
   
 ![alt text](https://i.ibb.co/L0m7yxJ/presta-Shop-React-Native-App2.jpg)
![alt text](https://i.ibb.co/DwXFMY7/presta-Shop-React-Native-App1.jpg)
![alt text](https://i.ibb.co/jvn7cWG/presta-Shop-React-Native-App3.jpg)
![alt text](https://i.ibb.co/FwYwdxV/presta-Shop-React-Native-App5.jpg)
![alt text](https://i.ibb.co/k1rbjT2/presta-Shop-React-Native-App12.jpg)
![alt text](https://i.ibb.co/pPpKXvP/presta-Shop-React-Native-App6.jpg)
![alt text](https://i.ibb.co/pjNc7Mv/presta-Shop-React-Native-App7.jpg)
![alt text](https://i.ibb.co/WHpSTNz/presta-Shop-React-Native-App9.jpg)
