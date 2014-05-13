<!DOCTYPE html>
<head>
    <link rel="stylesheet" type="text/css" href="style.css" />
    <script src="GameObject.js"></script>
    <script src="Engine.js"></script>
</head>
<body>
    <p id="debug"></p>
    <canvas onmousemove="move(event)" id="viewport" onmousedown="checkClickOnObjects(event)"></canvas>

    <?php
    include('Contents/aboutMe.html');
    include('Contents/contactMe.html');
    include('Contents/skills.html');
    include('Contents/cv.html');
    include('Contents/experience.html');
    include('Contents/works.html');
	include('Contents/instructions.html');
    ?>

</body>
</html>
