var fs = require('fs')
var translate = require('./translate.js')
var progress = require('./progess.js')

var progessBar = Object.create(progress.progressReporter)

var fileToOpen = process.argv[2]
var positionOfWordOrPhraseToTranslate = process.argv[3] || 4
var fileToSaveTo = process.argv[4] || 'translaterod.csv'

fs.readFile(fileToOpen, 'UTF-8', function (err, rawCsv) {
  if(!err) {
    var allRows = rawCsv.split('\n')
    progessBar.max = allRows.length
    progessBar.autoSetStepSize()
    var csvArr = []

    var csvHeader = allRows.shift()
    csvHeader = csvHeader.substr(0, csvHeader.length - 1) + ',Deutsch'
    progessBar.init()

    fs.writeFile(fileToSaveTo, csvHeader, function (err) {
      if(err) {
        console.log(err)
      }
    })

    allRows.forEach(function (val, i) {
      csvArr[i] = val.split(',')
    })

    csvArr.forEach(function (val, i) {
      var translateThis = val[positionOfWordOrPhraseToTranslate]
      if(translateThis) {
        translate.translateToEnglish(translateThis, function (translatedString) {
          fs.appendFile(fileToSaveTo, '\n' + (allRows[i].substr(0, allRows[i].length - 1)) + ',' + translatedString, function (err) {
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