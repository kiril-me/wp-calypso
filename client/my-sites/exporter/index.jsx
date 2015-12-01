/**
 * External dependencies
 */
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import Exporter from './exporter';

import {
	canStartExport,
	shouldShowProgress
} from 'lib/site-settings/exporter/selectors';

import {
	toggleAdvancedSettings,
	toggleSection,
	startExport
} from 'lib/site-settings/exporter/actions';

function mapStateToProps( state ) {
	return {
		advancedSettings: state.siteSettings.exporter.ui.toJS().advancedSettings,
		downloadURL: state.siteSettings.exporter.ui.get( 'downloadURL' ),
		downloadFilename: state.siteSettings.exporter.ui.get( 'downloadFilename' ),
		failureReason: state.siteSettings.exporter.ui.get( 'failureReason' ),
		canStartExport: canStartExport( state ),
		shouldShowProgress: shouldShowProgress( state )
	};
}

function mapDispatchToProps( dispatch ) {
	return {
		toggleAdvancedSettings: () => dispatch( toggleAdvancedSettings() ),
		toggleSection: ( section ) => dispatch( toggleSection( section ) ),
		startExport: () => startExport()( dispatch )
	};
}

export default connect( mapStateToProps, mapDispatchToProps )( Exporter );
