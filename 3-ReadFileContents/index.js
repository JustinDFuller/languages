const { join } = require('path')
const { readFile } = require('fs')
const { promisify } = require('util')

const readFileAsync = promisify(readFile)

let fileName = ''

process.stdin.on('readable', () => {
  let chunk = process.stdin.read()
  if (chunk !== null) fileName += chunk
})

process.stdin.on('end', () => {
  readFileAsync(join(__dirname, fileName.replace('\n', '')), 'utf8')
    .then(res => process.stdout.write(res))
})
