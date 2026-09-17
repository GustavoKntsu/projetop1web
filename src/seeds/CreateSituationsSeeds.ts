import { DataSource } from "typeorm";
import { Situation } from "../entity/Situations";

export default class CreateSituationsSeeds {
    public async run (dataSource: DataSource): Promise<void> {
        console.log("Iniciando a seed para a tabela 'situations'...");

        const situationsRepository = dataSource.getRepository(Situation);

        const existingCount = await situationsRepository.count();

        if (existingCount > 0){
             console.log("A tabela 'situations' já possui dados. Nenhuma seed será executada.");
             return; 
        }

        const situationsData = [
            { nameSituation: "Ativo" },
            { nameSituation: "Inativo" },
            { nameSituation: "Pendente" },
        ];

        await situationsRepository.save(situationsData);

        console.log("Seed para a tabela 'situations' cadastrada com sucesso!");


    }
}



