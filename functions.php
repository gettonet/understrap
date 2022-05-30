<?php
/**
 * Elixir functions and definitions
 *
 * @package Elixir
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

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
	'/hooks.php',                           // Custom hooks.
	'/extras.php',                          // Custom functions that act independently of the theme templates.
	'/customizer.php',                      // Customizer additions.
	'/custom-comments.php',                 // Custom Comments file.
	'/class-wp-bootstrap-navwalker.php',    // Load custom WordPress nav walker. Trying to get deeper navigation? Check out: https://github.com/elixir/elixir/issues/567.
	'/editor.php',                          // Load Editor functions.
	'/block-editor.php',                    // Load Block Editor functions.
	'/deprecated.php',                      // Load deprecated functions.
);

// Load WooCommerce functions if WooCommerce is activated.
if ( class_exists( 'WooCommerce' ) ) {
	$elixir_includes[] = '/woocommerce.php';
}

// Load Jetpack compatibility file if Jetpack is activiated.
if ( class_exists( 'Jetpack' ) ) {
	$elixir_includes[] = '/jetpack.php';
}

// Include files.
foreach ( $elixir_includes as $file ) {
	require_once get_theme_file_path( $elixir_inc_dir . $file );
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
	require_once get_theme_file_path( $elixir_inc_dir . '/carbon.php' );
}


// LZB.
function lzb_block_disable_frontend_wrapper( $allow_wrapper, $attributes, $context ) {
    if ( 'frontend' == $context ) {
        return false;
    }
    return $allow_wrapper;
}
add_filter( 'lzb/block_render/allow_wrapper', 'lzb_block_disable_frontend_wrapper', 10, 3 );


// Remove html comments from frontend.
function callback($buffer){ $buffer = preg_replace('/<!--(.|s)*?-->/', '', $buffer); return $buffer; }
function buffer_start(){ ob_start("callback"); }
function buffer_end(){ ob_end_flush(); }
 
add_action('get_header', 'buffer_start');
add_action('wp_footer', 'buffer_end');

function slugify($text)
{
    // Strip html tags
    $text = strip_tags($text);
    // Replace non letter or digits by -
    $text = preg_replace('~[^\pL\d]+~u', '-', $text);
    // Transliterate
    setlocale(LC_ALL, 'en_US.utf8');
    $text = iconv('utf-8', 'us-ascii//TRANSLIT', $text);
    // Remove unwanted characters
    $text = preg_replace('~[^-\w]+~', '', $text);
    // Trim
    $text = trim($text, '-');
    // Remove duplicate -
    $text = preg_replace('~-+~', '-', $text);
    // Lowercase
    $text = strtolower($text);
    // Check if it is empty
    if (empty($text)) {return 'n-a';}
    // Return result
    return $text;
}

function generateRandomString($length = 10) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}


function elixir_header(){
	echo carbon_get_theme_option('elixir_header');
    if(carbon_get_theme_option('gtm_id')){ ?>
    <!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','<?php echo carbon_get_theme_option('gtm_id'); ?>');</script>
<!-- End Google Tag Manager -->
    <?php }
};

function elixir_footer(){
	echo carbon_get_theme_option('elixir_footer');
};

add_action('wp_head', 'elixir_header');
add_action('wp_footer', 'elixir_footer');

function elixir_gtm_noscript(){
    if(carbon_get_theme_option('gtm_id')) {
        echo '<!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id='.carbon_get_theme_option('gtm_id').'"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->';
    }
}
add_action('wp_body_open', 'elixir_gtm_noscript');

function remove_classes_from_wp_bootstrap_blocks($classes){
    $remove= array(
        'wp-bootstrap-blocks-container',
        'wp-bootstrap-blocks-row',
        'wp-bootstrap-blocks-button'
    );
    return array_diff($classes, $remove);

}
add_filter('wp_bootstrap_blocks_container_classes', 'remove_classes_from_wp_bootstrap_blocks');
add_filter('wp_bootstrap_blocks_row_classes', 'remove_classes_from_wp_bootstrap_blocks');
add_filter('wp_bootstrap_blocks_button_wrapper_classes', 'remove_classes_from_wp_bootstrap_blocks');

function elixir_custom_login_css() {
    echo '<style type="text/css">.login h1 a { background-size: 200px; width: 200px;
        background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgwIiBoZWlnaHQ9Ijk5IiB2aWV3Qm94PSIwIDAgMjgwIDk5IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDBfNDQ2XzE4NykiPgo8cGF0aCBkPSJNODMuOTA4NyAyOS42OTA0QzkwLjM4NjEgMjkuODQ1IDk2LjczMSAyOS42MTY4IDEwMi45ODggMzAuMjQyNUMxMTEuNzYxIDMxLjExMSAxMTYuMDMxIDQwLjIwMTUgMTExLjY0NCA0Ny45MDgxQzExMC4zNDEgNTAuMTk3MyAxMDguODk4IDUxLjIyNzggMTA0Ljk2IDUyLjYwNDJMMTE0LjY0NyA2OS4wNzc0SDExMi4yNjlDMTEwLjA2MSA2OS4wNzc0IDEwNy45MDQgNjkuMDc3NCAxMDUuNzE4IDY5LjA3NzRDMTA1LjM2MSA2OS4xMzA5IDEwNC45OTYgNjkuMDYxNyAxMDQuNjg0IDY4Ljg4MTJDMTA0LjM3MSA2OC43MDA4IDEwNC4xMjggNjguNDE5NiAxMDMuOTk2IDY4LjA4MzdDMTAxLjc4OCA2My43OTI0IDk5LjQ5MTIgNTkuNTYgOTcuMzI3MiA1NS4yNTRDOTYuNzIzNiA1NC4wNTQyIDk2LjA1MzggNTMuNDUwNyA5NC42ODQ3IDUzLjY0OTRDOTMuODkwOCA1My43MDU3IDkzLjA5MzggNTMuNzA1NyA5Mi4yOTk5IDUzLjY0OTRWNjguOTQ0OUg4My45MDg3VjI5LjY5MDRaTTkyLjI3NzggMzcuMjk0QzkyLjI3NzggNDAuNDQ0NCA5Mi4yNzc4IDQzLjE4MjYgOTIuMzIxOSA0NS45ODdDOTIuMzIxOSA0Ni4yNDQ2IDkyLjg3NCA0Ni43MjMgOTMuMTY4NCA0Ni43MjNDOTUuODAzNSA0Ni43MjMgOTguNDUzNCA0Ni43MjMgMTAxLjA3NCA0Ni41MDk1QzEwMi4xNDUgNDYuNDQ0MiAxMDMuMTUzIDQ1Ljk4MiAxMDMuOTAxIDQ1LjIxMzNDMTA0LjY1IDQ0LjQ0NDUgMTA1LjA4NSA0My40MjQ0IDEwNS4xMjIgNDIuMzUyMUMxMDUuMTU5IDQxLjI3OTggMTA0Ljc5NCA0MC4yMzIzIDEwNC4xIDM5LjQxNEMxMDMuNDA2IDM4LjU5NTggMTAyLjQzMiAzOC4wNjU2IDEwMS4zNjggMzcuOTI3Qzk4LjQ1MzQgMzcuNTE0OCA5NS40ODcgMzcuNDkyNyA5Mi4yNzc4IDM3LjI4NjZWMzcuMjk0WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTI0My4yMDQgNTIuOTA4MUgyMjYuMzE5VjYxLjM1ODJIMjQ1LjM2OFY2OC45MTc2SDIxNy45NDJWMjkuODU0NUgyNDQuNzc5QzI0NC43NzkgMzIuMTgwNSAyNDQuODE2IDM0LjUyMTIgMjQ0LjcyIDM2Ljg2MTlDMjQ0LjcyIDM3LjA3NTMgMjQzLjg4OSAzNy40MjEzIDI0My40NCAzNy40MjEzQzIzOC42MTEgMzcuNDY1NSAyMzMuNzgyIDM3LjQyMTMgMjI4Ljk1NCAzNy40MjEzSDIyNy4xNzJWNDUuMTM1M0MyMjcuNjY2IDQ1LjEzNTMgMjI4LjIwMyA0NS4yMDg4IDIyOC43MzMgNDUuMjA4OEMyMzMuMDU0IDQ1LjIwODggMjM3LjM3NCA0NS4yNjA0IDI0MS42ODggNDUuMjA4OEMyNDIuOTQ2IDQ1LjIwODggMjQzLjI3OCA0NS41OTE2IDI0My4yMTkgNDYuNzkxNEMyNDMuMTIzIDQ4Ljc3MTQgMjQzLjIwNCA1MC43NTE0IDI0My4yMDQgNTIuOTA4MVoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0xNjUuMTgxIDY4Ljk1NDhDMTYyLjEyNiA2OC45NTQ4IDE1OS4yOTIgNjguOTU0OCAxNTYuMzkyIDY4LjkxOEMxNTYuMTY3IDY4Ljg2NjkgMTU1Ljk1NyA2OC43NjM3IDE1NS43OCA2OC42MTY3QzE1NS42MDIgNjguNDY5NiAxNTUuNDYxIDY4LjI4MjkgMTU1LjM2OSA2OC4wNzE1QzE1NC40MTIgNjUuOTA3NSAxNTMuNDk5IDYzLjcyMTMgMTUyLjY3NSA2MS41MTMxQzE1Mi41NzggNjEuMTYwNSAxNTIuMzUzIDYwLjg1NjUgMTUyLjA0NCA2MC42NjA2QzE1MS43MzUgNjAuNDY0NiAxNTEuMzY0IDYwLjM5MDcgMTUxLjAwNCA2MC40NTMyQzE0Ni42MzkgNjAuNDUzMiAxNDIuMjY3IDYwLjQ5IDEzNy45MDIgNjAuNDUzMkMxMzcuNTQgNjAuNDAyOCAxMzcuMTczIDYwLjQ4ODYgMTM2Ljg3MSA2MC42OTRDMTM2LjU2OSA2MC44OTk0IDEzNi4zNTQgNjEuMjA5NyAxMzYuMjY4IDYxLjU2NDdDMTM1LjQ5NSA2My42OTkzIDEzNC41OTcgNjUuNzg5NyAxMzMuODE3IDY3LjkyNDNDMTMzLjc1MiA2OC4yNTUxIDEzMy41NjQgNjguNTQ4OCAxMzMuMjkxIDY4Ljc0NTdDMTMzLjAxNyA2OC45NDI2IDEzMi42NzkgNjkuMDI3OSAxMzIuMzQ1IDY4Ljk4NDJDMTI5LjcwMiA2OC45MzI3IDEyNy4wNTIgNjguOTg0MiAxMjQuMjQ4IDY4Ljk4NDJDMTI0LjMyNCA2OC42MTQ5IDEyNC40MjUgNjguMjUwOSAxMjQuNTUgNjcuODk0OEMxMjkuOTAzIDU1LjUwNDQgMTM1LjI1MiA0My4xMTY0IDE0MC41OTYgMzAuNzMwOEMxNDAuNjc3IDMwLjQyMDkgMTQwLjg2NiAzMC4xNTAzIDE0MS4xMyAyOS45NjhDMTQxLjM5MyAyOS43ODU4IDE0MS43MTMgMjkuNzAzOCAxNDIuMDMxIDI5LjczNzFDMTQzLjc0NiAyOS43ODg3IDE0NS40NjkgMjkuNzg4NyAxNDcuMTg0IDI5LjczNzFDMTQ3LjUwNCAyOS42ODk1IDE0Ny44MyAyOS43NjA0IDE0OC4xMDEgMjkuOTM2N0MxNDguMzcyIDMwLjExMjkgMTQ4LjU3IDMwLjM4MjMgMTQ4LjY1NiAzMC42OTRDMTUzLjA3MiA0MC44NjY1IDE1Ny40ODkgNTEuMDI5MSAxNjEuOTA1IDYxLjE4MTlDMTYyLjc5NiA2My4yMjA4IDE2My43MDEgNjUuMjU5NyAxNjQuNTg1IDY3LjI5ODZDMTY0LjcxNyA2Ny43NzcxIDE2NC45MDEgNjguMjkyMyAxNjUuMTgxIDY4Ljk1NDhaTTE0NC4zMzUgNDEuNDE4NUMxNDIuNjg3IDQ1LjY1MDkgMTQxLjE4NSA0OS41MTUzIDEzOS42NDcgNTMuNDIzOEgxNDkuMDYxTDE0NC4zMzUgNDEuNDE4NVoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik03NS4zMDY5IDY4Ljk1NDRDNzIuMjA4IDY4Ljk1NDQgNjkuMjg1OCA2OC45NTQ0IDY2LjM3ODQgNjguOTEwMkM2Ni4wMzk4IDY4LjkxMDIgNjUuNTgzNCA2OC4zNTgyIDY1LjQxNDEgNjcuOTYwN0M2NC41MTYxIDY1Ljg3NzYgNjMuNjU0OSA2My43NzI1IDYyLjg1MjYgNjEuNjQ1MkM2Mi43NjMgNjEuMjY3MSA2Mi41MzY5IDYwLjkzNTQgNjIuMjE3NiA2MC43MTRDNjEuODk4MyA2MC40OTI1IDYxLjUwODQgNjAuMzk2OCA2MS4xMjI5IDYwLjQ0NTRDNTYuNzUwNiA2MC40OTcgNTIuMzg1NyA2MC40ODk2IDQ4LjAyMDggNjAuNDQ1NEM0Ny42NjA0IDYwLjM5OTIgNDcuMjk1NyA2MC40ODc5IDQ2Ljk5NjcgNjAuNjk0NUM0Ni42OTc4IDYwLjkwMSA0Ni40ODU4IDYxLjIxMDggNDYuNDAxNSA2MS41NjQzQzQ1LjYwNjYgNjMuNzQzIDQ0Ljc1MDMgNjUuODk3MiA0My44MzI2IDY4LjAyNjlDNDMuNzIyNiA2OC4yNTA5IDQzLjU2MzYgNjguNDQ3MyA0My4zNjczIDY4LjYwMTRDNDMuMTcxMSA2OC43NTU2IDQyLjk0MjcgNjguODYzNyA0Mi42OTkxIDY4LjkxNzZDMzkuOTY4MyA2OC45OTEyIDM3LjIzMDEgNjguOTU0NCAzNC4yNDkgNjguOTU0NEMzNC40NjI1IDY4LjM2NTUgMzQuNTg3NiA2Ny45MDkyIDM0Ljc3OSA2Ny40ODIyQzQwLjA0OTIgNTUuMzUxOSA0NS4yOTc0IDQzLjIyODggNTAuNTAxNCAzMS4wNjE2QzUwLjYyNDggMzAuNjAzMiA1MC45MTU0IDMwLjIwNzcgNTEuMzE2IDI5Ljk1MjlDNTEuNzE2NSAyOS42OTgxIDUyLjE5OCAyOS42MDI2IDUyLjY2NTQgMjkuNjg1MkM1NC4xOTY1IDI5Ljc3MzUgNTUuNzM0OCAyOS43NDQxIDU3LjI2NTkgMjkuNjg1MkM1Ny41ODYzIDI5LjY0MTEgNTcuOTExOSAyOS43MTQ0IDU4LjE4MjUgMjkuODkxN0M1OC40NTMgMzAuMDY4OSA1OC42NTA0IDMwLjMzODEgNTguNzM4IDMwLjY0OTRDNjIuNTA2NyAzOS4zNzQzIDY2LjI5NzQgNDguMDg5MyA3MC4xMTAyIDU2Ljc5NDZDNzEuNjY1OCA2MC4zNjcgNzMuMjE2NCA2My45MzkzIDc0Ljc2MjIgNjcuNTExN0M3NC45MjQxIDY3Ljk1MzQgNzUuMDc4NyA2OC4zNzI5IDc1LjMwNjkgNjguOTU0NFpNNTQuNjMwNyA0MS44NTI0SDU0LjI3NzRDNTIuODA1MyA0NS42NzI2IDUxLjI5NjMgNDkuNDg1NCA0OS43NTA2IDUzLjQzODFINTkuMTg3QzU3LjY0MTIgNDkuNDYzMyA1Ni4xMzIzIDQ1LjY2NTIgNTQuNjMwNyA0MS44NTI0WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTAuMDI5Mjk2OSA2OC44MzY5VjY3LjI2OTFDMC4wMjkyOTY5IDU1LjM0NDggMC4wMjkyOTY5IDQzLjQxMzIgMC4wMjkyOTY5IDMxLjQ4ODlDMC4wMjkyOTY5IDMwLjEzNDUgMC4yOTQyNzggMjkuNjU2MSAxLjc3Mzc3IDI5LjY5MjlDNi42MDIzNyAyOS44MTA2IDExLjQzMSAyOS42OTI5IDE2LjI1OTYgMjkuNzk1OUMxOS4wMTU2IDI5Ljc3MzcgMjEuNzMzMyAzMC40NDE3IDI0LjE2NDkgMzEuNzM5MUMyNi4wMDYzIDMyLjc1MDggMjcuNDUzMiAzNC4zNTMyIDI4LjI3MjIgMzYuMjg4QzMxLjkwMSA0NC41NzYxIDI3LjIxMjMgNTIuNTg0NiAxOC4yMTc1IDUzLjM1MDFDMTUuNTgyNCA1My41NzA5IDEyLjkyNTIgNTMuNTA0NiAxMC4yODI3IDUzLjU2MzVDOS43MzgwMiA1My41NjM1IDkuMTkzMzMgNTMuNTYzNSA4LjUzMDg2IDUzLjU2MzVWNjguODI5NkwwLjAyOTI5NjkgNjguODM2OVpNOC41NzUwNCA0Ni41MTk0QzEwLjkxNTcgNDYuNTE5NCAxMy4xODI4IDQ2LjU3MDkgMTUuNDM1MiA0Ni41MTk0QzE2LjI3IDQ2LjQ3MjIgMTcuMDg4NyA0Ni4yNyAxNy44NDk1IDQ1LjkyMzFDMTkuNTY0NSA0NS4xODcxIDIwLjI0OTEgNDMuNzE1IDIwLjIzNDMgNDEuODgyMUMyMC4yNzcyIDQxLjA4MTQgMjAuMDU3NCA0MC4yODg2IDE5LjYwODMgMzkuNjI0M0MxOS4xNTkyIDM4Ljk1OTkgMTguNTA1NCAzOC40NjA1IDE3Ljc0NjQgMzguMjAxOEMxNC44MDIyIDM3LjAzODggMTEuNjY2NSAzNy40MDY5IDguNTc1MDQgMzcuNDIxNlY0Ni41MTk0WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTIwNS43MzEgMFY2OC45MThDMjAyLjkxMiA2OC45MTggMjAwLjE0NCA2OC45MTggMTk3LjM3NyA2OC45MThDMTk3LjE3OCA2OC45MTggMTk2Ljg2OSA2OC41NTczIDE5Ni44MSA2OC4zMDdDMTk2Ljc0OSA2Ny44OTUyIDE5Ni43MzcgNjcuNDc3OCAxOTYuNzczIDY3LjA2MzFDMTk2Ljc3MyA0NS4zNjM4IDE5Ni43NzMgMjMuNjU5NyAxOTYuNzczIDEuOTUwNkMxOTYuNzczIDAuMDM2ODIxNCAxOTYuNzczIDAuMDI5NDcxNCAxOTguNzUzIDAuMDI5NDcxNEwyMDUuNzMxIDBaIiBmaWxsPSIjMEU0MUJGIi8+CjxwYXRoIGQ9Ik0xNzUuMjIxIDY0LjM4NDJDMTc1LjIyMSA1My40OTA0IDE3NS4yMjEgNDIuNTg5MiAxNzUuMTg0IDMxLjY4ODFDMTc1LjE4NCAzMC4yNjAxIDE3NS41ODkgMjkuODI1OCAxNzYuOTg3IDI5Ljg5OTRDMTc4Ljk3NSAzMC4wMDk4IDE4MC45NzcgMjkuOTUxIDE4Mi45NzIgMjkuODk5NEMxODMuODYyIDI5Ljg5OTQgMTg0LjI2NyAzMC4yMzggMTg0LjIwMSAzMS4xMjg3QzE4NC4yMDEgMzEuNDUyNiAxODQuMjAxIDMxLjc3NjQgMTg0LjIwMSAzMi4xMDc2QzE4NC4yMDEgNTMuNjIwNCAxODQuMjAxIDc1LjE0MDYgMTg0LjIwMSA5Ni42NjgxQzE4NC4yMDEgOTguODMyMSAxODQuMjAxIDk4LjgzMjEgMTgxLjk5MyA5OC44MzIxQzE4MC4yMjYgOTguODMyMSAxNzguNDYgOTguNzczMyAxNzYuNyA5OC44MzIxQzE3NS41MyA5OC44ODM3IDE3NS4yMjggOTguNDU2NyAxNzUuMjI4IDk3LjMxNThDMTc1LjIzNiA4Ni4zNzA1IDE3NS4yMjEgNzUuMzgxMSAxNzUuMjIxIDY0LjM4NDJaIiBmaWxsPSIjMEU0MUJGIi8+CjxwYXRoIGQ9Ik0yNjMuODggNjEuMjQwOUgyODAuMDA3VjY4Ljg1OTJIMjU0Ljg4NVYyOS44NDc3SDI2My44OFY2MS4yNDA5WiIgZmlsbD0id2hpdGUiLz4KPC9nPgo8ZGVmcz4KPGNsaXBQYXRoIGlkPSJjbGlwMF80NDZfMTg3Ij4KPHJlY3Qgd2lkdGg9IjI4MCIgaGVpZ2h0PSI5OC44NzU5IiBmaWxsPSJ3aGl0ZSIvPgo8L2NsaXBQYXRoPgo8L2RlZnM+Cjwvc3ZnPgo=")
      } body {color: #fff; background: #06091B; } .login #backtoblog a, .login #nav a { color: #cecece } .login form { background: rgba(255,255,255,0.25) } .login #login_error, .login .message, .login .success { background-color: #0E41BF }</style>';
}
add_action('login_head', 'elixir_custom_login_css');