var ujs = window.ujs || {};

(function () {
	ujs.Dictionary = function()	{
		this.keys = [];
		this.values = [];
		this.length = 0;
	};
	
	function add(context, key, value) {
		var position = context.values.push(value) - 1;
		context.keys[position] = key;
		context.length += 1;
	};
	
	// Ajoute un nouvel élement à la collection
	ujs.Dictionary.prototype.add = function (key, value, merge)	{
		var merge = (typeof(merge) != "undefined") ? merge : false;
		var element = this.getElement(key);
		
		if (element == null) {
			add(this, key, value);
		}
		
		else if (merge) {
			if (typeof(value) != "object") {
				element = value;
			}
			
			else {
				for (var i in value) {
					element = value;
				}
			}
		}
	};
	
	// Ajoute un groupe d'élement à la collection
	ujs.Dictionary.prototype.addRange = function (keys, values)	{
		if (keys.length == values.length) {
			var i = 0, l = keys.length;
			
			while (i < l) {
				this.add(keys[i], values[i]);
				i++;
			}
		}
	};
	
	// Vide la collection
	ujs.Dictionary.prototype.clear = function () {
		this.values = [];
		this.keys = [];
		this.length = 0;
	};
	
	// Indique si la clé existe dans la collection
	ujs.Dictionary.prototype.containsKey = function (key) {
		return this.keys.indexOf(key) > -1;
	};
	
	// Indique si la valeur existe dans la collection
	ujs.Dictionary.prototype.containsValue = function (value) {
		return this.values.indexOf(value) > -1;
	};
	
	// Supprime un objet de la collection
	ujs.Dictionary.prototype.remove = function (key) {
		var removedValue = null;
		var index = this.keys.indexOf(key);
		
		if (index > -1)	{
			removedValue = this.values.splice(index, 1);
			this.keys.splice(index, 1);
			this.length -= 1;
		}
		
		return removedValue;
	};
	
	// Supprime plusieurs objets de la collection
	ujs.Dictionary.prototype.removeRange = function (keys) {
		var i = 0, l = keys.length;
			
		while (i < l) {
			this.remove(keys[i]);
			i++;
		}			
	};
	
	// Obtient toutes les valeurs de la collections
	ujs.Dictionary.prototype.getElements = function () {
		return this.values;
	}
	
	// Obtient l'élément identifié par la clé passée en paramètre
	ujs.Dictionary.prototype.getElement = function(key) {
		var index = this.keys.indexOf(key);
		return (index > -1) ? this.values[index] : null;
	};
	
	// Obtient l'élément à la position passée en paramètre
	ujs.Dictionary.prototype.getElementAt = function (index) {
		var result = null;
		
		if (index > -1 && index < this.length) {
			result = this.values[index];
		}
		
		return result;
	};
	
	// Obtient le premier élément de la collection
	ujs.Dictionary.prototype.getFirstElement = function () {
		return (this.length > 0) ? this.values[0] : null;
	};
	
	// Obtient le dernier élément de la collection
	ujs.Dictionary.prototype.getLastElement = function () {
		return (this.length > 0) ? this.values[(this.length - 1)] : null;
	};
	
	// Obtient toutes les clés de la collection
	ujs.Dictionary.prototype.getKeys = function () {
		return this.keys;
	};
	
	// Obtient la clé de l'élément passé en paramètre
	ujs.Dictionary.prototype.getKey = function (element)
	{
		var result = null;
		var index = this.values.indexOf(element);
		
		if (index > -1) {
			result = this.keys[index];
		}
		
		return result;
	};
	
	// Obtient la clé à la position passée en paramètre
	ujs.Dictionary.prototype.getKeyAt = function (index) {
		var result = null;
		
		if (index > -1 && index < this.length) {
			result = this.keys[index];
		}
		
		return result;
	};
	
	// Exécute une fonction sur tous les éléments de la collection
	// Le callback à la signature suivante : function (key, value)
	ujs.Dictionary.prototype.forEach = function (callback) {
		var i = 0;
		var element = null;
	
		while (i < this.length)	{
			element = this.getElementAt(i);
			callback(this.getKey(element), element);
			i++;
		}
	};
	
	// Clone l'objet en cours et renvoie une nouvelle instance
	ujs.Dictionary.prototype.clone = function () {
		var dictionary = new ujs.Dictionary();
		
		for (var i = 0; i < this.length; i++) {
			dictionary.keys[i] = this.keys[i];
			dictionary.values[i] = this.values[i];
			dictionary.length = this.length;
		}
		
		return dictionary;
	};
	
	// Fusionne 2 dictionnaires
	// Les propriétés de l'objet en cours sont surchargées
	// Les propriétés de l'objet fusionné seront disponibles dans l'objet en cours
	ujs.Dictionary.prototype.merge = function (dico) {
		var that = this;
		dico.forEach(function (key, value) {
			that.add(key, value, true);
		});
	};
	
	ujs.Dictionary.prototype.mergeArray = function (array, merge) {
		var merge = (typeof (merge) == "boolean") ? merge : false;
		
		if (array instanceof Array) {
			for (var i = 0, l = array.length; i < l; i++) {
				this.add(i, array[i], merge)
			}
			return true;
		}
		return false;
	};
	
	ujs.Dictionary.prototype.mergeObject = function (object, merge) {
		var merge = (typeof (merge) == "boolean") ? merge : false;

		if (typeof (object) == "object") {

			for (var i in object) {
				this.add(i, object[i], merge);
			}
			
			return true;
		}
		
		return false;
	};
})();