// import { Request, Response} from 'express'

// const bodyParser = require('body-parser')
// const express = require('express')
// const cors = require('cors')

// const port: number = 3000
// const app = express();
// app.use(cors())

// app.get('/', (req: Request, res: Response) => {
//     res.send('api is working')
// })

// app.post('signin', (req: Request, res: Response) => {

// })

// app.post('register', (req: Request, res: Response) => {

// })

// app.listen(port, () => {
//     console.log(`app is running on port ${port}`)
// })


import { Request, Response} from 'express'
const bcrypt = require('bcryptjs')

bcrypt
    .hash('kubabili', 10)
    .then((hash: string) => {
        console.log(hash)
        validateHash(hash);
    })

function validateHash(hash: string){
    bcrypt
        .compare('kubabili', hash)
        .then((res: boolean) => {
            if(res){
                console.log(true)
            }else{
                console.log(false)
            }
        })
        .catch((err: Error) => console.log(err.message))
}    