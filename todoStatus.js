const TODO = 'todo';
const DOING = 'doing';
const DONE = 'done';

const toggle = {
  [TODO]: DOING,
  [DOING]: DONE,
  [DONE]: TODO,
};

const getNextStatus = (state) => toggle[state];
const getDefaultStatus = () => TODO;

module.exports = {getNextStatus, getDefaultStatus};
