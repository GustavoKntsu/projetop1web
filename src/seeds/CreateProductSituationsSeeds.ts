import { DataSource } from "typeorm";
import { ProductSituation } from "../entity/ProductSituations";

export default class CreateProductSituationsSeeds {
    public async run (dataSource: DataSource): Promise<void> {
        console.log("Iniciando a seed para a tabela 'product_situations'...");

        const productSituationsRepository = dataSource.getRepository(ProductSituation);

        const existingCount = await productSituationsRepository.count();

        if (existingCount > 0){
             console.log("A tabela 'product_situations' já possui dados. Nenhuma seed será executada.");
             return; 
        }

        const productSituationsData = [
            { name: "Disponível" },
            { name: "Indisponível" },
            { name: "Em falta" },
        ];

        await productSituationsRepository.save(productSituationsData);

        console.log("Seed para a tabela 'product_situations' cadastrada com sucesso!");


    }
}