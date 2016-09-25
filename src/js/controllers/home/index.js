let model
class Index extends Basic {

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

Core.expose('home', 'index', Index)
