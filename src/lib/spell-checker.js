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
var fs = require("fs");

// load UKACD17
class SpellChecker {
	constructor() {
		fs.readFile('lib/UKACD17/UKACD17.TXT','ascii',(error,contents) => {
			if(error) throw error;
			this.ukacd17 = contents;

		});
	}

	// check if word is spelt right, if not a word atall (e.g. 12) it returns true
	isCorrect(word) {
		var ret = false;
		if(word.length > 0) {
			if(word[word.length - 1] == '.') {
				word = word.substring(0,word.length - 1);
			}
			ret = this.ukacd17.includes(word+"\r");
			if(ret == false) {
					ret = this.ukacd17.includes(word.toLowerCase()+"\r");
			}
		}
		return ret;

	}

}
