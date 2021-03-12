import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { useHistory } from 'react-router-dom';
import MailIcon from '@material-ui/icons/FolderOutlined';
import FiberManualRecord from '@material-ui/icons/FiberManualRecordOutlined';

import CustomScrollbars from 'util/CustomScrollbars';
import Navigation from '../components/Navigation';
import { SideBarContext } from './SideBarContext';
import {
	folderSelected, removeFoldersId, saveFoldersId,
	startFoldersInitLoading, startFoldersSetChildren
} from 'actions/folders';
import { useDispatch, useSelector } from 'react-redux';
import { fixedFolders } from 'helpers/fixedFolder';
import { searchRemoveText } from 'actions/search';
import StyledTreeItem from '../StyledTreeItem';

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

	const { authUser, authorities } = useSelector(state => state.auth);

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
		if (authorities) {

			const ROLE_FOLDER_VIEW = authorities.find(rol => rol === 'ROLE_FOLDER_VIEW')
		

		if (initFolders.length === 0 && authUser && ROLE_FOLDER_VIEW) {


			dispatch(startFoldersInitLoading(authUser));

		}
	}

	}, [dispatch, initFolders, authUser]);

	const handleRenderMenu = (folders) => {

		return folders.map((folder) => {
			return <StyledTreeItem
				key={folder.id}
				nodeId={String(folder.id)}
				labelText={folder.name}
				labelIcon={folder.hashSubFolders ? MailIcon : FiberManualRecord}
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

		history.push(`/directory/${folderId}`);

	}

	return (
		<CustomScrollbars className="scrollbar" >
			<SideBarContext.Provider value={{}}>
				<Navigation menuItems={fixedFolders} privileges={authorities} />
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
