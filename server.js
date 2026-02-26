import Fastify from 'fastify';

const servidor = Fastify();

servidor.get('/usuarios', () => {
    return 'Funcionando!'
})

servidor.listen({ 
    port: 3000
})