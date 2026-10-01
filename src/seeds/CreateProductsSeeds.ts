import { DataSource } from "typeorm";
import { Product } from "../entity/Products";
import { ProductCategory } from "../entity/ProductCategories";
import { ProductSituation } from "../entity/ProductSituations";

export default class CreateProductsSeeds {
    public async run (dataSource: DataSource): Promise<void> {
        console.log("Iniciando a seed para a tabela 'products'...");

        const productsRepository = dataSource.getRepository(Product);
        const productCategoriesRepository = dataSource.getRepository(ProductCategory);
        const productSituationsRepository = dataSource.getRepository(ProductSituation);

        const existingCount = await productsRepository.count();

        if (existingCount > 0){
             console.log("A tabela 'products' já possui dados. Nenhuma seed será executada.");
             return; 
        }

        //Busca uma categoria e uma situação existentes para vincular aos produtos
        const categoria = await productCategoriesRepository.findOneBy({ name: "Periféricos" });
        const situacao = await productSituationsRepository.findOneBy({ name: "Disponível" });

        if (!categoria || !situacao){
            console.log("Categoria ou situação não encontrada. Rode as seeds de product_categories e product_situations antes.");
            return;
        }

        const productsData = [
            { name: "Mouse Gamer", category: categoria, situation: situacao },
            { name: "Teclado Mecânico", category: categoria, situation: situacao },
        ];

        await productsRepository.save(productsData);

        console.log("Seed para a tabela 'products' cadastrada com sucesso!");


    }
}