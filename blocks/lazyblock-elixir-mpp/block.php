<?php
$response = wp_remote_get('https://mojaprvaplata.gov.rs/pozicije?page=1&size=100&sortOption=1&search=elixir&searchLatin=elixir&searchCyrilic=%D0%B5%D0%BB%D0%B8x%D0%B8%D1%80&searchClicked=true&address=&company=&qualLevel=&eduArea=&sciArea=&titleName=&isChecked=undefined');

// Check for errors
if (is_wp_error($response)) {
    echo 'Error occurred: ' . $response->get_error_message();
} else {
    // Get the body content
    $body = wp_remote_retrieve_body($response);

    // Create a new DOMDocument
    $dom = new DOMDocument;

    // Load the HTML content
    libxml_use_internal_errors(true);
    $dom->loadHTML($body);
    libxml_clear_errors();

    // Create a DOMXPath object to query the document
    $xpath = new DOMXPath($dom);

    // Query for <li> elements under the <ul> with id "myList"
    $liElements = $xpath->query('//ul[@id="myList"]/li');

    // Loop through the <li> elements
    foreach ($liElements as $liElement) {
        // Extract data from each <li> element
        $companyName = $xpath->query('.//h3[@class="company-name"]', $liElement)->item(0)->textContent;
        $positionName = $xpath->query('.//p[@class="position-name"]', $liElement)->item(0)->textContent;
        $workPlace = $xpath->query('.//p[@class="work-place"]', $liElement)->item(0)->textContent;
        $vocation = $xpath->query('.//p[@class="vocation"]', $liElement)->item(0)->textContent;
        $numberOfCandidates = $xpath->query('.//p[@class="number-of-candidates"]', $liElement)->item(0)->textContent;

        // Extract the ID from the onclick attribute of the button
        $buttonElement = $xpath->query('.//button[@class="btn btn-blue"]', $liElement)->item(0);
        $onclickAttribute = $buttonElement->getAttribute('onclick');
        preg_match('/showDetails\((\d+)\)/', $onclickAttribute, $matches);
        $buttonId = isset($matches[1]) ? $matches[1] : 'N/A';

        // Output the extracted data
        echo 'Company Name: ' . $companyName . '<br>';
        echo 'Position Name: ' . CyrillicToLatin($positionName) . '<br>';
        echo 'Work Place: ' . CyrillicToLatin($workPlace) . '<br>';
        echo 'Vocation: ' . CyrillicToLatin($vocation) . '<br>';
        echo 'Number of Candidates: ' . CyrillicToLatin($numberOfCandidates) . '<br>';
        echo 'Button ID: ' . CyrillicToLatin($buttonId) . '<br>';
        echo '<hr>';
    }
}
