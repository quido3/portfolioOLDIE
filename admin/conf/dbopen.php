<?php

$yhteys=mysql_connect($dbhost,$dbuser,$dbpass);
if (!$yhteys) {
	exit("<p>Tietokantaan ei saada yhteyttä</p>");
}
if (!mysql_select_db($dbname,$yhteys)) {
	exit("<p>Tietokantaa ei löytynyt</p>");
}
?>