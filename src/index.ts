//Importação do express
import express from "express";
//Importar as variaveis de ambiente
import dotenv from "dotenv";
//Carregar as variáveis
dotenv.config();

//Criar uma instância do express
const app = express();

//Criar um middleware para interpretar o corpo das requisições como JSON
app.use(express.json());



//Implementação dos "controlllers"
import AuthController from "./controllers/AuthController";
import SituationsController from "./controllers/SituationsController";
import UsersController from "./controllers/UsersController";
import ProductCategoriesController from "./controllers/ProductCategoriesController";
import ProductSituationsController from "./controllers/ProductSituationsController";
import ProductsController from "./controllers/ProductsController";

//Criação da rota para o controller login
app.use("/", AuthController);
app.use("/", SituationsController);
app.use("/", UsersController);
app.use("/", ProductCategoriesController);
app.use("/", ProductSituationsController);
app.use("/", ProductsController);

app.listen(process.env.PORT, () => {
  console.log(`Servidor iniciado na porta ${process.env.PORT}: http://localhost:${process.env.PORT}`);
});