<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Zoom Light Test</title>
	<link rel="stylesheet" href="css/style.css" media="screen" type="text/css" />
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
</head>
<body>
	<div id="zoomLayer">
		<img id="preloader" src="images/70.gif" width="126px" height="126px"/>
		<!--a href="javascript:void(0);" id="resize" >resize</a-->
		<img id="zoomImage" src="images/41340481nd_15n_f.jpg"/>
	</div>
	<div id="container">
		<h1 data-reference="image1">Zoom test</h1>
		<p>This is a zoom test to try out the native scroll (Mac, iOS, Android) inside a layer</p>
		<div id="mainImage">
			<img id="image1" src="images/41340481nd_14n_f.jpg"/>
			<button data-reference="image1">Open zoom</button>
		</div>
		<h2>This other text here is to make sure that the page scrolls, so we can test all cases!</h2>
		<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.</p>
		<p>In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet</p>
		<p>Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt.</p>
		<p>Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc.</p>
		<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.</p>
		<p>In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet</p>
		<p>Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt.</p>
		<p>Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc.</p>
	</div>

	<div id="test"><h1>Test</h1></div>



	<script src="http://code.jquery.com/jquery-latest.js"></script>
	<!--script src="js/index.js" type="text/javascript"></script--><!--async-->

	<?php
		if ( $_GET['srcjs'] === "0" ){
			echo "<script src='js/minified/googlecompiler/application-min.js' type='text/javascript'></script>";//zoomLight-min.js' type='text/javascript'></script>";
		}else{
			echo "<script src='js/system/pool.manager.js' type='text/javascript'></script>";
			echo "<script src='js/plugin/zoomLight.js' type='text/javascript'></script>";
			echo "<script src='js/plugin/testPlugin.js' type='text/javascript'></script>";
			echo "<script async src='js/scope/scope.index.js' type='text/javascript'></script>";
		}
	?>


	
</body>
</html>