# Residencial Floren API
Um modelo de API RESTish moderadamente opinativo criado com Node.js

### About
Projetado para abstrair minimamente a lógica do banco de dados, esse modelo cria decisões comuns de design de API e permite distribuir rapidamente seus dados em formatos comuns, como JSON e CSV. 
Isso serve para servir como um clichê para estabelecer rapidamente uma API para um sistema de banco de dados existente. 

### Features
+ Versioning
+ Support for various data stores
+ Tests
+ Flexibility
+ Extensibility
+ The Javascript you know and love
+ Minimal abstractions


### Organization
Each version of the API functions as a self-contained module, and therefore has its own ````package.json````, ````README````, and dependencies.


### Install
````
git clone https://github.com/diegodario88/ResidencialFlorenApi.git
cd ResidencialFlorenApi
npm install
````

### Start
````
npm start
````

The API runs on port ````3000```` by default, and the root can be accessed by navigating to ````http://localhost:3000 in your browser.

### Author
[Diego Dario](https://github.com/diegodario88).

### License
CC-BY for all code unique to this API.
