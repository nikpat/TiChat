function Body() {
	
	
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView({
		top:'50dp',
		bottom:0,
				
	});
	
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
		text:'Online Users',
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
	
	Ti.UI.backgroundColor = 'white';
	
	var table = Ti.UI.createTableView({
		top:'21dp',
		bottom:0,
		font: { fontSize:'20dp' },
	});
	self.add(table);
	
	//Add behavior for UI	
	var Chat = require('ui/common/Chat');
	
	table.addEventListener('click',function(e){
		var ChatWin = new Chat();
		alert(e.row.title);
		ChatWin.toUser = e.row.title;
		//ChatWin.chatArr = Ti.API.UserArr[e.row.title];
		Ti.App.fireEvent('initSession',{toUser:e.row.title});
		ChatWin.open();
	});
		
	self.show_online_users = function(online_users){
		
		var tdata =new Array();
		for(i=0;i<online_users.length;i++){
			tdata.push({title:online_users[i]});
		}
		Ti.API.info(JSON.stringify(tdata));
		table.data = tdata;
	}
	

	
	return self;
}

module.exports = Body;