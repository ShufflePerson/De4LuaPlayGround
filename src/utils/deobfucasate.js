const child_process = require('child_process');
const fs = require('fs');
const { random_str } = require("./random_str");



async function deobfucasate(code, res) {
    let id = random_str(10);
    let input = "scripts/" + id + "_input.lua";
    let output = "scripts/" + id + "_output.lua";

    fs.writeFileSync(input, code);

    try {
        child_process.execSync(`cd De4Lua && npm run start ../${input} ../${output}`);
        let deobfuscatedCode = fs.readFileSync(output, "utf-8");
        deobfuscatedCode = deobfuscatedCode.replace(/\n/g, "<br>");
        deobfuscatedCode = deobfuscatedCode.replace(/    /g, "&nbsp;&nbsp;&nbsp;&nbsp;");
        res.send(deobfuscatedCode);

    } catch (error) {
        res.send("Error");
        return;
    }
}
exports.deobfucasate = deobfucasate;
