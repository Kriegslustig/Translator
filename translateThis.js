var fs = require('fs')
var translate = require('./translate.js')
var progessBar = {}
progessBar._proto_ = require('./progess.js').progressReporter

var fileToOpen = 'Gold_Pre-First_Wordlist/table_1.csv'
var fileToSaveTo = 'translaterod.csv'


fs.readFile(fileToOpen, 'UTF-8', function (err, rawCsv) {
  if(!err) {
    var allRows = rawCsv.split('\n')
    var csvArr = []

    var csvHeader = allRows.shift()
    csvHeader += ',Deutsch'
    console.log(csvHeader)

    fs.writeFile(fileToSaveTo, csvHeader, function (err) {
      if(err) {
        console.log(err)
      }
    })

    allRows.forEach(function (val, i) {
      csvArr[i] = val.split(',')
    })

    csvArr.forEach(function (val, i) {
      var translateThis = val[4]
      if(translateThis) {
        translate.translateToEnglish(val[4], function (translatedString) {
          fs.appendFile(fileToSaveTo, allRows[i] + ',' + translatedString, function (err) {
            if(err) {
              console.log(err)
            } else {
              console.log(i + ' lines of ' + csvArr.length + ' written')
            }
          })
        })
      }
    })
  }
})