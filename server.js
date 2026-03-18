import Fastify from 'fastify';
import { Pool } from 'pg';
import cors from '@fastify/cors';

const servidor = Fastify();

servidor.register(cors, {
    origin: '*'
});

servidor.post('/login', async (request, reply) => {
    const body = request.body;
    if (!body || !body.email || !body.senha) {
        return reply.status(400).send({ erro: 'Email e senha são obrigatórios' });
    }
    const resultado = await sql.query('SELECT * FROM usuario WHERE email = $1 AND senha = $2', [body.email, body.senha])

    if (resultado.rows.length === 0) {
        return reply.status(401).send({ message: "Usuário ou senha inválidos", login: false })
    } else if (resultado.rows.length === 1) {
        reply.status(200).send({ message: "Usuário logado", login: true })
    }
})

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

    if (!body || !body.nome || !body.senha || !body.email) {
        return reply.status(400).send({ message: 'Nome, senha e email são obrigatórios' });
    }


    const resultado = await sql.query(
        'INSERT INTO usuario (nome, senha, email) VALUES ($1, $2, $3)',
        [body.nome, body.senha, body.email]
    )

    reply.status(201).send({ message: "usuario criado" })
})

servidor.put('/usuarios/:id', async (request, reply) => {
    const body = request.body
    const id = request.params.id

    if (!body || !body.nome || !body.senha || !body.email) {
        return reply.status(400).send({ message: 'Nome, senha e email são obrigatórios' });
    } else if (!id) {
        return reply.status(400).send({ message: 'id é obrigatório' })
    }

    const usuario = await sql.query('select * from usuario where id = $1', [id])
    if (usuario.rows.length === 0) {
        return reply.status(400).send({ message: 'Usuario não existe' })
    }

    const resultado = await sql.query('UPDATE usuario SET nome = $1, senha = $2, email = $3 WHERE id = $4', [body.nome, body.senha, body.email, id])

    reply.status(201).send({ message: `usuario ${body.nome} atualizado` })

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