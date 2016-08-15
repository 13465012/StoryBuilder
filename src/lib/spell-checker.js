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
		this.finish = false;
		fs.readFile('lib/UKACD17/UKACD17.TXT','ascii',(error,contents) => {
			if(error) throw error;
			this.ukacd17 = contents;
			this.tmp = contents.split("\r\n");
			this.wArray = [
				"",	// 0 - single letter words
				"",	// 1 - aa letter words
				"",	// 2 - ab letter words
				"",	// 3 - ac letter words
				"",	// 4 - ad letter words
				"",	// 5 - ae letter words
				"",	// 6 - af letter words
				"",	// 7 - ag letter words
				"",	// 8 - ah letter words
				"",	// 9 - ai letter words
				"",	// 10 - aj letter words
				""	// 11 - ak letter words
			];
			for(var i = 0; i < this.tmp.length;i++) {
				if(this.tmp[i].length == 1) {
					this.wArray.push(this.tmp[i]);
				}
				else {
					switch(this.tmp[i][0] + this.tmp[i][1]) {
						case "aa":this.wArray[1] += (this.tmp[i] + "#");
					}
				}
			}
			this.finish = true;
			console.log(this.wArray);

		});
	}

	// check if word is spelt right, if not a word atall (e.g. 12) it returns true
	isCorrect(word) {
		if(this.finish) {
			this.ret = false;
			if(word.length > 0) {
				if(word[word.length - 1] == '.') {
					word = word.substring(0,word.length - 1);
				}
				this.ret = this.wArray[1].includes(word+"#");
				if(this.ret == false) {
						this.ret = this.wArray[1].includes(word.toLowerCase()+"#");
				}
			}
			return this.ret;
		}
		return true;
	}

}
