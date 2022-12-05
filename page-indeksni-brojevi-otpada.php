<?php

/**
 *
 * @package Elixir
 */

// Exit if accessed directly.
defined('ABSPATH') || exit;

get_header();

while (have_posts()) :
    the_post();
    the_content();
endwhile;

?>
<div class="container-xxl py-80">
    <table id="upravljanje-otpadom" class="table">
        <thead>
            <tr class="table-primary">
                <th>Indeksni broj otpada</th>
                <th>Naziv otpada iz kataloga</th>
                <th>SAKUPLJANJE</th>
                <th>SKLADIŠTENJE</th>
                <th>TRETMAN</th>
            </tr>
        </thead>
        <tbody>
            <tr class="table-secondary">
                <th scope="row">02</th>
                <td>Otpadi iz poljoprivrede, hortikulture, akvakulture, šumarstva, lova i ribolova, pripreme i prerade
                    hrane</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">02 01</th>
                <td>Otpadi iz poljoprivrede, hortikulture, akvakulture, šumarstva, lova i ribolova</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>02 01 01</td>
                <td>muljevi od pranja i čišćenja</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>02 01 04</td>
                <td>otpadna plastika (isključujući ambalažu)</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>02 01 08*</td>
                <td>agrohemijski otpad koji sadrži opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>02 01 09</td>
                <td>agrohemijski otpad drugačiji od onog navedenog u 02 01 08</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>02 01 10</td>
                <td>otpad od metala</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>02 01 99</td>
                <td>otpadi koji nisu drugačije specificirani</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-secondary">
                <th scope="row">03</th>
                <td>Otpadi od prerade drveta i proizvodnje papira, kartona, pulpe, panela i nameštaja</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">03 01</th>
                <td>otpadi od prerade drveta i proizvodnje panela i nameštaja</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>03 01 01</td>
                <td>otpadna kora i pluta</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>03 01 04*</td>
                <td>piljevine, iverje, strugotine, drvo, iverica i furnir koji sadrže opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>03 01 05</td>
                <td>piljevine, iverje, strugotine, drvo, iverica i furnir koji ne sadrže opasne supstance drugačije od
                    onih navedenih u 03 01 04</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>03 01 99</td>
                <td>otpadi koji nisu drugačije specificirani</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">03 02</th>
                <td>otpadi od zaštite drveta</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>03 02 01*</td>
                <td>nehalogenovana organska zaštitna sredstva za drvo</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>03 02 02*</td>
                <td>organohlorna zaštitna sredstva za drvo</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>03 02 03*</td>
                <td>organometalna zaštitna sredstva za drvo</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>03 02 04*</td>
                <td>neorganska zaštitna sredstva za drvo</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>03 02 05*</td>
                <td>druga zaštitna sredstva koji sadrže opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>03 02 99</td>
                <td>otpadi koji nisu drugačije specificirani</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">03 03</th>
                <td>otpadi od proizvodnje i prerade pulpe, papira i kartona</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>03 03 01</td>
                <td>otpad od kore i drvni otpad</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>03 03 07</td>
                <td>mehanički izdvojeni nepotrebni sastojci pri proizvodnji pulpe od otpadnog papira i kartona</td>
                <td><span class="d-none">0</span></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>03 03 08</td>
                <td>otpadi od sortiranja papira i kartona namenjenih reciklaži</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>03 03 99</td>
                <td>otpadi koji nisu drugačije specificirani</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-secondary">
                <th scope="row">04</th>
                <td>otpadi iz tekstilne, krznarske i kožarske industrije</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">04 01</th>
                <td>otpadi iz industrije kože i krzna</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>04 01 01</td>
                <td>otpadi od uklanjanja drugog tkiva sa kože</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>04 01 02</td>
                <td>krečni otpad</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>04 01 03*</td>
                <td>otpadi od odmašćivanja koji sadrže rastvarače, bez tečne faze</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>04 01 04</td>
                <td>tečnost za štavljenje koja sadrži hrom</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>04 01 05</td>
                <td>tečnost za štavljenje bez hroma</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>04 01 06</td>
                <td>muljevi koji sadrže hrom, posebno muljevi iz tretmana otpadne vode na mestu nastajanja</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>04 01 07</td>
                <td>muljevi bez hroma, posebno muljevi iz tretmana otpadne vode na mestu nastajanja</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>04 01 08</td>
                <td>otpad od uštavljene kože (otpad od skidanja dlaka, sečenja, prašina od glancanja) koji sadrži hrom
                </td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>04 01 09</td>
                <td>otpadi od krojenja i završne obrade</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>04 01 99</td>
                <td>otpadi koji nisu drugačije specificirani</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">04 02</th>
                <td>otpadi iz tekstilne industrije</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>04 02 09</td>
                <td>otpadi od mešovitih materijala (impregnirani tekstil, elastomer, plastomer)</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>04 02 10</td>
                <td>organska materija iz prirodnih proizvoda (npr. mast, vosak)</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>04 02 14*</td>
                <td>otpadi iz završne obrade koji sadrže organske rastvarače</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>04 02 15</td>
                <td>otpadi iz završne obrade drugačiji od onih navedenih u 04 02 14</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>04 02 16*</td>
                <td>boje i pigmenti koji sadrže opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>04 02 17</td>
                <td>boje i pigmenti koji ne sadrže opasne supstance drugačiji od onih navedenih u 04 02 16&quot;.</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>04 02 19*</td>
                <td>muljevi iz tretmana otpadnih voda na mestu nastajanja koji sadrže opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>04 02 20</td>
                <td>muljevi iz tretmana otpadnih voda na mestu nastajanja drugačiji od onih navedenih u 04 02 19</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>04 02 21</td>
                <td>otpadi od neprerađenih tekstilnih vlakana</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>04 02 22</td>
                <td>otpadi od prerađenih tekstilnih vlakana</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>04 02 99</td>
                <td>otpadi koji nisu drugačije specificirani</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-secondary">
                <th scope="row">05</th>
                <td>OTPADI OD RAFINISANJA NAFTE, PREČIŠĆAVANJA PRIRODNOG GASA I PIROLITIČKOG TRETMANA UGLJA</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">05 01</th>
                <td>otpadi od rafinacije nafte</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>05 01 02*</td>
                <td>muljevi od desalinacije</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>05 01 03*</td>
                <td>muljevi sa dna rezervoara</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>05 01 04*</td>
                <td>kiselo-bazni muljevi</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>05 01 05*</td>
                <td>mrlje istekle nafte</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>05 01 06*</td>
                <td>zauljeni muljevi od postupaka održavanja pogona i opreme</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>05 01 07*</td>
                <td>kiseli katran</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>05 01 08*</td>
                <td>ostali katran</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>05 01 09*</td>
                <td>muljevi iz tretmana otpadnih voda na mestu nastajanja koji sadrže opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>05 01 10</td>
                <td>muljevi iz tretmana otpadnih voda na mestu nastajanja drugačiji od onih navedenih u 05 01 09</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>05 01 11*</td>
                <td>otpadi od prečišćavanja goriva bazama</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>05 01 12*</td>
                <td>ulja koja sadrže kiseline</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>05 01 13</td>
                <td>muljevi od vode iz kotla</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>05 01 14</td>
                <td>otpadi iz rashladnih kolona</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>05 01 15*</td>
                <td>utrošene filterske gline</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>05 01 16</td>
                <td>otpadi koji sadrže sumpor iz desulfurizacije nafte</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>05 01 17</td>
                <td>bitumen</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>05 01 99</td>
                <td>otpadi koji nisu drugačije specificirani</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">05 06</th>
                <td>otpadi od pirolitičkog tretmana uglja</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>05 06 01*</td>
                <td>kiseli katran</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>05 06 03*</td>
                <td>ostali katran</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>05 06 04</td>
                <td>otpad iz kolona za hlađenje</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>05 06 99</td>
                <td>otpadi koji nisu drugačije specificirani</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">05 07</th>
                <td>otpadi od prečišćavanja prirodnog gasa i transporta</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>05 07 01*</td>
                <td>otpadi koji sadrže živu</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>05 07 02</td>
                <td>otpadi koji sadrže sumpor</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>05 07 99</td>
                <td>otpadi koji nisu drugačije specificirani</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-secondary">
                <th scope="row">06</th>
                <td>OTPADI OD NEORGANSKIH HEMIJSKIH PROCESA</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">06 01</th>
                <td>otpadi od proizvodnje, formulacije, snabdevanja i upotrebe kiselina</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
            </tr>
            <tr>
                <td>06 01 01*</td>
                <td>sumporna i sumporasta kiselina</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
            </tr>
            <tr>
                <td>06 01 02*</td>
                <td>hlorovodonična kiselina</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
            </tr>
            <tr>
                <td>06 01 03*</td>
                <td>fluorovodonična kiselina</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
            </tr>
            <tr>
                <td>06 01 04*</td>
                <td>fosforna i fosforasta kiselina</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
            </tr>
            <tr>
                <td>06 01 05*</td>
                <td>azotna i azotasta kiselina</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
            </tr>
            <tr>
                <td>06 01 06*</td>
                <td>ostale kiseline</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
            </tr>
            <tr>
                <td>06 01 99</td>
                <td>otpadi koji nisu drugačije specificirani</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">06 02</th>
                <td>otpadi od proizvodnje, formulacije, snabdevanja i upotrebe baza</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
            </tr>
            <tr>
                <td>06 02 01*</td>
                <td>kalcijum hidroksid</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
            </tr>
            <tr>
                <td>06 02 03*</td>
                <td>amonijum hidroksid</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
            </tr>
            <tr>
                <td>06 02 04*</td>
                <td>natrijum hidroksid i kalijum hidroksid</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
            </tr>
            <tr>
                <td>06 02 05*</td>
                <td>ostale baze</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
            </tr>
            <tr>
                <td>06 02 99</td>
                <td>otpadi koji nisu drugačije specificirani</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">06 03</th>
                <td>otpadi od proizvodnje, formulacije, snabdevanja i upotrebe soli i rastvora soli i oksida metala</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>06 03 11*</td>
                <td>čvrste soli i rastvori koji sadrže cijanide</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>06 03 13*</td>
                <td>čvrste soli i rastvori koji sadrže teške metale</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>06 03 14</td>
                <td>čvrste soli i rastvori drugačiji od onih navedenih u 06 03 11 i 06 03 13</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>06 03 15*</td>
                <td>oksidi metala koji sadrže teške metale</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>06 03 16</td>
                <td>oksidi metala drugačiji od onih navedenih u 06 03 15</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>06 03 99</td>
                <td>otpadi koji nisu drugačije specificirani</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">06 04</th>
                <td>otpadi koji sadrže metale koji nisu navedeni u 06 03</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>06 04 03*</td>
                <td>otpadi koji sadrže arsen</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>06 04 04*</td>
                <td>otpadi koji sadrže živu</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>06 04 05*</td>
                <td>otpadi koji sadrže ostale teške metale</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>06 04 99</td>
                <td>otpadi koji nisu drugačije specificirani</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">06 05</th>
                <td>muljevi od tretmana otpadnih voda na mestu nastajanja</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>06 05 02*</td>
                <td>muljevi od tretmana otpadnih voda na mestu nastajanja koji sadrže opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>06 05 03</td>
                <td>muljevi od tretmana otpadnih voda na mestu nastajanja drugačiji od onih navedenih u 06 05 02</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">06 06</th>
                <td>otpadi od proizvodnje, formulacije, snabdevanja i upotrebe hemikalija koje sadrže sumpor, hemijskih
                    procesa sa sumporom i procesa odsumporavanja</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>06 06 02*</td>
                <td>otpadi koji sadrže opasne sulfide</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>06 06 03</td>
                <td>otpadi koji sadrže sulfide drugačije od onih navedenih u 06 06 02</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>06 06 99</td>
                <td>otpadi koji nisu drugačije specificirani</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">06 07</th>
                <td>otpadi od proizvodnje, formulacije, snabdevanja i upotrebe halogena i hemijskih procesa sa
                    halogenima</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>06 07 01*</td>
                <td>otpadi koji sadrže azbest od elektrolize</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>06 07 02*</td>
                <td>aktivni ugalj od proizvodnje hlora</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>06 07 03*</td>
                <td>mulj barijum sulfata koji sadrži živu</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>06 07 04*</td>
                <td>rastvori i kiseline, na primer kiseline iz kontaktnog procesa</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>06 07 99</td>
                <td>otpadi koji nisu drugačije specificirani</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">06 08</th>
                <td>otpadi od proizvodnje, formulacije, snabdevanja i upotrebe silicijuma i derivata silicijuma</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>06 08 02*</td>
                <td>otpadi od opasnih materija koje sadrže silicijum</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>06 08 99</td>
                <td>otpadi koji nisu drugačije specificirani</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">06 09</th>
                <td>otpadi od proizvodnje, formulacije, snabdevanja i upotrebe hemikalija koje sadrže fosfor i hemijskih
                    procesa sa primenom fosfora</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>06 09 02</td>
                <td>fosforna šljaka</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>06 09 03*</td>
                <td>otpadi od reakcija sa kalcijumom koji sadrže ili su kontaminirani opasnim supstancama</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>06 09 04</td>
                <td>otpadi od reakcija sa kalcijumom drugačiji od onih navedenih u 06 09 03</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>06 09 99</td>
                <td>otpadi koji nisu drugačije specificirani</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">06 10</th>
                <td>otpadi od proizvodnje, formulacije, snabdevanja i upotrebe hemikalija koje sadrže azot, hemijskih
                    procesa sa azotom i proizvodnje đubriva</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>06 10 02*</td>
                <td>otpadi koji sadrže opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>06 10 99</td>
                <td>otpadi koji nisu drugačije specificirani</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">06 11</th>
                <td>otpadi od proizvodnje neorganskih pigmenata i neprozirnih materija</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>06 11 01</td>
                <td>otpadi od reakcija sa kalcijumom iz proizvodnje titan-dioksida</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>06 11 99</td>
                <td>otpadi koji nisu drugačije specificirani</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">06 13</th>
                <td>otpadi od neorganskih hemijskih procesa koji nisu drugačije specificirani</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>06 13 01*</td>
                <td>neorganski pesticidi, sredstva za zaštitu drveta i drugi biocidi</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>06 13 02*</td>
                <td>potrošeni aktivni ugalj (osim 06 07 02)</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>06 13 03</td>
                <td>ugljena čađ</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>06 13 04*</td>
                <td>otpadi od obrade azbesta</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>06 13 05*</td>
                <td>čađ</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>06 13 99</td>
                <td>otpadi koji nisu drugačije specificirani</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-secondary">
                <th scope="row">07</th>
                <td>OTPADI OD ORGANSKIH HEMIJSKIH PROCESA</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">07 01</th>
                <td>otpadi od proizvodnje, formulacije, snabdevanja i upotrebe osnovnih organskih hemikalija</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 01 01*</td>
                <td>tečnosti za pranje na bazi vode i matične tečnosti</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 01 03*</td>
                <td>organski halogenovani rastvarači, tečnosti za pranje i matične tečnosti</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 01 04*</td>
                <td>ostali organski rastvarači, tečnosti za pranje i matične tečnosti</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 01 07*</td>
                <td>halogenovani talozi i ostaci od reakcija</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 01 08*</td>
                <td>ostali talozi i ostaci od reakcija</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 01 09*</td>
                <td>halogenovani filter - kolači (pogače), potrošeni apsorbenti</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 01 10*</td>
                <td>ostali filter - kolači (pogače), potrošeni apsorbenti</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 01 11*</td>
                <td>muljevi od tretmana otpadnih voda na mestu nastajanja koji sadrže opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 01 12</td>
                <td>muljevi od tretmana otpadnih voda na mestu nastajanja drugačiji od onih navedenih u 07 01 11</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 01 99</td>
                <td>otpadi koji nisu drugačije specificirani</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">07 02</th>
                <td>otpadi od proizvodnje, formulacije, snabdevanja i upotrebe plastike, sintetičke gume i sintetičkih
                    vlakana</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 02 01*</td>
                <td>tečnosti za pranje na bazi vode i matične tečnosti</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 02 03*</td>
                <td>organski halogenovani rastvarači, tečnosti za pranje i matične tečnosti</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 02 04*</td>
                <td>ostali organski rastvarači, tečnosti za pranje i matične tečnosti</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 02 07*</td>
                <td>halogenovani talozi i ostaci od reakcija</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 02 08*</td>
                <td>ostali talozi i ostaci od reakcija</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 02 09*</td>
                <td>halogenovani filter - kolači (pogače), potrošeni apsorbenti</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 02 10*</td>
                <td>ostali filter - kolači (pogače), potrošeni apsorbenti</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 02 11*</td>
                <td>muljevi od tretmana otpadnih voda na mestu nastajanja koji sadrže opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 02 12</td>
                <td>muljevi od tretmana otpadnih voda na mestu nastajanja drugačiji od onih navedenih u 07 02 11</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 02 13</td>
                <td>otpadna plastika</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 02 14*</td>
                <td>otpadi od aditiva koji sadrže opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 02 15</td>
                <td>otpadi od aditiva drugačiji od onih navedenih u 07 02 14</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 02 16*</td>
                <td>otpadi od opasnih materija koji sadrže silikone</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 02 17</td>
                <td>otpadi koji sadrže silikone drugačije od onih navedenih u 07 02 16</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 02 99</td>
                <td>otpadi koji nisu drugačije specificirani</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">07 03</th>
                <td>otpadi od proizvodnje, formulacije, snabdevanja i upotrebe organskih boja i pigmenata (osim 06 11)
                </td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 03 01*</td>
                <td>tečnosti za pranje na bazi vode i matične tečnosti</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 03 03*</td>
                <td>organski halogenovani rastvarači, tečnosti za pranje i matične tečnosti</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 03 04*</td>
                <td>ostali organski rastvarači, tečnosti za pranje i matične tečnosti</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 03 07*</td>
                <td>halogenovani talozi i ostaci od reakcija</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 03 08*</td>
                <td>ostali talozi i ostaci od reakcija</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 03 09*</td>
                <td>halogenovani filter - kolači (pogače), potrošeni apsorbenti</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 03 10*</td>
                <td>ostali filter - kolači (pogače), potrošeni apsorbenti</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 03 11*</td>
                <td>muljevi od tretmana otpadnih voda na mestu nastajanja koji sadrže opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 03 12</td>
                <td>muljevi od tretmana otpadnih voda na mestu nastajanja drugačiji od onih navedenih u 07 03 11</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 03 99</td>
                <td>otpadi koji nisu drugačije specificirani</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">07 04</th>
                <td>otpadi od proizvodnje, formulacije, snabdevanja i upotrebe organskih pesticida (osim 02 01 08 i 02
                    01 09), sredstava za zaštitu drveta (osim 03 02) i drugih biocida</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 04 01*</td>
                <td>tečnosti za pranje na bazi vode i matične tečnosti</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 04 03*</td>
                <td>organski halogenovani rastvarači, tečnosti za pranje i matične tečnosti</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 04 04*</td>
                <td>ostali organski rastvarači, tečnosti za pranje i matične tečnosti</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 04 07*</td>
                <td>halogenovani talozi i ostaci od reakcija</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 04 08*</td>
                <td>ostali talozi i ostaci od reakcija</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 04 09*</td>
                <td>halogenovani filter - kolači (pogače), potrošeni apsorbenti</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 04 10*</td>
                <td>ostali filter - kolači (pogače), potrošeni apsorbenti</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 04 11*</td>
                <td>muljevi od tretmana otpadnih voda na mestu nastajanja koji sadrže opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 04 12</td>
                <td>muljevi od tretmana otpadnih voda na mestu nastajanja drugačiji od onih navedenih u 07 04 11</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 04 13*</td>
                <td>čvrsti otpadi koji sadrže opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 04 99</td>
                <td>otpadi koji nisu drugačije specificirani</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">07 05</th>
                <td>otpadi od proizvodnje, formulacije, snabdevanja i upotrebe farmaceutskih preparata</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 05 01*</td>
                <td>tečnosti za pranje na bazi vode i matične tečnosti</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 05 03*</td>
                <td>organski halogenovani rastvarači, tečnosti za pranje i matične tečnosti</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 05 04*</td>
                <td>ostali organski rastvarači, tečnosti za pranje i matične tečnosti</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 05 07*</td>
                <td>halogenovani talozi i ostaci od reakcija</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 05 08*</td>
                <td>ostali talozi i ostaci od reakcija</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 05 09*</td>
                <td>halogenovani filter - kolači (pogače), potrošeni apsorbenti</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 05 10*</td>
                <td>ostali filter - kolači (pogače), potrošeni apsorbenti</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 05 11*</td>
                <td>muljevi od tretmana otpadnih voda na mestu nastajanja koji sadrže opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 05 12</td>
                <td>muljevi od tretmana otpadnih voda na mestu nastajanja drugačiji od onih navedenih u 07 05 11</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 05 13*</td>
                <td>čvrsti otpadi koji sadrže opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 05 14</td>
                <td>čvrsti otpadi drugačiji od onih navedenih u 07 05 13</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 05 99</td>
                <td>otpadi koji nisu drugačije specificirani</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">07 06</th>
                <td>otpadi od proizvodnje, formulacije, snabdevanja i upotrebe masti, masnoća, sapuna, deterdženata,
                    dezinfekcionih i kozmetičkih sredstava</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 06 01*</td>
                <td>tečnosti za pranje na bazi vode i matične tečnosti</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 06 03*</td>
                <td>organski halogenovani rastvarači, tečnosti za pranje i matične tečnosti</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 06 04*</td>
                <td>ostali organski rastvarači, tečnosti za pranje i matične tečnosti</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 06 07*</td>
                <td>halogenovani talozi i ostaci od reakcija</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 06 08*</td>
                <td>ostali talozi i ostaci od reakcija</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 06 09*</td>
                <td>halogenovani filter - kolači (pogače), potrošeni apsorbenti</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 06 10*</td>
                <td>ostali filter - kolači (pogače), potrošeni apsorbenti</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 06 11*</td>
                <td>muljevi od tretmana otpadnih voda na mestu nastajanja koji sadrže opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 06 12</td>
                <td>muljevi od tretmana otpadnih voda na mestu nastajanja drugačiji od onih navedenih u 07 06 11</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 06 99</td>
                <td>otpadi koji nisu drugačije specificirani</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">07 07</th>
                <td>otpadi od proizvodnje, formulacije, snabdevanja i upotrebe finih hemikalija i hemijskih proizvoda
                    koji nisu drugačije specificirani</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 07 01*</td>
                <td>tečnosti za pranje na bazi vode i matične tečnosti</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 07 03*</td>
                <td>organski halogenovani rastvarači, tečnosti za pranje i matične tečnosti</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 07 04*</td>
                <td>ostali organski rastvarači, tečnosti za pranje i matične tečnosti</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 07 07*</td>
                <td>halogenovani talozi i ostaci od reakcija</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 07 08*</td>
                <td>ostali talozi i ostaci od reakcija</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 07 09*</td>
                <td>halogenovani filter - kolači (pogače), potrošeni apsorbenti</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 07 10*</td>
                <td>ostali filter - kolači (pogače), potrošeni apsorbenti</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 07 11*</td>
                <td>muljevi od tretmana otpadnih voda na mestu nastajanja koji sadrže opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 07 12</td>
                <td>muljevi od tretmana otpadnih voda na mestu nastajanja drugačiji od onih navedenih u 07 07 11</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>07 07 99</td>
                <td>otpadi koji nisu drugačije specificirani</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-secondary">
                <th scope="row">08</th>
                <td>Otpadi od proizvodnje, formulacije, snabdevanja i upotrebe premaza (boje, lakovi i staklene
                    glazure), lepkovi, zaptivači i štamparske boje</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">08 01</th>
                <td>otpadi od proizvodnje, formulacije, snabdevanja i upotrebe i uklanjanja boja i lakova</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>08 01 11*</td>
                <td>otpadna boja i lak koji sadrže organske rastvarače ili druge opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>08 01 12</td>
                <td>otpadna boja i lak drugačiji od onih navedenih u 08 01 11</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>08 01 13*</td>
                <td>muljevi od boje ili laka koji sadrže organske rastvarače ili druge opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>08 01 14</td>
                <td>muljevi od boje ili laka drugačiji od onih navedenih u 08 01 13</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>08 01 15*</td>
                <td>muljevi na bazi vode koje sadrže boju ili lak na bazi organskih rastvarača ili drugih opasnih
                    supstanci</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>08 01 16</td>
                <td>muljevi od boje ili laka drugačiji od onih navedenih u 08 01 15</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>08 01 17*</td>
                <td>otpadi od uklanjanja boje ili laka koji sadrže organske rastvarače ili druge opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>08 01 18</td>
                <td>otpadi od uklanjanja boje ili laka drugačiji od onih navedenih u 08 01 17</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>08 01 19*</td>
                <td>vodene suspenzije koje sadrže boju ili lak na bazi organskih rastvarača ili drugih opasnih supstanci
                </td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>08 01 20</td>
                <td>vodene suspenzije koje sadrže boju ili lak drugačiji od onih navedenih u 08 01 19</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>08 01 21*</td>
                <td>otpad od tečnosti za uklanjanje boje ili laka</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>08 01 99</td>
                <td>otpadi koji nisu drugačije specificirani</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">08 02</th>
                <td>otpadi od proizvodnje, formulacije, snabdevanja i upotrebe ostalih premaza (uključujući keramičke
                    materijale)</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>08 02 01</td>
                <td>otpadni praškasti premazi</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>08 02 02</td>
                <td>muljevi na bazi vode koji sadrže keramičke materijale</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>08 02 03</td>
                <td>vodene suspenzije koje sadrže keramičke materijale</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>08 02 99</td>
                <td>otpadi koji nisu drugačije specificirani</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">08 03</th>
                <td>otpadi od proizvodnje, formulacije, snabdevanja i upotrebe štamparskog mastila</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>08 03 07</td>
                <td>muljevi na bazi vode koji sadrže mastilo</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>08 03 08</td>
                <td>tečni otpad na bazi vode koji sadrži mastilo</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>08 03 12*</td>
                <td>otpadno mastilo koje sadrži opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>08 03 13</td>
                <td>otpadno mastilo drugačije od onog navedenog u 08 03 12</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>08 03 14*</td>
                <td>muljevi od mastila koje sadrži opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>08 03 15</td>
                <td>muljevi od mastila drugačiji od onih navedenih u 08 03 14</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>08 03 16*</td>
                <td>otpadni rastvori za ecovanje</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>08 03 17*</td>
                <td>otpadni toner za štampanje koje sadrži opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>08 03 18</td>
                <td>otpadni toner za štampanje drugačiji od onog navedenog u 08 03 17</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>08 03 19*</td>
                <td>dispergovana ulja</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>08 03 99</td>
                <td>otpadi koji nisu drugačije specificirani</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">08 04</th>
                <td>otpadi od proizvodnje, formulacije, snabdevanja i upotrebe lepkova i zaptivača (uključujući i
                    vodootporne proizvode)</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>08 04 09*</td>
                <td>otpadi od uklanjanja boje ili laka koji sadrže organske rastvarače ili druge opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>08 04 10</td>
                <td>otpadni lepkovi i zaptivači drugačiji od onih navedenih u 08 04 09</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>08 04 11*</td>
                <td>muljevi od lepkova i zaptivača koji sadrže organske rastvarače ili druge opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>08 04 12</td>
                <td>muljevi od lepkova i zaptivača drugačiji od onih navedenih u 08 04 11</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>08 04 13*</td>
                <td>muljevi na bazi vode koji sadrže lepkove ili zaptivače koji sadrže organske rastvarače ili druge
                    opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>08 04 14</td>
                <td>muljevi na bazi vode koji sadrže lepkove ili zaptivače drugačiji od onih navedenih u 08 04 13</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>08 04 15*</td>
                <td>tečni otpad na bazi vode koji sadrži lepkove ili zaptivače koji sadrže organske rastvarače ili druge
                    opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>08 04 16</td>
                <td>tečni otpad na bazi vode koji sadrži lepkove ili zaptivače drugačiji od onih spomenutih u 08 04 15
                </td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>08 04 17*</td>
                <td>ulje od destilacije smola</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>08 04 99</td>
                <td>otpadi koji nisu drugačije specificirani</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">08 05</th>
                <td>otpadi koji nisu drugačije specificirani u 08</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>08 05 01*</td>
                <td>otpadni izocijanati</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-secondary">
                <th scope="row">09</th>
                <td>OTPADI IZ FOTOGRAFSKE INDUSTRIJE</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">09 01</th>
                <td>otpadi iz fotografske industrije</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>09 01 01*</td>
                <td>rastvori razvijača i aktivatora na bazi vode</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>09 01 02*</td>
                <td>rastvori razvijača za offset ploče na bazi vode</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>09 01 03*</td>
                <td>rastvori razvijača na bazi rastvarača</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>09 01 04*</td>
                <td>rastvori sredstava za fiksiranje</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>09 01 05*</td>
                <td>rastvori za izbeljivanje i rastvori sredstava za fiksiranje izbeljenosti</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>09 01 07</td>
                <td>fotografski film i papir koji sadrži srebro ili jedinjenja srebra</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>09 01 08</td>
                <td>fotografski film i papir koji ne sadrži srebro ili jedinjenja srebra</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>09 01 99</td>
                <td>otpadi koji nisu drugačije specificirani</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-secondary">
                <th scope="row">10</th>
                <td>OTPADI IZ TERMIČKIH PROCESA</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">10 01</th>
                <td>otpadi iz energana i drugih postrojenja za sagorevanje (osim 19)</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>10 01 01</td>
                <td>pepeo, šljaka i prašina iz kotla (izuzev prašine iz kotla navedene u 10 01 04)</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>10 01 04*</td>
                <td>leteći pepeo od sagorevanja nafte i prašina iz kotla</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>10 01 09*</td>
                <td>sumporna kiselina</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>10 01 13*</td>
                <td>leteći pepeo od emulgovanih ugljovodonika upotrebljenih kao gorivo</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>10 01 14*</td>
                <td>šljaka i prašina iz kotla iz procesa ko-spaljivanja, koja sadrži opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>10 01 16*</td>
                <td>leteći pepeo iz procesa ko-spaljivanja koji sadrži opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>10 01 18*</td>
                <td>otpadi iz prečišćavanja gasa koji sadrže opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>10 01 20*</td>
                <td>muljevi iz tretmana otpadnih voda na mestu nastajanja koji sadrže opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>10 01 22*</td>
                <td>muljevi na bazi vode od čišćenja kotla koji sadrže opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>10 01 25</td>
                <td>otpadi od skladištenja goriva i pripreme energana koji koriste ugalj</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>10 01 26</td>
                <td>otpadi iz tretmana rashladne vode</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>10 01 99</td>
                <td>otpadi koji nisu drugačije specificirani</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">10 02</th>
                <td>otpadi iz industrije gvožđa i čelika</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>10 02 07*</td>
                <td>čvrsti otpadi iz procesa tretmana gasa koji sadrže opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>10 02 11*</td>
                <td>zauljeni otpadi iz tretmana rashladne vode</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>10 02 13*</td>
                <td>muljevi i filter - kolači (pogače)iz procesa tretmana gasa koji sadrže opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>10 02 99</td>
                <td>otpadi koji nisu drugačije specificirani</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">10 03</th>
                <td>otpadi iz termičke metalurgije aluminijuma</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>10 03 05</td>
                <td>otpadna glinica</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>10 03 18</td>
                <td>otpadi koji sadrže ugljenik iz anodnog procesa drugačiji od onih navedenih u 10 03 17</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>10 03 27*</td>
                <td>zauljeni otpadi iz tretmana rashladne vode</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>10 03 99</td>
                <td>otpadi koji nisu drugačije specificirani</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">10 04</th>
                <td>otpadi iz termičke metalurgije olova</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>10 04 09*</td>
                <td>zauljeni otpadi iz tretmana rashladne vode</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>10 04 99</td>
                <td>otpadi koji nisu drugačije specificirani</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">10 05</th>
                <td>otpadi iz termičke metalurgije cinka</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>10 05 08*</td>
                <td>zauljeni otpadi iz tretmana rashladne vode</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>10 05 99</td>
                <td>otpadi koji nisu drugačije specificirani</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">10 06</th>
                <td>otpad iz termičke metalurgije bakra</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>10 06 09*</td>
                <td>zauljeni otpadi iz tretmana rashladne vode</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>10 06 10</td>
                <td>otpadi iz tretmana rashladne vode drugačiji od onih navedenih u 10 06 09</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>10 06 99</td>
                <td>otpadi koji nisu drugačije specificirani</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">10 07</th>
                <td>otpadi iz termičke metalurgije srebra, zlata i platine</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>10 07 07*</td>
                <td>zauljeni otpadi iz tretmana rashladne vode</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>10 07 99</td>
                <td>otpadi koji nisu drugačije specificirani</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">10 08</th>
                <td>otpadi iz termičke metalurgije ostalih obojenih metala</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>10 08 12*</td>
                <td>otpadi koji sadrže katran iz anodnog procesa</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>10 08 17*</td>
                <td>muljevi i filter - kolači (pogače) iz tretmana dimnog gasa koji sadrže opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>10 08 19*</td>
                <td>zauljeni otpadi iz tretmana rashladne vode</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>10 08 99</td>
                <td>otpadi koji nisu drugačije specificirani</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">10 09</th>
                <td>otpadi od livenja gvozdenih odlivaka</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>10 09 99</td>
                <td>otpadi koji nisu drugačije specificirani</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">10 10</th>
                <td>otpadi od livenja odlivaka obojenih metala</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>10 10 09*</td>
                <td>prašina dimnog gasa koja sadrži opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>10 10 11*</td>
                <td>ostale čvrste čestice koje sadrže opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>10 10 99</td>
                <td>otpadi koji nisu drugačije specificirani</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">10 11</th>
                <td>otpadi iz proizvodnje stakla i proizvoda od stakla</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>10 11 99</td>
                <td>otpadi koji nisu drugačije specificirani</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">10 12</th>
                <td>otpadi iz proizvodnje keramičkih proizvoda, cigli, pločica i proizvoda za građevinarstvo</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>10 12 99</td>
                <td>otpadi koji nisu drugačije specificirani</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">10 13</th>
                <td>otpadi iz proizvodnje cementa, kreča i gipsa i predmeta i proizvoda koji se od njih proizvode</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>10 13 99</td>
                <td>otpadi koji nisu drugačije specificirani</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-secondary">
                <th scope="row">11</th>
                <td>Otpadi od hemijskog tretmana površine i zaštite metala i drugih materijala; hidrometalurgija
                    obojenih metala</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">11 01</th>
                <td>otpadi od hemijskog tretmana površine i zaštite metala i drugih materijala (npr. procesi
                    galvanizacije, oblaganje cinkom, čišćenje kiselinom, radiranje, fosfatiranje, odmašćivanje bazama i
                    anodizacija)</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none"></span></td>
            </tr>
            <tr>
                <td>11 01 05*</td>
                <td>kiseline za čišćenje</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
            </tr>
            <tr>
                <td>11 01 06*</td>
                <td>kiseline koje nisu drugačije specificirane</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
            </tr>
            <tr>
                <td>11 01 07*</td>
                <td>baze za čišćenje</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
            </tr>
            <tr>
                <td>11 01 08*</td>
                <td>muljevi od fosfatiranja</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>11 01 09*</td>
                <td>muljevi i filter - kolači (pogače) koji sadrže opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>11 01 11*</td>
                <td>tečnosti za ispiranje na bazi vode koje sadrže opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>11 01 13*</td>
                <td>otpadi od odmašćivanja koji sadrže opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>11 01 14</td>
                <td>otpadi od odmašćivanja drugačiji od onih navedenih u 11 01 13</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>11 01 15*</td>
                <td>eluati i muljevi iz membranskih ili jonoizmenjivačkih sistema koji sadrže opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>11 01 16*</td>
                <td>zasićene ili potrošene jonoizmenjivačke smole</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>11 01 98*</td>
                <td>ostali otpadi koji sadrže opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>11 01 99</td>
                <td>otpadi koji nisu drugačije specificirani</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">11 02</th>
                <td>otpadi iz hidrometalurških procesa obojenih metala</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>11 02 03</td>
                <td>otpadi iz proizvodnje anoda za elektrolitičke procese u vodenoj sredini</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>11 02 06</td>
                <td>otpadi iz hidrometalurških procesa bakra drugačiji od onih navedenih u 11 02 05</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>11 02 07*</td>
                <td>ostali otpadi koji sadrže opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>11 02 99</td>
                <td>otpadi koji nisu drugačije specificirani</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">11 03</th>
                <td>muljevi i čvrsti otpadi iz procesa kaljenja</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>11 03 01*</td>
                <td>otpadi koji sadrže cijanide</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>11 03 02*</td>
                <td>ostali otpadi</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">11 05</th>
                <td>otpadi iz procesa vrele galvanizacije</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>11 05 03*</td>
                <td>čvrsti otpadi iz tretmana gasa</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>11 05 04*</td>
                <td>potrošena tečnost</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>11 05 99</td>
                <td>otpadi koji nisu drugačije specificirani</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-secondary">
                <th scope="row">12</th>
                <td>Otpadi od oblikovanja i fizičke i mehaničke površinske obrade metala i plastike</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">12 01</th>
                <td>otpadi od oblikovanja i fizičke i mehaničke površinske obrade metala i plastike</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>12 01 01</td>
                <td>struganje i obrada ferometala</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>12 01 02</td>
                <td>prašina i čestice ferometala</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>12 01 03</td>
                <td>struganje i obrada obojenih metala</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>12 01 04</td>
                <td>prašina i čestice obojenih metala</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>12 01 05</td>
                <td>obrada plastike</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>12 01 06*</td>
                <td>mineralna mašinska ulja koja sadrže halogene (izuzev emulzija i rastvora)</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>12 01 07*</td>
                <td>mineralna mašinska ulja koja ne sadrže halogene (izuzev emulzija i rastvora)</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>12 01 08*</td>
                <td>mašinske emulzije i rastvori koje sadrže halogene</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>12 01 09*</td>
                <td>mašinske emulzije i rastvori koje ne sadrže halogene</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>12 01 10*</td>
                <td>sintetička mašinska ulja</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>12 01 12*</td>
                <td>potrošeni vosak i masti</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>12 01 13</td>
                <td>otpadi od zavarivanja</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>12 01 14*</td>
                <td>mašinski muljevi koji sadrže opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>12 01 15</td>
                <td>mašinski muljevi drugačiji od onih navedenih u 12 01 14</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>12 01 16*</td>
                <td>otpad od peskarenja koji sadrži opasne supstance.</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>12 01 17</td>
                <td>otpad od peskarenja drugačiji od onog navedenog u 12 01 16. </td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>12 01 18*</td>
                <td>metalni muljevi (od mlevenja, brušenja i oštrenja) koji sadrži ulje</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>12 01 19*</td>
                <td>odmah biorazgradivo mašinsko ulje</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>12 01 20*</td>
                <td>potrošena tela za mlevenje i materijali za mlevenje koji sadrže opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>12 01 21</td>
                <td>potrošena tela za mlevenje i materijali za mlevenje drugačiji od onih navedenih u 12 01 20</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>12 01 99</td>
                <td>otpadi koji nisu drugačije specificirani</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">12 03</th>
                <td>otpadi iz procesa odmašćivanja vodom i parom (izuzev 11)</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>12 03 01*</td>
                <td>tečnosti za pranje na bazi vode</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>12 03 02*</td>
                <td>otpadi od odmašćivanja parom</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-secondary">
                <th scope="row">13</th>
                <td>Otpadi od ulja i ostataka tečnih goriva (osim jestivih ulja i onih u poglavljima 05, 12 i 19)</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">13 01</th>
                <td>otpadna hidraulična ulja</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>13 01 01*</td>
                <td>hidraulična ulja koja sadrže PCB</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>13 01 04*</td>
                <td>hlorovane emulzije</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>13 01 05*</td>
                <td>nehlorovane emulzije</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>13 01 09*</td>
                <td>mineralna hlorovana hidraulična ulja</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>13 01 10*</td>
                <td>mineralna nehlorovana hidraulična ulja</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>13 01 11*</td>
                <td>sintetička hidraulična ulja</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>13 01 12*</td>
                <td>odmah biorazgradiva hidraulična ulja</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>13 01 13*</td>
                <td>ostala hidraulična ulja</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">13 02</th>
                <td>otpadna motorna ulja, ulja za menjače i podmazivanje</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>13 02 04*</td>
                <td>mineralna hlorovana motorna ulja, ulja za menjače i podmazivanje</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>13 02 05*</td>
                <td>mineralna nehlorovana motorna ulja, ulja za menjače i podmazivanje</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>13 02 06*</td>
                <td>sintetička motorna ulja, ulja za menjače i podmazivanje</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>13 02 07*</td>
                <td>odmah biorazgradiva motorna ulja, ulja za menjače i podmazivanje</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>13 02 08*</td>
                <td>ostala motorna ulja, ulja za menjače i podmazivanje</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">13 03</th>
                <td>otpadna ulja za izolaciju i prenos toplote</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>13 03 01*</td>
                <td>ulja za izolaciju i prenos toplote koja sadrže PCB</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>13 03 06*</td>
                <td>mineralna hlorovana ulja za izolaciju i prenos toplote.</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>13 03 07*</td>
                <td>mineralna nehlorovana ulja za izolaciju i prenos toplote</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>13 03 08*</td>
                <td>sintetička ulja za izolaciju i prenos toplote</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>13 03 09*</td>
                <td>odmah biorazgradiva ulja za izolaciju i prenos toplote</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>13 03 10*</td>
                <td>ostala ulja za izolaciju i prenos toplote</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">13 04</th>
                <td>brodska ulja</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>13 04 01*</td>
                <td>ulja sa dna brodova iz rečne plovidbe</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>13 04 02*</td>
                <td>ulja sa dna brodova iz kanalizacije na pristaništu</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>13 04 03*</td>
                <td>ulja sa dna brodova iz ostale vrste plovidbe</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">13 05</th>
                <td>sadržaj separatora ulje/voda</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>13 05 01*</td>
                <td>čvrste materije iz peskolova i separatora ulje/voda</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>13 05 02*</td>
                <td>muljevi iz separatora ulje/voda</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>13 05 03*</td>
                <td>muljevi od hvatača ulja</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>13 05 06*</td>
                <td>ulja iz separatora ulje/voda</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>13 05 07*</td>
                <td>zauljena voda iz separatora ulje/voda</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>13 05 08*</td>
                <td>mešavine otpada iz komore za otpad i separatora ulje/voda</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">13 07</th>
                <td>otpadi od tečnih goriva</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>13 07 01*</td>
                <td>pogonsko gorivo i dizel</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>13 07 02*</td>
                <td>benzin</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>13 07 03*</td>
                <td>ostala goriva (uključujući mešavine)</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">13 08</th>
                <td>otpadna ulja koja nisu drugačije specificirana</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>13 08 01*</td>
                <td>muljevi ili emulzije od desalinacije</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>13 08 02*</td>
                <td>ostale emulzije</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>13 08 99*</td>
                <td>otpadi koji nisu drugačije specificirani</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-secondary">
                <th scope="row">14</th>
                <td>Otpadni organski rastvarači, sredstva za hlađenje i potisni gasovi (osim 07 i 08)</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">14 06</th>
                <td>otpadni organski rastvarači, sredstva za hlađenje i potisni gasovi na bazi pene/aerosola</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>14 06 01*</td>
                <td>hlorofluorougljovodonici, HCFC, HFC</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>14 06 02*</td>
                <td>ostali halogenovani rastvarači i smeše rastvarača</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>14 06 03*</td>
                <td>ostali rastvarači i smeše rastvarača</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>14 06 04*</td>
                <td>muljevi ili čvrsti otpadi koje sadrže halogenovane rastvarače</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>14 06 05*</td>
                <td>muljevi ili čvrsti otpadi koje sadrže ostale rastvarače</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-secondary">
                <th scope="row">15</th>
                <td>otpad od ambalaže, apsorbenti, krpe za brisanje, filterski materijali i zaštitne tkanine, ako nije
                    drugačije specificirano</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">15 01</th>
                <td>ambalaža (uključujući posebno sakupljenu ambalažu u komunalnom otpadu)</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>15 01 01</td>
                <td>papirna i kartonska ambalaža</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>15 01 02</td>
                <td>plastična ambalaža</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>15 01 03</td>
                <td>drvena ambalaža</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>15 01 04</td>
                <td>metalna ambalaža</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>15 01 05</td>
                <td>kompozitna ambalaža</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>15 01 06</td>
                <td>mešana ambalaža</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>15 01 07</td>
                <td>staklena ambalaža</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>15 01 09</td>
                <td>tekstilna ambalaža</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>15 01 10*</td>
                <td>ambalaža koja sadrži ostatke opasnih supstanci ili je kontaminirana opasnim supstancama</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>15 01 11*</td>
                <td>metalna ambalaža koja sadrži opasan čvrst porozni matriks (npr. azbest), uključujući i prazne boce
                    pod pritiskom</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">15 02</th>
                <td>apsorbenti, filterski materijali, krpe za brisanje i zaštitna odeća</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>15 02 02*</td>
                <td>apsorbenti, filterski materijali (uključujući filtere za ulje koji nisu drugačije specificirani),
                    krpe za brisanje, zaštitna odeća, koji su kontaminirani opasnim supstancama</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>15 02 03</td>
                <td>apsorbenti, filterski materijali, krpe za brisanje i zaštitna odeća drugačiji od onih navedenih u 15
                    02 02</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-secondary">
                <th scope="row">16</th>
                <td>Otpadi koji nisu drugačije specificirani u katalogu</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">16 01</th>
                <td>otpadna vozila iz različitih vidova transporta (uključujući mehanizaciju) i otpadi nastali
                    demontažom otpadnih vozila i od održavanja vozila (izuzev 13, 14, 16 06 i 16 08)</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>16 01 03</td>
                <td>otpadne gume</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>16 01 07*</td>
                <td>filteri za ulje</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>16 01 08*</td>
                <td>komponente koje sadrže živu</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>16 01 09*</td>
                <td>komponente koje sadrže PCB</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>16 01 10*</td>
                <td>eksplozivne komponente (npr. vazdušni jastuci)</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>16 01 11*</td>
                <td>kočione obloge koje sadrže azbest</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>16 01 12</td>
                <td>kočione obloge drugačije od onih navedenih u 16 01 11</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>16 01 13*</td>
                <td>kočione tečnosti</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>16 01 14*</td>
                <td>antifriz koji sadrži opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>16 01 15</td>
                <td>antifriz drugačiji od onog navedenog u 16 01 14</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>16 01 16</td>
                <td>rezervoari za tečni gas</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>16 01 17</td>
                <td>ferozni metal</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>16 01 18</td>
                <td>obojeni metal</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>16 01 19</td>
                <td>plastika</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>16 01 20</td>
                <td>staklo</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>16 01 21*</td>
                <td>opasne komponente drugačije od onih navedenih u 16 01 07 do 16 01 11 i 16 01 13 i 16 01 14)</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>16 01 22</td>
                <td>komponente koje nisu drugačije specificirane</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>16 01 99</td>
                <td>otpadi koji nisu drugačije specificirani</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">16 02</th>
                <td>otpadi od električne i elektronske opreme</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>16 02 09*</td>
                <td>transformatori i kondenzatori koji sadrže PCB</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>16 02 10*</td>
                <td>odbačena oprema koja sadrži ili je kontaminirana sa PCB, drugačija od one navedene u 16 02 09</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>16 02 11*</td>
                <td>odbačena oprema koja sadrži hlorofluorougljovodonike, HCFC, HFC</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>16 02 12*</td>
                <td>odbačena oprema koja sadrži slobodni azbest</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>16 02 13*</td>
                <td>odbačena oprema koja sadrži opasne komponente drugačija od one navedene u 16 02 09 do 16 02 12</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>16 02 14</td>
                <td>odbačena oprema drugačija od one navedene u 16 02 09 do 16 02 13</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>16 02 15*</td>
                <td>opasne komponente uklonjene iz odbačene opreme</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>16 02 16</td>
                <td>komponente uklonjene iz odbačene opreme drugačije od onih navedenih u 16 02 15</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">16 03</th>
                <td>komponente izvan specifikacije i nekorišćeni proizvodi</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
            </tr>
            <tr>
                <td>16 03 03*</td>
                <td>neorganski otpadi koji sadrže opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>16 03 04</td>
                <td>neorganski otpadi drugačiji od onih navedenih u 16 03 03</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>16 03 05*</td>
                <td>organski otpadi koji sadrže opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
            </tr>
            <tr>
                <td>16 03 06</td>
                <td>organski otpadi drugačiji od onih navedenih u 16 03 05</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">16 05</th>
                <td>gasovi u bocama pod pritiskom i odbačene hemikalije</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>16 05 04*</td>
                <td>gasovi u bocama pod pritiskom (uključujući halone) koji sadrže opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>16 05 05</td>
                <td>gasovi u bocama pod pritiskom drugačiji od onih navedenih u 16 05 04</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>16 05 06*</td>
                <td>laboratorijske hemikalije koje se sastoje ili sadrže opasne supstance, uključujući smeše
                    laboratorijskih hemikalija</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>16 05 07*</td>
                <td>odbačene neorganske hemikalije koje se sastoje ili sadrže opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>16 05 08*</td>
                <td>odbačene organske hemikalije koje se sastoje ili sadrže opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>16 05 09</td>
                <td>odbačene hemikalije drugačije od onih navedenih u 16 05 06, 16 05 07 ili 16 05 08</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">16 06</th>
                <td>baterije i akumulatori</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>16 06 01*</td>
                <td>olovne baterije</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>16 06 02*</td>
                <td>baterije od nikl-kadmijuma</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>16 06 03*</td>
                <td>baterije koje sadrže živu</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>16 06 04</td>
                <td>alkalne baterije (izuzev 16 06 03)</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>16 06 05</td>
                <td>druge baterije i akumulatori</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>16 06 06*</td>
                <td>posebno sakupljen elektrolit iz baterija i akumulatora</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">16 07</th>
                <td>otpadi iz rezervoara za transport i skladištenje i otpad od čišćenja buradi (izuzev 05 i 13)</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
            </tr>
            <tr>
                <td>16 07 08*</td>
                <td>otpadi koji sadrže ulje</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>16 07 09*</td>
                <td>otpadi koji sadrže ostale opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
            </tr>
            <tr>
                <td>16 07 99</td>
                <td>otpadi koji nisu drugačije specificirani</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">16 08</th>
                <td>istrošeni katalizatori</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>16 08 01</td>
                <td>istrošeni katalizatori koji sadrže zlato, srebro, renijum, rodijum, paladijum, iridijum ili platinu
                    (izuzev 16 08 07)</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>16 08 02*</td>
                <td>istrošeni katalizatori koji sadrže opasne prelazne metale ili opasna jedinjenja prelaznih metala
                </td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>16 08 03</td>
                <td>istrošeni katalizatori koji sadrže prelazne metale ili jedinjenja prelaznih metala koji nisu
                    drugačije specificirani</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>16 08 04</td>
                <td>istrošeni tečni katalizatori za katalitički kreking (izuzev 16 08 07)</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>16 08 05*</td>
                <td>istrošeni katalizatori koji sadrže fosfornu kiselinu</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>16 08 06*</td>
                <td>istrošene tečnosti upotrebljene kao katalizatori</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>16 08 07*</td>
                <td>istrošeni katalizatori kontaminirani opasnim supstancama</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">16 09</th>
                <td>oksidansi</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>16 09 01*</td>
                <td>permanganati, npr. kalijum permanganat</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>16 09 02*</td>
                <td>hromati, npr. kalijum hromat, kalijum- ili natrijum dihromat</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>16 09 03*</td>
                <td>peroksidi, npr. vodonik peroksid</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>16 09 04*</td>
                <td>oksidanti koji nisu drugačije specificirani</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">16 10</th>
                <td>tečni otpadi na bazi vode namenjeni tretmanu van mesta nastajanja</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
            </tr>
            <tr>
                <td>16 10 01*</td>
                <td>tečni otpadi na bazi vode koji sadrže opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
            </tr>
            <tr>
                <td>16 10 02</td>
                <td>tečni otpadi na bazi vode drugačiji od onih navedenih u 16 10 01</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>16 10 03*</td>
                <td>koncentrati na bazi vode koji sadrže opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>16 10 04</td>
                <td>koncentrati na bazi vode drugačiji od onih navedenih u 16 10 03</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">16 11</th>
                <td>otpadne obloge i vatrostalni materijali</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>16 11 01*</td>
                <td>obloge na bazi ugljenika i vatrostalni materijali iz metalurških procesa koji sadrže opasne
                    supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>16 11 03*</td>
                <td>ostale obloge i vatrostalni materijali iz metalurških procesa koji sadrže opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>16 11 05*</td>
                <td>obloge i vatrostalni materijali iz nemetalurških procesa koji sadrže opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-secondary">
                <th scope="row">17</th>
                <td>Građevinski otpad i otpad od rušenja (uključujući i iskopanu zemlju sa kontaminiranih lokacija)</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">17 01</th>
                <td>beton, cigle, crep i keramika</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>17 01 07</td>
                <td>mešavine ili pojedine frakcije betona, cigle, pločice i keramika drugačiji od onih navedenih u 17 01
                    06</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">17 02</th>
                <td>drvo, staklo i plastika</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>17 02 01</td>
                <td>drvo</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>17 02 02</td>
                <td>staklo</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>17 02 03</td>
                <td>plastika</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>17 02 04*</td>
                <td>staklo, plastika i drvo koji sadrže opasne supstance ili su kontaminirani opasnim supstancama</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">17 03</th>
                <td>bituminozne mešavine, katran i katranski proizvodi</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>17 03 01*</td>
                <td>bituminozne mešavine koje sadrže katran od uglja</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>17 03 02</td>
                <td>bituminozne mešavine drugačije od onih navedenih u 17 03 01</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>17 03 03*</td>
                <td>katran od uglja i katranski proizvodi</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">17 04</th>
                <td>metali (uključujući i njihove legure)</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>17 04 01</td>
                <td>bakar, bronza, mesing</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>17 04 02</td>
                <td>aluminijum</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>17 04 03</td>
                <td>olovo</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>17 04 04</td>
                <td>cink</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>17 04 05</td>
                <td>gvožđe i čelik</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>17 04 06</td>
                <td>kalaj</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>17 04 07</td>
                <td>mešani metali</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>17 04 09*</td>
                <td>otpad od metala kontaminiran opasnim supstancama</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>17 04 10*</td>
                <td>kablovi koji sadrže ulje, katran od uglja i druge opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>17 04 11</td>
                <td>kablovi drugačiji od onih navedenih u 17 04 10</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">17 05</th>
                <td>zemlja (uključujući zemlju iskopanu sa kontaminiranih lokacija), kamen i iskop</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>17 05 03*</td>
                <td>zemlja i kamen koji sadrže opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">17 06</th>
                <td>izolacioni materijali i građevinski materijali koji sadrže azbest</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>17 06 01*</td>
                <td>izolacioni materijali koji sadrže azbest</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>17 06 03*</td>
                <td>ostali izolacioni materijali koji se sastoje od ili sadrže opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>17 06 04</td>
                <td>izolacioni materijali drugačiji od onih navedenih u 17 06 01 i 17 06 03</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>17 06 05*</td>
                <td>građevinski materijali koji sadrže azbest</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">17 09</th>
                <td>ostali otpadi od građenja i rušenja</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>17 09 03*</td>
                <td>ostali otpadi od građenja i rušenja (uključujući mešane otpade) koji sadrže opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>17 09 04</td>
                <td>mešani otpadi od građenja i rušenja drugačiji od onih navedenih u 17 09 01 i 17 09 02 i 17 09 03
                </td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-secondary">
                <th scope="row">18</th>
                <td>Otpadi od zdravstvene zaštite ljudi i Životinja i/ili s tim povezanog istraživanja (izuzev otpada iz
                    kuhinja i restorana koji ne dolazi od neposredne zdravstvene zaštite)</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">18 01</th>
                <td>otpadi iz porodilišta, dijagnostike, tretmana ili prevencije bolesti ljudi</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>18 01 06*</td>
                <td>hemikalije koje se sastoje od ili sadrže opasne supstance</td>
                <td><span class="d-none">0</span></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>18 01 07</td>
                <td>hemikalije drugačije od onih navedenih u 18 01 06</td>
                <td><span class="d-none">0</span></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>18 01 08*</td>
                <td>citotoksični i citostatični lekovi</td>
                <td><span class="d-none">0</span></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>18 01 09</td>
                <td>lekovi drugačiji od onih navedenih u 18 01 08</td>
                <td><span class="d-none">0</span></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>18 01 10*</td>
                <td>otpadni amalgam iz stomatologije</td>
                <td><span class="d-none">0</span></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">18 02</th>
                <td>otpadi od istraživanja, dijagnostike, tretmana ili prevencije bolesti životinja</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>18 02 05*</td>
                <td>hemikalije koje se sastoje od ili sadrže opasne supstance</td>
                <td><span class="d-none">0</span></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>18 02 06</td>
                <td>hemikalije drugačije od onih navedenih u 18 02 05</td>
                <td><span class="d-none">0</span></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>18 02 07*</td>
                <td>citotoksični i citostatični lekovi</td>
                <td><span class="d-none">0</span></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>18 02 08</td>
                <td>lekovi drugačiji od onih navedenih u 18 02 07</td>
                <td><span class="d-none">0</span></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-secondary">
                <th scope="row">19</th>
                <td>Otpadi iz postrojenja za obradu otpada, pogona za tretman otpadnih voda van mesta nastajanja i
                    pripremu vode za ljudsku potrošnju i korišćenje u industriji</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none"></span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">19 01</th>
                <td>otpadi od spaljivanja ili pirolize otpada</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none"></span></td>
            </tr>
            <tr>
                <td>19 01 05*</td>
                <td>filter - kolač (pogače) iz tretmana gasa</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>19 01 06*</td>
                <td>tečni otpadi na bazi vode od tretmana gasa i drugi tečni otpadi na bazi vode</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>19 01 07*</td>
                <td>čvrsti otpadi od tretmana gasa</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>19 01 10*</td>
                <td>istrošeni aktivni ugalj od tretmana gasa</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>19 01 11*</td>
                <td>šljaka koja sadrži opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>19 01 12</td>
                <td>šljaka drugačija od one navedene u 19 01 11</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
            </tr>
            <tr>
                <td>19 01 13*</td>
                <td>leteći pepeo koji sadrži opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>19 01 14</td>
                <td>leteći pepeo drugačiji od onog navedenog u 19 01 13</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
            </tr>
            <tr>
                <td>19 01 15*</td>
                <td>prašina iz kotla koja sadrži opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>19 01 16</td>
                <td>prašina iz kotla drugačija od one navedene u 19 01 15</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
            </tr>
            <tr>
                <td>19 01 17*</td>
                <td>otpadi od pirolize koji sadrže opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>19 01 99</td>
                <td>otpadi koji nisu drugačije specificirani</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">19 02</th>
                <td>otpadi od fizičko/hemijskih tretmana otpada (uključujući dehromiranje, decijanizaciju i
                    neutralizaciju)</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>19 02 03</td>
                <td>prethodno izmešani otpadi koji se sastoje samo od neopasnog otpada</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>19 02 04*</td>
                <td>prethodno izmešani otpadi koji se sastoje od najmanje jednog opasnog otpada</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>19 02 05*</td>
                <td>muljevi iz fizičko/hemijskog tretmana koji sadrže opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>19 02 06</td>
                <td>muljevi iz fizičko/hemijskog tretmana drugačiji od onih navedenih u 19 02 05</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>19 02 07*</td>
                <td>ulja i koncentrati od separacije</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>19 02 08*</td>
                <td>tečni sagorljivi otpadi koji sadrže opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>19 02 09*</td>
                <td>čvrsti sagorljivi otpadi koji sadrže opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>19 02 10</td>
                <td>sagorljivi otpadi drugačiji od onih navedenih u 19 02 08 i 19 02 09</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>19 02 11*</td>
                <td>ostali otpadi koji sadrže opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>19 02 99</td>
                <td>otpadi koji nisu drugačije specificirani</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">19 03</th>
                <td>stabilizovani/solidifikovani otpadi</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>19 03 04*</td>
                <td>otpadi označeni kao opasni, delimično stabilizovani</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>19 03 05</td>
                <td>stabilizovani otpadi drugačiji od onih navedenih u 19 03 04</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>19 03 06*</td>
                <td>otpadi označeni kao opasni, solidifikovani</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>19 03 07</td>
                <td>solidifikovani otpadi drugačiji od onih navedenih u 19 03 06</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">19 04</th>
                <td>ostakljen (vitrifikovan) otpad i otpadi nastali u procesu vitrifikacije</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>19 04 02*</td>
                <td>leteći pepeo i ostali otpadi od tretmana dimnog gasa</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>19 04 03*</td>
                <td>čvrsta faza koja se nije vitrifikovala</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">19 07</th>
                <td>procedne vode iz sanitarnih deponija</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>19 07 02*</td>
                <td>procedne vode iz sanitarnih deponija koje sadrže opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">19 08</th>
                <td>otpadi iz pogona za tretman otpadnih voda koji nisu drugačije specificirani</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>19 08 01</td>
                <td>otpad od mehaničkog razdvajanja na rešetkama</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>19 08 02</td>
                <td>otpad sa peščanog filtera</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>19 08 05</td>
                <td>muljevi od tretmana urbanih otpadnih voda</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>19 08 06*</td>
                <td>zasićene ili potrošene jonoizmenjivačke smole</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>19 08 07*</td>
                <td>rastvori i muljevi iz regeneracije jonoizmenjivača</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>19 08 08*</td>
                <td>otpad sa membranskog sistema koji sadrži teške metale</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>19 08 09</td>
                <td>smeše masti i ulja iz separacije ulje/voda koje sadrže samo jestiva ulja i masnoće</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>19 08 10*</td>
                <td>smeše masti i ulja iz separacije ulje/voda drugačije od onih navedenih u 19 08 09</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>19 08 11*</td>
                <td>muljevi koji sadrže opasne supstance iz biološkog tretmana industrijske otpadne vode</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>19 08 12</td>
                <td>muljevi iz biološkog tretmana industrijske otpadne vode drugačiji od onih navedenih u 19 08 11</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>19 08 13*</td>
                <td>muljevi koji sadrže opasne supstance iz ostalih tretmana industrijske otpadne vode</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>19 08 14</td>
                <td>muljevi iz ostalih tretmana industrijske otpadne vode drugačiji od onih navedenih u 19 08 13</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>19 08 99</td>
                <td>otpadi koji nisu drugačije specificirani</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">19 10</th>
                <td>otpadi od sitnjenja otpada koji sadrže metal</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>19 10 03*</td>
                <td>laka frakcija i prašina koje sadrže opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>19 10 05*</td>
                <td>ostale frakcije koje sadrže opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">19 11</th>
                <td>otpadi iz regeneracije ulja</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>19 11 01*</td>
                <td>istrošena filterska glina</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>19 11 02*</td>
                <td>kiseli katrani</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>19 11 03*</td>
                <td>tečni otpadi na bazi vode</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>19 11 04*</td>
                <td>otpadi od čišćenja goriva bazama</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>19 11 05*</td>
                <td>muljevi iz tretmana otpadnih voda na mestu nastajanja koji sadrže opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>19 11 06</td>
                <td>muljevi iz tretmana otpadnih voda na mestu nastajanja drugačiji od onih navedenih u 19 11 05</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>19 11 07*</td>
                <td>otpadi od prečišćavanja dimnih gasova</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>19 11 99</td>
                <td>otpadi koji nisu drugačije specificirani</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">19 12</th>
                <td>otpadi od mehaničkog tretmana otpada (npr. sortiranja, drobljenja, kompaktiranja i paletizovanja)
                    koji nisu drugačije specificirani</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>19 12 01</td>
                <td>papir i karton</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>19 12 02</td>
                <td>metali koji sadrže gvožđe</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>19 12 03</td>
                <td>obojeni metali</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>19 12 04</td>
                <td>plastika i guma</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>19 12 05</td>
                <td>staklo</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>19 12 06*</td>
                <td>drvo koje sadrži opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>19 12 07</td>
                <td>drvo drugačije od onog navedenog u 19 12 06</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>19 12 08</td>
                <td>tekstil</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>19 12 09</td>
                <td>minerali (npr. pesak i kamen)</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>19 12 10</td>
                <td>sagorljivi otpad (gorivo dobijeno iz otpada)</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>19 12 11*</td>
                <td>drugi otpadi (uključujući mešavine materijala) od mehaničkog tretmana otpada koji sadrže opasne
                    supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>19 12 12</td>
                <td>drugi otpadi (uključujući mešavine materijala) od mehaničkog tretmana otpada drugačiji od onih
                    navedenih u 19 12 11</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">19 13</th>
                <td>otpadi od remedijacije zemljišta i podzemnih voda</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>19 13 01*</td>
                <td>čvrsti otpadi od remedijacije zemljišta koji sadrže opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>19 13 03*</td>
                <td>muljevi od remedijacije zemljišta koji sadrže opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>19 13 05*</td>
                <td>muljevi od remedijacije podzemnih voda koji sadrže opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>19 13 07*</td>
                <td>tečni otpadi na bazi vode i vodeni koncentrati od remedijacije podzemnih voda koji sadrže opasne
                    supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-secondary">
                <th scope="row">20</th>
                <td>Komunalni otpadi (kućni otpad i slični komercijalni industrijski otpadi), uključujući odvojeno
                    sakupljene frakcije</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr class="table-light">
                <th scope="row">20 01</th>
                <td>odvojeno sakupljene frakcije (izuzev 15 01)</td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">1</span></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>20 01 01</td>
                <td>papir i karton</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>20 01 02</td>
                <td>staklo</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>20 01 10</td>
                <td>odeća</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>20 01 11</td>
                <td>tekstil</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>20 01 13*</td>
                <td>rastvarači</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>20 01 14*</td>
                <td>kiseline</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>20 01 15*</td>
                <td>baze</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>20 01 17*</td>
                <td>foto-hemikalije</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>20 01 19*</td>
                <td>pesticidi</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>20 01 25</td>
                <td>jestiva ulja i masti</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>20 01 26*</td>
                <td>ulja i masti drugačiji od onih navedenih u 20 01 25</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>20 01 27*</td>
                <td>boja, mastila, lepkovi i smole koji sadrže opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>20 01 28</td>
                <td>boja, mastila, lepkovi i smole drugačiji od onih navedenih u 20 01 27</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>20 01 29*</td>
                <td>deterdženti koji sadrže opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>20 01 30</td>
                <td>deterdženti drugačiji od onih navedenih u 20 01 29</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>20 01 31*</td>
                <td>citotoksični i citostatični lekovi</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>20 01 32</td>
                <td>lekovi drugačiji od onih navedenih u 20 01 31</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>20 01 34</td>
                <td>baterije i akumulatori drugačiji od onih navedenih u 20 01 33</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>20 01 36</td>
                <td>odbačena električna i elektronska oprema drugačija od one navedene u 20 01 21, 20 01 23 i 20 01 35
                </td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>20 01 37*</td>
                <td>drvo koje sadrži opasne supstance</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>20 01 38</td>
                <td>drvo drugačije od onog navedenog u 20 01 37</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>20 01 39</td>
                <td>plastika</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>20 01 40</td>
                <td>metali</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>20 01 41</td>
                <td>otpadi od čišćenja dimnjaka</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
            <tr>
                <td>20 01 99</td>
                <td>ostale frakcije koje nisu drugačije specificirane</td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">1</span><i class="icon-ok"></i></td>
                <td><span class="d-none">0</span></td>
            </tr>
        </tbody>
    </table>
</div>
<script>
jQuery(function($) {
    $.fn.dataTable.ext.search.push(
        function(settings, data, dataIndex) {
            var _sakupljanje = $('#sakupljanje').prop("checked") ? 1 : 0,
                _skladistenje = $('#skladistenje').prop("checked") ? 1 : 0,
                _tretman = $('#tretman').prop("checked") ? 1 : 0;

            if (_sakupljanje != 1 && _skladistenje != 1 && _tretman != 1) {
                return true;
            } else {
                var sakupljanje = data[2],
                    skladistenje = data[3],
                    tretman = data[4];

                if ((_sakupljanje == 1 && _sakupljanje == sakupljanje) ||
                    (_skladistenje == 1 && _skladistenje == skladistenje) ||
                    (_tretman == 1 && _tretman == tretman)) {
                    return true;
                }

                return false;
            }
        }
    );
    var table = $('#upravljanje-otpadom').DataTable({
        "pageLength": 100,
        columns: [
            null,
            {
                orderable: false
            },
            {
                orderable: false
            },
            {
                orderable: false
            },
            {
                orderable: false
            },
        ],
        fixedHeader: {
            header: true,
            headerOffset: 50
        },
        dom: "<'row align-items-center'<'col-sm-12 col-md-6 col-lg-auto'f><'col-sm-12 col-md-6 col-lg'<'#filtering'>><'col-sm-12 col-lg-auto'l>>" +
            "<'row'<'col-sm-12'tr>>" +
            "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
        "language": {
            "decimal": "",
            "emptyTable": "Nema podataka u tabeli",
            "info": "Prikazano _START_ do _END_ od _TOTAL_ rezultata",
            "infoEmpty": "Prikazano 0 do 0 od 0",
            "infoFiltered": "(filtrirano od ukupno _MAX_)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Prikaži _MENU_ rezultata",
            "loadingRecords": "Učitavanje...",
            "processing": "",
            "search": "Pretraga:",
            "zeroRecords": "Nema rezultata",
            "paginate": {
                "first": "Prvo",
                "last": "Poslednje",
                "next": "Sledeća",
                "previous": "Prethodna"
            },
            "aria": {
                "sortAscending": ": aktiviraj za sortiranje uzlazno",
                "sortDescending": ": aktiviraj za sortiranje silazno"
            }
        },
        initComplete: function() {
            $('#filtering').html('<div class="form-check form-check-inline">' +
                '<input class="form-check-input" type="checkbox" id="sakupljanje" value="ok" data-column="2">' +
                '<label class="form-check-label" for="sakupljanje">Sakupljanje</label>' +
                '</div>' +
                '<div class="form-check form-check-inline">' +
                '<input class="form-check-input" type="checkbox" id="skladistenje" value="ok" data-column="2">' +
                '<label class="form-check-label" for="skladistenje">Skladištenje</label>' +
                '</div>' +
                '<div class="form-check form-check-inline">' +
                '<input class="form-check-input" type="checkbox" id="tretman" value="ok" data-column="2">' +
                '<label class="form-check-label" for="tretman">Tretman</label>' +
                '</div>');

        }

    });
    $(document).on('change', '#filtering input[type="checkbox"]', function() {
        table.draw();
    });

})
</script>
<?php

get_footer();