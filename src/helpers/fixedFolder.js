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
				icon: 'open-in-browser',
				type: 'item',
				link: '/documents',
				auth:'ROLE_FILE_MENU',
				bd: false,
			},
			{
				id: -3,
				name: 'sidebar.tags.home',
				icon: 'label',
				type: 'item',
				link: '/tags',
				auth:'ROLE_TAG_MENU',
				bd: false,
			},
			{
				id: -4,
				name: 'sidebar.tags.folders',
				icon: 'folder',
				type: 'item',
				link: '/folders',
				auth: 'ROLE_FOLDER_MENU',
				bd: false,
			},
			{
				id: -5,
				name: 'sidebar.tags.report',
				icon: 'chart',
				type: 'item',
				link: '/reports',
				auth: 'ROLE_REPORTS_MENU',
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