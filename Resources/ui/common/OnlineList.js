//Application Window Component Constructor
function OnlineList() {
	
	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
	});
	
	Array.prototype.remove = function(from, to) {
	  var rest = this.slice((to || from) + 1 || this.length);
	  this.length = from < 0 ? this.length + from : from;
	  return this.push.apply(this, rest);
	};

	//load component dependencies
	var Head = require('ui/common/Head');
	var Body = require('ui/common/Body');
					
	//construct UI
	var HeadView = new Head();
	self.add(HeadView);

	var BodyView = new Body();
	self.add(BodyView);
	//Online Users
	var online_users = [];
	//User Msg Array
	Ti.API.UserArr = [];
	
	var WebSocket = require('ti-websocket-client').WebSocket;

	ws = new WebSocket("ws://180.149.243.101:8081/chat/"+Ti.App.Properties.getString('nickName'));
	
	ws.onopen = function () {
	    //alert("Connected");
	    ws.send("Hello");
	};
	
	ws.onclose = function () {
	    //alert("Disconnected");
	};
	
	ws.onmessage = function (message) {
	    Ti.API.info("> "+message.data);
          var json_data=JSON.parse(message.data);
          if (json_data)
          {
            if(json_data["type"]=="offline"){
                var chat_user=json_data["from"];
                console.log(chat_user);
            }
            else if(json_data["type"]=="chatmessage"){
              var chat_user=json_data["from"];
              var session_key=json_data["sessionkey"];
              var message=json_data["message"];
              Ti.App.fireEvent('msgEvent',{key:chat_user,msg:message});
              
              console.log("Received message: "+JSON.stringify(json_data));
            }
            else if(json_data['type']=='chatsession'){
     
              var chat_user=json_data['from'];
			  
              
            }
            else if(json_data['type']=="chatinvite")
            {
                var chat_user=json_data['from'];
                console.log("got invite from "+chat_user);
                //chatWithUserInvite(chat_user,json_data);
            }
            else if(json_data['type']=="presence")
            {
               Ti.API.info(json_data['type']);
               Ti.API.info(json_data['from']);
               if(json_data['status']==1){
               		online_users.push(json_data['from']);
               		//allocate msg array for each user
               		Ti.API.UserArr[json_data['from']] = [];
               }
               else if(json_data['status']== 0 ){
               	 //remove array from msg array and oline userarray.
               	 delete Ti.API.UserArr[json_data['from']];
               	 online_users.remove(online_users.indexOf(json_data['from']));
               }
              
               BodyView.show_online_users(online_users);
            }
          } 
	};
	
	ws.onerror = function (e) {
	    alert('Error: ' + (e ? JSON.stringify(e) : 'A unknown error occurred'));
	};
	
	Ti.App.addEventListener('initSession',function(obj){
		var toUser = obj.toUser;
		var sendData = {
				type: "chatsession", 
				to: toUser
			};
		ws.send(JSON.stringify(sendData));
	});
	
	Ti.App.addEventListener('sendMsg',function(obj){
		var sendData = {
			type:"chatmessage",
			to:obj.to,
			message:obj.message,
			sessionkey:obj.sessionkey,
			from:obj.from
		};
		alert(sendData);
		ws.send(JSON.stringify(sendData));
		
	});
	
	
	return self;
}

//make constructor function the public component interface
module.exports = OnlineList;