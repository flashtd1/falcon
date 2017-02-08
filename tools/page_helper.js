'use strict'

const fs = require('fs'),
  sidebar = require('../lib/sidebar'),
  rootDir = './views',
  pagePath = '../lib/page'

let pages = require(pagePath)

let dirs = fs.readdirSync(rootDir,  {encoding:'utf8'})

let getSidebarPages = (side) => {
  if(side.subs) {
    return side.subs
  } else {
    return [side]
  }
}

let getNameFromSidebar = (index) => {
  let sidebarPages = []
  sidebar.map((item) => {
    getSidebarPages(item).map((side) => {
      sidebarPages.push(side)
    })
  })

  let side = sidebarPages.filter((item) => {
    if(item.href) {
      return item.href == '/' + index
    }
  })[0]

  if(side) {
    return {
      name: side.name
    }
  } else {
    return {
      name: '待填写'
    }
  }
}

dirs.map((dir) => {
  let currentDir = rootDir + '/' + dir
  let stat = fs.lstatSync(currentDir)
  if(stat.isDirectory() && dir != 'layouts') {
    let jades = fs.readdirSync(currentDir)
    jades.map((jade) => {
      let index = dir + '/' + jade.split('.')[0]
      let expectedName = getNameFromSidebar(index)

      if(pages[index]) {
        if(expectedName.name == '待填写') {
          if(pages[index].name != '待填写') {}
        } else {
          pages[index] = expectedName
        }
      } else {
        pages[index] = expectedName
      }
    })
  }
})
fs.writeFileSync(pagePath.substring(1) + '.js', 'module.exports = ' + JSON.stringify(pages,null, 2))
