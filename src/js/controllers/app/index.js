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
		this.register(['getAppList'])
	}

	getAppList() {
		console.log('get app list')
	}
}

Core.expose('app', 'index', Index)