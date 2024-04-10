const fs = require('fs')

const upath = require('upath')

const { execSync } = require('child_process')

const { version } = require('../package.json')


const getTime = (date = new Date()) => {

  return date.toLocaleString('en-US', {

    hour12: true,

    day: '2-digit',

    month: 'long',

    weekday: 'short',

    year: 'numeric',

    hour: '2-digit',

    minute: '2-digit'

  })

}


const logAndKill = message => {

  console.error(message)

  console.error(`👉 Docs:

    npx @baseproject/vite todos # replace "todos" with desired project name

    npx @baseproject/vite@0.0.1 todos # replace "O.O.1" with desired version

    npx @baseproject/vite # a default project name "vite-project" is used

  `)

  process.exit(1)

}


module.exports = function () {

  const [, , projName = 'vite-project'] = process.argv


  if (fs.existsSync(projName)) {

    logAndKill(`\n💀 Directory ${projName} already exists. Aborting!\n`)

  }


  const sourceFolderPath = upath.normalize(upath.resolve(__dirname, '../vite-project'))

  const destinationFolderPath = upath.normalize(upath.join(process.cwd(), projName))


  const start = () => {

    console.log(`\n✨ Creating project at ${destinationFolderPath} ...`)


    execSync(`cp -R ${sourceFolderPath} ${destinationFolderPath}`)

    execSync(`mv ${destinationFolderPath}/.gitignorez ${destinationFolderPath}/.gitignore`)


    const time = getTime()

    const readme = upath.normalize(upath.join(destinationFolderPath, 'README.md'))


    fs.appendFileSync(readme, `\n**Project created with \

[vite-project@${version}](https://github.com/FernandoMarcoF/npm-tools-reactvite.git) \

and Node ${process.version} on ${time}**\n`, 'utf8')



    console.log(`✨ Project ${projName} created on ${time}`)

    console.log(`✨ Using @aseproject/vite@${version} and Node ${process.version}`)

    console.log(`👉 NEXT STEPS:

    1- cd into the ${projName} directory

    2- execute npm install

    3- execute npm run dev

    4- load app in http://localhost:3003

    5- open ${projName} project in VSCode


    Check ${projName}/package.json for other scripts


    ❤️ Happy Hacking!\n`)

  }

  try {

    start()

  } catch (e) {

    logAndKill(`💀 An error happened: ${e.message}`)

  }

}