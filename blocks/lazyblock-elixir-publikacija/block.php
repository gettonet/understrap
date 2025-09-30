<?php

defined( 'ABSPATH' ) || exit;

$parent_id = intval($attributes['publikacija']);
if($parent_id) {
    // Get child posts
    $child_posts = get_children(array(
        'post_parent' => $parent_id,
        'post_type' => 'publikacija',
        'orderby' => 'menu_order',
        'order' => 'ASC',
        'posts_per_page' => -1
    ));
    
    // If no children found
    if (empty($child_posts)) {
        echo '<div class="alert alert-info">No child publications found.</div>';
    }
    
    // Convert to array for easier handling
    $posts_array = array();
    foreach ($child_posts as $child) {
        $posts_array[] = array(
            'id' => $child->ID,
            'title' => $child->post_title,
            'content' => apply_filters('the_content', $child->post_content)
        );
    }
    
    // Create the HTML output
    $output = '<div id="publication-viewer" class="publication-viewer-container" data-parent="' . $parent_id . '">';
    
    // Form with select field
    $output .= '<div class="publication-selector mb-4">';
    $output .= '<form class="row g-3 align-items-center">';
    $output .= '<div class="col-md-12">';
    $output .= '<div class="form-floating">';
    $output .= '<select id="publication-select" class="form-select">';
    
    foreach ($posts_array as $index => $post) {
        $selected = ($index === 0) ? 'selected' : '';
        $output .= '<option value="' . $post['id'] . '" ' . $selected . '>' . esc_html($post['title']) . '</option>';
    }
    
    $output .= '</select>';
    $output .= '<label for="publication-select">Sadržaj:</label>';
    $output .= '</div>';
    $output .= '</div>';
    $output .= '</form>';
    $output .= '</div>';
    
    // Content area
    $output .= '<div id="publication-content" class="publication-content mb-4">';
    $output .= $posts_array[0]['content']; // Display first post by default
    $output .= '</div>';
    
    // Navigation buttons
    $output .= '<div class="publication-navigation d-flex justify-content-between">';
    $prev_disabled = ' disabled';
    $output .= '<button id="prev-publication" class="btn btn-primary' . $prev_disabled . '" data-current-index="0" data-total="' . count($posts_array) . '">Previous</button>';
    
    $next_disabled = (count($posts_array) <= 1) ? ' disabled' : '';
    $output .= '<button id="next-publication" class="btn btn-primary' . $next_disabled . '" data-current-index="0" data-total="' . count($posts_array) . '">Next</button>';
    $output .= '</div>';
    
    $output .= '</div>'; // End publication-viewer container
    
    echo $output;
}

ob_start();
?>
<script>
/**
 * JavaScript for Publication Viewer AJAX functionality
 */
(function($) {
    $(document).ready(function() {
        const $select = $('#publication-select');
        const $content = $('#publication-content');
        const $prevBtn = $('#prev-publication');
        const $nextBtn = $('#next-publication');
        
        // Function to load content via AJAX
        function loadContent(postId) {
            $.ajax({
                url: pubViewerData.ajax_url,
                type: 'POST',
                data: {
                    action: 'load_publication_content',
                    post_id: postId,
                    nonce: elixirAjax.ajax_nonce
                },
                beforeSend: function() {
                    // Add loading indicator
                    $content.html('<div class="text-center"><div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div></div>');
                },
                success: function(response) {
                    if (response.success) {
                        // Update content
                        $content.html(response.data.content);
                        
                        // Update select value if it was triggered by prev/next buttons
                        $select.val(response.data.id);
                        
                        // Update navigation buttons
                        updateNavButtons(response.data.current_index, response.data.total);
                        
                        // Scroll to top of viewer
                        $('html, body').animate({
                            scrollTop: $('#publication-viewer').offset().top - 50
                        }, 300);
                    } else {
                        $content.html('<div class="alert alert-danger">Error loading content</div>');
                    }
                },
                error: function() {
                    $content.html('<div class="alert alert-danger">Error loading content</div>');
                }
            });
        }
        
        // Function to update navigation button states
        function updateNavButtons(currentIndex, total) {
            // Reset buttons
            $prevBtn.prop('disabled', false);
            $nextBtn.prop('disabled', false);
            
            // Update data attributes
            $prevBtn.attr('data-current-index', currentIndex);
            $nextBtn.attr('data-current-index', currentIndex);
            
            // Disable prev button if at first item
            if (currentIndex === 0) {
                $prevBtn.prop('disabled', true);
            }
            
            // Disable next button if at last item
            if (currentIndex === total - 1) {
                $nextBtn.prop('disabled', true);
            }
        }
        
        // Handle select change
        $select.on('change', function() {
            const postId = $(this).val();
            loadContent(postId);
        });
        
        // Handle previous button click
        $prevBtn.on('click', function() {
            const currentIndex = parseInt($(this).attr('data-current-index'));
            
            if (currentIndex > 0) {
                const newIndex = currentIndex - 1;
                const newPostId = $select.find('option').eq(newIndex).val();
                loadContent(newPostId);
            }
        });
        
        // Handle next button click
        $nextBtn.on('click', function() {
            const currentIndex = parseInt($(this).attr('data-current-index'));
            const total = parseInt($(this).attr('data-total'));
            
            if (currentIndex < total - 1) {
                const newIndex = currentIndex + 1;
                const newPostId = $select.find('option').eq(newIndex).val();
                loadContent(newPostId);
            }
        });
    });
})(jQuery);
</script>
<?php 
$script = ob_get_clean();
$script = str_replace(['<script>', '</script>'], '', $script);
wp_add_inline_script('elixir-scripts', $script, 'after');