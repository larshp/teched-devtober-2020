const child_process = require("child_process");
const fs = require("fs");

const moo1 = child_process.execSync("curl \"https://api.github.com/repos/abapGit/abapGit/contributors?per_page=100&page=1\"").toString();
const moo2 = child_process.execSync("curl \"https://api.github.com/repos/abapGit/abapGit/contributors?per_page=100&page=2\"").toString();

const array = JSON.parse(moo1).concat(JSON.parse(moo2)).map(e => e.login).filter(l => l.includes("[bot]") === false);
console.dir(array);

fs.writeFileSync("data.js", "window.gitdata = " + JSON.stringify(array) + ";");

for(const l of array) {
  child_process.execSync("curl -L \"https://github.com/" + l + ".png?size=64\" --output users/" + l + ".png");
}