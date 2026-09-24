import { DataSource } from "typeorm";
import { User } from "../entity/Users";
import { Situation } from "../entity/Situations";

export default class CreateUsersSeeds {
    public async run (dataSource: DataSource): Promise<void> {
        console.log("Iniciando a seed para a tabela 'users'...");

        const usersRepository = dataSource.getRepository(User);
        const situationsRepository = dataSource.getRepository(Situation);

        const existingCount = await usersRepository.count();

        if (existingCount > 0){
             console.log("A tabela 'users' já possui dados. Nenhuma seed será executada.");
             return; 
        }

        //Busca uma situation existente para vincular aos usuários
        const situationAtivo = await situationsRepository.findOneBy({ nameSituation: "Ativo" });

        if (!situationAtivo){
            console.log("Nenhuma situation 'Ativo' encontrada. Rode a seed de situations antes.");
            return;
        }

        const usersData = [
            { name: "Gustavo", email: "gustavo@teste.com", situation: situationAtivo },
            { name: "Maria", email: "maria@teste.com", situation: situationAtivo },
            { name: "João", email: "joao@teste.com", situation: situationAtivo },
        ];

        await usersRepository.save(usersData);

        console.log("Seed para a tabela 'users' cadastrada com sucesso!");


    }
}