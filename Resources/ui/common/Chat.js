//FirstView Component Constructor
function Chat(toUser) {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		exitOnClose:true
	});
	
	if(Ti.Platform.osname == 'android'){
		self.addEventListener('android:back',function(){
			self.close();
		});
	}
	
/// status bar
	var statusBar = Ti.UI.createView({
		top:'0dp',
		height:'20dp',
		backgroundColor:'red',
		width:'100%'
	});
	
	//label using localization-ready strings from <app dir>/i18n/en/strings.xml
	var status = Ti.UI.createLabel({
		color:'#000000',
		font: { fontSize:'18dp' },
		text:toUser,
		left:5
	});
	
	statusBar.add(status);
	self.add(statusBar);
	
	var backbtn = Ti.UI.createLabel({
		color:'#000000',
		font: { fontSize:'18dp' },
		text:'back',
		right:5
	});
	statusBar.add(backbtn);
	
	backbtn.addEventListener('click',function(e){
		self.close();
	});
///

	var chatData = Ti.API.UserArr[toUser];

			
	var convView = Ti.UI.createTableView({
	  top:'21dp',
	  bottom:'40dp',
      contentHeight: 'auto',
      separatorColor: 'transparent',
      data:chatData
      //layout: 'vertical'
	});

	self.add(convView);
	// array for each user
   	
    var setMsgs = function(e){
		
		if(e.key==toUser){
			createRow(e.key,e.msg);
		}
	}
    
	Ti.App.addEventListener('msgEvent',setMsgs);
	
	self.addEventListener('close',function(){
		Ti.App.removeEventListener('msgEvent',setMsgs);
	});
	
	function createRow(usr,msg) {
		  var row = Ti.UI.createTableViewRow({
		    backgroundColor: 'white',
		    borderColor: '#bbb',
		    borderWidth: 1,
		    width:'100%', height: 'auto',
		    a:msg
		    //top: 0, left: 0
		  });
		   var lview = Titanium.UI.createLabel({
				color:'#000000',
				text: usr+" : "+msg ,
				left:5,
  	 		    width: 'auto', height: 'auto',
  	 		    top: 10
			});		  
		  row.add(lview);
		  //chatData.push(row);
		  // push data to respective user array
		  Ti.API.UserArr[usr].push(row);
		  Ti.API.info(chatData);
		  //convView.data = chatData;
		  convView.setData(chatData);
		  //alert(usr+':'+msg);
		  //alert(JSON.stringify(chatData));
		} 
	
	
	
	var msg = Ti.UI.createTextField({
	  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	  color: '#336699',
	  bottom: 0,
	  left:5,
	  width:'250dp',
	  hintText:'Nick Name',
	  height: '40dp'
	});
	self.add(msg);
	
	var send = Titanium.UI.createButton({
	   title: 'Send',
	   bottom: 0,
	   right:5,
	   width: '50dp',
	   height: '40dp'
	});
	self.add(send);
	
	
	send.addEventListener('click',function(e){
		var sendmsg = msg.value;
		var curUser = Ti.App.Properties.getString('nickName');
		Ti.App.fireEvent('sendMsg',
		{
			Msgtype:"chatmessage",
			to:toUser,
			message:sendmsg,
			sessionkey:toUser+'-'+curUser,
			from:curUser
		})
		msg.value ="";
		msg.blur();
		createRow(toUser,sendmsg);
	});
	
	//self.add(MainChatView);
	return self;
}

module.exports = Chat;
