import React, { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import queryString from 'query-string';
import { useDispatch, useSelector } from 'react-redux';

import { EditTextSearch } from './ui/EditTextSearch';
import { TableSearch } from './ui/TableSearch';
import { startSearchLoading } from '../../actions/search';

const Search = () => {

	const dispatch = useDispatch();
	const location = useLocation();

	const { id, page } = useParams()

	const { folderId } = queryString.parse(location.search);
	
	let page_url = '1'


	
	if(page){
		page_url = page.trim() || page? page.replace(/[a-zA-Z ]/g,''): 1
	}
	


	const { authUser } = useSelector(state => state.auth);


	
	useEffect(() => {

		if (!id || !authUser) {
			return;
		}
		dispatch(startSearchLoading(authUser, undefined, undefined, id,page_url));

	}, [dispatch, id, authUser]); 

	return (
		<div>
			<EditTextSearch />
			 <TableSearch /> 
		</div>
	)
}

export default Search;
