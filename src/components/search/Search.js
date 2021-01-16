import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { useDispatch } from 'react-redux';

import { EditTextSearch } from './ui/EditTextSearch';
import { TableSearch } from './ui/TableSearch';
import { startSearchLoading } from '../../actions/search';

const Search = () => {

	const dispatch = useDispatch();
	const location = useLocation();

	const { folderId } = queryString.parse(location.search);

	useEffect(() => {

		if (!folderId) {
			return;
		}

		dispatch(startSearchLoading(undefined, undefined, folderId));

	}, [folderId]);

	return (
		<div>
			<EditTextSearch />
			<TableSearch />
		</div>
	)
}

export default Search;
