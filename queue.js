var dataRef = new Firebase('https://youtubeq.firebaseio.com/queueList');
var logging = 1;
var queue;
var QueueList = {
	refId : [], 
	currentIndex : 0, 
	titleText : [],
	thumbnail : [],
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
		dataRef.push(this.getPushable());
	}

}

function initFireBase(){
	writeLog("Initilizing Firebase Object");
//	dataRef.once('value', updateQueue);
	dataRef.on('child_added', updateQueue);
}

function updateQueue(ss){
	//clear prior queue

	writeLog("Updated Called.");
	var key = ss.key();
	var value = ss.val();
	queue = value;
	$("#QList").empty();
	$("#QList").append(queue.getPushable());
}

function writeLog(d){
	if(logging)
		console.log(d);
}


$(function() {
	initFireBase();
    queue = new Object(QueueList);
	//queue.pushQueue();
});