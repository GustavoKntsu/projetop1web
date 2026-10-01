//Importar a biblioteca express
import express, {Request, Response} from "express";
import { AppDataSource } from "../data-source";
import { ProductSituation } from "../entity/ProductSituations";
import { PaginationService } from "../services/PaginationService";
//Importar a conexão com o banco de dados

//Criar uma instância do express
const router = express.Router();

//Criar a LISTA
router.get("/product-situations", async(req: Request, res: Response)=> {
    try{

        //Obter o repositório da entidade ProductSituation
        const productSituationRepository = AppDataSource.getRepository(ProductSituation);

        // Receber o número da página e definir página 1 como padrão
        const page = Number(req.query.page) || 1;

        // definir o limite de registros por página
        const limit = Number(req.query.limit) || 10;

        const result = await PaginationService.paginate(productSituationRepository, page, limit, { id: "DESC" });


        // Retornar a resposta com os dados e informações da paginação
        res.status(200).json(result);
        return

    }catch(error){         
        res.status(500).json({
            mensagem: "Erro ao listar situação de produto",
            
        });
        return
    }
});

//Criar a VIEW do item cadastrado em situação de produto
router.get("/product-situations/:id", async(req: Request, res: Response)=> {
    try{

        const {id} = req.params;

        const productSituationRepository = AppDataSource.getRepository(ProductSituation);
        
        const productSituation = await productSituationRepository.findOneBy({ id : parseInt(id as string) });

        if(!productSituation){
            res.status(404).json({
                mensagem: "Situação de produto não encontrada",
            });
            return;
        }

        res.status(200).json(productSituation);
        return

    }catch(error){         
        res.status(500).json({
            mensagem: "Erro ao visualizar a situação de produto",
            
        });
        return
    }
});


//Cadastra o item em situação de produto
router.post("/product-situations", async(req: Request, res: Response)=> {
    
    try{
        var data = req.body;
        
        const productSituationRepository = AppDataSource.getRepository(ProductSituation); 
        
        const newProductSituation = productSituationRepository.create(data);

        await productSituationRepository.save(newProductSituation);

        res.status(201).json({
            mensagem: "Situação de produto cadastrada com sucesso",
            productSituation: newProductSituation,
        });
        
        
    }catch(error){
        
        res.status(500).json({
            mensagem: "Erro ao cadastrar situação de produto",
            
        });


    }
});

//Fazer a EDIT do item cadastrado em situação de produto
router.put("/product-situations/:id", async(req: Request, res: Response)=> {
    try{

        const {id} = req.params;

        var data = req.body;

        const productSituationRepository = AppDataSource.getRepository(ProductSituation);
        
        const productSituation = await productSituationRepository.findOneBy({ id : parseInt(id as string) });

        if(!productSituation){
            res.status(404).json({
                mensagem: "Situação de produto não encontrada",
            });
            return;
        }
        //Atualiza od dados
        productSituationRepository.merge(productSituation, data);
        //Salva as alterações no banco de dados
        const updatedProductSituation = await productSituationRepository.save(productSituation);



        res.status(200).json({
            mensagem: "Situação de produto atualizada com sucesso",
            productSituation: updatedProductSituation,
        });

    }catch(error){         
        res.status(500).json({
            mensagem: "Erro ao atualizar a situação de produto",
            
        });
        return
    }
});

//Deletar o item cadastrado em situação de produto
router.delete("/product-situations/:id", async(req: Request, res: Response)=> {
    try{

        const {id} = req.params;

        const productSituationRepository = AppDataSource.getRepository(ProductSituation);
        
        const productSituation = await productSituationRepository.findOneBy({ id : parseInt(id as string) });

        if(!productSituation){
            res.status(404).json({
                mensagem: "Situação de produto não encontrada",
            });
            return;
        }
        //Exclui o item
        await productSituationRepository.remove(productSituation);
    
        res.status(200).json({
            mensagem: "Situação de produto excluída com sucesso",
        });

    }catch(error){         
        res.status(500).json({
            mensagem: "Erro ao atualizar a situação de produto",
            
        });
        return
    }
});

//Exportar a instrução da rota

export default router;