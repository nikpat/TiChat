//Application Window Component Constructor

function ApplicationWindow() {
	//create component instance
	
	
	if(Ti.App.Properties.hasProperty('nickName')){
		//load component dependencies
		var onlineList = require('ui/common/OnlineList');
		var OnlineL = new onlineList(); 
		var self = OnlineL;
		//new onlineList().open();
				
	}
	else{
		var Login = require('ui/common/Login');
							
		//construct UI
		var Login = new Login();
		var self = Login;
		}
	return self;
}

//make constructor function the public component interface
module.exports = ApplicationWindow;
