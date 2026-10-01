import { DataSource } from "typeorm";
import { ProductCategory } from "../entity/ProductCategories";

export default class CreateProductCategoriesSeeds {
    public async run (dataSource: DataSource): Promise<void> {
        console.log("Iniciando a seed para a tabela 'product_categories'...");

        const productCategoriesRepository = dataSource.getRepository(ProductCategory);

        const existingCount = await productCategoriesRepository.count();

        if (existingCount > 0){
             console.log("A tabela 'product_categories' já possui dados. Nenhuma seed será executada.");
             return; 
        }

        const productCategoriesData = [
            { name: "Periféricos" },
            { name: "Processadores" },
            { name: "Placas de Vídeo" },
        ];

        await productCategoriesRepository.save(productCategoriesData);

        console.log("Seed para a tabela 'product_categories' cadastrada com sucesso!");


    }
}