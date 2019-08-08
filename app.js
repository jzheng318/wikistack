const morgan = require('morgan');
const express = require('express');
const app = express();
const staticMiddleware = express.static('public');
const index = require('./views/index');
const bodyParser = require('body-parser');
const models = require('./models');
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(staticMiddleware);
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
  res.send(index.main(''));
});

models.db.authenticate().then(() => {
  console.log('connected to the database');
});

const init = async () => {
  await models.db.sync({ force: true });
  app.listen(PORT, () => {
    console.log(`App listening in ${PORT}`);
  });
};

init();
