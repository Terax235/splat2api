const fs = require("fs");
const package = require("./package.json");

let methods = [];

let newscode = "";

let exists = require('fs').existsSync('./NEWS.html');
if (exists) {
    let code = require('fs').readFileSync('./NEWS.html', { encoding: "utf8" });
    newscode = `<br><br><div class="note">
<h2>News</h2>
${code}
</div>`;
};

let routes = fs.readdirSync("./routes/");
for (let file of routes) {
    var f = require("./routes/" + file);
    for (var use of f) {
        if (!use.method) { use.method = "get" };
        methods.push(use);
    };
};

var basecode = `<html>
<head>
<meta charset="utf8">
<title>splat2api</title>
<meta name="description" content="splat2api is a public Splatoon 2 API, which you can use to retrieve information on current maps." />
<!-- Twitter Card data -->
<meta name="twitter:card" content="summary">
<meta name="twitter:site" content="@Terax235">
<meta name="twitter:title" content="splat2api">
<meta name="twitter:description" content="splat2api is a public Splatoon 2 API, which you can use to retrieve information on current maps.">
<meta name="twitter:creator" content="@Terax235">

<!-- Open Graph data -->
<meta property="og:title" content="splat2api" />
<meta property="og:type" content="website" />
<meta property="og:url" content="http://api.splatoon.terax235.me/" />
<meta property="og:description" content="splat2api is a public Splatoon 2 API, which you can use to retrieve information on current maps." />
<meta property="og:site_name" content="Terax235" />

<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
<link href="https://fonts.googleapis.com/css?family=Acme" rel="stylesheet">
<style>
body {
    background-color: #2C2F33;
    padding-left: 1cm;
    padding-top: 1cm;
    color: #FFFA;
}
.note {
    background-color: #7986CB;
    font-family: 'Acme', serif;
    border-style: solid;
    padding-left: 1rem;
    margin-right: 2rem;
}  
</style>
</head>
<body>
<h1>Welcome to splat2api</h1>
A public Splatoon 2 API, which you can use to retrieve information on current map schedules.<br>
By <a href="https://github.com/Terax235" target="_blank">Terax235</a> - Version ${package.version} - <a href="https://github.com/splat2api/api" target="_blank">Source Code</a>\n
${newscode}
<br>
<h2>Documentation</h2>
<table style="width:100%">
<tr>
<th>Endpoint</th>
<th>Method</th>
<th>Description</th>
</tr>
${methods.filter(m => m.name != "/" && m.name != "/changelog").map(end => `<tr>\n<td><a href="${end.name}" target="_blank">${end.name}</a></td>\n<td>${end.method.toUpperCase()}</td>\n<td>${end.description || "-"}</td>\n</tr>`).sort().join("\n")}
</table>
<br>
<h2>Changelog</h2>
<a href="changelog">Here</a><br>
<br>
<h2>Discord</h2>
Soon (If you need help / have other questions with the API, feel free to contact <b>Terax#9758</b> at Discord)
<br><br>
<b>Build date:</b> 
${new Date()}
</body>
</html>`;

fs.writeFileSync("./index.html", basecode);

console.log("Documentation generated.");