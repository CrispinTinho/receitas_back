import Fastify from 'fastify';
import { Pool } from 'pg';

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

    if (!body || !body.nome || !body.senha) {
        return reply.status(400).send({ message: 'Nome e senha são obrigatórios' });
    }


    const resultado = await sql.query('INSERT INTO usuario (nome, senha) VALUES ($1, $2)', [body.nome, body.senha])

    reply.status(201).send({ message: "usuario criado" })
})

servidor.put('/usuarios/:id', async (request, reply) => {
    const body = request.body
    const id = request.params.id

    if (!body || !body.nome || !body.senha) {
        return reply.status(400).send({ message: 'Nome e senha são obrigatórios' });
    } else if (!id) {
        return reply.status(400).send({ message: 'id é obrigatório' })
    }

    const usuario = await sql.query('select * from usuario where id = $1', [id])
     if(usuario.rows.length === 0){
        return reply.status(400).send({ message: 'Usuario não existe' })
     }
    
    const resultado = await sql.query('UPDATE usuario SET nome = $1, senha = $2 WHERE id = $3', [body.nome, body.senha, id])

    reply.status(201).send({ message: "usuario atualizado" })

})

servidor.delete('/usuarios/:id', async (request, reply) => {
    const id = request.params.id

    if (!id) {
        return reply.status(400).send({ message: 'ID é obrigatório para deletar o usuário' });
    }

    const resultado = await sql.query('DELETE FROM usuario WHERE id = $1', [id])
    console.log(resultado);


    reply.status(200).send({ message: 'usuario deletado' })
})

servidor.listen({
    port: 3000
})