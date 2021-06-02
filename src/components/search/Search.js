import queryString from 'query-string';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';

import { searchClearAllFilters, startSearchLoading } from '../../actions/search';
import { EditTextSearch } from './ui/EditTextSearch';
import { TableSearch } from './ui/TableSearch';

const Search = () => {

	const dispatch = useDispatch();
	const location = useLocation();

	const { id, page, savedSearchId } = useParams()
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

	useEffect(() => {
		if(id) dispatch(searchClearAllFilters());
	}, [id])

	return (
		<div>
			<EditTextSearch savedSearchId={savedSearchId} />
			 <TableSearch /> 
		</div>
	)
}

export default Search;
