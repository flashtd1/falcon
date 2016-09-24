window.Core = {
  expose: (controller, action, myClass) => {
    if(!window.FALCON) { window.FALCON = {}}
    if(!window.FALCON[controller]) {window.FALCON[controller] = {}}
      window.FALCON[controller][action] = myClass
  }
}