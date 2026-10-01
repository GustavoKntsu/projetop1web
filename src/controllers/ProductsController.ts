//Importar a biblioteca express
import express, {Request, Response} from "express";
import { AppDataSource } from "../data-source";
import { Product } from "../entity/Products";
import { PaginationService } from "../services/PaginationService";
//Importar a conexão com o banco de dados

//Criar uma instância do express
const router = express.Router();

//Criar a LISTA
router.get("/products", async(req: Request, res: Response)=> {
    try{

        //Obter o repositório da entidade Product
        const productRepository = AppDataSource.getRepository(Product);

        // Receber o número da página e definir página 1 como padrão
        const page = Number(req.query.page) || 1;

        // definir o limite de registros por página
        const limit = Number(req.query.limit) || 10;

        const result = await PaginationService.paginate(productRepository, page, limit, { id: "DESC" });


        // Retornar a resposta com os dados e informações da paginação
        res.status(200).json(result);
        return

    }catch(error){         
        res.status(500).json({
            mensagem: "Erro ao listar produto",
            
        });
        return
    }
});

//Criar a VIEW do item cadastrado em produto
router.get("/products/:id", async(req: Request, res: Response)=> {
    try{

        const {id} = req.params;

        const productRepository = AppDataSource.getRepository(Product);
        
        const product = await productRepository.findOneBy({ id : parseInt(id as string) });

        if(!product){
            res.status(404).json({
                mensagem: "Produto não encontrado",
            });
            return;
        }

        res.status(200).json(product);
        return

    }catch(error){         
        res.status(500).json({
            mensagem: "Erro ao visualizar o produto",
            
        });
        return
    }
});


//Cadastra o item em produto
router.post("/products", async(req: Request, res: Response)=> {
    
    try{
        var data = req.body;
        
        const productRepository = AppDataSource.getRepository(Product); 
        
        const newProduct = productRepository.create(data);

        await productRepository.save(newProduct);

        res.status(201).json({
            mensagem: "Produto cadastrado com sucesso",
            product: newProduct,
        });
        
        
    }catch(error){
        
        res.status(500).json({
            mensagem: "Erro ao cadastrar produto",
            
        });


    }
});

//Fazer a EDIT do item cadastrado em produto
router.put("/products/:id", async(req: Request, res: Response)=> {
    try{

        const {id} = req.params;

        var data = req.body;

        const productRepository = AppDataSource.getRepository(Product);
        
        const product = await productRepository.findOneBy({ id : parseInt(id as string) });

        if(!product){
            res.status(404).json({
                mensagem: "Produto não encontrado",
            });
            return;
        }
        //Atualiza od dados
        productRepository.merge(product, data);
        //Salva as alterações no banco de dados
        const updatedProduct = await productRepository.save(product);



        res.status(200).json({
            mensagem: "Produto atualizado com sucesso",
            product: updatedProduct,
        });

    }catch(error){         
        res.status(500).json({
            mensagem: "Erro ao atualizar o produto",
            
        });
        return
    }
});

//Deletar o item cadastrado em produto
router.delete("/products/:id", async(req: Request, res: Response)=> {
    try{

        const {id} = req.params;

        const productRepository = AppDataSource.getRepository(Product);
        
        const product = await productRepository.findOneBy({ id : parseInt(id as string) });

        if(!product){
            res.status(404).json({
                mensagem: "Produto não encontrado",
            });
            return;
        }
        //Exclui o item
        await productRepository.remove(product);
    
        res.status(200).json({
            mensagem: "Produto excluído com sucesso",
        });

    }catch(error){         
        res.status(500).json({
            mensagem: "Erro ao atualizar o produto",
            
        });
        return
    }
});

//Exportar a instrução da rota

export default router;