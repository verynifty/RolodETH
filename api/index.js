const express = require('express');
const app = express();
const port = 3000;

const RolodETH = new (require("../RolodETH"))("../db_test/", 1);


app.get('/address/:address', (req, res) => {
    let address = RolodETH.normalizeAddress(req.params.address);
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`RolodETH is listening on port ${port}`);
})

module.exports = app;