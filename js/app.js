/* VARIABLES 
------------------------------------------------------- */

// Video
var $video = $("#video");
var $videoContainer = $("#videoContainer");

// Video Control s
var $videoControls = $("#videoControls");
var $buttonControls = $("#buttonControls");
var $progressBar = $("#progressBar");
var $progress = $("#progress");
var $playButton = $("#play");
var $muteButton = $("#mute");
var $volumeSlider = $("#volumeSlider");
var $fullScreenBtn = $("#fullScreen");
var $duration = $("#duration");
var $fastFwd = $("#fastFwd");
   
/* VIDEO PLAYER 
------------------------------------------------------- */

// Toggles play/pause for the video
function playVideo() {      
	if($video[0].paused) {
		$video[0].play();
		$playButton.find("img").attr("src", "icons/pause-icon.png"); 
		$buttonControls.hide();
		$videoControls.css("margin-top", "5%");	     	
	} else {
		$video[0].pause();
		$playButton.find("img").attr("src", "icons/play-icon.png");			
	}		
}

// Mutes the video
function muteVideo() {
	if ($video[0].muted === false) {
		$video[0].muted = true;
		$muteButton.find("img").attr("src", "icons/volume-off-icon.png");
	} else {
		$video[0].muted = false;
		$muteButton.find("img").attr("src", "icons/volume-on-icon.png");				
	}	
}

// Changes video playback rate
function changeSpeed() {
	if($video[0].playbackRate === 1) {
		$video[0].playbackRate = 2;
		$fastFwd.text("2x Speed");
	} else if ($video[0].playbackRate === 2) {
		$video[0].playbackRate = 1;
		$fastFwd.text("1x Speed");				
	}
}

function launchFullscreen() {
  if($video[0].requestFullscreen) {
    $video[0].requestFullscreen();
  } else if($video[0].mozRequestFullScreen) {
    $video[0].mozRequestFullScreen();
  } else if($video[0].webkitRequestFullscreen) {
    $video[0].webkitRequestFullscreen();
  } else if($video[0].msRequestFullscreen) {
    $video[0].msRequestFullscreen();
  }
}


// Play/pause on video click
$video.click(function() {
	playVideo();
});

// Play/pause on spacebar 
$("body").on("keydown", function(e) {
	if(e.keyCode === 32 ) {	
		e.preventDefault();		
		playVideo();     
	}
});

// Mute/sound on m key
$("body").on("keydown", function(e) {
	if(e.keyCode === 77 ) {
		e.preventDefault();		
		muteVideo();
	}
});

// Video duration timer
$video.on("timeupdate", function() {
	var $videoTime = $video[0].currentTime;
	if ($videoTime < 9.5) {
		$duration.html("00:0" + Math.round($videoTime) + " / 02:57");		
	} 
	else if($videoTime < 59.5) {
		$duration.html("00:" + Math.round($videoTime) + " / 02:57");			
	}else{

		var minutes=parseInt(Math.round($videoTime)/60);

		var val;
		if(minutes==1){
			 val=60;
		}
		else if(minutes==2){
			 val=120;
		}else{
			val=180;
		}

		if ((Math.round($videoTime)-val) < 9.5) {
			var seconds="0"+(Math.round($videoTime)-val);		
		}else{
			var seconds=(Math.round($videoTime)-val);
		} 


		$duration.html( "0"+minutes+":" + seconds + " / 02:57");
	}
});

/* VIDEO CONTROLS
------------------------------------------------------- */

// Hide button controls when video is playing 
$videoContainer.on("mouseleave", function() {
	if($video[0].paused === false) {
		$buttonControls.hide();
		$videoControls.css("margin-top", "5%");	  
	}
});

// Show button controls on hover
$videoContainer.on("mouseover", function() {
		$buttonControls.show();
		$videoControls.css("margin-top", "0");	  
});

// Progress bar
$progressBar[0].addEventListener("change", function() {
	var time = $video[0].duration * ($progressBar[0].value / 100);
	$video[0].currentTime = time;
}); 

// Update progress bar as video plays
$video[0].addEventListener("timeupdate", function() { 
	var value = (100 / $video[0].duration) * $video[0].currentTime;
	$progress.css("width", value+"%");	
}); 

// Play/pause on button click
$playButton.click(function() {
	playVideo();
});

// 2x speed with right arrow
$("body").on("keydown", function(e) {
	if(e.keyCode === 39) {	
		e.preventDefault();		
		changeSpeed();
	}
});
// Normal Speed
$("body").on("keydown", function(e) {
	if(e.keyCode === 37) {	
		e.preventDefault();		
		changeSpeed();
	}
});

// Fast Forward Button 
$fastFwd.click(function() {
	changeSpeed();
});

// Mute video on button click
$muteButton.click(function() {
	muteVideo();
});

// Volue slider
$volumeSlider.on("change", function(){ 
	$video[0].volume = $volumeSlider[0].value;
});

/* Fullscreen on button */

$fullScreenBtn.click(function() {
	launchFullscreen();
}); 


// Show/Hide columns of Anmials (During Questions) 
	$video.on("timeupdate", function() {
		var $videoTime = $video[0].currentTime;

		if($videoTime>=25 && $videoTime<36){
			$('.row').css({'display':'block'});
		}else if($videoTime>=50 && $videoTime<63){
			$('.row').css({'display':'block'});
		}else if($videoTime>=76 && $videoTime<90){
			$('.row').css({'display':'block'});
		}else if($videoTime>=100 && $videoTime<113){
			$('.row').css({'display':'block'});
		}else if($videoTime>=123 && $videoTime<132){
			$('.row').css({'display':'block'});
		}else if($videoTime>=144 && $videoTime<153){
			$('.row').css({'display':'block'});
		}
		else{
			$('.row').css({'display':'none'});
		}
	});




//Check for correct answer

$('.col').click(function(event) {
    
    	var status = $(this).attr('id');

		var goto;
		if($video[0].currentTime>=25 && $video[0].currentTime<36){
			goto=22;
		}else if($video[0].currentTime>=50 && $video[0].currentTime<63){
			goto=47;
		}else if($video[0].currentTime>=74 && $video[0].currentTime<90){
			goto=71;
		}else if($video[0].currentTime>=100 && $video[0].currentTime<113){
			goto=102;
		}else if($video[0].currentTime>=123 && $video[0].currentTime<132){
			goto=120;
		}else if($video[0].currentTime>=144 && $video[0].currentTime<153){
			goto=142.5;
		}else{
			goto=0;
		}


		if($video[0].currentTime>=25 && $video[0].currentTime<36 && status=='col22'){
			$video[0].currentTime = 40;
			$('.row').css({'display':'none'});
		}else if($video[0].currentTime>=50 && $video[0].currentTime<63 && status=='col13'){
			$video[0].currentTime = 63.5;
			$('.row').css({'display':'none'});
		}else if($video[0].currentTime>=74 && $video[0].currentTime<90 && status=='col21'){
			$video[0].currentTime = 91;
			$('.row').css({'display':'none'});
		}else if($video[0].currentTime>=100 && $video[0].currentTime<113 && status=='col23'){
			$video[0].currentTime = 114;
			$('.row').css({'display':'none'});
		}else if($video[0].currentTime>=123 && $video[0].currentTime<132 && status=='col11'){
			$video[0].currentTime = 133;
			$('.row').css({'display':'none'});
		}else if($video[0].currentTime>=144 && $video[0].currentTime<153 && status=='col12'){
			$video[0].currentTime = 156;
			$('.row').css({'display':'none'});
		}
		else{
			setTimeout(function(){ $('.row').css({'display':'none'}); }, 1000);
			$video[0].pause();
			$('.try_again').css({'display':'block'});
			$('#play').css({'pointer-events':'none'});
			$('#try_again_span').attr('onclick', 'goToStartingofQuestion('+goto+')');
			
		}


});


//Go to starting of question
function goToStartingofQuestion(t) {
	$video[0].currentTime=t;
	$('.try_again').css({'display':'none'});
	$('#play').css({'pointer-events':'auto'});
	$video[0].play();
}

  $('#video').on('loadstart', function (event) {
    $(this).addClass('loading');
  });
  $('#video').on('canplay', function (event) {
    $(this).removeClass('loading');
    $(this).attr('poster', '');
  });

