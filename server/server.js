const express = require('express');
const app = express();
const PORT = 3000;

const { datedLog } = require('./dateHandler')

const authRouter = require('./routers/authRouter');
const listRouter = require('./routers/listRouter');

app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/list', listRouter);

app.use('*', (_, res) => {
  res.status(404).send('Could not find requested resource in ChooseGoose.')
})

app.use((err, req, res, next) => {
  const defaultErr = {
    status: 500,
    message: {err: 'ChooseGoose server encountered unknown error.'},
    log: 'Unknown error occurred.'
  }
  const errorObj = Object.assign({}, defaultErr, err);
  const date = new Date();
  console.error(`${date}: ${errorObj.log}`);
  return res.status(errorObj.status).json(errorObj.message);
})

app.listen(() => {
  const date = new Date();
  console.log(datedLog(`ChooseGoose server listening on port ${PORT}...`))
});