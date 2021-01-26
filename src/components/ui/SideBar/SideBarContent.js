import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { useHistory } from 'react-router-dom';
import TreeItem from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';
import MailIcon from '@material-ui/icons/Folder';
import StopRounded from '@material-ui/icons/StopRounded';

import CustomScrollbars from 'util/CustomScrollbars';
import Navigation from '../components/Navigation';
import { SideBarContext } from './SideBarContext';
import { folderSelected, removeFoldersId, saveFoldersId, startFoldersInitLoading, startFoldersSetChildren } from 'actions/folders';
import { useDispatch, useSelector } from 'react-redux';
import { fixedFolders } from 'helpers/fixedFolder';
import { searchRemoveText } from 'actions/search';

const useTreeItemStyles = makeStyles((theme) => ({
	root: {
		color: theme.palette.text.secondary,
		'&:hover > $content': {
			backgroundColor: '#1d1d1d',
			color: '#FFFFFF'
		},
		'&:focus > $content, &$selected > $content': {
			backgroundColor: '#1d1d1d', //`var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
			color: '#FFFFFF',
		},
		'&:focus > $content $label, &:hover > $content $label, &$selected > $content $label': {
			backgroundColor: 'transparent',
			color: '#FFFFFF'
		},
	},
	content: {
		color: theme.palette.text.secondary,
		borderTopRightRadius: theme.spacing(2),
		borderBottomRightRadius: theme.spacing(2),
		paddingRight: theme.spacing(1),
		fontWeight: theme.typography.fontWeightMedium,
		'$expanded > &': {
			fontWeight: theme.typography.fontWeightRegular,
		},
	},
	group: {
		marginLeft: 0,
		'& $content': {
			paddingLeft: theme.spacing(2),
		},
	},
	expanded: {},
	selected: {},
	label: {
		fontWeight: 'inherit',
		color: 'inherit',
	},
	labelRoot: {
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(0.5, 0),
	},
	labelIcon: {
		marginRight: theme.spacing(2),
		fontSize: 15,
		color: '#a1a1a1'
	},
	labelText: {
		fontWeight: 'inherit',
		flexGrow: 1,
		color: '#a1a1a1',
		padding: theme.spacing(0.5, 0),
	},
}));

function StyledTreeItem(props) {
	const classes = useTreeItemStyles();
	const { labelText, labelIcon: LabelIcon, labelInfo, color, bgColor, ...other } = props;

	return (
		<TreeItem
			label={
				<div className={classes.labelRoot}>
					<LabelIcon color="inherit" sty className={classes.labelIcon} />
					<Typography variant="body2" className={classes.labelText}>
						{labelText}
					</Typography>
					<Typography variant="caption" color="inherit">
						{labelInfo}
					</Typography>
				</div>
			}
			style={{
				'--tree-view-color': color,
				'--tree-view-bg-color': bgColor,
			}}
			classes={{
				root: classes.root,
				content: classes.content,
				expanded: classes.expanded,
				selected: classes.selected,
				group: classes.group,
				label: classes.label,
			}}
			{...other}
		/>
	);
}

const useStyles = makeStyles({
	root: {
		height: 264,
		flexGrow: 1,
		maxWidth: 400,
	},
});

const SideBarContent = () => {

	const classes = useStyles();

	const dispatch = useDispatch();
	const { selectedIds = [], initFolders = [], folderId = [] } = useSelector(state => state.folders);

	const { authUser } = useSelector(state => state.auth);

	const history = useHistory();

	const isMounted = useRef(true);

	const [selected, setSelected] = useState([]);
	const [expanded, setExpanded] = useState([]);
	const [folders, setFolders] = useState([]);

	useEffect(() => {

		return () => {
			isMounted.current = false;
		}

	}, []);

	useEffect(() => {

		setSelected([folderId]);

	}, [folderId, setSelected]);

	useEffect(() => {

		setFolders(initFolders);

	}, [initFolders, setFolders]);

	useEffect(() => {

		setExpanded(selectedIds);

	}, [selectedIds, setExpanded]);

	useEffect(() => {

		if (initFolders.length === 0 && authUser) {

			dispatch(startFoldersInitLoading(authUser));

		}

	}, [dispatch, initFolders, authUser]);

	const handleRenderMenu = (folders) => {

		return folders.map((folder) => {
			return <StyledTreeItem
				key={folder.id}
				nodeId={String(folder.id)}
				labelText={folder.name}
				labelIcon={folder.hashSubFolders ? MailIcon : StopRounded} 
			>
				{Array.isArray(folder.children) ? handleRenderMenu(folder.children) : null}
			</StyledTreeItem>
		});

	}

	const handleSelect = async (event, folderId) => {

		if (selected === folderId) {
			return;
		}

		dispatch(startFoldersSetChildren(folderId, authUser));

		dispatch(folderSelected(folderId));

		const existsId = selectedIds.find(id => id == folderId);
		if (!existsId) {
			dispatch(saveFoldersId(folderId));
		} else {
			dispatch(removeFoldersId(folderId));
		}

		dispatch(searchRemoveText());

		history.push(`/search?folderId=${folderId}`);

	}

	return (
		<CustomScrollbars className="scrollbar" >
			<SideBarContext.Provider value={{}}>
				<Navigation menuItems={fixedFolders} />
				<TreeView
					className={classes.root}
					defaultCollapseIcon={<ExpandMoreIcon />}
					defaultExpandIcon={<ChevronRightIcon />}
					selected={selected}
					onNodeSelect={handleSelect}
					expanded={expanded}
				>
					{handleRenderMenu(folders)}
				</TreeView>
			</SideBarContext.Provider>
		</CustomScrollbars >
	);
};

export default SideBarContent;
