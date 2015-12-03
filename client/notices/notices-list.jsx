/**
 * External Dependencies
 */
import React from 'react';
import classNames from 'classnames';
import debugModule from 'debug';

/**
 * Internal Dependencies
 */
import Notice from 'components/notice';
import notices from 'notices';
import observe from 'lib/mixins/data-observe';
import DeleteSiteNotices from './delete-site-notices';

const debug = debugModule( 'calypso:notices' );

export default React.createClass( {

	displayName: 'NoticesList',

	mixins: [ observe( 'notices' ) ],

	propTypes: {
		id: React.PropTypes.string,
		notices: React.PropTypes.oneOfType( [
			React.PropTypes.object,
			React.PropTypes.array
		] ),
		forcePinned: React.PropTypes.bool
	},

	getInitialState() {
		return { pinned: this.props.forcePinned };
	},

	getDefaultProps() {
		return {
			id: 'overlay-notices',
			notices: Object.freeze( [] ),
			forcePinned: false
		};
	},

	componentWillMount() {
		debug( 'Mounting Notices React component.' );
	},

	componentDidMount() {
		if ( ! this.props.forcePinned ) {
			window.addEventListener( 'scroll', this.updatePinnedState );
		}
	},

	componentDidUpdate( prevProps ) {
		if ( this.props.forcePinned && ! prevProps.forcePinned ) {
			window.removeEventListener( 'scroll', this.updatePinnedState );
			this.setState( { pinned: true } );
		} else if ( ! this.props.forcePinned && prevProps.forcePinned ) {
			window.addEventListener( 'scroll', this.updatePinnedState );
			this.updatePinnedState();
		}
	},

	componentWillUnmount() {
		window.removeEventListener( 'scroll', this.updatePinnedState );
	},

	updatePinnedState() {
		this.setState( { pinned: window.scrollY > 0 } );
	},

	removeNotice( notice ) {
		if ( notice ) {
			notices.removeNotice( notice );
		}
	},

	render() {
		const noticesRaw = this.props.notices[ this.props.id ] || [];
		const noticesList = noticesRaw.map( function( notice, index ) {
				return (
					<Notice
						key={ 'notice-' + index }
						status={ notice.status }
						text={ notice.text }
						isCompact={ notice.isCompact }
						onClick={ this.removeNotice.bind( this, notice ) }
						showDismiss={ notice.showDismiss }
					/>
				);
			}, this );

		return (
			<div>
				<div id={ this.props.id } className={ classNames( 'notices-list', { 'is-pinned': this.state.pinned } ) }>
					<DeleteSiteNotices />
					{ noticesList }
				</div>
				{ this.state.pinned && ! this.props.forcePinned
					? <div className="notices-list__whitespace" />
					: null }
			</div>
		);
	}
} );
