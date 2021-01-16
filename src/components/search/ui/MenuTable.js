import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IntlMessages from 'util/IntlMessages';
import { MoreVert } from '@material-ui/icons';
import { Typography, Popover } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { startSubscribeDocument } from 'actions/search';

const ITEM_HEIGHT = 48;

const useStyles = makeStyles((theme) => ({
	icon: {
		cursor: "pointer",
		color: "#2196f3",
	},
	popoverContent: {
		padding: 8,
		cursor: "pointer",
	},
}));

export const MenuTable = ({ id, isFavorite }) => {

	const classes = useStyles();

	const dispatch = useDispatch();

	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);

	const handleClose = () => {
		setAnchorEl(null);
		dispatch(startSubscribeDocument(id));
	};

	return (
		<div>

			<MoreVert
				className={classes.icon}
				onClick={(event) =>
					setAnchorEl(event.currentTarget)
				}
			/>
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={() => setAnchorEl(null)}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "left",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "center",
				}}
			>
				<Typography
					className={classes.popoverContent}
					onClick={handleClose}
				>
					{
						isFavorite
							?
							<IntlMessages id="table.search.unsubscribe" />
							:
							<IntlMessages id="table.search.subscribe" />
					}
				</Typography>
			</Popover>
		</div>
	);
}
