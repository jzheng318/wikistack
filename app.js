const morgan = require('morgan');
const express = require('express');
const app = express();
const staticMiddleware = express.static('public');
const index = require('./views/index');
const bodyParser = require('body-parser');
const models = require('./models');
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(staticMiddleware);
app.use(morgan('dev'));
app.use(express.json());
// app.use('/', wikiRouter);

app.get('/', (req, res) => {
  res.send(index.main(''));
});

//whenever you use 'use', you'll attach any of the router paths to the end of the path specified in your use statement
app.use('/wiki', wikiRouter);
app.use('/user', userRouter);

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
