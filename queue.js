var dataRef = new Firebase('https://youtubeq.firebaseio.com/queueList');
var logging = 1;
var queue;

/*
function QueueList()
{
	this.qDataRef; // = new Firebase('https://youtubeq.firebaseio.com/queueList');
	this.refId = []; 
	this.currentIndex = 0; 
	this.titleText = [];
	this.thumbnail = [];
}
*/

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
		this.refId = val.refId;
		this.titleText = val.titleText;
		this.thumbnail = val.thumbnail;
		this.currentIndex = val.currentIndex;
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
	writeLog("Updated Called." + value);

	//queue.set(value);	// does this remove methods of QueueList?
//	queue.printQueue();
	$("#QList").empty();
//	$("#QList").append(queue.getPushable());
}

function loadPlaylistFromYT(){

}

function writeLog(d){
	if(logging)
		console.log(d);
}

function resolveVideoId(id){


}

$(function() {
	writeLog("fb dref: " + dataRef);
    queue = QueueList.init(dataRef);
    writeLog("qL :" + queue);
//	QueueList.init(dataRef);
	initFireBase();
	//queue.pushQueue();
});

function devAddItem(){
	queue.appendItem(	$("#videoId").val(),
						$("#titleText").val(),
						$("#thumbnail").val()
					);
	console.log("appending... queue is now: " + queue.getPushable());
}