//Importar a biblioteca express
import express, {Request, Response} from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/Users";
import { PaginationService } from "../services/PaginationService";
//Importar a conexão com o banco de dados

//Criar uma instância do express
const router = express.Router();

//Criar a LISTA
router.get("/users", async(req: Request, res: Response)=> {
    try{

        //Obter o repositório da entidade User
        const userRepository = AppDataSource.getRepository(User);

        // Receber o número da página e definir página 1 como padrão
        const page = Number(req.query.page) || 1;

        // definir o limite de registros por página
        const limit = Number(req.query.limit) || 10;

        const result = await PaginationService.paginate(userRepository, page, limit, { id: "DESC" });


        // Retornar a resposta com os dados e informações da paginação
        res.status(200).json(result);
        return

    }catch(error){         
        res.status(500).json({
            menssagem: "Erro ao listar usuário",
            
        });
        return
    }
});

//Criar a VIEW do item cadastrado em usuário
router.get("/users/:id", async(req: Request, res: Response)=> {
    try{

        const {id} = req.params;

        const userRepository = AppDataSource.getRepository(User);
        
        const user = await userRepository.findOneBy({ id : parseInt(id as string) });

        if(!user){
            res.status(404).json({
                menssagem: "Usuário não encontrado",
            });
            return;
        }

        res.status(200).json(user);
        return

    }catch(error){         
        res.status(500).json({
            menssagem: "Erro ao visualizar o usuário",
            
        });
        return
    }
});


//Cadastra o item em usuário
router.post("/users", async(req: Request, res: Response)=> {
    
    try{
        var data = req.body;
        
        const userRepository = AppDataSource.getRepository(User); 
        
        const newUser = userRepository.create(data);

        await userRepository.save(newUser);

        res.status(201).json({
            menssagem: "Usuário cadastrado com sucesso",
            user: newUser,
        });
        
        
    }catch(error){
        
        res.status(500).json({
            menssagem: "Erro ao cadastrar usuário",
            
        });


    }
});

//Fazer a EDIT do item cadastrado em usuário
router.put("/users/:id", async(req: Request, res: Response)=> {
    try{

        const {id} = req.params;

        var data = req.body;

        const userRepository = AppDataSource.getRepository(User);
        
        const user = await userRepository.findOneBy({ id : parseInt(id as string) });

        if(!user){
            res.status(404).json({
                menssagem: "Usuário não encontrado",
            });
            return;
        }
        //Atualiza od dados
        userRepository.merge(user, data);
        //Salva as alterações no banco de dados
        const updatedUser = await userRepository.save(user);



        res.status(200).json({
            menssagem: "Usuário atualizado com sucesso",
            user: updatedUser,
        });

    }catch(error){         
        res.status(500).json({
            menssagem: "Erro ao atualizar o usuário",
            
        });
        return
    }
});

//Deletar o item cadastrado em usuário
router.delete("/users/:id", async(req: Request, res: Response)=> {
    try{

        const {id} = req.params;

        const userRepository = AppDataSource.getRepository(User);
        
        const user = await userRepository.findOneBy({ id : parseInt(id as string) });

        if(!user){
            res.status(404).json({
                menssagem: "Usuário não encontrado",
            });
            return;
        }
        //Exclui o item
        await userRepository.remove(user);
    
        res.status(200).json({
            menssagem: "Usuário excluído com sucesso",
        });

    }catch(error){         
        res.status(500).json({
            menssagem: "Erro ao excluir o usuário",
            
        });
        return
    }
});

//Exportar a instrução da rota

export default router;