/* License Declaration
MIT License

Copyright (c) 2016 James Hilton

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

// get requirements
var app = require('electron').app,
	BrowserWindow = require('electron').BrowserWindow;

// IPC for communicating between the render process and the main process
var ipc = require('electron').ipcMain;

// initialise main program window
var mWindow = null;
app.on('ready',function() {

	// create new browser instance
	mWindow = new BrowserWindow({width:800,height:450});

	// load home url
	mWindow.loadURL('file://' + __dirname + '/windows/main/window.html');

	// open debug tools # Update! dev tools cause massive memory leak!
	//mWindow.openDevTools();

});
