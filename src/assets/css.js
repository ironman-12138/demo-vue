var fs = require('fs');
function base64(file) {
    var bit = fs.readFileSync(file);
    return 'data:text/css;base64,' + new Buffer(bit).toString('base64');
}
console.log(base64('./wx.css'));