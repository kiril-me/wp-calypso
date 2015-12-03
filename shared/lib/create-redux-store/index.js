/**
 * External dependencies
 */
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

/**
 * Internal dependencies
 */
import reducers from './reducers';
import { analyticsMiddleware } from 'lib/themes/middlewares.js';

export default () => {
	return applyMiddleware(
		thunkMiddleware,
		analyticsMiddleware
	)( createStore )( reducers );
};
