<?php

defined('ABSPATH') || exit;

// AJAX handler to load post content
add_action('wp_ajax_load_publication_content', 'load_publication_content');
add_action('wp_ajax_nopriv_load_publication_content', 'load_publication_content');

function load_publication_content()
{
    // Verify nonce
    if (!isset($_POST['nonce']) || !wp_verify_nonce($_POST['nonce'], 'elixir1605982g2n')) {
        wp_send_json_error('Security check failed');
        wp_die();
    }

    $post_id = isset($_POST['post_id']) ? intval($_POST['post_id']) : 0;

    if (!$post_id) {
        wp_send_json_error('Invalid post ID');
        wp_die();
    }

    // Check if post exists and is of the correct type
    $post = get_post($post_id);

    if (!$post) {
        wp_send_json_error('Post not found or invalid type');
        wp_die();
    }

    // Get post content
    $content = $post->post_content;

    // Parse blocks
    $blocks = parse_blocks($content);
    $rendered_content = '';

    // Manually render each block with proper context
    foreach ($blocks as $block) {
        // For LazyBlocks, we need special handling
        if (strpos($block['blockName'], 'lazyblock/') === 0) {
            // Get the block instance
            $lazyblock = lazyblocks()->blocks()->get_block($block['blockName']);
            
            if ($lazyblock) {
                // Get the complete block attributes by merging parsed attributes with defaults
                $complete_attrs = $block['attrs'];
                
                // Get all the registered attributes for this block type
                $registered_block_type = WP_Block_Type_Registry::get_instance()->get_registered($block['blockName']);
                if ($registered_block_type && isset($registered_block_type->attributes)) {
                    // For each registered attribute, check if it has a default value
                    foreach ($registered_block_type->attributes as $attr_name => $attr_schema) {
                        // If attribute is not in parsed attrs but has a default, add it
                        if (!isset($complete_attrs[$attr_name]) && isset($attr_schema['default'])) {
                            $complete_attrs[$attr_name] = $attr_schema['default'];
                        }
                    }
                }
                
                // Force the context to be 'frontend'
                $inner_content = '';
                
                // If this block has innerBlocks, render them first
                if (!empty($block['innerBlocks'])) {
                    foreach ($block['innerBlocks'] as $inner_block) {
                        $inner_content .= render_block($inner_block);
                    }
                }
                
                // Now render the main block with the complete attributes
                $rendered_block = lazyblocks()->blocks()->render_callback(
                    $complete_attrs,
                    $inner_content,
                    'frontend',
                    $lazyblock
                );
                
                $rendered_content .= $rendered_block;
            } else {
                // Fallback to standard rendering
                $rendered_content .= render_block($block);
            }
        } else {
            // Standard block rendering
            $rendered_content .= render_block($block);
        }
    }

    // Get siblings for navigation
    $siblings = get_children(array(
        'post_parent' => $post->post_parent,
        'post_type' => 'publikacija',
        'orderby' => 'menu_order',
        'order' => 'ASC',
        'fields' => 'ids',
        'posts_per_page' => -1
    ));

    $sibling_ids = array_values($siblings);
    $current_index = array_search($post_id, $sibling_ids);

    $response = array(
        'content' => '<div class="container"><h2 class="text-primary">' . $post->post_title . '</h2></div>' . $rendered_content,
        'title' => $post->post_title,
        'id' => $post_id,
        'current_index' => $current_index,
        'total' => count($sibling_ids)
    );

    wp_send_json_success($response);
    wp_die();
}
