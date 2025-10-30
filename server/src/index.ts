import { PORT } from './config';
import { arqueoRoute } from './routes/arqueo.routes';
import { loginRouter } from './routes/users.routes';

import express from 'express';
import log from 'morgan';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());
app.use(log('dev'));

app.use(arqueoRoute);
app.use('/', loginRouter );

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

