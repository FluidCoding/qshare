var dataRef = new Firebase('https://youtubeq.firebaseio.com/queueList');
var logging = 1;
var queue;

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
		$("#queue").append("<div>ID: " + this.refId[i] + " Title: " + 
			this.titleText[i] + " " + 
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

	pushQueue: function(){
		dataRef.remove();
		dataRef.push(this.getPushable());
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
		this.pushQueue();
	}
}

function initFireBase(){
	writeLog("Initilizing Firebase Object");
//	dataRef.once('value', updateQueue);
	dataRef.on('child_added', updateQueue);
}

function updateQueue(ss){
	//clear prior queue

	var key = ss.key();
	var value = ss.val();	
	queue.set(value);
	console.log(value);

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
	console.log("fb dref: " + dataRef);
    queue = QueueList.init(dataRef);
    console.log("qL :" + queue);
	initFireBase();
	dragula([document.getElementById('YTresults'), document.getElementById('queue')]).on('drop', function (el) {
    	console.log(el + " MOVeD.");
  });

});

function devAddItem(){
	queue.appendItem(	$("#videoId").val(),
						$("#titleText").val(),
						$("#thumbnail").val()
					);
	console.log("appending... queue is now: " + queue.getPushable());
}

