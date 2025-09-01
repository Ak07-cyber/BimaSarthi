import express from 'express';
import cors from 'cors';
import multer from 'multer';
import 'dotenv/config';
import { recommendPolicy } from './controllers/recommendationController';
import { explainDocument } from './controllers/explainerController';

const app = express();
const port = process.env.PORT || 5000;

const upload = multer({ dest: 'src/uploads/' });

app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') || '*'}));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from BimaSarthi Backend!');
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: Date.now() });
});

app.post('/api/recommend', recommendPolicy);
app.post('/api/explain', upload.single('document'), explainDocument);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
  console.log("server is online");
});
