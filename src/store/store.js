import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { connectRouter } from 'connected-react-router'

import authReducer from 'reducers/authReducer';
import commonReducer from 'reducers/commonReducer';
import settingsReducer from 'reducers/settingsReducer';
import { uiAuthReducer } from 'reducers/uiAuthReducer';
import { foldersReducer } from 'reducers/foldersReducer';
import { auditReducer } from 'reducers/auditReducer';
import { uiAuditReducer } from 'reducers/uiAuditReducer';
import { searchReducer } from 'reducers/searchReducer';
import { documentsReducer } from 'reducers/documentsReducer';
import { adminFoldersReducer } from 'reducers/adminFoldersReducer';
import { tagsReducer } from 'reducers/tagsReducer';
import { reportsReducer } from 'reducers/reportsReducer'
import { firmReducer } from 'reducers/firmReducer'
import { informationReducer } from 'reducers/informationReducer'
import { breadcrumbsReducer } from 'reducers/breadcrumbsReducer'
import { savedSearchesReducer } from 'reducers/savedSearchesReducer'
import { sharedDocumentReducer } from 'reducers/sharedDocumentReducer';


export const history = createBrowserHistory();

const composeEnhancers =
	(typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
	|| compose;

const rootReducer = (history) => combineReducers({
	router: connectRouter(history),
	auth: authReducer,
	uiAuth: uiAuthReducer,
	settings: settingsReducer,
	common: commonReducer,
	folders: foldersReducer,
	audit: auditReducer,
	uiAudit: uiAuditReducer,
	searchs: searchReducer,
	documents: documentsReducer,
	adminFolders: adminFoldersReducer,
	tags: tagsReducer,
	reports:reportsReducer, 
	firm:firmReducer,
	savedSearches: savedSearchesReducer,
	info:informationReducer,
	crumbs:breadcrumbsReducer,
	sharedDocument: sharedDocumentReducer,
});

export const store = createStore(
	rootReducer(history),
	composeEnhancers(
		applyMiddleware(thunk)
	),
);


