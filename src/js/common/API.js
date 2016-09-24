const baseurl = SITE.API.url

window.API = {
	body: (url, method, data, successHandler, errorHandler) => {
		return {
			type: method, 
			url: url,
			data: data,
			crossDomain: true,
			headers: {
				'X-DP-ID': SITE.app_id,
				'X-DP-Key': SITE.app_key,
				//'X-F-Token': Cookies.get('token')
			},
			success:successHandler,
			error:errorHandler
		}
	},

	ajax: (url, method, data, successHandler, errorHandler) => {
		$.ajax(API.body(url, method, data, successHandler,errorHandler))
	},

	get: (route, params, successHandler, errorHandler) => {
		let url = baseurl + route
		API.ajax(url, 'get', params, successHandler, errorHandler)
	},

	post: (route, params, successHandler, errorHandler) => {
		let url = baseurl + route
		API.ajax(url, 'post', params, successHandler, errorHandler)
	},

	put: (route, params, successHandler, errorHandler) => {
		let url = baseurl + route
		API.ajax(url, 'put', params, successHandler, errorHandler)
	},

	delete: (route, params, successHandler, errorHandler) => {
		let url = baseurl + route
		API.ajax(url, 'delete', params, successHandler, errorHandler)
	}
}