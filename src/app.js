const express = require('express');
const app = express();
const redis = require('redis');
let redisClient;
if (process.env.REDISCLOUD_URL) {
  redisClient = redis.createClient(process.env.REDISCLOUD_URL, {
    no_ready_check: true,
  });
} else {
  redisClient = redis.createClient();
}
const Database = require('./database');
const db = new Database(redisClient);
app.locals.db = db;

const {
  attachTodoDetails,
  addTask,
  removeTask,
  updateTitle,
  updateStatus,
  resetTodoDetails,
  getTodoDetails,
} = require('./handler');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.use((req, res, next) => {
  console.log(req.url);
  next();
});

app.use(attachTodoDetails);
app.get('/api/getTodoDetails', getTodoDetails);
app.post('/api/addTask', addTask);
app.post('/api/removeTask', removeTask);
app.post('/api/updateStatus', updateStatus);
app.post('/api/updateTitle', updateTitle);
app.post('/api/resetTodoDetails', resetTodoDetails);

module.exports = {app};
