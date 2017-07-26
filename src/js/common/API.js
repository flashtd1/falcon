const baseurl = SITE.API.url

window.API = {
	body: (url, method, data, successHandler, errorHandler) => {
		return {
			type: method, 
			url: url,
			dataType: 'json',
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
	},

	pagination: (count, option, callback) => {
		let pagesize = option.pagesize || 20
		let page = option.page || 1
		let wraper = $(option.wraper || '.box')
		console.log(wraper)
		if(wraper.length < 1 || count < 1) { return }

		let paper = wraper.find('div.page-wraper')
		if (paper.length < 1) { return }

		paper.wrap('<div class="page-wraper"></div>')
		paper.remove()


		let totalPages = Math.ceil(count / pagesize)
		wraper.find('div.page-wraper').twbsPagination({
			totalPages: totalPages,
			visiblePages: 5,
			startPage: page,
			initiateStartPageClick: false,
			first: '首页',
			prev: '<<',
			next: '>>',
			last: '末页',
			goto: '跳转',
			pageClass: 'paginate_button',
			paginationClass:'pagination pull-right no-margin',
			onPageClick: function(event, p) {
				option.page = p
				callback(event, p)
			}
		})

	}
}