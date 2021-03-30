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
				auth:'ROLE_DASHBOARD_MENU',
				bd: false,
			},
			{
				id: -1,
				name: 'sidebar.loadDocuments',
				icon: 'upload',
				type: 'item',
				link: '/documents',
				auth:'ROLE_FILE_MENU',
				bd: false,
			},
			{
				id: -3,
				name: 'sidebar.tags.home',
				icon: 'tag',
				type: 'item',
				link: '/tags',
				auth:'ROLE_TAG_MENU',
				bd: false,
			},
			{
				id: -4,
				name: 'sidebar.tags.management',
				icon: 'settings',
				type: 'collapse',
				auth: 'ROLE_FOLDER_MENU',
				bd: false,
				children: [
					{
						id: -8,
						name: 'sidebar.tags.folders',
						type: 'item',
						link: '/management/folders',
						bd: false,
					},
					{
						id: -7,
						name: 'sidebar.tags.usersandgroup',
						type: 'item',
						link: '/management/usersandgroups',
						bd: false,
					},
				],
			},
			{
				id: -5,
				name: 'sidebar.tags.report',
				icon: 'chart',
				type: 'item',
				link: '/reports',
				//auth: 'ROLE_REPORT_MENU',
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