module.exports = [
	{
		name: '总览',
		href: '/home/index',
		icon: 'fa-desktop'
	},
	{
		name: 'App管理',
		href: '/app/index',
		icon: 'fa-cubes'
	},
	{
        name: '标签管理',
        icon: 'fa-link'
    },
    {
        
        name: 'hook管理',
        icon: 'fa-anchor',
        href: '/hook/coding'
    },
    {
        name: '搜索',
        icon: 'fa-search'
    },
    {
        name: '爬虫管理',
        icon: 'fa-bug'
    },
	{
		name: 'Wiki',
		icon: 'fa-book',
		subs: [
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