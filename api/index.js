const express = require('express');
const app = express();
const port = 3000;

const fs = require('fs');

app.get('/address/:address', (req, res) => {
    const address = req.params.address.toLocaleLowerCase()
    let content = fs.readFileSync(process.cwd() + "/data/" + address);
    res.setHeader('Content-Type', 'application/json');
    res.end(content)
})

app.listen(port, () => {
    console.log(`RolodETH is listening on port ${port}`);
})

module.exports = app;