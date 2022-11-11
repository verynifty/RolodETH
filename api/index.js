const express = require('express');
const app = express();
const port = 3000;

const fs = require('fs');

const RolodETH = new (require("../RolodETH"))(process.cwd() + "/data", 1);

console.log(process.cwd())
app.get('/address/:address', (req, res) => {
    //res.send(process.cwd())
    res.json(RolodETH.get(req.params.address))
})

app.get('/test', function(req, res) {
    let text = fs.readFileSync(process.cwd() + "/data/0x0e9d6552b85be180d941f1ca73ae3e318d2d4f1f");
    res.send(text)
})

app.listen(port, () => {
    console.log(`RolodETH is listening on port ${port}`);
})

module.exports = app;