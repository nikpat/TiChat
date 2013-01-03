//Application Window Component Constructor

function ApplicationWindow() {
	//create component instance
	
	
	if(Ti.App.Properties.hasProperty('nickName')){
		//load component dependencies
		var onlineList = require('ui/common/OnlineList');
		
		var self = new onlineList();
		//new onlineList().open();
				
	}
	else{
		var Login = require('ui/common/Login');	
		//construct UI
		var self = new Login();
	
		}
	return self;
}

//make constructor function the public component interface
module.exports = ApplicationWindow;