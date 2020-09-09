const {getDefaultStatus, getNextStatus} = require('./todoStatus');

const getDefaultTodoDetails = () => ({todoList: [], title: 'Todo', lastId: 0});

const attachTodoDetails = (req, res, next) => {
  req.app.locals.db
    .getTodoDetails()
    .then((todoDetails) => {
      req.app.locals.todoDetails = todoDetails || getDefaultTodoDetails();
    })
    .then(() => next())
    .catch(() => res.end(404));
};

const getTodoDetails = (req, res) => {
  res.json(JSON.stringify(req.app.locals.todoDetails));
};

const addTask = (req, res) => {
  const {todoDetails, db} = req.app.locals;
  todoDetails.todoList.push({
    task: req.body.task,
    id: todoDetails.lastId++,
    status: getDefaultStatus(),
  });
  db.setTodoDetails(todoDetails)
    .then(() => res.end())
    .catch(() => res.end(404));
};

const removeTask = (req, res) => {
  const {todoDetails, db} = req.app.locals;
  todoDetails.todoList = todoDetails.todoList.filter(
    (todo) => todo.id !== req.body.id
  );
  db.setTodoDetails(todoDetails)
    .then(() => res.end())
    .catch(() => res.end(404));
};

const resetTodoDetails = (req, res) => {
  const {db} = req.app.locals;
  const todoDetails = getDefaultTodoDetails();
  db.setTodoDetails(todoDetails)
    .then(() => res.end())
    .catch(() => res.end(404));
};

const updateStatus = (req, res) => {
  const {todoDetails, db} = req.app.locals;
  const newTodoList = todoDetails.todoList.map((task) => ({...task}));
  const todo = newTodoList.find((task) => task.id === req.body.id);
  todo.status = getNextStatus(todo.status);
  todoDetails.todoList = newTodoList;
  db.setTodoDetails(todoDetails)
    .then(() => res.end())
    .catch(() => res.end(404));
};

const updateTitle = (req, res) => {
  const {todoDetails, db} = req.app.locals;
  todoDetails.title = req.body.title;
  db.setTodoDetails(todoDetails)
    .then(() => res.end())
    .catch(() => res.end(404));
};

module.exports = {
  attachTodoDetails,
  addTask,
  removeTask,
  updateTitle,
  updateStatus,
  resetTodoDetails,
  getTodoDetails,
};
