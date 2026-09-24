import { AppDataSource } from "./data-source";
import CreateSituationsSeeds from "./seeds/CreateSituationsSeeds";
import CreateUsersSeeds from "./seeds/CreateUsersSeeds";

const runSeeds = async () => {
    console.log("Conectando ao banco de dados...");

    await AppDataSource.initialize();
    console.log("Conexão com o banco de dados estabelecida com sucesso!");

    try{
         // Cria a instância da classe de seeds
        const situationsSeeds = new CreateSituationsSeeds();

        //Executa o método run da classe de seeds
        await situationsSeeds.run(AppDataSource);

        // Cria a instância da classe de seeds de users
        const usersSeeds = new CreateUsersSeeds();

        //Executa o método run da classe de seeds
        await usersSeeds.run(AppDataSource);


    }catch(error){
        
        console.log("Ocorreu um erro ao executar as seeds:", error);

    }finally{

        await AppDataSource.destroy();
        console.log("Conexão com o banco de dados encerrada.");

    }

}

runSeeds();