const express = require('express');
const child_process = require('child_process');
const fs = require('fs');

const app = express();

const port = 80;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))


function random_str(len) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < len; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

async function deobfucasate(code, res) {
    let id = random_str(10)
    let input = "scripts/" + id + "_input.lua"
    let output = "scripts/" + id + "_output.lua"

    fs.writeFileSync(input, code)

    try {
        child_process.execSync(`cd De4Lua && npm run start ../${input} ../${output}`)
        let deobfuscatedCode = fs.readFileSync(output, "utf-8")
        deobfuscatedCode = deobfuscatedCode.replace(/\n/g, "<br>")
        deobfuscatedCode = deobfuscatedCode.replace(/    /g, "&nbsp;&nbsp;&nbsp;&nbsp;")
        res.send(deobfuscatedCode)

    } catch (error) {
        res.send("Error")
        return
    }
}


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
