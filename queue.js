var dataRef = new Firebase('https://youtubeq.firebaseio.com/queueList');
var logging = 1;
var queue;
var drake; // teh draggable

var QueueList = {
	// = new Firebase('https://youtubeq.firebaseio.com/queueList');
	init: function(dRef){
		this.currentIndex = 0;
		this.titleText = [];
		this.thumbnail = [];
		this.refId = [];
//		this.qDataRef = dataRef;
		return this;
	},
	refId : [], 
	currentIndex : 0, 
	titleText : [],
	thumbnail : [],
	qDataRef: 0,
	printQueue: function(){
		for(var i = 0; i<this.refId.length; i++)
			document.write(i + ") " + this.refId[i] + " : " + this.titleText[i] + " : " + "<img src=\"" + 
			this.thumbnail[i] + "\" />");
	},
	syncQueue: function(){
		$("#queue").empty();
		for(var i = 0; i < this.refId.length; i++){
		$("#queue").append("<div id='youtubeItem'><p id='id'>" + this.refId[i] + "</p><p id='title'>" + 
			this.titleText[i] + "</p>" + 
			"<img src='"+ this.thumbnail[i] + "'> </div>");
		}
	},
	getPushable: function()
	{
		return({
				index: this.currentIndex,
				id: this.refId,
				title: this.titleText,
				img: this.thumbnail});
	},
	// ffff
	// k8Qm89K7Zqg
//https://i.ytimg.com/vi/k8Qm89K7Zqg/default.jpg
	pushQueue: function(d){
		dataRef.transaction(function(o){
			return d;
		},
		function(error, committed, snapshot) {
  			if (error) {
  				console.log(error);
  			}
  			else if(committed)
  				console.log("com");
  		}
		);

		/* Old lame non concurrent safe way
		dataRef.remove();
		dataRef.push(this.getPushable());
		*/
	},
	pushChange: function(){
		var _title = [];
		var _thumbnail = [];
		var _elementId = [];
		var item = $("#queue #youtubeItem #id");
		item.each(function(i, e){
			console.log(($(e)).text());
			_elementId.push(($(e).text()));
        });
        item = $("#queue #youtubeItem #title");
		item.each(function(i, e){
			_title.push(($(e).text()));
		});

        item = $("#queue #youtubeItem img");
		item.each(function(){
			_thumbnail.push(this.src);
		});
		console.log("PUSHING...");
		this.refId=_elementId;
		this.titleText=_title;
		this.thumbnail=_thumbnail;
		console.log(_elementId);

		this.pushQueue(this.getPushable());
		/*for(var i=0; i<$("#queue").children().children().length; i++){
			console.log($("#queue").children().children());
//			console.log($("#queue").children().children()[i].html);
		}
		*/
	},
	set: function(val){
		this.refId = val.id;
		this.titleText = val.title;
		this.thumbnail = val.img;
		this.currentIndex = val.index;
	},
	appendItem: function(_elementId, _title, _thumbnail){
		this.refId.push(_elementId);
		this.titleText.push(_title);
		this.thumbnail.push(_thumbnail);
		this.pushQueue(this.getPushable());
	},
	deleteQueue: function(){
		dataRef.remove();
	}
}

function initFireBase(){
	writeLog("Initilizing Firebase Object");
//	dataRef.once('value', updateQueue);
//	dataRef.on('child_added', updateQueue);
	dataRef.on('value', updateQueue);
}



function initDraggable(){
	drake = dragula([document.getElementById('YTresults'), document.getElementById('queue')],  
			{
				accepts: function(el, target, source, sibling){
					if(source.id == "queue" && target.id == "YTresults"){
						return false;
					}
					if(source.id == target.id)
						return true;
				//	console.log(source.id);
				//	console.log(target.id);
/*					else if(source.id == "queue" && target.id == "queue")
						return true;
						*/
					return true;
				},
				moves: function(el, container, handle){
					//queue.pushChange(container);
					return true;
				}
			}
	   ).on('drop', function (el) {
	   		queue.pushChange();
       });

}

function clearQueue(){
	queue.deleteQueue();
//	queue.syncQueue();
//	$("#queue").append("<div></div>")
}
function updateQueue(ss){
	//clear prior queue

	var key = ss.key();
	var value = ss.val();
	if(!(value === null) && value.id!=null)
		queue.set(value);
//	console.log(value);


	$("#QList").empty();
	queue.syncQueue();
}

function loadPlaylistFromYT(){

}

function writeLog(d){
	if(logging)
		console.log(d);
}

function resolveVideoId(id){


}

//'use strict';
$(function() {
    queue = QueueList.init(dataRef);
    console.log(queue);
	initFireBase();
	initDraggable();
    console.log(queue);
});

function devAddItem(){
	queue.appendItem(	$("#videoId").val(),
						$("#titleText").val(),
						$("#thumbnail").val()
					);
	console.log("appending... queue is now: " + queue.getPushable());
}

