//Importar a biblioteca express
import express, {Request, Response} from "express";
import { AppDataSource } from "../data-source";
import { ProductCategory } from "../entity/ProductCategories";
import { PaginationService } from "../services/PaginationService";
//Importar a conexão com o banco de dados

//Criar uma instância do express
const router = express.Router();

//Criar a LISTA
router.get("/product-categories", async(req: Request, res: Response)=> {
    try{

        //Obter o repositório da entidade ProductCategory
        const productCategoryRepository = AppDataSource.getRepository(ProductCategory);

        // Receber o número da página e definir página 1 como padrão
        const page = Number(req.query.page) || 1;

        // definir o limite de registros por página
        const limit = Number(req.query.limit) || 10;

        const result = await PaginationService.paginate(productCategoryRepository, page, limit, { id: "DESC" });


        // Retornar a resposta com os dados e informações da paginação
        res.status(200).json(result);
        return

    }catch(error){         
        res.status(500).json({
            mensagem: "Erro ao listar categoria de produto",
            
        });
        return
    }
});

//Criar a VIEW do item cadastrado em categoria de produto
router.get("/product-categories/:id", async(req: Request, res: Response)=> {
    try{

        const {id} = req.params;

        const productCategoryRepository = AppDataSource.getRepository(ProductCategory);
        
        const productCategory = await productCategoryRepository.findOneBy({ id : parseInt(id as string) });

        if(!productCategory){
            res.status(404).json({
                mensagem: "Categoria de produto não encontrada",
            });
            return;
        }

        res.status(200).json(productCategory);
        return

    }catch(error){         
        res.status(500).json({
            mensagem: "Erro ao visualizar a categoria de produto",
            
        });
        return
    }
});


//Cadastra o item em categoria de produto
router.post("/product-categories", async(req: Request, res: Response)=> {
    
    try{
        var data = req.body;
        
        const productCategoryRepository = AppDataSource.getRepository(ProductCategory); 
        
        const newProductCategory = productCategoryRepository.create(data);

        await productCategoryRepository.save(newProductCategory);

        res.status(201).json({
            mensagem: "Categoria de produto cadastrada com sucesso",
            productCategory: newProductCategory,
        });
        
        
    }catch(error){

         console.error(error);
        
        res.status(500).json({
            mensagem: "Erro ao cadastrar categoria de produto",
            
        });


    }
});

//Fazer a EDIT do item cadastrado em categoria de produto
router.put("/product-categories/:id", async(req: Request, res: Response)=> {
    try{

        const {id} = req.params;

        var data = req.body;

        const productCategoryRepository = AppDataSource.getRepository(ProductCategory);
        
        const productCategory = await productCategoryRepository.findOneBy({ id : parseInt(id as string) });

        if(!productCategory){
            res.status(404).json({
                mensagem: "Categoria de produto não encontrada",
            });
            return;
        }
        //Atualiza od dados
        productCategoryRepository.merge(productCategory, data);
        //Salva as alterações no banco de dados
        const updatedProductCategory = await productCategoryRepository.save(productCategory);



        res.status(200).json({
            mensagem: "Categoria de produto atualizada com sucesso",
            productCategory: updatedProductCategory,
        });

    }catch(error){         
        res.status(500).json({
            mensagem: "Erro ao atualizar a categoria de produto",
            
        });
        return
    }
});

//Deletar o item cadastrado em categoria de produto
router.delete("/product-categories/:id", async(req: Request, res: Response)=> {
    try{

        const {id} = req.params;

        const productCategoryRepository = AppDataSource.getRepository(ProductCategory);
        
        const productCategory = await productCategoryRepository.findOneBy({ id : parseInt(id as string) });

        if(!productCategory){
            res.status(404).json({
                mensagem: "Categoria de produto não encontrada",
            });
            return;
        }
        //Exclui o item
        await productCategoryRepository.remove(productCategory);
    
        res.status(200).json({
            mensagem: "Categoria de produto excluída com sucesso",
        });

    }catch(error){         
        res.status(500).json({
            mensagem: "Erro ao atualizar a categoria de produto",
            
        });
        return
    }
});

//Exportar a instrução da rota

export default router;