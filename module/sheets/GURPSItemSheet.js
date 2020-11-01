export default class GURPSItemSheet extends ItemSheet {
	static get defaultOptions() {
		return mergeObject(super.defaultOptions, {
			classes: ["gurps", "sheet", "item"]
		});
	}
	//
	get template() {
		return `systems/gurps/templates/sheets/${this.item.data.type}-sheet.hbs`;
	}
	_onDrop(event) {
		super._onDrop(event);
		let data = null;
		try {
	      data = JSON.parse(event.dataTransfer.getData('text/plain'));
	    }
	    catch (err) {
	      return false;
	    }
		console.log(data);
	}
	activateListeners(html) {
		super.activateListeners(html);
		html[0].addEventListener('drop', this._onDrop.bind(this));
		//html[0].ondrop = this._onDrop.bind(this);
	}
}