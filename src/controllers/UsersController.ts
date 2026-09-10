//Importar a biblioteca express
import express, {Request, Response} from "express";
//Importar a conexão com o banco de dados

//Criar uma instância do express
const router = express.Router();

//Criar a rota GET principal
router.get("/",(req: Request, res: Response)=> {
    res.send("Bem Vindo ao seu Site utilizando o Typeorm e o Express");
})

//Exportar a instrução da rota

export default router;