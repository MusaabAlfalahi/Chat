const express = require('express');
const cors = require('cors');
require('dotenv').config();
const Pusher = require("pusher");

const pusher = new Pusher({
  appId: process.env.APPID,
  key: process.env.KEY,
  secret: process.env.SECRET,
  cluster: process.env.CLUSTER,
  useTLS: true
});

const app = express();

app.use(cors({
  origin: ['http://localhost:5173']
}));
app.use(express.json());

app.post('/api/messages', async (req, res) => {
  await pusher.trigger("chat", "message", {
    username: req.body.username,
    message: req.body.message
  });

  res.json([]);
})

app.listen(process.env.PORT);