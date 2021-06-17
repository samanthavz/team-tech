var fs = require('fs');

var uglifyjs = require('uglify-js');

var result = uglifyjs.minify(fs.readFileSync('router.js', 'utf8'))

console.log(result.code);

fs.writeFile("output.min.js", result.code, function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("Bestand verkleind!");
    }
});