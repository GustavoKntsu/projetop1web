//Importar a biblioteca express
import express, {Request, Response} from "express";
import { AppDataSource } from "../data-source";
import { Situation } from "../entity/Situations";
import { PaginationService } from "../services/PaginationService";
//Importar a conexão com o banco de dados

//Criar uma instância do express
const router = express.Router();

//Criar a LISTA
router.get("/situations", async(req: Request, res: Response)=> {
    try{

        //Obter o repositório da entidade Situation
        const situationRepository = AppDataSource.getRepository(Situation);

        // Receber o número da página e definir página 1 como padrão
        const page = Number(req.query.page) || 1;

        // definir o limite de registros por página
        const limit = Number(req.query.limit) || 10;

        const result = await PaginationService.paginate(situationRepository, page, limit, { id: "DESC" });


        // Retornar a resposta com os dados e informações da paginação
        res.status(200).json(result);
        return

    }catch(error){         
        res.status(500).json({
            menssagem: "Erro ao listar situação",
            
        });
        return
    }
});

//Criar a VIEW do item cadastrado em situação
router.get("/situations/:id", async(req: Request, res: Response)=> {
    try{

        const {id} = req.params;

        const situationRepository = AppDataSource.getRepository(Situation);
        
        const situation = await situationRepository.findOneBy({ id : parseInt(id as string) });

        if(!situation){
            res.status(404).json({
                menssagem: "Situação não encontrada",
            });
            return;
        }

        res.status(200).json(situation);
        return

    }catch(error){         
        res.status(500).json({
            menssagem: "Erro ao visualizar a situação",
            
        });
        return
    }
});


//Cadastra o item em situação
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

//Fazer a EDIT do item cadastrado em situação
router.put("/situations/:id", async(req: Request, res: Response)=> {
    try{

        const {id} = req.params;

        var data = req.body;

        const situationRepository = AppDataSource.getRepository(Situation);
        
        const situation = await situationRepository.findOneBy({ id : parseInt(id as string) });

        if(!situation){
            res.status(404).json({
                menssagem: "Situação não encontrada",
            });
            return;
        }
        //Atualiza od dados
        situationRepository.merge(situation, data);
        //Salva as alterações no banco de dados
        const updatedSituation = await situationRepository.save(situation);



        res.status(200).json({
            menssagem: "Situação atualizada com sucesso",
            situation: updatedSituation,
        });

    }catch(error){         
        res.status(500).json({
            menssagem: "Erro ao atualizar a situação",
            
        });
        return
    }
});

//Deletar o item cadastrado em situação
router.delete("/situations/:id", async(req: Request, res: Response)=> {
    try{

        const {id} = req.params;

        const situationRepository = AppDataSource.getRepository(Situation);
        
        const situation = await situationRepository.findOneBy({ id : parseInt(id as string) });

        if(!situation){
            res.status(404).json({
                menssagem: "Situação não encontrada",
            });
            return;
        }
        //Exclui o item
        await situationRepository.remove(situation);
    
        res.status(200).json({
            menssagem: "Situação excluída com sucesso",
        });

    }catch(error){         
        res.status(500).json({
            menssagem: "Erro ao atualizar a situação",
            
        });
        return
    }
});

//Exportar a instrução da rota

export default router;