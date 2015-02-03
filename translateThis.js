var fs = require('fs')
var translate = require('./translate.js')
var progress = require('./progess.js')

var progessBar = Object.create(progress.progressReporter)

var fileToOpen = 'data/Gold_Pre-First_Wordlist/table_1.csv'
var fileToSaveTo = 'translaterod.csv'


fs.readFile(fileToOpen, 'UTF-8', function (err, rawCsv) {
  if(!err) {
    var allRows = rawCsv.split('\n')
    progessBar.max = allRows.length
    progessBar.autoSetStepSize()
    var csvArr = []

    var csvHeader = allRows.shift()
    csvHeader += ',Deutsch'

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
              progessBar.add(1)
            }
          })
        })
      }
    })
  } else {
    console.log(err)
  }
})