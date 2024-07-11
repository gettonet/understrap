<?php

/**
 * Elixir functions and definitions
 *
 * @package Elixir
 */

// Exit if accessed directly.
defined('ABSPATH') || exit;

// Elixir's includes directory.
$elixir_inc_dir = 'inc';

// Array of files to include.
$elixir_includes = array(
    '/theme-settings.php',                  // Initialize theme default settings.
    '/setup.php',                           // Theme setup and custom theme supports.
    '/widgets.php',                         // Register widget area.
    '/enqueue.php',                         // Enqueue scripts and styles.
    '/template-tags.php',                   // Custom template tags for this theme.
    '/pagination.php',                      // Custom pagination for this theme.
    '/extras.php',                          // Custom functions that act independently of the theme templates.
    '/customizer.php',                      // Customizer additions.
    '/custom-comments.php',                 // Custom Comments file.
    '/class-wp-bootstrap-navwalker.php',    // Load custom WordPress nav walker. Trying to get deeper navigation? Check out: https://github.com/elixir/elixir/issues/567.
    '/editor.php',                          // Load Editor functions.
    '/block-editor.php',                    // Load Block Editor functions.
    '/block-extender.php',                  // Load Block Extended functions.
    '/block-patterns.php',                  // Load Block Patterns
    '/deprecated.php',                      // Load deprecated functions.
    '/cpt.php',                             // Custom Post Types.
    '/shortcodes.php',                      // Shortcodes.    
    '/simple_html_dom.php'
);


// Load Jetpack compatibility file if Jetpack is activiated.
if (class_exists('Jetpack')) {
    $elixir_includes[] = '/jetpack.php';
}

// Include files.
foreach ($elixir_includes as $file) {
    require_once get_theme_file_path($elixir_inc_dir . $file);
}


// Carbon.
add_action('after_setup_theme', 'crb_load');
function crb_load()
{
    require_once __DIR__ . '/vendor/autoload.php';
    \Carbon_Fields\Carbon_Fields::boot();
}

add_action('carbon_fields_register_fields', 'elixir_register_custom_fields');
function elixir_register_custom_fields()
{
    global $elixir_inc_dir;
    require_once get_theme_file_path($elixir_inc_dir . '/carbon.php');
}


// LZB.
// LZB.
function lzb_block_disable_frontend_wrapper($allow_wrapper, $attributes, $context)
{
    if ('frontend' == $context) {
        return false;
    }
    return $allow_wrapper;
}
add_filter('lzb/block_render/allow_wrapper', 'lzb_block_disable_frontend_wrapper', 10, 3);
add_filter('lzb/block_render/allow_inner_blocks_wrapper', '__return_false');
//add_filter( 'lzb/show_admin_menu', '__return_false' );

// Remove html comments from frontend.
function callback($buffer)
{
    $buffer = preg_replace('/<!--(.|s)*?-->/', '', $buffer);
    return $buffer;
}
function buffer_start()
{
    ob_start("callback");
}
function buffer_end()
{
    ob_end_flush();
}

add_action('get_header', 'buffer_start');
add_action('wp_footer', 'buffer_end');



//Stop attachment slugs from messing up everything else
add_filter('wp_unique_post_slug', 'elixir_unique_post_slug', 10, 6);
function elixir_unique_post_slug($slug, $post_ID, $post_status, $post_type, $post_parent, $original_slug)
{
    if ('attachment' == $post_type)
        $slug = $original_slug . uniqid('-');
    return $slug;
}

function print_rr($array)
{
    echo '<pre>';
    print_r($array);
    echo '</pre>';
}

function generateRandomString($length = 10)
{
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}


function elixir_header()
{
    echo carbon_get_theme_option('elixir_header');
    if (carbon_get_theme_option('gtm_id')) { ?>
        <!-- Google Tag Manager -->
        <script>
            (function(w, d, s, l, i) {
                w[l] = w[l] || [];
                w[l].push({
                    'gtm.start': new Date().getTime(),
                    event: 'gtm.js'
                });
                var f = d.getElementsByTagName(s)[0],
                    j = d.createElement(s),
                    dl = l != 'dataLayer' ? '&l=' + l : '';
                j.async = true;
                j.src =
                    'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
                f.parentNode.insertBefore(j, f);
            })(window, document, 'script', 'dataLayer', '<?php echo carbon_get_theme_option('gtm_id'); ?>');
        </script>
        <!-- End Google Tag Manager -->
<?php }
};

function elixir_footer()
{
    echo carbon_get_theme_option('elixir_footer');
};

add_action('wp_head', 'elixir_header');
add_action('wp_footer', 'elixir_footer');

function elixir_body_open()
{
    echo carbon_get_theme_option('body_open') ?: '';
}
add_action('wp_body_open', 'elixir_body_open', 5);


function elixir_gtm_noscript()
{
    if (carbon_get_theme_option('gtm_id')) {
        echo '<!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=' . carbon_get_theme_option('gtm_id') . '"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->';
    }
}
add_action('wp_body_open', 'elixir_gtm_noscript', 10);

function remove_classes_from_wp_bootstrap_blocks($classes)
{
    $remove = array(
        'wp-bootstrap-blocks-container',
        'wp-bootstrap-blocks-row',
        'wp-bootstrap-blocks-button'
    );
    return array_diff($classes, $remove);
}

add_filter('wp_bootstrap_blocks_container_classes', 'remove_classes_from_wp_bootstrap_blocks');
add_filter('wp_bootstrap_blocks_row_classes', 'remove_classes_from_wp_bootstrap_blocks');
add_filter('wp_bootstrap_blocks_button_wrapper_classes', 'remove_classes_from_wp_bootstrap_blocks');

function elixir_custom_login_css()
{
    echo '<style type="text/css">.login h1 a { background-size: 100%; width: 320px; max-width: 100%;
        background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxOTIuODcgNDMuODYiPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDojNzg5OTA0O30uY2xzLTJ7ZmlsbDojYzJkNTAwO30uY2xzLTN7ZmlsbDojM2QzOTM1O308L3N0eWxlPjwvZGVmcz48dGl0bGU+ZWxpeGlyR3JvdXA8L3RpdGxlPjxnIGlkPSJMYXllcl8yIiBkYXRhLW5hbWU9IkxheWVyIDIiPjxnIGlkPSJMYXllcl8xLTIiIGRhdGEtbmFtZT0iTGF5ZXIgMSI+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNNDEuMjksMS45M2guNDJjLjI3LDAsLjQ3LDAsLjQ3LS4zM3MtLjI4LS4yOS0uNDktLjI5aC0uNFptLS40Ny0xaC45Yy42LDAsLjkzLjE5LjkzLjcxcy0uMjcuNi0uNjIuNjRsLjY0LDFoLS41bC0uNTgtMWgtLjN2MWgtLjQ3Wm0uODUsMi44OGExLjYzLDEuNjMsMCwwLDAsMS42MS0xLjY5LDEuNjIsMS42MiwwLDEsMC0zLjIzLDAsMS42MiwxLjYyLDAsMCwwLDEuNjIsMS42OW0wLTMuODJhMi4xMSwyLjExLDAsMCwxLDIuMTksMi4xMywyLjIsMi4yLDAsMCwxLTQuMzksMEEyLjEyLDIuMTIsMCwwLDEsNDEuNjcsMCIvPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTE5LjczLDQzLjc1YTIxLjkzLDIxLjkzLDAsMSwxLDI0LTE5LjYyQTIyLDIyLDAsMCwxLDE5LjczLDQzLjc1Wk0yMy42OCw0LjY4QTE3LjMzLDE3LjMzLDAsMCwwLDE1LjgsMzguMTNhMTcuNTMsMTcuNTMsMCwwLDAsNC4zOSwxQzI2LjM0LDM5Ljc4LDMzLjQyLDM1Ljc1LDM2LDMyYy4yNS0uNDEuMjctLjcuMTQtLjgycy0uNSwwLS44LjI4YTEzLjM3LDEzLjM3LDAsMCwxLTQuNDMsMi40NSwxOS4yOSwxOS4yOSwwLDAsMS04LjE4LDEsMTUuMSwxNS4xLDAsMCwxLTEuNjYtLjI2Yy00Ljg2LTEtOC44Ni00LjA5LTEwLjQ0LTguMDhhMTIuMjcsMTIuMjcsMCwwLDEsNS45MS0xNS4zOSwxMi4xNywxMi4xNywwLDAsMSw2LjctMS4zMSwxMS4yMywxMS4yMywwLDAsMSwyLC4zOWMzLC45LDYuMzksMy41Miw2LjY2LDcuMTdhOCw4LDAsMCwxLTEuNjEsNS4yOCw4LjEyLDguMTIsMCwwLDEtNC41MywyLjc1LDE1LjgsMTUuOCwwLDAsMS00LC4zM2MtMS44OSwwLTMuNjgsMC01LDFsLS40My4zNC40My4zNmExMi40MiwxMi40MiwwLDAsMCwyLjgyLDEuNzcsMTIuMDYsMTIuMDYsMCwwLDAsMy43NywxLDEzLjgyLDEzLjgyLDAsMCwwLDMuMDgsMCwxMy4xLDEzLjEsMCwwLDAsNy0zLjExQTExLjY1LDExLjY1LDAsMCwwLDM3LDIxLjM4YTEyLjU2LDEyLjU2LDAsMCwwLS41OC03LjY0LDEzLjQ4LDEzLjQ4LDAsMCwwLTMuNC01LDEzLjI3LDEzLjI3LDAsMCwwLTEuODctMS40NEExNy4xMiwxNy4xMiwwLDAsMCwyMy42OCw0LjY4Wk0yMywxNC4xN2E4LjcsOC43LDAsMCwwLTUuMjgsMS4yNCw3LjEzLDcuMTMsMCwwLDAtMy4yMyw0LjI2LDgsOCwwLDAsMC0uNCwzbDAsLjg1LjY4LS41YzEuNjMtMS4xOSwzLjA4LTEuNDksNi43MS0xLjQsMi42Ni4wNyw1LjI0LS4yMSw2LTIuNzEuMzQtMS4wNy4xMS0zLjM4LTMuMjEtNC40NkE3LjA3LDcuMDcsMCwwLDAsMjMsMTQuMTdaIi8+PHBhdGggY2xhc3M9ImNscy0yIiBkPSJNMTYuNDgsMjAuNDRjMC0uMTQuMDgtLjMuMTMtLjQ2QTUuMDgsNS4wOCwwLDAsMSwxOSwxNi45LDYuNDMsNi40MywwLDAsMSwyMi44MywxNmE0LjI4LDQuMjgsMCwwLDEsLjkyLjE5YzIuNDMuNzgsMiwyLjE5LDIsMi4yNS0uMzEsMS0xLjEsMS41NC00LjA4LDEuNDZBMTMuMjgsMTMuMjgsMCwwLDAsMTYuNDgsMjAuNDRaIi8+PHBhdGggY2xhc3M9ImNscy0zIiBkPSJNNzIuOSwzMi4xNUg1Ny4yNlYxMS43NEg3Mi44NHY0LjM5SDYyLjE0djMuNTNINzIuMjFWMjRINjIuMTR2My43M0g3Mi45WiIvPjxwYXRoIGNsYXNzPSJjbHMtMyIgZD0iTTc4Ljc4LDMyLjE1SDc0LjIxVjExLjc0aDQuNTdaIi8+PHBhdGggY2xhc3M9ImNscy0zIiBkPSJNODUuMiwxMy40NWEyLjczLDIuNzMsMCwxLDEtMi43Mi0yLjc0QTIuNjgsMi42OCwwLDAsMSw4NS4yLDEzLjQ1Wm0tLjQyLDE4LjdIODAuMjJWMTcuODVoNC41NloiLz48cGF0aCBjbGFzcz0iY2xzLTMiIGQ9Ik05NiwyNC45NGw1LDcuMjFIOTUuNzJMOTIuOTEsMjhsLTIuNzMsNC4xMUg4NC45NEw5MCwyNC45NCw4NS4xLDE3Ljg1aDUuMzNsMi42Niw0LjA3LDIuNjItNC4wN0gxMDFaIi8+PHBhdGggY2xhc3M9ImNscy0zIiBkPSJNMTA2LjE4LDEzLjQ1YTIuNzMsMi43MywwLDEsMS0yLjcyLTIuNzRBMi42OCwyLjY4LDAsMCwxLDEwNi4xOCwxMy40NVptLS40MiwxOC43SDEwMS4yVjE3Ljg1aDQuNTZaIi8+PHBhdGggY2xhc3M9ImNscy0zIiBkPSJNMTE3LjA5LDE3LjY3bC0uNDMsNC41NWE3Ljc2LDcuNzYsMCwwLDAtMi4yOC0uMzgsMi4zMiwyLjMyLDAsMCwwLTIuNjEsMi41OXY3LjcySDEwNy4yVjE3Ljg1aDQuMzhWMTkuNWE0LjIsNC4yLDAsMCwxLDMuOS0yQTYuMTYsNi4xNiwwLDAsMSwxMTcuMDksMTcuNjdaIi8+PHBhdGggY2xhc3M9ImNscy0zIiBkPSJNMTM3LjMyLDE0Ljc2bC0yLjQzLDIuMzVhNy4yOCw3LjI4LDAsMCwwLTEyLjc1LDVjMCw0LjQyLDMuMDgsNy40NCw3LjExLDcuNDQsMy43MywwLDUuOTItMS45Myw2LjQ1LTUuMzFoLTUuNDNWMjEuMTNoOWMwLC4yNywwLC41MywwLC43OSwwLDUuODgtMy43MywxMC43NS0xMC4wNiwxMC43NWExMC4zMSwxMC4zMSwwLDAsMS0xMC41Ny0xMC42QTEwLjMsMTAuMywwLDAsMSwxMjkuNCwxMS40NiwxMC40MywxMC40MywwLDAsMSwxMzcuMzIsMTQuNzZaIi8+PHBhdGggY2xhc3M9ImNscy0zIiBkPSJNMTYzLjM4LDI1LjNhNy41NCw3LjU0LDAsMSwxLTcuNTUtNy4zN0E3LjI4LDcuMjgsMCwwLDEsMTYzLjM4LDI1LjNabS0xMS45NCwwYTQuNCw0LjQsMCwxLDAsOC43OSwwLDQuNCw0LjQsMCwxLDAtOC43OSwwWiIvPjxwYXRoIGNsYXNzPSJjbHMtMyIgZD0iTTE3Ny4yOCwyNi4zN2MwLDQuNDYtMy4yMiw2LjMtNi40OSw2LjNzLTYuNDktMS44NC02LjQ5LTYuM1YxOC4zaDMuMDd2Ny43OWMwLDIuNzEsMS41LDMuNywzLjQyLDMuN3MzLjQyLTEsMy40Mi0zLjdWMTguM2gzLjA3WiIvPjxwYXRoIGNsYXNzPSJjbHMtMyIgZD0iTTE5Mi44NywyNS4zYTcsNywwLDAsMS03LDcuMzcsNS4zMiw1LjMyLDAsMCwxLTQuMzktMnY3LjUxaC0zVjE4LjNoM1YyMGE1LjM1LDUuMzUsMCwwLDEsNC4zOS0yQTcsNywwLDAsMSwxOTIuODcsMjUuM1ptLTExLjU5LDBhNC4yMyw0LjIzLDAsMSwwLDguNDUsMCw0LjIzLDQuMjMsMCwxLDAtOC40NSwwWiIvPjxwYXRoIGNsYXNzPSJjbHMtMyIgZD0iTTE0OS44OCwxOC4zN2wtMS41NywyLjdhNC40OCw0LjQ4LDAsMCwwLTEuNDgtLjJjLTEuOTMsMC0zLjMyLDEuMzctMy4zMiwzLjc1djcuNTRoLTNWMTguMzRoM3YxLjU3QTQuNjcsNC42NywwLDAsMSwxNDcuNTQsMTgsNiw2LDAsMCwxLDE0OS44OCwxOC4zN1oiLz48L2c+PC9nPjwvc3ZnPg==")
      } body {color: #fff; background: url(\'' . get_template_directory_uri() . '/img/loginbg.jpg\'); background-position:center; background-size: cover} .login #backtoblog a, .login #nav a { color: #cecece } .login form { background: rgba(255,255,255,0.25) } .login #login_error, .login .message, .login .success { background-color: #0E41BF }</style>';
}
add_action('login_head', 'elixir_custom_login_css');

add_filter('wpcf7_autop_or_not', '__return_false');

function get_preporuke_djubrenja_for_product($id)
{
    $args = array(
        'post_type' => 'preporuka_djubrenja',
        'post_status' => 'publish',
        'meta_value'   => 'post:proizvodi:' . $id
    );

    $the_query = new WP_Query($args);

    // The Loop
    if ($the_query->have_posts()) {
        $slider_args = array(
            "cellAlign" => "left",
            "contain" => true,
            "prevNextButtons" => false
        );
        $params = array(
            'class' => 'p-2 w-100 w-md-50 w-lg-33',
            //'image' => 'full-h',
            'button' => 'outline-primary',
            'button-text-style' => 'arrow'
        );
        ob_start();
        echo '<div class="preporuke-djubrenja-slider pb-5 mb-5" data-flickity=\'' . json_encode($slider_args) . '\'>';
        while ($the_query->have_posts()) {
            $the_query->the_post();
            get_template_part('loop-templates/content', get_post_format(), $params);
        }
        echo '</div>';
        $o = ob_get_clean();
    } else {
        $o = false;
    }
    wp_reset_postdata();
    return $o;
}

add_filter('get_the_archive_title', 'elixir_archive_title');
function elixir_archive_title($title)
{
    if (is_category()) {
        $title = single_cat_title('', false);
    } elseif (is_tag()) {
        $title = single_tag_title('', false);
    } elseif (is_author()) {
        $title = '<span class="vcard">' . get_the_author() . '</span>';
    } elseif (is_post_type_archive()) {
        $title = post_type_archive_title('', false);
    } elseif (is_tax()) {
        $title = single_term_title('', false);
    }
    return $title;
}


function elixir_latest_posts_slider($post_type = 'post', $category = 'vesti')
{
    $args = array(
        'post_type' => $post_type,
        'post_status' => 'publish',
        'category_name' => $category,
        'posts_per_page' => 10
    );

    $the_query = new WP_Query($args);

    // The Loop
    if ($the_query->have_posts()) {
        $slider_args = array(
            "cellAlign" => "center",
            "autoPlay" => 6000,
            "prevNextButtons" => false,
            "wrapAround" => true
        );

        ob_start();
        echo '<div class="elixir-news-slider pb-4 mb-5" data-flickity=\'' . json_encode($slider_args) . '\'>';
        while ($the_query->have_posts()) {
            $the_query->the_post();
            get_template_part('template-parts/content', 'news-slider');
        }
        echo '</div>';
        $o = ob_get_clean();
    } else {
        $o = false;
    }
    wp_reset_postdata();
    return $o;
}


function elixir_related_articles()
{
    $related_query = new WP_Query(array(
        'post_type' => 'post',
        'category__in' => wp_get_post_categories(get_the_ID()),
        'post__not_in' => array(get_the_ID()),
        'posts_per_page' => 3,
        'orderby' => 'date',
    ));
    if ($related_query->have_posts()) {
        $i = 1;
        while ($related_query->have_posts()) {
            $related_query->the_post();
            get_template_part('loop-templates/content', get_post_format(), array(
                'layout' => 'rows',
                'border' =>  $i < 3
            ));
            $i++;
        }
        wp_reset_postdata();
    }
}

function is_even($number)
{
    if ($number == 0)
        return 1;
    else if ($number == 1)
        return 0;
    else if ($number < 0)
        return is_even(-$number);
    else
        return is_even($number - 2);
}

function get_company_logo($company = 'ElixirGroup',  $width = '200px', $height = false, $class = false, $return = false)
{
    $style = $width || $height ? 'style=' : '';
    $style .= $width ? 'width:' . $width . ';' : '';
    $style .= $height ? 'height:' . $height . ';' : '';
    $classes = 'img-fluid';
    $classes .= $class ? ' ' . $class : '';
    $o = '<img src="' . get_template_directory_uri() . '/img/' . $company . '.svg" alt="" class="' . $classes . '"' . $style . '>';
    if ($return) {
        return $o;
    } else {
        echo $o;
    }
}

function elixir_clanica($c)
{
    switch ($c) {
        case 'ElixirPrahovo':
            $o = 'Elixir Prahovo';
            break;
        case 'ElixirZorka':
            $o = 'Elixir Zorka';
            break;
        case 'ElixirZorka':
            $o = 'Elixir Prahovo';
            break;
        case 'ElixirAgrar':
            $o = 'Elixir Agrar';
            break;
        case 'ElixirFeed':
            $o = 'Elixir Feed';
            break;
        case 'ElixirCraft':
            $o = 'Elixir Craft';
            break;
        case 'ElixirFondacija':
            $o = 'Elixir Fondacija';
            break;
    }
    return $o;
}

function elixir_lokacija($l)
{
    switch ($l) {
        case 'ph':
            $o = 'Prahovo';
            break;
        case 'sb':
            $o = 'Šabac';
            break;
        case 'ns':
            $o = 'Novi Sad';
            break;
        case 'bg':
            $o = 'Beograd';
            break;
    }
    return $o;
}

add_filter('post_class', 'set_oglas_post_class', 10, 3);
function set_oglas_post_class($classes, $class, $post_id)
{

    if ('oglas_za_posao' != get_post_type($post_id)) return $classes;

    if (carbon_get_post_meta($post_id, 'lokacija')) {
        foreach (carbon_get_post_meta($post_id, 'lokacija') as $loc) {
            $classes[] = 'location-' . $loc;
        }
    }
    if (carbon_get_post_meta($post_id, 'clanica')) {
        $classes[] = 'company-' . carbon_get_post_meta($post_id, 'clanica');
    }

    // Return the array
    return $classes;
}


add_filter('wpcf7_form_tag', 'elixir_form_tag');

function elixir_form_tag($tag)
{
    if (is_admin()) return $tag;

    global $post;
    if ($tag['name'] === 'lokacija') {
        $location = (array)carbon_get_post_meta($post->ID, 'lokacija');
        if (!$location) return $tag;
        $l = array();
        foreach ($location as $loc) {
            $l[] = elixir_lokacija($loc);
        }
        foreach ($l as $loc) {
            $tag['values'][] = $loc;
            $tag['raw_values'][] = $loc;
            $tag['labels'][] = $loc;
        }
        if (count($l) === 1) {
            $tag['options'][] = 'default:1';
            $tag['options'][] = 'class:d-none';
        }
    } else if ($tag['name'] === 'pozicija') {
        $tag['values'][0] = get_the_title($post->ID);
        $tag['raw_values'][0] = get_the_title($post->ID);
    }
    return $tag;
}

add_filter('wpcf7_form_elements', 'form_elements');

function form_elements($form)
{
    if (is_admin() || str_contains($form, '[lokacija-label]') === false) return $form;

    global $post;
    $location = (array)carbon_get_post_meta($post->ID, 'lokacija');
    if (!$location) {
        $lokacija_label = '';
    } else {
        $l = array();
        foreach ($location as $loc) {
            $l[] = elixir_lokacija($loc);
        }
        if (count($location) === 1) {
            $lokacija_label = '<p class="mb-2">Prijavljujem se za poziciju <span class="text-primary fw-600">' . get_the_title($post->ID) . '</span> na lokaciji <span class="text-primary fw-600">' . reset($l) . '</span>:</p>';
        } else {
            $lokacija_label = '<p class="mb-2">Prijavljujem se za poziciju <span class="text-primary fw-600">' . get_the_title($post->ID) . '</span> na lokaciji:</p>';
        }
    }
    $form = str_replace('[lokacija-label]', $lokacija_label, $form);
    return $form;
}

remove_action('wpcf7_swv_create_schema', 'wpcf7_swv_add_select_enum_rules', 20, 2);
remove_action('wpcf7_swv_create_schema', 'wpcf7_swv_add_checkbox_enum_rules', 20, 2);

function add_additional_class_on_a($classes, $item, $args)
{
    if (isset($args->add_a_class)) {
        $classes['class'] = $args->add_a_class;
    }
    return $classes;
}

add_filter('nav_menu_link_attributes', 'add_additional_class_on_a', 1, 3);

add_filter('carbon_fields_theme_options_container_admin_only_access', '__return_false');


function elixir_get_current_language()
{
    return apply_filters('wpml_current_language', null);
}

function CyrillicToLatin($cyrillicString)
{
    $cyrillicToLatin = array(
        'А' => 'A', 'Б' => 'B', 'В' => 'V', 'Г' => 'G', 'Д' => 'D', 'Ђ' => 'Đ', 'Е' => 'E',
        'Ж' => 'Ž', 'З' => 'Z', 'И' => 'I', 'Ј' => 'J', 'К' => 'K', 'Л' => 'L', 'Љ' => 'Lj',
        'М' => 'M', 'Н' => 'N', 'Њ' => 'Nj', 'О' => 'O', 'П' => 'P', 'Р' => 'R', 'С' => 'S',
        'Т' => 'T', 'Ћ' => 'Ć', 'У' => 'U', 'Ф' => 'F', 'Х' => 'H', 'Ц' => 'C', 'Ч' => 'Č',
        'Џ' => 'Dž', 'Ш' => 'Š', 'а' => 'a', 'б' => 'b', 'в' => 'v', 'г' => 'g', 'д' => 'd',
        'ђ' => 'đ', 'е' => 'e', 'ж' => 'ž', 'з' => 'z', 'и' => 'i', 'ј' => 'j', 'к' => 'k',
        'л' => 'l', 'љ' => 'lj', 'м' => 'm', 'н' => 'n', 'њ' => 'nj', 'о' => 'o', 'п' => 'p',
        'р' => 'r', 'с' => 's', 'т' => 't', 'ћ' => 'ć', 'у' => 'u', 'ф' => 'f', 'х' => 'h',
        'ц' => 'c', 'ч' => 'č', 'џ' => 'dž', 'ш' => 'š'
    );

    return strtr($cyrillicString, $cyrillicToLatin);
}

function add_tinymce_code_button() {
    // Add the 'code' button to the first row of TinyMCE editor buttons
    add_filter('mce_buttons', function($buttons) {
        array_push($buttons, 'code');
        return $buttons;
    });

    // Load the TinyMCE Code plugin
    add_filter('mce_external_plugins', function($plugins) {
        $plugins['code'] = 'https://cdn.tiny.cloud/1/no-api-key/tinymce/5/plugins.min.js';
        return $plugins;
    });
}
add_action('init', 'add_tinymce_code_button');
