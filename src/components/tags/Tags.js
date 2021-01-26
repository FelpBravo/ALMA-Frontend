import React, { useEffect } from 'react';
import IntlMessages from 'util/IntlMessages';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import LabelIcon from '@material-ui/icons/Label';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Link from '@material-ui/core/Link';
import { useDispatch, useSelector } from 'react-redux';
import { startTagsInitLoading, openModalTags, startDeleteTagsLoading, setTagsList, setActionModalTags } from 'actions/tags';
import ModalTags from './ui/ModalTags';
import { Avatar, Divider } from '@material-ui/core';
import Swal from 'sweetalert2';
import { ACTION_CREATE, ACTION_EDIT } from 'constants/constUtil';

const useStyles = makeStyles((theme) => ({
	root: {
	flexGrow: 1,
	marginTop: 30,
	},
	demo: {
	width: '53%',
	//border:'2px solid #E1F0FF',
	//borderRadius:'5px',
	},
	}));

const Tags = () => {
	const dispatch = useDispatch();
	const { taglist = [],} = useSelector(state => state.tags);
	console.log('somos los tags',taglist)

	
	useEffect(() => {

			dispatch(startTagsInitLoading());
		
	}, [dispatch]);

	const classes = useStyles();
    const [secondary, setSecondary] = React.useState(false);
   

  const handleSelectActionTags = async (type, id, tag, hex) => {

	switch (type) {
		case 1:

			dispatch(openModalTags());
			dispatch(setActionModalTags(ACTION_CREATE));
			dispatch(setTagsList({
				tag: '',
				hex: '',
				id: 0,
			}));
			
			break;

		case 2:

			dispatch(openModalTags());
			dispatch(setActionModalTags(ACTION_EDIT));
			dispatch(setTagsList({
				tag,
				hex,
				id,
			}));

			break;

		case 3:
			
		    const resp = await Swal.fire({
			title: 'tags',
			text: "¿Está seguro de continuar?",
			icon: "question",
			showCancelButton: true,
			focusConfirm: true,
			heightAuto: false,
		});

		if (resp.value) {
			dispatch(startDeleteTagsLoading(id));
		}

		break;

		default:
			break;
	}

}

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
										</Grid>

										<Grid item xs={4}>
											<Link component="button" variant="body2" onClick={() => handleSelectActionTags(1)}>
												<AddIcon color='primary'/>
												Crear nueva etiqueta
											</Link>
										</Grid>
									</Grid>
									<div className={classes.demo} >
									{ 
										  taglist.map((item) => (
										<List key={item.id}> 
										
											<ListItem >
												
											<ListItemAvatar>
												<Avatar style={{ backgroundColor:'#E1F0FF'}}>
												<LabelIcon color='primary'/>
												</Avatar>
											</ListItemAvatar>
											<ListItemText
											primary={item.tag}
											secondary={secondary ? 'Secondary text' : null}
											/>
											<ListItemSecondaryAction>
											<div>
												<i
													onClick={() => handleSelectActionTags(2,item.tag, item.hex, item.id)}
													className="far fa-edit cursor-pointer custom-link-dash mr-2"
												></i>
												<i
													onClick={() => handleSelectActionTags(3, item.id)}
													className="far fa-trash-alt cursor-pointer custom-link-dash"
												></i>

											</div>
											
											</ListItemSecondaryAction>
											
											</ListItem>
											
											<Divider className="mt-2" style={{ backgroundColor:'#E1F0FF'}}/>
										</List>
										))}
									</div>
								</div>

						</div>
					</div>

				</div>
			</div>
			<ModalTags/>
		</div>

	)
}

export default Tags;
