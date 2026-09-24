import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { ProductCategory } from "./ProductCategories";
import { ProductSituation } from "./ProductSituations";

@Entity("products")
export class Product {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @ManyToOne(() => ProductSituation, (situation) => situation.products)
    @JoinColumn({name: "productSituationId"})
    situation!: ProductSituation;

    @ManyToOne(() => ProductCategory, (category) => category.products)
    @JoinColumn({name: "productCategoryId"})
    category!: ProductCategory;

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    createdAt!: Date;

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP"})
    updatedAt!: Date;
}