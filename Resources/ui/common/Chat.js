//FirstView Component Constructor
function Chat() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
	});
	
/// status bar
	var statusBar = Ti.UI.createView({
		top:'0dp',
		height:'20dp',
		backgroundColor:'red',
		width:'100%'
	});
	
	alert('ss='+self.toUser);
	//label using localization-ready strings from <app dir>/i18n/en/strings.xml
	var status = Ti.UI.createLabel({
		color:'#000000',
		font: { fontSize:'18dp' },
		text:self.toUser,
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

	
	var MainChatView = Ti.UI.createScrollView({
		top:'21dp',
		bottom:0,
		backgroundColor:'#E6E6E6',
		visible:false,
	
	});

		
	if(Ti.API.UserArr != undefined)
	{
		var chatData = self.chatArr;
	}
	else{
		var chatData = [];
	}
			
	var convView = Ti.UI.createTableView({
	  bottom:'40dp',
      contentHeight: 'auto',
      separatorColor: 'transparent' 
      //layout: 'vertical'
	});

	MainChatView.add(convView);
	// array for each user
   	
    
	Ti.App.addEventListener('msgEvent',function(e){
		alert(e.key+"=="+MainChatView.toUser);
		
		if(e.key==MainChatView.toUser){
			createRow(e.key,e.msg);
		}
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
		  chatData.push(row);
		  // push data to respective user array
		  Ti.API.UserArr[usr] = chatData;
		  convView.data = chatData;
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
		var toUser = MainChatView.toUser;
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
		createRow(curUser,sendmsg);
	});
	
	self.add(MainChatView);
	return self;
}

module.exports = Chat;
