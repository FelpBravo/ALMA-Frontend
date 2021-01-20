import React from 'react';
import IntlMessages from 'util/IntlMessages';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import LabelIcon from '@material-ui/icons/Label';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Link from '@material-ui/core/Link';


function generate(element) {
	return [0, 1, 2].map((value) =>
	 React.cloneElement(element, {
	      key: value,
	    }),
	  );
	}

const useStyles = makeStyles((theme) => ({
	root: {
	flexGrow: 1,
	marginTop: 30,
	},
	demo: {
	backgroundColor: theme.palette.background.paper,
	},
	title: {
	margin: theme.spacing(4, 0, 2),
	},
	}));

const Tags = () => {
	const classes = useStyles();
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);
   
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

	return (
		<div className="row">
			<div className="col-xl-12 col-lg-12 col-md-12 col-12">
				<div className="jr-card">

					<div className="row">
						<div className="col-xl-12 col-lg-12 col-md-12 col-12">

							<div className="jr-card-header d-flex align-items-center">
								<h3 className="mb-0">
									<IntlMessages id="tags.title" />
								</h3>
								</div>

		<div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <h4>
                     Listado actual de etiquetas
                    </h4>
						<div className={classes.demo}>
							<List dense={dense}>
							{generate(
								<ListItem>
								<ListItemAvatar>
									<Avatar>
									<LabelIcon color="primary"/>
									</Avatar>
								</ListItemAvatar>
								<ListItemText
								primary="Single-line item"
								secondary={secondary ? 'Secondary text' : null}
								/>
								<ListItemSecondaryAction>
									<IconButton>
									<EditIcon/>
									</IconButton>

									<IconButton edge="end" aria-label="delete">
									<DeleteIcon />
									</IconButton>
								
								</ListItemSecondaryAction>
								</ListItem>,
							)}
							</List>
						</div>
                </Grid>

				<Grid item xs={4}>
					<Link component="button" variant="body2" onClick={handleClickOpen}>
						<AddIcon color='primary'/>
						Crear nueva etiqueta
					</Link>
				</Grid>
            </Grid>
        </div>

						</div>
					</div>


				</div>
			</div>
		</div>

	)
}

export default Tags;
