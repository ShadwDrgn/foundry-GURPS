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
		html.find('.stat-roll').click(this._onRoll.bind(this));
		html.find('.create-item').click(this._onItemCreate.bind(this));
		html.find('.action-edit').click(this._onSkillAction.bind(this));
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
	_onSkillAction(event) {
		event.preventDefault();
		let element = event.currentTarget;
		let itemId = element.closest(".item").dataset.itemid;
		let item = this.actor.getOwnedItem(itemId);
		item.sheet.render(true);
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
		const dataset = element.dataset;
		var value, itemId, item, name;

		if (typeof dataset.value !== 'undefined') {
			value = dataset.value;
			name = dataset.name;
			console.log(value);
		} else {
			itemId = element.closest(".item").dataset.itemid;
			item = this.actor.getOwnedItem(itemId);
			name = item.name;
			value = item.data.data.value;
			console.log(value);
		}
		console.log("Got: " + value);

		if (dataset.roll) {
		let roll = new Roll(dataset.roll, this.actor.data.data).roll();
		let result = roll.results[0];
		const margin = value - result;
		let msg = "Rolling against " + name + "(" + value + ").<br />";
		msg += (roll.results[0] <= value) ? '<span class="gurps success">Success</span> by ' + margin : '<span class="gurps failure">Failure</span> by ' + margin;
		msg += ".";
		roll.toMessage({
			speaker: ChatMessage.getSpeaker({ actor: this.actor }),
			flavor: msg
		});
	  }

	}
}