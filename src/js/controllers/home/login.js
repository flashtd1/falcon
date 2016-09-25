let model
class Login extends Basic{
	constructor() {
		super({
			vue: {
				data: {
					loginData: {
						username:'',
						password:''
					}
				}
			}
		})
		model = this
		this.init()
	}

	init() {
		this.register(['login'])
	}

	login() {
		API.get('users/method/login', model.mvvm.loginData, (data) =>{
			Cookies.set('token', data.token)
			Core.alert('success', '登陆成功')
			window.location.href = '/'
		}, (error) => {
			Core.alert('error', error.message)
		})
	}

}

Core.expose('home','login', Login)