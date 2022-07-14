<?php
global $post;
$tabs = array(
    'video' => $attributes['videos'],
    'preporuke-djubrenja' => get_preporuke_djubrenja_for_product($post->ID),
    'webinar' => $attributes['webinar'],
    'downloads' => $attributes['downloads']
);

$nav_classes = array('nav', 'w-100', 'mb-5', 'justify-content-center');
$nav_styles = array();

$nav_class = ' class="'.implode(' ', $nav_classes).'"';
$nav_style = $nav_styles ? ' style="'.implode('; ', $nav_styles).'"' : '';
$nav = '<nav'.$nav_class.$nav_style.' role="tablist">';
$content = '<div class="tab-content col">';
$i = 1;
foreach ($tabs as $k => $v){
    if(!$v) continue;
    $title = strtoupper($k);
    $btn_class = 'nav-link text-uppercase fs-medium';
    $btn_class .= $i === 1 ? ' active' : ''; 
    $content_class = $i === 1 ? 'tab-pane fade show active' : 'tab-pane fade';
    $content .= '<div class="'.$content_class.'" id="tab-'.$k.'" role="tabpanel">';
    switch($k){
        case 'video':
        case 'webinar':
            if('video' === $k){
                $nav.= '<span class="'.$btn_class.'" id="'.$k.'-nav" data-bs-toggle="tab" data-bs-target="#tab-'.$k.'" type="button" role="tab">'. __('Videos', 'elixir'). '</span>';   
            } else if ('webinar' === $k){
                $nav.= '<span class="'.$btn_class.'" id="'.$k.'-nav" data-bs-toggle="tab" data-bs-target="#tab-'.$k.'" type="button" role="tab">'. __('Webinar', 'elixir'). '</span>';
            }
            $content .= '<div class="row justify-content-center">';
            foreach ($v as $video){
            preg_match('%(?:youtube(?:-nocookie)?.com/(?:[^/]+/.+/|(?:v|e(?:mbed)?)/|.*[?&]v=)|youtu.be/)([^"&?/ ]{11})%i', $video['video-url'], $match);
            $content .= '<div class="col-md-6 col-lg-4 mb-4">';
            $content .= '<div class="shadow rounded-top rounded-start overflow-hidden h-100 d-flex flex-column">';
            $content .= '<div class="ratio ratio-16x9" data-src="https://www.youtube.com/watch?v='. $match[1] .'" data-fancybox="" data-width="1600" data-height="900" role="button"><div>';
            $content .= '<span class="elixir-video-icon "><img src="/wp-content/themes/elixir/img/v.svg"  data-aos="zoom-in" data-aos-once="false" data-aos-mirror="true"></span>';
            if(isset($video['thumbnail']['id'])){
                $content .= wp_get_attachment_image( $video['thumbnail']['id'], 'medium', '', array('class' => 'img-fluid w-100 h-100 fit-cover'));
            } else {
                $content .= '<img src="https://img.youtube.com/vi/'.$match[1].'/hqdefault.jpg" class="img-fluid w-100 h-100 fit-cover">';
            }
            $content .= '</span></div></div>';
            $content .= '<div class="h-100 p-3 p-lg-4 bg-white">';
            $content .= '<h2 class="entry-title h4 fw-500">'.$video['title'].'</h2>';
            $content .= apply_filters('the_content', $video['description']);
            $content .= '</div></div></div>';
            }
            $content .= '</div>';
        break;
        case 'preporuke-djubrenja':
            $nav.= '<span class="'.$btn_class.'" id="'.$k.'-nav" data-bs-toggle="tab" data-bs-target="#tab-'.$k.'" type="button" role="tab">'. __('Fertilization recommendations', 'elixir'). '</span>';
            $content .= $v;
        break;
        case 'downloads':
            $nav.= '<span class="'.$btn_class.'" id="'.$k.'-nav" data-bs-toggle="tab" data-bs-target="#tab-'.$k.'" type="button" role="tab">'. __('Brochures', 'elixir'). '</span>';
            $content .= '<div class="row justify-content-center">';
            foreach($v as $file){
            $content .= '<div class="col-md-6 col-lg-4 mb-4 position-relative">';
            $content .= '<div class="ratio ratio-2x3 shadow rounded-top rounded-start overflow-hidden mb-4">';
            $content .= '<a href="'.$file['file']['url'].'" target="_blank" title="'.$file['title'].'">';
            $content .= wp_get_attachment_image($file['thumbnail']['id'], 'medium', '', array('class' => 'w-100 h-100 fit-cover'));
            $content .= '</a></div>';
            $content .= '<a href="'.$file['file']['url'].'" target="_blank" rel="bookmark" class="btn btn-outline-primary btn-arrow" title="'.$file['title'].'"><i class="icon-right"></i></a>';
            $content .= '</div>';
        }
        break;
    }
    $content .= '</div>';
    $i++;
  }
  $nav .= '</nav>';
  $content .= '</div>';
  
  
  echo '<div class="elixir-tabs">';
  echo $nav.$content;
  echo '</div>';

