let model
class Plugins extends Basic {

  constructor() {
    super({
    	vue:{
    		data:{}
    	}
    })

    model = this
    this.init()
  }

  init() {
    console.log('foo')
  }

}

Core.expose('app', 'plugins', Plugins)
