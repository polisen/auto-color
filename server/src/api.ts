import express, {Request, Response} from 'express';

export const app = express()



app.use( express.json())

import cors from 'cors';
app.use( cors({origin: true}))

app.post('/test', (req: Request, res: Response) => {

    // const colorString: string[] = req.body.amount;

    res.status(200).send({})
})