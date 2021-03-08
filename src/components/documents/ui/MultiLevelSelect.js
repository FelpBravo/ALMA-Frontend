import React, { useEffect, useState } from 'react';
import {
	Dialog, TextField, DialogContent, DialogTitle, DialogActions, Button,
	IconButton, ListItemText, ListItem, Breadcrumbs, List, Collapse, makeStyles
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { detailDocumentSetValueField } from 'actions/documents';
import { createUUID } from 'helpers/createUUID';

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
	},
}));

export const MultiLevelSelect = (
	{
		sectionId,
		name,
		label,
		type,
		value: valueProps = '',
		propertyItemList = [],
		required
	}
) => {

	const classes = useStyles();

	const dispatch = useDispatch();

	const [currentLevel, setCurrentLevel] = useState(0);
	const [openModal, setOpenModal] = useState(false);
	const [currentValues, setCurrentValues] = useState([]);
	const [steps, setSteps] = useState([]);
	const [value, setValue] = useState('');
	const [lastValues, setLastValues] = useState([]);
	const [lastSteps, setLastSteps] = useState([]);
	const [lastLevel, setLastLevel] = useState(0);

	useEffect(() => {

		setValue(valueProps)

	}, [valueProps, setValue]);

	const handleOpenModal = () => {
		setCurrentValues(lastValues);
		setSteps(lastSteps);
		setCurrentLevel(lastLevel);
		setOpenModal(true);
	}

	const handleCloseModal = () => {
		if (!value) {
			setCurrentLevel(0);
			setSteps([]);
		}
		setOpenModal(false);
	}

	const handleClickItem = (element) => {
		if (element.propertyItemList) {
			setCurrentValues(element.propertyItemList);
			setSteps((current) => [...current, element.value]);
			setCurrentLevel(currentLevel + 1);
		} else {
			setValue(element.value);
			setLastValues(currentValues);
			setLastSteps(steps);
			setLastLevel(currentLevel);
			setOpenModal(false);

			dispatch(detailDocumentSetValueField(sectionId, name, element.value));
		}
	}

	const renderSubLevel = () => {
		return currentValues.map((element) =>
			element ? (
				<ListItem
					key={createUUID()}
					button
					onClick={() => handleClickItem(element)}
				>
					<ListItemText primary={element.value}></ListItemText>
					{
						element.propertyItemList ? (
							<IconButton edge="end" aria-label="delete">
								<i className="fas fa-chevron-right" style={{ fontSize: 15 }}></i>
							</IconButton>
						) : null
					}
				</ListItem>
			) : null
		);
	}

	const renderFirstLevel = () => {
		return propertyItemList.map((element) =>
			element ? (
				<ListItem
					key={createUUID()}
					button
					onClick={() => handleClickItem(element)}
				>
					<ListItemText primary={element.value}></ListItemText>
					{
						element.propertyItemList ? (
							<IconButton edge="end" aria-label="delete">
								<i className="fas fa-chevron-right" style={{ fontSize: 15 }}></i>
							</IconButton>
						) : null
					}
				</ListItem>
			) : null
		);
	}

	const searchNode = (propertyList, nodeId) => {

		for (const property of propertyList) {
			if (property.value === nodeId) {
				return property;
			} else {
				if (property.propertyItemList) {
					return searchNode(property.propertyItemList, nodeId);
				}
			}
		}

	}

	const handleClickBreadcrum = (value) => {
		if (value === 0) {
			setCurrentLevel(0);
			setSteps([]);
		} else {
			let nodes = searchNode(propertyItemList, value);
			if (nodes) {
				setCurrentValues(nodes.propertyItemList);
			}
			const index = steps.indexOf(value);
			const st = steps;
			if (index != st.length - 1) {
				st.splice(index + 1, st.length);
				setSteps(st);
			}
		}
	};

	const renderBreadcrumb = () => {
		return steps.map((element) =>
			element ? (
				<span
					key={element}
					className="general-link"
					onClick={() => handleClickBreadcrum(element)}
				>
					{element}
				</span>
			) : null
		);
	}

	return (
		<>
			<TextField
				label={label}
				variant="outlined"
				color="primary"
				onClick={handleOpenModal}
				value={value ? value : ''}
				fullWidth
				required={required}
				size="small"
			/>

			<Dialog
				open={openModal}
				onClose={handleCloseModal}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle
					id="form-dialog-title"
				>
					{label}
				</DialogTitle>

				<DialogContent>
					<Breadcrumbs aria-label="breadcrumb">
						<span
							className="general-link"
							onClick={() => handleClickBreadcrum(0)}
						>
							#
            			</span>
						{renderBreadcrumb()}
					</Breadcrumbs>

					<Collapse
						in={currentLevel === 0}
					>
						<List className={classes.root}>
							{renderFirstLevel(propertyItemList)}
						</List>
					</Collapse>

					<Collapse
						in={currentLevel !== 0}
					>
						{renderSubLevel()}
					</Collapse>

				</DialogContent>

				<DialogActions>
					<Button
						onClick={handleCloseModal}
						color="primary">
						Cancelar
          			</Button>
				</DialogActions>

			</Dialog>
		</>
	)
}
