<?php 

require_once('admin/conf/config.php'); 
require_once('admin/conf/dbopen.php'); 

//painiketta ei paineta
if (!isset($_GET['painike1'])) { ?>

<?php } elseif (isset($_GET['painike1'])) { 

//kerätään tiedot
$name = $_GET['name'];
$email = $_GET['email'];
$tel = $_GET['tel'];
$url = $_GET['url'];
$mes = $_GET['message'];
$joboffer = $_GET['joboffer'];
$reply = $_GET['reply'];

$query = "INSERT INTO contact(name, email, tel, homeURL, message, job_offer, reply) VALUES('".$name."', '".$email."', '".$tel."', '".$url."', '".$mes."', '".$joboffer."', '".$reply."')";
$check= mysql_query($query); 
if (!$check) { 
    exit('<p>Kyselyssä tapahtui virhe: ' . mysql_error() . '</p>'); 
} elseif ($check) { 
  print '<p>Thank you for contacting me!</p>'; 
}   


} 

//suljetaan yhteys
require_once('admin/conf/dbclose.php'); 

?> 