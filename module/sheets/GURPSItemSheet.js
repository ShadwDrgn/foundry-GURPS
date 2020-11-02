export default class GURPSItemSheet extends ItemSheet {
	static get defaultOptions() {
		return mergeObject(super.defaultOptions, {
			classes: ["gurps", "sheet", "item"]
		});
	}
	get template() {
		console.log(this.item);
		return `systems/gurps/templates/sheets/${this.item.data.type}-sheet.hbs`;
	}
	_onDrop(event) {
		super._onDrop(event);
		let data = null;
		try {
	      data = JSON.parse(event.dataTransfer.getData('text/plain'));
	    }
	    catch (err) {
	    	console.log("ERROR");
	      	return false;
	    }
		if (this.item.type == "skill" && game.items.get(data.id).type == "modifier") {
			if (this.item.data.data.modifiers.includes(data.id) === false) {
				let curmods = [...this.item.data.data.modifiers];
				curmods.push(data.id)
				return this.item.update({"data.modifiers": curmods});
			}
		}
	}
	activateListeners(html) {
		super.activateListeners(html);
		html[0].addEventListener('drop', this._onDrop.bind(this));
		//html.find('.gurps.sheet.item form').on("drop", this._onDrop.bind(this));
	}
	/** @override */
	getData() {
		const data = super.getData();
		if (this.item.type != "skill") return data;
		data.mod_items = this.item.data.data.modifiers.map(x => game.items.get(x))
		console.log(data.mod_items);
		return data;
	}

}