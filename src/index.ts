//Importação do express
import express from "express";
//Importar as variaveis de ambiente
import dotenv from "dotenv";
//Carregar as variáveis
dotenv.config();

const app = express();

//Implementação dos "controlllers"
import login from "./controllers/login";
//Criação da rota para o controller login
app.use("/", login);

app.listen(process.env.PORT, () => {
  console.log(`Servidor iniciado na porta ${process.env.PORT}: http://localhost:${process.env.PORT}`);
});