var key = 'AIzaSyDwozRpbCqV5G7GjCI0T1QB7QES27rjHWY';
var baseURL = 'https://www.googleapis.com/youtube/v3';
var playlistURL = 'https://www.googleapis.com/youtube/v3/playlistItems';
var player;
var index = 0;
var currentId;
var currentIndex=0;


function SearchYT(){
	
	var query = $("#ytSearch").val();
	$.get(baseURL+'/search?part=snippet'+
									 '&q='+query+
									 '&maxResults=3'+
									 '&type=video'+
									 '&key='+key, function(data, status){
									 	$("#YTresults").empty();	
									 	for(var i = 0; i<data.items.length; i++){
									 		var id = data.items[i].id.videoId;
											var thumbnailURL = data.items[i].snippet.thumbnails.default.url;
											var titleText = data.items[i].snippet.title;
										 	
									 		$("#YTresults").append("<div>ID: " + id + " Title: " + 
												titleText + " " + 
												"<img src='"+ thumbnailURL + "'> </div>");
										}
									 });

}


function CreatePlayer() {
	$("#playerWrapper").empty();
	/*
	var soundOff = '<span class="fa-stack">' +
		'<i class="fa fa-volume-off fa-stack-1x"></i>' +
		'<i class="fa fa-ban fa-stack-2x text-danger"></i>' +
	'</span>';
	*/

	var back = "<i class='fa fa-backward' id='backward'></i>";
	var play = "<i class='fa fa-play' id='play'></i>";
	var forward = "<i class='fa fa-forward' id='forward'></i>";
	var soundMax = "<i class='fa fa-volume-up'></i>";
	var soundMid = "<i class='fa fa-volume-down'></i>";
	var soundMin = "<i class='fa fa-volume-off'></i>";
	var slider = "<div id='slider'></div>";

	var repeat = "<i class='fa fa-history'></i>";
	var controls = "<div id='playerControls'>"+back+play+forward+soundMin+soundMid+soundMax+repeat+slider+"</div>";


	var controlCover = controls+'<div id="playerControlCover"><div class="cover"></div></div>';
	$("#playerWrapper").append(controlCover + '<div id="player"></div>');
	player = new YT.Player('player', {
		playerVars: {
			//origin: '',
			modestbranding: true,
			autohide: 0
		},
		events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange,
			'onError': onPlayerError,
		}
	});
	$(function() {
		$( "#slider" ).slider({
			range: "max",
			min: 0,
			max: 100,
			value: 50,
			slide: function( event, ui ) {
				player.setVolume(ui.value);
			}
		});
	});
// firebase init
/* Broke it down later.
var ss;
var qPL;
 // dataRef.push({youtube: 'ldJUw5hRMok'});
//  dataRef.push({youtube: 'tA8AfQaUnXM'});
//Changed from on to once ..
	dataRef.once('value', function(snapshot) {

		/*
		var ids = [];
		for(var i=0; i< queue.length; i++){
			$(queue[i]).attr("data-index", i);

			if($(queue[i]).hasClass("draggable")){
			$(queue[i]).removeClass("draggable");
			}

			if($(queue[i]).hasClass("item")){
			ids.push(queue[i].dataset.id);
			//console.log($(queue[i]).data("index"));
		}

		if($(queue[i]).attr("data-playing") == "true"){
			currentIndex = i;
			//console.log("playing");
		}
	};
	playlist = ids;
	console.log(playlist);
// OLD END HERE 
		ss = snapshot.val();
		//qPL = snapshot.val().playlist;
		//console.log(snapshot.val());
		snapshot.forEach(function(childSnapshot) {
			var ckey = childSnapshot.key();
			var childData = childSnapshot.val();
			console.log(ckey + " " + childData.youtube);
//			playlist = childData.youtube;
			for(var i = 0; i < childData.youtube.length; i++){
				if(playlist.indexOf(childData.youtube[i])  == -1)
				{
					$.get(baseURL+'/search?part=snippet'+
											 '&q='+childData.youtube[i]+
											 '&maxResults=1'+
											 //'&type=video'+
											 '&key='+key, function(data, status){
												var id = data.items[0].id.videoId;
												var thumbnailURL = data.items[0].snippet.thumbnails.default.url;
												var titleText = data.items[0].snippet.title;
												UpdatePlaylist(titleText, thumbnailURL, id);
											 console.log(id + " " + thumbnailURL + " " + titleText);
											 });
				}
			}
			//playlist.push(childData.youtube);
		});

	});
*/
dataRef.on("child_added", function(snapshot){
	console.log("child_added: " + snapshot);
	var diff = 0;
	snapshot.forEach(function(childSnapshot){
		console.log(playlist + " BEFORE.");
//		if(isChanged(childSnapshot.val()))
	//		{
		playlist = childSnapshot.val();
		console.log(playlist + " AFTER.");
		updateQueue();
		console.log(playlist + "After Q:");
	//	}
	});
});
dataRef.on("child_moved", function(snapshot){
	console.log("child_moved: " + snapshot);
});

dataRef.on("child_removed", function(snapshot){
	console.log("child_removed: " + snapshot);
	snapshot.forEach(function(childSnapshot){
			console.log(" #r " + childSnapshot.val());
	});
//	MatchQueue();

});


}



function UpdatePlaylist(titleText, thumbnailURL, id){
	var queue = $("#queue");
				/*var title = "<div class='titleOverlay'>" + titleText + "</div>";
				var related = "<i class='fa fa-search findRelated'></i>";
				var play = "<i class='fa fa-play-circle-o findRelated'></i>";
				var add = "<i class='fa fa-plus-square findRelated'></i>";
				var refresh = "<i class='fa fa-refresh findRelated'></i>";
				var trash = "<i class='fa fa-trash findRelated'></i>";
				var relatedButton = "<div class='thumbButton'>"+related+"</div>";
				var addButton = "<div class='thumbButton'>"+add+"</div>";
				var refreshButton = "<div class='thumbButton'>"+refresh+"</div>";
				var trashButton = "<div class='thumbButton'>"+trash+"</div>";
				var playButton = "<div class='thumbButton'>"+play+"</div>";
				var buttons = "<div class='thumbButtonWrapper'>" + relatedButton + addButton + refreshButton + trashButton + playButton + "</div>";

				var status = "<div class='status'></div>";
				var thumb = "<div class='thumbWrapper'><img class='thumb' src=" + thumbnailURL + "></img></div>";
				var result = "<div class='item draggable' data-id=" + id + " data-index=-1 data-playing=false>" + buttons + thumb + title + "</div>";
*/
				var result = "<div class='item ui-draggable ui-draggable-handle' data-id='" + id +

				//tA8AfQaUnXM
					"' data-index='" + $("#queue").children().length + 
					"' data-playing='false' style='position: relative; z-index: 10000; width: 120px; height: 120px;''>" +
					"<div class='thumbButtonWrapper'><div class='thumbButton'><i class='fa fa-search findRelated'></i></div><div class='thumbButton'>" +
					"<i class='fa fa-plus-square findRelated'></i></div><div class='thumbButton'><i class='fa fa-refresh findRelated'></i></div>" + 
					"<div class='thumbButton'><i class='fa fa-trash findRelated' onclick='removeById(\"" + id + "\");'></i></div><div class='thumbButton'><i class='fa fa-play-circle-o findRelated'></i></div></div>" +
					"<div class='thumbWrapper'><img class='thumb' src='" + thumbnailURL + 
				//https://i.ytimg.com/vi/tA8AfQaUnXM/default.jpg
					"'></div><div class='titleOverlay'>" + titleText +
				//Ella Henderson - Ghost
					"</div></div>";

				//var result = "<div class='item draggable'></div>";
				$("#queue").append(result);
//				playlist.push(id);
//				currentIndex=0; removed 
}

function onPlayerStateChange(event) {
	//var currentId = player.getVideoData().video_id;
	//var currentId = playlist[currentIndex];
	var currentVideo; 
	if(event.data != YT.PlayerState.UNSTARTED){
			
          currentVideo = $("#queue").find("[data-index='" + currentIndex + "']");
	}
	if (event.data == YT.PlayerState.ENDED) {
		$(currentVideo).attr("data-playing", false);

		//setTimeout(stopVideo, 6000);
		//var currentIndex = playlist.indexOf(currentId);
		playNext();
		//console.log(playlist);
	}
	if (event.data == YT.PlayerState.PAUSED) {
		$("#play").removeClass("fa-pause");
		$("#play").addClass("fa-play");
	}
	if (event.data == YT.PlayerState.PLAYING) {
		$("#play").removeClass("fa-play");
		$("#play").addClass("fa-pause");
		$("#queue").find(".fa-play-circle").remove();
		$(currentVideo).attr("data-playing", true);
		$(currentVideo).append("<i class='fa fa-play-circle animated bounceIn isPlaying'></i>");
	}
	if(event.data == YT.PlayerState.CUED) {
			console.log("Queued: " + playlist);
	}
}
/*

$('#query').keypress(function (e) {
	if (e.which == 13) {
		Search();
		return false;    //<---- Add this line
	}
});

$("#submit").click(function(){
	Search();
});


setTimeout(function(){
	CreatePlayer();
}, 200);
*/
