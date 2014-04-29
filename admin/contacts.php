<!DOCTYPE html>
<html>
	<head>
		<title>Portfolio - admin</title>
		<meta charset="UTF-8">
		<link href="styles.css" type="text/css" rel="stylesheet" title="" media="screen" />
	</head>
	<body>
		<div id="page">
		
			<div id="navi">
				<li><a href="index.html">Index</a></li>
				<li><a href="contacts.php">Contacts</a></li>
				<li><a href="statistics.html">Statictics</a></li>
			</div>
			
			<div id="content">
				<p>
				<?php 
					require_once('conf/config.php'); 
					require_once('conf/dbopen.php'); 
					 
					//Alustetaan kysely 
					$query="SELECT name, email, tel, homeURL, message, job_offer, reply FROM contact"; 

					//Suoritetaan kysely 
					$result=mysql_query($query); 

					if (!$result) { 
						exit('<p>Kysely ei onnistunut' . mysql_error() . '</p>'); 
					} 

					//Haun tulos julki 
					print '<table>'; 
					print '<tr><th>Name</th><th>Email</th><th>Telephone</th><th>Home URL</th><th>Message</th><th>Job offer</th><th>Reply</th></tr>';
					while ($info=mysql_fetch_array($result)) { 
						print "<tr>\n" . "<td>" . $info[0] . "</td><td>" . $info[1] . "</td><td>" . $info[2] . "</td><td>" . $info[3] . "</td><td>" . $info[4] . "</td><td>" . $info[5] . "</td><td>" . $info[6] . "</td></tr>\n"; 
					} 
					print "</table>"; 

					require_once('conf/dbclose.php'); 
					 
					show_source(__FILE__);  
				?> 


				</p>
		
			</div>
			
			<div id="footer">
				<p>d,jshafkjs dfdkjfghkjdsf dfkjsdhfkjdhs</p>
			</div>
			
		</div>
	</body>
</html>