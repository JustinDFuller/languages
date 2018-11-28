const path = require('path')
const assert = require('assert')
const { promisify } = require('util')
const { exec } = require('child_process')
const { readdir, readFile } = require('fs')

const readdirAsync = promisify(readdir)
const readFileAsync = promisify(readFile)
const execAsync = promisify(exec)

async function executeTests(dir) {
  const cwd = path.join(__dirname, dir)
  const execOptions = { cwd }

  const [expected, ...results] = await Promise.all([
    readFileAsync(path.join(cwd, 'expected'), 'utf8'),
    execAsync(`javac Main.java && java Main < input`, execOptions).then(res => ({ ...res, type: 'java' })),
    execAsync(`node index.js < input`, execOptions).then(res => ({ ...res, type: 'node' })),
    execAsync(`runhaskell main.hs < input`, execOptions).then(res => ({ ...res, type: 'haskell' })),
    execAsync(`python main.py < input`, execOptions).then(res => ({ ...res, type: 'python' })),
    execAsync(`./main.sh < input`, execOptions).then(res => ({ ...res, type: 'shell' }))
  ])

  return results.find(result => 
    assert.deepStrictEqual(result.stdout, expected, `[${result.type}] Expected "${result.stdout}" to deeply equal "${expected}".`)) 
    || `${dir} tested OK.`
}

readdirAsync(__dirname, { withFileTypes: true })
  .then(files => files
      .filter(f => f.isDirectory() && !f.name.includes('git'))
      .map(f => f.name))
  .then(dirs => dirs.map(executeTests))
  .then(promises => Promise.all(promises))
  .then(console.dir)
  .catch(e => console.error(e) || process.exit(1))
