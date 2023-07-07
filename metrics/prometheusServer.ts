import express from 'express';
import { register } from 'prom-client';
import cors from 'cors';


const app = express();
const PORT = 3500;

app.use(cors())
app.use('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  const metrics = await register.getMetricsAsJSON();
  res.header('Access-Control-Allow-Origin', '*');
  res.json(metrics);
});

export default  function startServer(): void {
  app.listen(PORT, () => console.log(`Prometheus metrics server listening on ${PORT}`));
}




