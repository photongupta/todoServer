const express = require('express');
const Database = require('./database');
const {getRedisClient} = require('./redisClient');
const {
  attachTodoDetails,
  addTask,
  removeTask,
  updateTitle,
  updateStatus,
  resetTodoDetails,
  getTodoDetails,
} = require('./handler');

const app = express();
const redisClient = getRedisClient();
const db = new Database(redisClient);
app.locals.db = db;

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
