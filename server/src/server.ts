// Import do fastify
import Fastify from "fastify";
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';

// Rotas
import { poolRoutes } from './routes/pool';
import { authRoutes } from "./routes/auth";
import { gameRoutes } from "./routes/game";
import { guessRoutes } from "./routes/guess";
import { userRoutes } from "./routes/user";

// Singleton -> É um conceito de reaproveitamento de algo entre os arquivos


async function bootstrap() {
    // Criando o servidor com fastify
    const fastify = Fastify({
        // logger serve para monitorar os logs da aplicação
        logger: true,
    })

    await fastify.register(cors, {
        // O true vai liberar QUALQUER dominio acessar o back-end. 
        // Em produção é necessário por o domínio que vai acessar
        origin: true,
    })

    // Configurando o JWT de autenticação
    // O secret, em produção, precisa ser uma variável de ambiente
    await fastify.register(jwt, {
        secret: 'nlwcopa',
    })

    // Chamando uma rota -> Utilizar o await pois as funções de rota são async
    await fastify.register(authRoutes)
    await fastify.register(gameRoutes)
    await fastify.register(guessRoutes)
    await fastify.register(poolRoutes)
    await fastify.register(userRoutes)

    // Aguardando as requisições na porta 3333
    await fastify.listen({ port: 3333 })
}

// Inicializando a função
bootstrap() 