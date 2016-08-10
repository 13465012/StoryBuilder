// get requirements
var app = require('electron').app,
	BrowserWindow = require('electron').BrowserWindow;

// initialise main program window
var mWindow = null;
app.on('ready',function() {

	// create new browser instance
	mWindow = new BrowserWindow({width:800,height:450});

	// load home url
	mWindow.loadURL('file://' + __dirname + '/windows/main/window.html');

	// open debug tools
	mWindow.openDevTools();

});
