//Importar a biblioteca express
import express, {Request, Response} from "express";
import { AppDataSource } from "../data-source";
import { Situation } from "../entity/Situations";
//Importar a conexão com o banco de dados

//Criar uma instância do express
const router = express.Router();

//Criar a rota GET principal
router.get("/situations",(req: Request, res: Response)=> {
    res.send("Essa é a sua tela de situações da rota");
});

//Criar a rota POST 
router.post("/situations", async(req: Request, res: Response)=> {
    
    try{
        var data = req.body;
        
        const situationRepository = AppDataSource.getRepository(Situation); 
        
        const newSituation = situationRepository.create(data);

        await situationRepository.save(newSituation);

        res.status(201).json({
            menssagem: "Situação cadastrada com sucesso",
            situation: newSituation,
        });
        
        
    }catch(error){
        
        res.status(500).json({
            menssagem: "Erro ao cadastrar situação",
            
        });


    }
});

//Exportar a instrução da rota

export default router;