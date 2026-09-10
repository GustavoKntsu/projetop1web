import "reflect-metadata";
import { DataSource } from "typeorm";
import { Situation } from "./entity/Situations";
import { User } from "./entity/Users";

//Importar as variaveis de ambiente
import dotenv from "dotenv";
//Carregar as variáveis .env
dotenv.config();


    const dialect = process.env.DB_DIALECT ?? "postgres";
export const AppDataSource = new DataSource({
    type: dialect as "postgres" | "mysql" | "mariadb" | "mongodb",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: false,
    logging: true,
    entities: [Situation, User],
    subscribers: [],
    migrations: [__dirname + "/migration/*.js"],
});

////Iniciar a conexão com o banco de dados

AppDataSource.initialize().then(() =>{
    console.log("Conexão com o banco de dados estabelecida com sucesso!");
}).catch((error) => {
    console.error("Erro ao conectar com o banco de dados:", error);
});
