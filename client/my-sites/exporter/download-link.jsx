/**
 * External dependencies
 */
import React, { Component } from 'react';

/**
 * Internal dependencies
 */
import Gridicon from 'components/gridicon';
import Spinner from 'components/spinner';

export default React.createClass( {
	render() {
		if ( this.props.isLoading ) {
			return (
				<span>
					<Spinner size={ 16 } />
					{ this.translate( 'Exporting…' ) }
				</span>
			);
		}

		return (
			<a href={ this.props.downloadURL }>
				<Gridicon icon="cloud-download" size={ 18 } className="exporter__download-icon" />
				<span className="exporter__download-link-text">{ this.props.downloadFilename }</span>
			</a>
		);
	}
} );
