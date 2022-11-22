// Criando um arquivo único para conexão com o banco de dados

import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient({
    // Fazendo aparecer o log de cada query
    log: ['query'],
})