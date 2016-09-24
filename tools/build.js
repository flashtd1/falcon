"use strict";

let path = require('path'),
    Helper = require('./helper'),
    TC = require('../task.config'),
    tasks = TC.tasks,
    group = TC.group

let arg = process.argv[2]

let getCmds = () => {

  if(arg) {
    if(group[arg]) {
      return group[arg].map((item) => {
        return tasks[item]
      })
    }

    if(tasks[arg]) return [tasks[arg]]
  }

  let ts = []
  for (let item in tasks) {
    ts.push(tasks[item])
  }
  return ts.filter((item) => {
    return !item.ignore
  })
}

Helper.build(getCmds())
