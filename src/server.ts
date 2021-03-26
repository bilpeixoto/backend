import express from 'express'
import {v4 as uuid} from 'uuid'

const app = express()
app.use(express.json())

interface User {
    id: string
    name: string,
    email: string
}

const users:User[] = []

app.get('/users', (request, response) => {
    return response.status(200).json(users)
})
 
app.post('/users', (request, response) => {
    const user:User = {
        id: uuid(),
        name: request.body.name,
        email: request.body.email
    }
    users.push(user)
    const indexUser = users.indexOf(user)
    if(indexUser < 0) {
        return response.status(500)
    } else {
        return response.status(201).json(users[indexUser])
    }
}) 

app.put('/users/:id', (request, response) => {
    const { id } = request.params
    const user:User = {
        id: id,
        name: request.body.name,
        email: request.body.email
    }

    const indexUser = users.findIndex(user =>  user.id === id )
    
    if(indexUser < 0) {
        return response.status(404).json('User not found')
    } else {
        users[indexUser] = user
        return response.status(201).json(users[indexUser])
    }    
})

app.delete('/users/:id', (request, response) => {
    const { id } = request.params

    const indexUser = users.findIndex(user => user.id === id )
    
    if(indexUser < 0) {
        return response.status(404).json('User not found')
    } else {
        users.splice(indexUser, 1)
        return response.status(201).json(`User ${id} deleted`)
    } 
})

app.listen('3333', () => {
    console.log('Back-end Started!')
})