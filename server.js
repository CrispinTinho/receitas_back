import Fastify from 'fastify';
import { Pool }  from 'pg';

const servidor = Fastify();

const sql = new Pool({
    user: "postgres",
    password: "senai",
    host: "localhost",
    port: 5432,
    database: "receitas"
})

servidor.get('/usuarios', async () => {
    const resultado = await sql.query('select * from usuario') 
    return resultado.rows
})

servidor.post('/usuarios', async (request, reply) => {
    const body = request.body;

    const resultado = await sql.query('INSERT INTO usuario (nome, senha) VALUES ($1, $2)', [body.nome, body.senha])

    return "usuario Cadastrado"
})

servidor.listen({ 
    port: 3000
})