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
				<ul>
				<li><a href="index.html">Index</a></li>
				<li><a href="contacts.php">Contacts</a></li>
				<li><a href="statistic.html">Statistics</a></li>
				</ul>
			</div>
			
			<div id="content">
				<br />
				You can delete one message at the time.
				<br />
				<?php 
					require_once('conf/config.php'); 
					require_once('conf/dbopen.php'); 
					 
					//Alustetaan kysely 
					$query="SELECT name, email, tel, homeURL, message, job_offer, reply, id FROM contact ORDER BY id DESC"; 

					//Suoritetaan kysely 
					$result=mysql_query($query); 

					if (!$result) { 
						exit('<p>Kysely ei onnistunut' . mysql_error() . '</p>'); 
					} 

					//Haun tulos julki
					print '<form method="get" action="contacts.php" >';
					print '<input type="submit" name="button" value="Delete" />';
					print '<br />';
					
					if (isset($_GET['button'])) {
						$delete = $_GET['delete'];
						
						
						$del = @mysql_query("DELETE FROM contact WHERE id='$delete'");
						
						if (del){
							echo '<script>location.replace("contacts.php");</script>';
						}
						else {
							echo '<p>Virhe' . mysql_error();
						}
					}
					
					
					while ($info=mysql_fetch_array($result)) {
						print "<table border='1'>";
						print "<tr><td><input type='checkbox' name='delete' value='" . $info[7] . "' /></td></tr><tr><th>Name</th><td>" . $info[0] . "</td><th>Home URL</th><td>" . $info[3] . "</td></tr><tr><th>Email</th><td>" . $info[1] . "</td><th>Job offer</th><td>" . $info[5] . "</td></tr><tr><th>Telephone</th><td>" . $info[2] . "</td><th>Reply</th><td>" . $info[6] . "</td></tr><tr><th colspan='4'>Message</th></tr><tr><td colspan='4'>" . $info[4] . "</td></tr>";
						print "</table>";
						print "<br />";
					} 
					print '</form>';
					

					require_once('conf/dbclose.php'); 
 
				?> 


				
		
			</div>
			
			<div id="footer">
				<p></p>
			</div>
			
		</div>
	</body>
</html>