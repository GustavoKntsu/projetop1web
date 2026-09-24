import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateProductsTable1790281156850 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "products",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "name",
                    type: "varchar",
                },
                {
                    name: "productSituationId",
                    type: "int",

                },
                {
                    name: "productCategoryId",
                    type: "int",

                },
                {
                    name: "createdAt",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP"
                },
                {
                    name: "updatedAt",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP",
                    onUpdate: "CURRENT_TIMESTAMP"
                }
            ]
        }))

        //Criação da chave estrangeira de situação

        await queryRunner.createForeignKey(
            "products",
            new TableForeignKey({
                columnNames: ["productSituationId"], 
                referencedColumnNames: ["id"],
                referencedTableName: "product_situations", 
                onDelete: "CASCADE", 
            })
        )

        //Criação da chave estrangeira de categoria

        await queryRunner.createForeignKey(
            "products",
            new TableForeignKey({
                columnNames: ["productCategoryId"], 
                referencedColumnNames: ["id"],
                referencedTableName: "product_categories", 
                onDelete: "CASCADE", 
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("products");

        const situationFk = table?.foreignKeys.find((fk)=>fk.columnNames.includes("productSituationId"));
        if (situationFk) {
            await queryRunner.dropForeignKey("products", situationFk);
        }

        const categoryFk = table?.foreignKeys.find((fk)=>fk.columnNames.includes("productCategoryId"));
        if (categoryFk) {
            await queryRunner.dropForeignKey("products", categoryFk);
        }

        await queryRunner.dropTable("products");
    }

}