/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { compose, ifCondition } = wp.compose;
const { PluginPostStatusInfo } = wp.editPost;
const { select, withSelect, withDispatch } = wp.data;
const { withSpokenMessages, CheckboxControl } = wp.components;

class DisableTitle extends Component {
	constructor() {
		super( ...arguments );

		this.initialize = this.initialize.bind( this );
	}

	componentDidMount() {
		this.initialize();
	}

	componentDidUpdate() {
		this.initialize();
	}

	initialize() {
		const { isDisabled, postmeta } = this.props;

		const titleBlock = document.querySelector( '.editor-post-title__input' );
		const editorWrapper = document.querySelector( '.editor-styles-wrapper' );

		if ( titleBlock ) {
			
			const isHidden = typeof postmeta !== 'undefined' && typeof postmeta._elixir_title_hidden !== 'undefined' ? postmeta._elixir_title_hidden : false;
			const bodyClass = isHidden ? 'elixir-title-hidden' : 'elixir-title-visible';

			//remove existing class
			if ( isHidden ) {
				editorWrapper.classList.remove( 'elixir-title-visible' );
			} else {
				editorWrapper.classList.remove( 'elixir-title-hidden' );
			}

			editorWrapper.classList.add( bodyClass );

			//hide if disabled
			if ( isDisabled ) {
				editorWrapper.classList.add( 'elixir-title-visible-disabled' );
			} else {
				editorWrapper.classList.remove( 'elixir-title-visible-disabled' );
			}
		}
	}

	render() {
		const { onToggle, postmeta, posttype } = this.props;

		if ( [ 'wp_block' ].includes( posttype ) ) {
			return false;
		}

		const isHidden = typeof postmeta !== 'undefined' && typeof postmeta._elixir_title_hidden !== 'undefined' ? postmeta._elixir_title_hidden : false;

		return (
			<PluginPostStatusInfo>
				<CheckboxControl
					className="elixir-hide-title-label"
					label={ __( 'Hide ' + posttype + ' Title' ) }
					checked={ isHidden }
					onChange={ onToggle }
					help={ isHidden ? __( 'Title is hidden on your website.' ) : null }
				/>
			</PluginPostStatusInfo>
		);
	}
}

export default compose(
	withSelect( () => {
		return {
			posttype: select( 'core/editor' ).getEditedPostAttribute( 'type' ),
			postmeta: select( 'core/editor' ).getEditedPostAttribute( 'meta' ),
			isDisabled: select( 'core/edit-post' ).isFeatureActive( 'disableeditorToggleTitleTools' ),
		};
	} ),
	withDispatch( ( dispatch, ownProps ) => {
		let metavalue;
		if ( typeof ownProps.postmeta !== 'undefined' && typeof ownProps.postmeta._elixir_title_hidden !== 'undefined' ) {
			metavalue = ownProps.postmeta._elixir_title_hidden;
		}
		return {
			onToggle() {
				dispatch( 'core/editor' ).editPost( {
					meta: {
						'_elixir_title_hidden': ! metavalue,
					},
				} );
			},
		};
	} ),
	ifCondition( ( props ) => {
		return ! props.isDisabled;
	} ),
	withSpokenMessages,
)( DisableTitle );
