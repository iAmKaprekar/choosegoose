const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

require('dotenv').config({ path: path.resolve(__dirname, './.env') })

const cookieParser = require('cookie-parser');

const { datedLog } = require('./dateHandler')

const authRouter = require('./routers/authRouter');
const listRouter = require('./routers/listRouter');

app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV === 'production') {
  app.get('/', (_, res) => {
    res.status(200).sendFile(path.resolve(__dirname, '../client/index.html'));
  })
}

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
  console.log(datedLog(errorObj.log));
  return res.status(errorObj.status).json(errorObj.message);
})

app.listen(PORT, () => {
  const date = new Date();
  console.log(datedLog(`ChooseGoose server listening on port ${PORT}...`))
});