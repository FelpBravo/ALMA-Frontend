import { makeStyles } from '@material-ui/core/styles';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FiberManualRecord from '@material-ui/icons/FiberManualRecordOutlined';
import FolderIcon from '@material-ui/icons/Folder';
import MailIcon from '@material-ui/icons/FolderOutlined';
import TreeView from '@material-ui/lab/TreeView';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useRouteMatch } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';


import { startBreadcrumbs } from 'actions/breadcrumbs'
import { folderSelected, removeFoldersId, saveFoldersId, startFoldersInitLoading, startFoldersSetChildren } from 'actions/folders';
import { searchRemoveText } from 'actions/search';
import { fixedFolders } from 'helpers/fixedFolder';
import CustomScrollbars from 'util/CustomScrollbars';

import Navigation from '../components/Navigation';
import StyledTreeItem from '../StyledTreeItem';
import { SideBarContext } from './SideBarContext';
import { Divider } from '@material-ui/core';
import { removeTagsId, saveTagsId, startTagSet, startTagsInitLoading, startTagsSetChildren, tagsSelected } from 'actions/tags';

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box p={3}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

const useStyles = makeStyles({
	root: {
		height: 264,
		maxWidth: 400,
	},

});

const SideBarContent = () => {

	const classes = useStyles();

	const dispatch = useDispatch();

	const { selectedIds = [], initFolders = [], folderId = [] } = useSelector(state => state.folders);

	const { selectedTagsIds = [], initTags = [], tagId = [] } = useSelector(state => state.tags);

	const { authUser, authorities } = useSelector(state => state.auth);

	const history = useHistory();

	const isMounted = useRef(true);

	const [selected, setSelected] = useState([]);

	const [expanded, setExpanded] = useState([]);

	const [folders, setFolders] = useState([]);

	const [value, setValue] = React.useState(0);
	console.log(value)

	const [tags, setTags] = useState([]);

	const [selectedTags, setSelectedTags] = useState([]);

	const [expandedTags, setExpandedTags] = useState([]);


	useEffect(() => {
		setSelected([folderId]);

	}, [folderId, setSelected]);

	useEffect(() => {
		setFolders(initFolders);

	}, [initFolders, setFolders]);

	useEffect(() => {
		setExpanded(selectedIds);

	}, [selectedIds, setExpanded]);

	//Arbol de TAGS

	useEffect(() => {
		setTags(initTags);

	}, [initTags, setTags]);

	useEffect(() => {
		setSelectedTags([tagId]);

	}, [tagId, setSelectedTags]);

	useEffect(() => {
		setExpandedTags(selectedTagsIds);

	}, [selectedTagsIds, setExpandedTags]);


	useEffect(() => {
		if (authorities) {

			const ROLE_FOLDER_VIEW = authorities.find(rol => rol === 'ROLE_FOLDER_VIEW')


			if (initFolders.length === 0 && authUser && ROLE_FOLDER_VIEW) {


				dispatch(startFoldersInitLoading(authUser));
				dispatch(startTagsInitLoading(authUser))

			}
		}

	}, [dispatch]);


	const [myRef, setMyRef] = useState(null)

	const handleRenderMenu = (folders) => {
		return folders.map((folder) => {
			const isSelected = parseInt(folderId) === parseInt(folder.id)
			return <div ref={isSelected ? setMyRef : null} key={folder.id}>
				<StyledTreeItem
					folderId={folder.id}
					nodeId={String(folder.id)}
					labelText={folder.name}
					labelIcon={folder.hashSubFolders ? FolderIcon : MailIcon}
					onClick={() => { dispatch(startBreadcrumbs(folder.name, `/directory/${folder.id}`)) }}
				>
					{Array.isArray(folder.children) ? handleRenderMenu(folder.children) : null}
				</StyledTreeItem>
			</div>
		});

	}

	//Arbol de TAGS MENU

	const handleRenderMenuTags = (tags) => {
		return tags.map((tag) => {
			const isSelected = parseInt(tagId) === parseInt(tag.id)
			return <div ref={isSelected ? setMyRef : null} key={tag.id}>
				<StyledTreeItem
					folderId={tag.id}
					nodeId={String(tag.id)}
					labelText={tag.tag}
					labelIcon={tag.hashSubTags ? FolderIcon : MailIcon}
					onClick={() => { dispatch(startBreadcrumbs(tag.tag, `/tags/${tag.id}`)) }}
				>
					{Array.isArray(tag.children) ? handleRenderMenuTags(tag.children) : null}
				</StyledTreeItem>
			</div>
		});

	}
	const executeScroll = () => myRef.scrollIntoView()

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

	useEffect(() => {
		if (folderId && myRef) executeScroll()
	}, [folderId, myRef])
	//Seleccion de Tags

	const handleSelectTag = async (event, tagId) => {
		if (selectedTags === tagId) {
			return;
		}

		dispatch(startTagsSetChildren(authUser, tagId));

		dispatch(tagsSelected(tagId));

		const existsId = selectedTagsIds.find(id => id == tagId);
		if (!existsId) {
			dispatch(saveTagsId(tagId));
		} else {
			dispatch(removeTagsId(tagId));
		}

		dispatch(searchRemoveText());
	
		history.push(`/tags/${tagId}`);
	}

	useEffect(() => {
		if (tagId && myRef) executeScroll()
	}, [tagId, myRef])
    

	const handleChange1 = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<CustomScrollbars style={{ overflowX: 'hidden' }} className="scrollbar">
			<SideBarContext.Provider value={{}}>
				<Navigation menuItems={fixedFolders} privileges={authorities} />
				
				<Tabs
					value={value}
					onChange={handleChange1}
					indicatorColor="none"
					textColor='inherit'
				>
					<Tab style={{ fontFamily: 'Poppins', fontSize: "12px", fontWeight: 400, textTransform: "none", minWidth: 100}} label="Directorios" {...a11yProps(0)} />
					<Tab style={{ fontFamily: 'Poppins', fontSize: "12px", fontWeight: 400, textTransform: "none", minWidth: 100 }} label="Etiquetas" {...a11yProps(1)} />

				</Tabs>
				<TabPanel value={value} index={0}>

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
				</TabPanel>

				<TabPanel value={value} index={1}>

					<TreeView
						defaultCollapseIcon={<ExpandMoreIcon />}
						defaultExpandIcon={<ChevronRightIcon />}
						selected={selectedTags}
						onNodeSelect={handleSelectTag}
						expanded={expandedTags}
					>
						{handleRenderMenuTags(tags)}
					</TreeView>

				</TabPanel>

			</SideBarContext.Provider>
		</CustomScrollbars >
	);
};

export default SideBarContent;
