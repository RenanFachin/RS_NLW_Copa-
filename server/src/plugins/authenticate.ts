import { FastifyRequest } from "fastify"


export async function authenticate(request: FastifyRequest) {
    // retornando informações do usuário a partir de um jwt
    // Método jwtVerify
    
    await request.jwtVerify()
}