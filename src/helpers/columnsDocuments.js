import React from 'react';
import IntlMessages from '../util/IntlMessages';
import { createUUID } from './createUUID';

export const columnsDocuments = [
	{
		id: createUUID(),
		align: false,
		disablePadding: true,
		label: <IntlMessages id="table.search.documentName" />
	},
	{
		id: createUUID(),
		align: true,
		disablePadding: false,
		label: <IntlMessages id="table.search.responsable" />
	},
	{
		id: createUUID(),
		align: true,
		disablePadding: false,
		label: <IntlMessages id="table.search.createdAt" />
	},
	{
		id: createUUID(),
		align: true,
		disablePadding: false,
		label: <IntlMessages id="table.search.modifiedAt" />
	},
	{
		id: createUUID(),
		align: true,
		disablePadding: false,
		label: <IntlMessages id="table.search.tags" />
	},
	{
		id: createUUID(),
		align: true,
		disablePadding: false,
		label: <IntlMessages id="table.search.version" />
	},
	/*{
		id: createUUID(),
		align: true,
		disablePadding: false,
		label: <IntlMessages id="table.search.id" />
	},*/
	{
		id: createUUID(),
		align: true,
		disablePadding: false,
		label: <IntlMessages id="table.search.flags" />
	},
	{
		id: createUUID(),
		align: true,
		disablePadding: false,
		label: <IntlMessages id="table.search.actions" />
	},
	{
		id: createUUID(),
		align: true,
		disablePadding: false,
		label: ''
	},
];

export const getDate = (date) => {
	date = new Date(date);
	console.log(date);
	const year = date.getFullYear();
	const month = getFormatDate(date.getMonth() + 1);
	const day = getFormatDate(date.getDate());
	return `${day}-${month}-${year}`;
};

const getFormatDate = (date) => {
	return date < 10 ? `0${date}` : date;
}