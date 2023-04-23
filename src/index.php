<?php 
	require_once("db.php");
	$singleton = DB::getInstance();
	// $singleton->db->prepare("Select * from my table");
?>

<!DOCTYPE html>
<html>
<head>
	<title>Hello, World!</title>
</head>
<body>
	<h2><?php echo "Hello, World! sadfasdfas"; ?></h2>
</body>
</html>
