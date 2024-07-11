import cors from 'cors'

import express from 'express'
const app = express()

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

app.use(express.json())
app.use(cors())

app.post('/usuarios',async (req,res) =>{

    await prisma.user.create({
        data:{
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.status(201).json(req.body)
})

app.get('/usuarios',async (req,res) =>{
    let users = []
    if (req.query){
        users = await prisma.user.findMany({
            where: {
                name: req.query.name,
                email: req.query.email,
                age: req.query.age
            }
        })
    }else{
        const users = await prisma.user.findMany()
    }


    res.status(200).json(users)
})

app.put('/usuarios/:id',async (req,res) =>{

    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data:{
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })
    res.status(201).json(req.body)
})

app.delete('/usuarios/:id',async (req,res) =>{
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })
    res.status(202).json({message: "Usuário deletado com sucesso!"})
})

app.listen(3000)



// mongodb+srv://JORGE:IEqxMsbpp3zmL6k6@users.eex4ctv.mongodb.net/
/*CRIAR UMA API DE USUÁRIOS:
    -CRIAR USERS
    -LISTAR TODOS
    -EDITAR
    -REMOVER

    user: JORGE
    SENHA: IEqxMsbpp3zmL6k6
*/