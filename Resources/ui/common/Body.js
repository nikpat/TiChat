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
		var ChatWin = new Chat(e.rowData.uName);
		Ti.App.fireEvent('initSession',{toUser:e.row.title});
		ChatWin.open();
	});
		
	self.show_online_users = function(online_users){
		
		var tdata =new Array();
		for(i=0;i<online_users.length;i++){
			var unameLabel = Ti.UI.createLabel({
						left: '10dp', top:'10dp', 
						height:'21dp',
						font:{fontSize:'16d', fontWeight:'black'},
						text:online_users[i],
						textAlign:'left', color:'orange',
						shadowColor:'gray',shadowOffset:{x:0,y:1}
				});
				
			var unameRow = Titanium.UI.createTableViewRow({
										uName: online_users[i],
										id:'21dp',
	                       				height:40,
										font:{size:20,fontWeight:'bold'}										 
               					});
             unameRow.add(unameLabel)
			tdata.push(unameRow);
		}
		Ti.API.info(JSON.stringify(tdata));
		table.data = tdata;
	}
	

	
	return self;
}

module.exports = Body;