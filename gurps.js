import GURPSItemSheet from "./module/sheets/GURPSItemSheet.js";
import GURPSActorSheet from "./module/sheets/GURPSActorSheet.js";

Hooks.once("init", function(){
	console.log("Loading ShadwDrgn's GURPs System");
	Items.unregisterSheet("core", ItemSheet);
	Items.registerSheet("gurps", GURPSItemSheet, {makeDefault: true});
	Actors.unregisterSheet("core", ActorSheet);
	Actors.registerSheet("gurps", GURPSActorSheet, {makeDefault: true});
	Handlebars.registerHelper('loud', function (aString) {
	    return aString.toUpperCase()
	});

});
