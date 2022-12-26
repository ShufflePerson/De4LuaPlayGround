const express = require('express');
const { deobfucasate } = require("./utils/deobfucasate");

const app = express();

const port = 80;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))


app.post('/deobfuscate', (req, res) => {
    const { code } = req.body;
    if (!code) {
        return res.send("Error")
    }

    deobfucasate(code, res)
});


app.listen(port, () => {
    console.log(`De4Lua Playground running at http://localhost:${port}`);
});
