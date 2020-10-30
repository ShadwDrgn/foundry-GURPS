export default class GURPSItemSheet extends ItemSheet {
	static get defaultOptions() {
		return mergeObject(super.defaultOptions, {
			classes: ["gurps", "sheet", "item"]
		});
	}
	get template() {
		console.log(this.item.data.type);
		return `systems/gurps/templates/sheets/${this.item.data.type}-sheet.hbs`;
	}
}