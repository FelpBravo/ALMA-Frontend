import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import { useHistory } from 'react-router-dom';

import CustomScrollbars from 'util/CustomScrollbars';
import Navigation from '../components/Navigation';
import { SideBarContext } from './SideBarContext';
import { folderSelected, removeFoldersId, saveFoldersId, startFoldersInitLoading, startFoldersSetChildren } from 'actions/folders';
import { useDispatch, useSelector } from 'react-redux';
import { fixedFolders } from 'helpers/fixedFolder';
import { searchRemoveText } from 'actions/search';

const useStyles = makeStyles({
	root: {
		height: 240,
		flexGrow: 1,
		maxWidth: 400,
	},
	treeItem: {
		fontSize: 14,
		color: '#A1A1A1',
		fontFamily: 'Roboto, sans-serif',


		'&:hover': {
			color: '#FFFFFF',
		},
	}
});

const SideBarContent = () => {

	const dispatch = useDispatch();
	const { selectedIds = [], initFolders = [], folderId = [] } = useSelector(state => state.folders);

	const history = useHistory();

	const classes = useStyles();

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

	}, [initFolders, setFolders])

	useEffect(() => {

		setExpanded(selectedIds);

	}, [selectedIds, setExpanded])

	useEffect(() => {

		if (initFolders.length === 0) {

			setTimeout(() => {

				dispatch(startFoldersInitLoading());

			}, 3000);

		}

	}, [dispatch, initFolders]);

	const handleRenderMenu = (folders) => {

		return folders.map((folder) => {
			return <TreeItem
				key={folder.id}
				nodeId={String(folder.id)}
				label={folder.name}
				classes={
					{ label: classes.treeItem }
				}
			>
				{Array.isArray(folder.children) ? handleRenderMenu(folder.children) : null}
			</TreeItem>
		});

	}

	const handleSelect = async (event, folderId) => {

		if (selected === folderId) {
			return;
		}

		dispatch(startFoldersSetChildren(folderId));

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
