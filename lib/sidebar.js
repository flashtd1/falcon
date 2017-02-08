module.exports = [
	{
		name: '总览',
		href: '/home/index',
		icon: 'fa-desktop'
	},
	{
		name: 'App管理',
		icon: 'fa-cubes',
		subs: [
			{
				name: '我的App',
				href: '/app/index'
			},
			{
				name: '插件管理',
				href: '/app/plugins'
			},
			{
				name: '微信管理',
				href: '/app/wechat'
			},
		]
	},
	{
        name: 'App后台',
        icon: 'fa-link',
        subs: [
        	{
				name: '练习单',
				href: '/musicpractice/index'
			}
        ]
    },
	{
        name: '统计管理',
        icon: 'fa-area-chart',
        subs: [
        	{
        		name: '统计原始数据',
        		href: '/statistics/index'
        	},
        	{
        		name: '统计分类',
        		href: '/statistics/type'
        	},
        	{
        		name: '统计可视化',
        		href: '/statistics/graph'
        	}
        ]
    },
    // {
    //     name: '部署管理',
    //     icon: 'fa-anchor',
    //     href: '/hook/coding'
    // },
    // {
    //     name: '爬虫管理',
    //     icon: 'fa-bug'
    // },
	{
		name: 'Wiki',
		icon: 'fa-book',
		subs: [
			{
				name: '接口列表',
				href: '/wiki/api'
			},
			{
				name: '技术博客',
				href: '/wiki/blog'
			},
			{
				name: '文档归档',
				href: '/wiki/doc'
			}
		] 
	}
]