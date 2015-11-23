/**
 * External dependencies
 */
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import Exporter from './exporter';
import { toggleAdvancedSettings, toggleSection } from 'lib/site-settings/exporter/actions';

function mapStateToProps( state ) {
	return {
		advancedSettings: state.siteSettings.exporter.ui.toJS().advancedSettings,
	}
}

function mapDispatchToProps( dispatch ) {
	return {
		toggleAdvancedSettings: () => dispatch( toggleAdvancedSettings() ),
		toggleSection: ( section ) => dispatch( toggleSection( section ) )
	}
}

export default connect( mapStateToProps, mapDispatchToProps )( Exporter );
