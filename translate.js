var request = require('request')
var requestTempalte = 'http://translate.google.com/translate_a/single?client=t&sl=en&tl=de&hl=de&dt=bd&dt=ex&dt=ld&dt=md&dt=qc&dt=rw&dt=rm&dt=ss&dt=t&dt=at&ie=UTF-8&oe=UTF-8&otf=2&ssel=0&tsel=0&tk=518722|1015878&q='
module.exports = {
  translateToEnglish: function (translateThisString, callback) {
    request(requestTempalte + translateThisString, function (error, response, body) {
      if(!error) {
        while(body.indexOf(',,') > -1) {
          body = body.replace(/(\,|\[),/, '$1')
        }
        callback(JSON.parse(body)[0][0][0])
      } else {
        console.log(error)
      }
    })
  }
}