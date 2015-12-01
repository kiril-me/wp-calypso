/**
 * External dependencies
 */
import React, { Component } from 'react';

/**
 * Internal dependencies
 */
import CompactCard from 'components/card/compact';
import DownloadLink from './download-link';

export default React.createClass( {
	render() {
		return (
			<CompactCard>
				<h1 className="exporter__success-heading">
					{ this.translate( 'Your Export was Successful!' ) }
				</h1>
				<p className="exporter__download-label">
					{ this.translate( 'Download your export file here:' ) }
				</p>
				<DownloadLink
					downloadURL={ this.props.downloadURL }
					downloadFilename={ this.props.downloadFilename } />
			</CompactCard>
		);
	}
} );
