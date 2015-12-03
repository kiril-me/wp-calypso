/**
 * External dependencies
 */
import config from 'config';
import page from 'page';

/**
 * Internal dependencies
 */
import controller from './controller';
import removeOverlay from 'remove-overlay';

export default function() {

	//page( '/sites/:sitesFilter?', controller.siteSelection, controller.sites );
  const menu = config('header_menu');
  page('/cms', controller.sidebar, controller.profile );

};
