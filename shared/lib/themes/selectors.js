/**
 * External dependencies
 */
import filter from 'lodash/collection/filter';
import pluck from 'lodash/collection/pluck';

// TODO: DRY, reuse these selectors in ./stores
export function isJetpack( state ) {
	return state.themes.themesLastQuery.get( 'isJetpack' );
}

export function getParams( state ) {
	return state.themes.themesLastQuery.get( 'lastParams' ) || {};
}

export function hasSiteChanged( state ) {
	return state.themes.themesLastQuery.get( 'previousSiteId' ) !==
		state.themes.themesLastQuery.get( 'currentSiteId' );
};

export function hasParams( state ) {
	return !! state.themes.themesLastQuery.get( 'lastParams' );
}

export function isFetchingNextPage( state ) {
	return state.themes.themesList.getIn( [ 'queryState', 'isFetchingNextPage' ] );
}

export function isLastPage( state ) {
	return state.themes.themesList.getIn( [ 'queryState', 'isLastPage' ] );
}

export function getThemes( state ) {
	return state.themes.themes.get( 'themes' ).toJS();
}

export function getThemeById( state, id ) {
	const theme = state.themes.themes.getIn( [ 'themes', id ] );
	return theme ? theme.toJS() : undefined;
}

export function getThemesList( state ) {
	return state.themes.themesList.get( 'list' );
}

export function getFilteredThemes( state, search ) {
	const allThemes = getThemesList( state )
		.map( getThemeById.bind( null, state ) );

	if ( ! isJetpack( state ) || ! search ) {
		return allThemes;
	}

	return filter( allThemes, theme => matches( theme, search ) );
}

function matches( theme, rawSearch ) {
	const search = rawSearch.toLowerCase().trim();

	return [ 'name', 'tags', 'description', 'author' ].some( field => (
		theme[ field ] && join( theme[ field ] )
			.toLowerCase().replace( '-', ' ' )
			.indexOf( search ) >= 0
	) );
}

function join( value ) {
	return Array.isArray( value ) ? value.join( ' ' ) : value;
}
