const express = require("express");
const server = express();
const routes = require("./routes");
const path = require("path")
const app = require("./routes")

const port = 3000;

//View engine, trabalha com um a conversão de JS 
server.set('view engine', 'ejs');

//server.set('view engine', 'html');
//server.engine('html', require('ejs').renderFile);

//Mudar a localização da pasta views
server.set('views', path.join(__dirname, 'views'))

//Habilita os arquivos statics "public" efetua o roteamento dinamico dentro da pasta referencia
//efetuado pelo express
server.use(express.static("public"));

//Usar o req.body
server.use(express.urlencoded({ extended: true }));

//Acesso ao redirecionamento de rotas de acesso aos html
server.use(routes, app)

//Inicialização de porta e informação do servidor rodando
server.listen(port, () => console.log(`Server running on http://localhost:${port}/login`));