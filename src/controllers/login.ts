//Importar a biblioteca express
import express, {Request, Response} from "express";
//Importar a conexão com o banco de dados
import { AppDataSource } from "../data-source";

//Criar uma instância do express
const router = express.Router();

//Iniciar a conexão com o banco de dados

AppDataSource.initialize().then(() =>{
    console.log("Conexão com o banco de dados estabelecida com sucesso!");
}).catch((error) => {
    console.error("Erro ao conectar com o banco de dados:", error);
});

//Criar a rota GET principal
router.get("/",(req: Request, res: Response)=> {
    res.send("Bem Vindo ao seu Site utilizando o Typeorm e o Express");
})

//Exportar a instrução da rota

export default router;