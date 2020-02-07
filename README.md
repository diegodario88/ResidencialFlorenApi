<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://residencialfloren.firebaseapp.com/">
    <img src="./nodejs-cli-banner.png" alt="Logo" width="1000" height="200">
  </a>

  <h3 align="center">Residencial Floren API</h3>

  <p align="center">
    Um modelo de API RESTish moderadamente opinativo criado com Node.js
    <br />
    
  </p>
</p>

### About
Projetado para abstrair minimamente a lógica do banco de dados, esse modelo cria decisões comuns de design de API e permite distribuir rapidamente seus dados em formatos comuns, como JSON. 
Essa API alimenta o projeto FrontEnd ResidencialFloren, fornecendo as farmácias que estão de plantão através do endpoint /api/v1/plantoes/atual. 

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
