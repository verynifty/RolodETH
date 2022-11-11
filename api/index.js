const express = require('express');
const app = express();
const port = 3000;

const RolodETH = new (require("../RolodETH"))("../data/", 1);


app.get('/address/:address', (req, res) => {
    res.json(RolodETH.get(req.params.address))
})

app.listen(port, () => {
    console.log(`RolodETH is listening on port ${port}`);
})

module.exports = app;