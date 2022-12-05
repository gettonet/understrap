<?php
$i = 0;
$nav = $content = '';
$months = array('januar', 'februar', 'mart', 'april', 'maj', 'jun', 'jul', 'avgust', 'septembar', 'oktobar', 'novembar', 'decembar');
foreach ($attributes['tab'] as $inner){
  $id = !empty($inner['id']) ? 'tab-'.sanitize_title($inner['id']) : 'tab-'.sanitize_title($inner['title']);
  $active= $i === 0 ? ' active' : '';
  $selected = $i === 0 ? 'true' : '';
  $show = $i === 0 ? ' show' : '';
  $nav.= '<span class="nav-link text-uppercase fs-3'.$active.'" id="'.$id.'-nav" data-bs-toggle="tab" data-bs-target="#'.$id.'" type="button" role="tab">'.$inner['title'] .'</span>';
  $content .= '<div class="tab-pane fade' . $show . $active . '" id="' . $id . '" role="tabpanel" aria-labelledby="' . $id . '-tab">';
  $content .= '<div class="row mb-5 no-gutters">';
  foreach ($months as $month){
    $content .= '<div class="col-4 col-sm-3 col-md-2 p-1">';
    $content .= '<div class="border rounded w-100 h-100 elixir-monthly-report px-3 py-4 d-flex flex-column justify-content-center position-relative';
    $content .= isset($inner[$month]['url']) ? ' active border-primary">' : '">';
    //$content .= isset($inner[$month]['url']) ? '<a href="#" class="_df_custom stretched-link" source="'.$inner[$month]['url'].'"></a>' : '';
    $content .= isset($inner[$month]['url']) ? '<a href="'.$inner[$month]['url'].'" class="stretched-link" target="_blank"></a>' : '';
    $content .= '<span class="month fs-1 fw-700';
    $content .= isset($inner[$month]['url']) ? ' text-secondary' : ' opacity-50';
    $content .= '">'.strtoupper(substr($month,0, 3)).'</span>';
    $content .= '<span class="year">'.$inner['title'].'</span>';
    $content .= '</div>';
    $content .= '</div>';
  }
  $content .= '</div>';
  if(isset($inner['grafik'])){
    $content .= '<div class="graph-images">';
    foreach ($inner['grafik'] as $image) {
      $content .= '<a href="'. esc_url( $image['url'] ) . '" data-fancybox="'.$inner['title'].'" class="mb-4">';
        $content .= '<img class="img-fluid border mb-4" src="'. esc_url( $image['url'] ) . '" alt="'.$image['alt'].'">';
        $content .= '</a>';
    }
    $content .= '</div>';
  }
  $content .= '</div>';
$i++;
}
?>

<div class="elixir-tabs d-flex flex-wrap align-items-start<?php echo isset($attributes['className']) ? $attributes['className'] : ''; ?>">
<nav class="nav w-100 mb-5 flex-lg-column col-lg-auto w-lg-20" role="tablist">
<?php echo $nav; ?>
</nav>
<div class="tab-content col">
<?php echo $content; ?>
</div>
</div>