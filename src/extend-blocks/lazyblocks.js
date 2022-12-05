/*wp.hooks.addAction( 'lzb.components.PreviewServerCallback.onBeforeChange', 'elixir', function ( props ) {
    console.log( props );
} );*/
wp.hooks.addAction( 'lzb.components.PreviewServerCallback.onChange', 'elixir', function ( props ) {

//    console.log( props );
        if(props['attributes']['hide-from-website'] === true) {
            jQuery('.'+props['attributes']['blockUniqueClass']).css('opacity','50%');
        } else {
            jQuery('.'+props['attributes']['blockUniqueClass']).css('opacity','100%');
        }

} );