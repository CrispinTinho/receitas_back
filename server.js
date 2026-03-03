import Fastify from 'fastify';
import { Pool }  from 'pg';

const sql = new Pool({
    user: "postgres",
    password: "senai",
    host: "localhost",
    port: 5432,
    database: "receitas"
})

const servidor = Fastify();

servidor.get('/usuarios', () => {
    return 'Funcionando!'
})

servidor.post('/usuarios', async (request, reply) => {
    const body = request.body;

    const resultado = await sql.query('select * from usuarios')

    return "usuario Cadasrtado"
})

servidor.listen({ 
    port: 3000
})