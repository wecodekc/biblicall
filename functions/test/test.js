const psalms = require(Runtime.getFunctions()['lib/getVerse'].path);
exports.handler = function (context, event, callback) {
 
  callback(null, psalms.getVerse(1,1));
};