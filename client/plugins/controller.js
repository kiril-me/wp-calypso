/**
 * External dependencies
 */
import React from 'react';
import includes from 'lodash/collection/includes';
import page from 'page';

/**
 * Internal dependencies
 */
import analytics from 'analytics';
import devicesFactory from 'lib/devices';
import i18n from 'lib/mixins/i18n';
import notices from 'notices';
import route from 'lib/route';
import sitesFactory from 'lib/sites-list';
// import purchasesController from './purchases/controller';
import userFactory from 'lib/user';
import userSettings from 'lib/user-settings';
import titleActions from 'lib/screen-title/actions';

const ANALYTICS_PAGE_TITLE = 'Me',
	devices = devicesFactory(),
	sites = sitesFactory(),
	user = userFactory();

export default {
	sidebar( context, next ) {
		const SidebarComponent = require( 'me/sidebar' );

		React.render(
			React.createElement( SidebarComponent, {
				user,
				context: context
			} ),
			document.getElementById( 'secondary' )
		);

		context.layout.setState( {
			section: 'me',
			noSidebar: false
		} );

		next();
	},

	profile( context ) {
		const ProfileComponent = require( 'me/profile' ),
			basePath = context.path;

		titleActions.setTitle( i18n.translate( 'My Profile', { textOnly: true } ) );

		analytics.pageView.record( basePath, ANALYTICS_PAGE_TITLE + ' > My Profile' );

		React.render(
			React.createElement( ProfileComponent,
				{
					userSettings: userSettings,
					path: context.path
				}
			),
			document.getElementById( 'primary' )
		);
	},

};
