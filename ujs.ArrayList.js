var ujs = window.ujs || {};
(function () {
	var _members = [];
	
	ujs.ArrayList = function ()
	{
		this.length = 0;
	};
	
	// Ajoute un élement ou un tableau d'élement à la collection
	ujs.ArrayList.prototype.add = function (element)
	{
		var size = element.length;
		
		if (size > 0) {
		
			for (var i = 0; i < size; i++) {
				_members.push(element[i]);
			}
				
			this.length = _members.length;
		}
		else {
			this.length = _members.push(element);
		}
	};
	
	// Compte le nombre d'élements dans la collection
	ujs.ArrayList.prototype.count = function ()
	{
		return _members.length;
	};
	
	// Vide le contenu de la collection
	ujs.ArrayList.prototype.clear = function ()
	{
		_members = [];
		this.length = 0;
	};
	
	// Renvoie true si l'élement est contenu dans la collection
	ujs.ArrayList.prototype.contains = function (element)
	{
		var i = 0, contains = false;
		
		while (i < this.length && !contains) {
			if (_members[i] == element)
				contains = true;
			i++;
		}
		
		return contains;
	};
	
	// Copie le contenu de la collection dans la tableau passé en paramètre
	ujs.ArrayList.prototype.copyTo = function (array)
	{
		if (this.length > 0) {
			for (var i = 0; i < this.length; i++)
				array.push(_members[i]);
		}
	};
	
	// Récupère l'élement à la position donnée
	ujs.ArrayList.prototype.getAt = function (index)
	{
		if (index > this.length - 1 || index < 0) {
			return null;
		}
		
		return _members[index];
	};
	
	// Effectue une boucle et appel la fonction callback avec l'élement en cours
	ujs.ArrayList.prototype.forEach = function (callback)
	{
		if (this.length > 0) {
			for (var i = 0; i < this.length; i++) {
				callback(_members[i]);
			}
		}
	};
	
	// Retourne l'index de l'élement si il est présent dans la collection
	ujs.ArrayList.prototype.indexOf = function (element)
	{
		var i = 0, index = -1;
		
		while (i < this.length && index == -1) {
			if (_members[i] == element) {
				index = i;
			}
			i++;
		}
		
		return index;
	};
	
	// Insert l'élément à la position donnée par index
	ujs.ArrayList.prototype.insertAt = function (index, element)
	{
		if (index > 0 && index < this.length) {
			var tempArray = [];
				
			for (var i = 0; i < this.length; i++) {
				if (i == index) {
					tempArray.push(element);
				}
					
				tempArray.push(_members[i])
			}
			
			_members = tempArray;
			this.length = _members.length;
		}
	};
	
	// Supprime un élement de la liste
	ujs.ArrayList.prototype.remove = function (element)
	{
		var i = 0, done = false;
		
		while (i < this.length && !done) {
		
			if (_members[i] == element) {
				done = true;
				this.removeAt(i);
			}
			i++;
		}
	};
	
	// Supprime un élement de la liste à la position donnée
	ujs.ArrayList.prototype.removeAt = function (index)
	{
		if (index > 0 && index < this.length) {
		
			var tempArray = [];
				
			for (var i = 0; i < this.length; i++) {
				if (i != index && i < this.length) {
					tempArray.push(_members[i]);
				}
			}
			
			_members = tempArray;
			this.length = _members.length;
		}
	};
	
	// Retourne une chaine de caractère de la liste
	ujs.ArrayList.prototype.toString = function ()
	{
		var arrayString = "";
		
		for (var i = 0; i < this.length; i++) {
			arrayString += (i != 0 ? " - " : "") + _members[i];
		}
			
		return arrayString;
	};
})();