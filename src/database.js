class Database {
  constructor(db) {
    this.db = db;
  }

  getId() {
    return new Promise((resolve, reject) => {
      this.db.incr('id', (err, res) => {
        if (err) {
          return reject(err);
        }
        return resolve(res);
      });
    });
  }

  getTodoDetails() {
    return new Promise((resolve, reject) => {
      this.db.get('todoDetails', (err, res) => {
        if (err) {
          return reject(err);
        }
        return resolve(JSON.parse(res));
      });
    });
  }

  setTodoDetails(todoDetails) {
    return new Promise((resolve, reject) => {
      this.db.set('todoDetails', JSON.stringify(todoDetails), (err, res) => {
        if (err) {
          return reject(err);
        }
        return resolve(res);
      });
    });
  }
}

module.exports = Database;
