import { connectRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import { adminFoldersReducer } from 'reducers/adminFoldersReducer';
import { adminUsersReducer } from 'reducers/adminUsersReducer';
import { auditReducer } from 'reducers/auditReducer';
import authReducer from 'reducers/authReducer';
import { breadcrumbsReducer } from 'reducers/breadcrumbsReducer'
import commonReducer from 'reducers/commonReducer';
import { documentsReducer } from 'reducers/documentsReducer';
import { firmReducer } from 'reducers/firmReducer'
import { flowDocumentReducer } from 'reducers/flowDocumentReducer';
import { foldersReducer } from 'reducers/foldersReducer';
import { informationReducer } from 'reducers/informationReducer'
import { modulePermissionsReducer } from 'reducers/modulePermissionReducer';
import { reportsReducer } from 'reducers/reportsReducer'
import { restorePasswordReducer } from 'reducers/restorePasswordReducer';
import { savedSearchesReducer } from 'reducers/savedSearchesReducer'
import { searchReducer } from 'reducers/searchReducer';
import settingsReducer from 'reducers/settingsReducer';
import { sharedDocumentReducer } from 'reducers/sharedDocumentReducer';
import { tagsReducer } from 'reducers/tagsReducer';
import { uiAuditReducer } from 'reducers/uiAuditReducer';
import { uiAuthReducer } from 'reducers/uiAuthReducer';
import { notificationsReducer } from 'reducers/notificationsReducer';

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
	adminUsers: adminUsersReducer,
	sharedDocument: sharedDocumentReducer,
	restorePassword: restorePasswordReducer,
	modulePermissions: modulePermissionsReducer,
	flowDocument: flowDocumentReducer,
	notifications: notificationsReducer,
});

export const store = createStore(
	rootReducer(history),
	composeEnhancers(
		applyMiddleware(thunk)
	),
);


