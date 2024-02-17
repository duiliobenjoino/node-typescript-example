
import { AppDataSource } from './infra/typeorm/datasource';
import { app } from "./app";

const PORT = process.env.PORT || 3001
const DATABASE_NAME = process.env.DATABASE_NAME || "crud_example"

AppDataSource
    .initialize()
    .then(async () => {
        console.log('Connection database OK', DATABASE_NAME);
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        })
    })
    .catch(err => console.error('Erro ao subir servidor', err));



