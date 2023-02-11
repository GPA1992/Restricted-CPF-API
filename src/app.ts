import cors from 'cors';
import express from 'express';
import visitorRouter from './routes/visitors.routes';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (_request, response) => {
    return response.send(200);
});
app.use('/visitors', visitorRouter);

export default app;