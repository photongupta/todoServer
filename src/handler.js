const {getDefaultStatus, getNextStatus} = require('./todoStatus');

const getDefaultTodoDetails = () => ({todoList: [], title: 'Todo'});

const attachTodoDetails = (req, res, next) => {
  req.app.locals.db
    .getTodoDetails()
    .then((todoDetails) => {
      req.app.locals.todoDetails = todoDetails || getDefaultTodoDetails();
    })
    .then(next);
};

const getTodoDetails = (req, res) => {
  res.json(req.app.locals.todoDetails);
};

const addTask = (req, res) => {
  const {todoDetails, db} = req.app.locals;
  const {task} = req.body;
  db.getId().then((id) => {
    todoDetails.todoList.push({task, id, status: getDefaultStatus()});
    db.setTodoDetails(todoDetails).then(res.end);
  });
};

const removeTask = (req, res) => {
  const {todoDetails, db} = req.app.locals;
  todoDetails.todoList = todoDetails.todoList.filter(
    (todo) => todo.id !== req.body.id
  );
  db.setTodoDetails(todoDetails).then(res.end);
};

const resetTodoDetails = (req, res) => {
  const {db} = req.app.locals;
  const todoDetails = getDefaultTodoDetails();
  db.setTodoDetails(todoDetails).then(res.end);
};

const updateStatus = (req, res) => {
  const {todoDetails, db} = req.app.locals;
  const newTodoList = todoDetails.todoList.map((task) => ({...task}));
  const todo = newTodoList.find((task) => task.id === req.body.id);
  todo.status = getNextStatus(todo.status);
  todoDetails.todoList = newTodoList;
  db.setTodoDetails(todoDetails).then(res.end);
};

const updateTitle = (req, res) => {
  const {todoDetails, db} = req.app.locals;
  todoDetails.title = req.body.title;
  db.setTodoDetails(todoDetails).then(res.end);
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
