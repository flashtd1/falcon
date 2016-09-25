window.SITE.Init = (callback) => {
	getLoginState().then((data) => {
		Promise.all([

		]).then(callback)
	})
}

function getLoginState() {
	return new Promise((resolve) => {
		API.get('users/method/current', {token:Cookies.get('token')}, (data) => {
			SITE.session = data
			SITE.session.profile_url = SITE.session.profile_url || '/images/FLogo.png'
			resolve(data)
		}, (error) => {
			if (SITE.router.action != 'login') {
				Cookies.set('token', '')
				window.location.href = '/login'
			} else {
				resolve()
			}
		})
	})
}