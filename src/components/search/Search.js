import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { useDispatch, useSelector } from 'react-redux';

import { EditTextSearch } from './ui/EditTextSearch';
import { TableSearch } from './ui/TableSearch';
import { startSearchLoading } from '../../actions/search';

const Search = () => {

	const dispatch = useDispatch();
	const location = useLocation();

	const { folderId } = queryString.parse(location.search);

	const { authUser } = useSelector(state => state.auth);

	useEffect(() => {

		if (!folderId || !authUser) {
			return;
		}

		dispatch(startSearchLoading(authUser, undefined, undefined, folderId));

	}, [dispatch, folderId, authUser]);

	return (
		<div>
			<EditTextSearch />
			<TableSearch />
		</div>
	)
}

export default Search;
