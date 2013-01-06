function Login() {
	//create object instance, a parasitic subclass of Observable
	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor: 'black',//'#C9C9C9',
		exitOnClose:true
	});
		
	var nickName = Ti.UI.createTextField({
	  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	  color: '#336699',
	  top: 10,
	  width:'300dp',
	  hintText:'Nick Name'
	});
	self.add(nickName);
	
	
	var button = Titanium.UI.createButton({
	   title: 'Check In',
	   top: 80,
	   width: 100,
	   height: 40
	});
	self.add(button);
	
	//Add behavior for UI
	button.addEventListener('click', function(e) {
		Ti.App.Properties.setString('nickName',nickName.value);
		var onlineList = require('ui/common/OnlineList');
		new onlineList().open();
	});
	
	return self;
}

module.exports = Login;

