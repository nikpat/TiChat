//FirstView Component Constructor
function Head() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView({
		height:'50dp',
		top:0,
		backgroundColor:'#C9C9C9'
	});

	//label using localization-ready strings from <app dir>/i18n/en/strings.xml
	var label = Ti.UI.createLabel({
		color:'#000000',
		font: { fontSize:'48dp' },
		text:'NeoChat',
		height:'auto',
		width:'auto'
	});
	self.add(label);
	
	//Add behavior for UI
	label.addEventListener('click', function(e) {
		alert(e.source.text);
	});
	
	return self;
}

module.exports = Head;



