export default class GURPSActorSheet extends ActorSheet {
	static get defaultOptions() {
		return mergeObject(super.defaultOptions, {
			classes: ["gurps", "sheet", "actor"]
		});
	}
	activateListeners(html) {
		super.activateListeners(html);
		html.find('.item-edit').change(this._onSkillEdit.bind(this));
		html.find('.item-delete').click(this._onItemDelete.bind(this));
		html.find('.item-roll').click(this._onRoll.bind(this));
		html.find('.create-item').click(this._onItemCreate.bind(this));
	}
	/** @override */
	getData() {
		const data = super.getData();
		data.skills = data.items.filter(function(item) {return item.type == "skill"});
		return data;
	}
	get template() {
		return `systems/gurps/templates/sheets/actor.hbs`;
	}
	_onSkillEdit(event) {
		event.preventDefault();
		let element = event.currentTarget;
		let itemId = element.closest(".item").dataset.itemid;
		let item = this.actor.getOwnedItem(itemId);
		let field = element.dataset.field;
		return item.update({ [field]: element.value });
	}
	_onItemCreate(event) {
		event.preventDefault();
		let element = event.currentTarget;
		let itemData = {
			name: "_",
			type: "skill"
		};
		return this.actor.createOwnedItem(itemData);
	}
	_onItemDelete(event) {
		event.preventDefault();
		const element = event.currentTarget;
		const itemId = element.closest(".item").dataset.itemid;
		return this.actor.deleteOwnedItem(itemId);
	}
	_onRoll(event) {
		event.preventDefault();
		const element = event.currentTarget;
		const itemId = element.closest(".item").dataset.itemid;
		const item = this.actor.getOwnedItem(itemId);
		const value = item.data.data.value;
		const dataset = element.dataset;

	  if (dataset.roll) {
	    let roll = new Roll(dataset.roll, this.actor.data.data).roll();
	    let result = roll.results[0];
	    const margin = value - result;
	    let msg = "Rolling " + item.name + ".<br />";
	    msg += (roll.results[0] <= value) ? "Success by " + margin : "Fail by " + margin;
	    msg += ".";
	    roll.toMessage({
	      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
	      flavor: msg
	    });
	  }

	}
}