const express = require('express');

const app = express();
const port = process.env.PORT || 4000;

app.get(/js|css|img/, (req, res) => {
  res.sendFile(`${__dirname}/${req.path}`);
});

app.get(/\//, (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});
console.log(process.env.VUE_APP_BASE_API);
app.listen(port);