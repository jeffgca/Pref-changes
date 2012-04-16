const pageMod = require("page-mod");
const data    = require("self").data;
const prefSet = require("simple-prefs");

// Get the values for options
var option1 = prefSet.prefs.option1;
var option2 = prefSet.prefs.option2;

// Listen for changes

exports.main = function() {
	pageMod.PageMod({ 
		include: ["*"],
		contentScriptWhen: 'end',
		contentScript: 'self.port.on("prefchange", function(data) { console.log(JSON.stringify(data,null,"  ")); })',
		onAttach: function(worker) {
			function onPrefChange(prefName) {
				let payload = [prefName, prefSet.prefs[prefName]];
				worker.port.emit('prefchange', payload);
			}

			prefSet.on("option1", onPrefChange);
			prefSet.on("option2", onPrefChange);
		}
	});
}