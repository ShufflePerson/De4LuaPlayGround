const express = require('express');
const { deobfucasate } = require("./utils/deobfucasate");
const get_commits = require('./utils/get_commits');

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


app.get("/changelog", async (req, res) => {
    let commits = await get_commits()
    let html = `
    <link rel="stylesheet" href="style.css">
    <h1>Changelog</h1>
    `
    commits.forEach(commit => {
        commit.date = new Date(commit.date).toLocaleString()
        html += `<div class="changelog"><h2>${commit.name} - ${commit.date}</h2><p>${commit.message}</p></div>`
    })

    res.send(html)
})


app.listen(port, () => {
    console.log(`De4Lua Playground running at http://localhost:${port}`);
});
