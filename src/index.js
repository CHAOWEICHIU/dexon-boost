const fetch = require('node-fetch')
const wrapper = require('@dexon-foundation/dsolc/wrapper')
const BASE_URL = 'https://dexon-foundation.github.io/dsolc-bin/bin'

const loadScript = (url) => new Promise((resolve) => {
  let script = document.getElementById('script-' + name)
  if (script != null) {
    script.parentElement.removeChild(script)
  }
  script = document.createElement('script')
  script.type = 'text/javascript'
  script.setAttribute('id', 'script-' + name)

  if (script.readyState){  //IE
    script.onreadystatechange = function(){
      if (script.readyState == 'loaded' ||
                  script.readyState == 'complete'){
        script.onreadystatechange = null
        resolve()
      }
    }
  } else {  //Others
    script.onload = function(){
      resolve()
    }
  }
  script.src = url
  document.getElementsByTagName('head')[0].appendChild(script)
})

const availableVersions = () => fetch(`${BASE_URL}/list.json`)
  .then(res => res.json())
  .then(res => res.releases)

const loadVersion = (version) => new Promise((resolve, reject) => {
  delete window.Module
  // NOTE: workaround some browsers
  window.Module = undefined

  availableVersions()
    .then(releases => {
      const targetVersion = releases[version] || null
      if(!targetVersion) {
        reject(`
Version: ${version || null} not found!

Current available versions:
${JSON.stringify(releases, null, 2)}
`)
      }
      const url = `${BASE_URL}/${targetVersion}`
      loadScript(url)
        .then(() => {
          const compiler = wrapper(window.Module)
          resolve(compiler)
        })
    })

  
})

module.exports = {
  BrowserDSolc: {
    availableVersions: () => availableVersions,
    loadVersion,
  }
}
