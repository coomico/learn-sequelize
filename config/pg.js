import { Sequelize } from 'sequelize';

class PG {
  constructor(db, user, pass, host) {
    console.log("create connection");
    this.repo = new Sequelize(db, user, pass, {
      host: host,
      dialect: 'postgres',
      timezone: 'Asia/Jakarta',
      sync: {
        alter: true
      }
    })
  };

  async connect() {
    await this.repo.authenticate();
  };
};

export default new PG('learn-sequelize', 'postgres', '1rahasia2', 'localhost');