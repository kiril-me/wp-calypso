/**
 * External dependencies
 */
import React, { PropTypes } from 'react';

/**
 * Internal dependencies
 */
import CompactCard from 'components/card/compact';
import Gridicon from 'components/gridicon';
import Button from 'components/forms/form-button';
import AdvancedSettings from 'my-sites/exporter/advanced-settings';

export default React.createClass( {
	displayName: 'Exporter',

	propTypes: {
		advancedSettings: PropTypes.shape( {
			isVisible: PropTypes.bool.isRequired
		} )
	},

	render: function() {
		return (
			<div className="section-export">
				<CompactCard>
					<header>
						<Button
							className="exporter__export-button"
							disabled={ false }
							isPrimary={ true }
						>
							{ this.translate( 'Export' ) }
						</Button>
						<h1 className="exporter__title">
							{ this.translate( 'Download an Export File' ) }
						</h1>
					</header>
					<a href="#" onClick={ this.props.toggleAdvancedSettings }>
						<Gridicon
							icon={ this.props.advancedSettings.isVisible ? 'chevron-up' : 'chevron-down' }
							size={ 16 } />
						{ this.translate( 'Advanced Export Settings' ) }
					</a>
				</CompactCard>

				{
					this.props.advancedSettings.isVisible &&
					<AdvancedSettings
						{ ...this.props.advancedSettings }
						onToggleFieldset={ this.props.toggleSection }
					/>
				}
			</div>
		);
	}
} );
