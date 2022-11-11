const express = require('express');
const app = express();
const port = 3000;

const RolodETH = new (require("../RolodETH"))(process.cwd() + "/data", 1);

console.log(process.cwd())
app.get('/address/:address', (req, res) => {
    //res.send(process.cwd())
    res.json(RolodETH.get(req.params.address))
})

app.listen(port, () => {
    console.log(`RolodETH is listening on port ${port}`);
})

module.exports = app;