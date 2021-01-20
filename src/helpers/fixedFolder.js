export const fixedFolders = [
	{
		name: 'sidebar.main',
		type: 'section',
		children: [
			{
				id: -2,
				name: 'sidebar.home',
				icon: 'view-dashboard',
				type: 'item',
				link: '/dashboard',
				bd: false,
			},
			{
				id: -1,
				name: 'sidebar.loadDocuments',
				icon: 'view-dashboard',
				type: 'item',
				link: '/documents',
				bd: false,
			},
			{
				id: -3,
				name: 'sidebar.tags.home',
				icon: 'view-dashboard',
				type: 'item',
				link: '/tags',
				bd: false,
			},
			{
				id: -4,
				name: 'sidebar.tags.folders',
				icon: 'view-dashboard',
				type: 'item',
				link: '/folders',
				bd: false,
			},
		],
	},
	/*{
		name: 'sidebar.admin',
		type: 'section',
		children: [
			{
				id: -3,
				name: 'sidebar.tags.home',
				icon: 'view-dashboard',
				type: 'item',
				link: '/tags',
				bd: false,
			},
		],
	},*/
	{
		name: 'sidebar.folders',
		type: 'section',
		children: [],
	},
];