const datedLog = (str) => {
  const date = new Date();
  let dateString = `${
    date.getFullYear()
  }-${
    date.getMonth() >= 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
  }-${
    date.getDate() >= 10 ? date.getDate() : '0' + date.getDate()
  } @ ${
    date.getHours() >= 10 ? date.getHours() : '0' + date.getHours()
  }:${
    date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes()
  }:${
    date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds()
  } -- ${str}`;
  console.log(dateString);
  return dateString;
}

const routeLog = (str, next) => {
  datedLog(str);
  next();
}

module.exports = {datedLog, routeLog};