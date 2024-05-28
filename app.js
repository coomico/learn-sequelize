import express from 'express';
import http from 'http';
import PG from './config/pg.js';
import Associate from './config/associate.js';
import ClassRouter from './routes/class.route.js';
import StudentRouter from './routes/student.route.js';
import InnovationRouter from './routes/innovation.route.js';

const app = express();
const httpServer = http.createServer(app);

app.use(express.json());

app.use("/student", StudentRouter);
app.use("/class", ClassRouter);
app.use("/innovation", InnovationRouter);

// test connection
app.get("/ping", (req, res) => {
  res.json({ping: "pong"});
})

const port = 3002;
httpServer.listen(port, async () => {
  Associate.init();
  await PG.repo.sync();
  console.log(`running on port: ${port}`);
});