let model
class Api extends Basic {
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
		console.log('hello api')
	}
}

Core.expose('wiki', 'api', Api)