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
import DownloadInformationPanel from './download-information-panel';
import Spinner from 'components/spinner';

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
							disabled={ !this.props.canStartExport }
							isPrimary={ true }
							onClick={ this.props.startExport }
						>
							{ this.props.shouldShowProgress ? this.translate( 'Exporting…' ) : this.translate( 'Export' ) }
						</Button>
						{ this.props.shouldShowProgress &&
							<div className="exporter__export-spinner">
								<Spinner size={ 24 } />
							</div>
						}
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
						canStartExport={ this.props.canStartExport }
						onToggleFieldset={ this.props.toggleSection }
						onClickExport={ this.props.startExport }
					/>
				}

				{
					( this.props.downloadURL || this.props.failureReason ) &&
					<DownloadInformationPanel
						downloadURL={ this.props.downloadURL }
						downloadFilename={ this.props.downloadFilename }
						failureReason={ this.props.failureReason } />
				}

			</div>
		);
	}
} );
