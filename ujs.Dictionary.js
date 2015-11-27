/**
 * MicroJS aka ujs class library
 * Define an hybrid Dictionary collection.
 *
 * @module ujs
 */

/**
 * Create an hybrid dictionary where you can access elements with there keys or indexs.
 *
 * @constructor
 * @class Dictionary
 */
var Dictionary = function() {
    this.keys = [];
    this.values = [];
    this.length = 0;
};

function add(context, key, value) {
    var position = context.values.push(value) - 1;
    context.keys[position] = key;
    context.length += 1;
}

/**
 * Add an object to the collection
 *
 * @method add
 * @param {Object} key The key used for identificating the value, it can be a string or an object.
 * @param {Object} value The value you want store.
 * @param {Boolean} merge Sets to true to merge values if an object with the same key is already in collection.
 */
Dictionary.prototype.add = function(key, value, merge) {
    merge = (typeof(merge) != "undefined") ? merge : false;
    var element = this.getElement(key);

    if (element == null) {
        add(this, key, value);
    } else if (merge) {
        if (typeof(value) != "object") {
            element = value;
        } else {
            for (var i in value) {
                element = value;
            }
        }
    }
};

/** 
 * Add values to the collection. Keys and Values arrays must have the same size.
 *
 * @method addRange
 * @param {Object} key An array of keys used for identificating the values, it can be a string or an object.
 * @param {Object} values An array of values you want store.
 * @param {Boolean} merge Sets to true to merge values if an object with the same key is already in collection.
 */
Dictionary.prototype.addRange = function(keys, values, merge) {
    if (keys.length == values.length) {
        var i = 0,
            l = keys.length;

        while (i < l) {
            this.add(keys[i], values[i]);
            i++;
        }
    }
};

/**
 * Clear the collection.
 *
 * @method clear
 */
Dictionary.prototype.clear = function() {
    this.values.length = 0;
    this.keys.length = 0;
    this.length = 0;
};

/**
 * Determine if the key exists in the collection.
 *
 * @method containsKey
 * @param {Object} key The key used for identificating the value, it can be a string or an object.
 * @return {Boolean} Return true if the key exists, otherwise return false.
 */
Dictionary.prototype.containsKey = function(key) {
    return this.keys.indexOf(key) > -1;
};

/**
 * Determine if the value exists in the collection.
 *
 * @method containsValue
 * @param {Object} value The value you search.
 * @return {Boolean} Return true if the value exists, otherwise return false.
 */
Dictionary.prototype.containsValue = function(value) {
    return this.values.indexOf(value) > -1;
};

/**
 * Remove an object from the collection with it key.
 *
 * @method remove
 * @param {Object} key The key used for identificating the value, it can be a string or an object.
 * @param {Object} removedValue The value removed from the collection if it exists, otherwise return null.
 */
Dictionary.prototype.remove = function(key) {
    var removedValue = null;
    var index = this.keys.indexOf(key);

    if (index > -1) {
        removedValue = this.values.splice(index, 1);
        this.keys.splice(index, 1);
        this.length -= 1;
    }

    return removedValue;
};

/**
 * Remove objects from the collection with there keys.
 *
 * @method remove
 * @param {Object} key An array of keys used for identificating the values, it can be a string or an object.
 */
Dictionary.prototype.removeRange = function(keys) {
    var i = 0,
        l = keys.length;

    while (i < l) {
        this.remove(keys[i]);
        i++;
    }
};

/**
 * Gets all values.
 *
 * @method getElements
 * @return {Array} An array of all values.
 */
Dictionary.prototype.getElements = function() {
    return this.values;
};

/**
 * Gets an element with its key.
 *
 * @method getElement
 * @param {Object} key The key used for identificating the value, it can be a string or an object.
 * @return {Object} The value if exists, otherwise return null;
 */
Dictionary.prototype.getElement = function(key) {
    var index = this.keys.indexOf(key);
    return (index > -1) ? this.values[index] : null;
};

/**
 * Gets a value at the specified index.
 *
 * @getElementAt
 * @param {Number} index The index of the value in the collection.
 * @return {Object} The value if exists, otherwise return null;
 */
Dictionary.prototype.getElementAt = function(index) {
    var result = null;

    if (index > -1 && index < this.length) {
        result = this.values[index];
    }

    return result;
};

/**
 * Gets the first value of the collection.
 *
 * @method getFirstElement
 * @return {Object} The first value if extists, otherwise return null.
 */
Dictionary.prototype.getFirstElement = function() {
    return (this.length > 0) ? this.values[0] : null;
};

/**
 * Gets the latest value of the collection.
 *
 * @method getLastElement
 * @return {Object} The first value if extists, otherwise return null.
 */
Dictionary.prototype.getLastElement = function() {
    return (this.length > 0) ? this.values[(this.length - 1)] : null;
};

/**
 * Gets all keys.
 *
 * @method getKeys
 * @return {Array} An array of keys
 */
Dictionary.prototype.getKeys = function() {
    return this.keys;
};

/**
 * Gets the key for the value passed in parameter.
 *
 * @method getKey
 * @param {Object} The value of the searched key.
 * @return {Object} The key if exists, otherwise return null.
 */
Dictionary.prototype.getKey = function(element) {
    var result = null;
    var index = this.values.indexOf(element);

    if (index > -1) {
        result = this.keys[index];
    }

    return result;
};

/**
 * Gets the key of a value at a specified position.
 *
 * @method getKeyAt
 * @param {Number} index The index to search.
 * @param {Object} The value at this index.
 */
Dictionary.prototype.getKeyAt = function(index) {
    var result = null;

    if (index > -1 && index < this.length) {
        result = this.keys[index];
    }

    return result;
};

/**
 * Execute a foreach loop on each elements.
 *
 * @method forEach
 * @param {Function} callback A callback function with two parameters (key, element).
 */
Dictionary.prototype.forEach = function(callback) {
    var i = 0;
    var element = null;

    while (i < this.length) {
        element = this.getElementAt(i);
        callback(this.getKey(element), element);
        i++;
    }
};

/**
 * Clone this dictionnary and return it.
 *
 * @method clone
 * @return {ujs.Dictionary} A cloned dictionary of this instance.
 */
Dictionary.prototype.clone = function() {
    var dictionary = new Dictionary();

    for (var i = 0; i < this.length; i++) {
        dictionary.keys[i] = this.keys[i];
        dictionary.values[i] = this.values[i];
        dictionary.length = this.length;
    }

    return dictionary;
};

/**
 * Merge this dictionary with another dictionary.
 * Properties of the current object are overrided.
 * Properties of the other dictionary will be available in the current dictionary.
 *
 * @method merge
 * @param {ujs.Dictionary} Another dictionary for merging
 */
Dictionary.prototype.merge = function(dico) {
    var that = this;
    dico.forEach(function(key, value) {
        that.add(key, value, true);
    });
};

/**
 * Add an array in the collection and use number for keys.
 * @method mergeArray
 * @param {Array} array An array of values.
 * @param {Boolean} merge Sets to true for merge the object.
 * @return {Boolean} Return true if added, otherwise return false.
 */
Dictionary.prototype.mergeArray = function(array, merge) {
    merge = (typeof(merge) == "boolean") ? merge : false;

    if (array instanceof Array) {
        for (var i = 0, l = array.length; i < l; i++) {
            this.add(i, array[i], merge);
        }
        return true;
    }
    return false;
};

/**
 * Add an object in the collection and use number for keys.
 * @method mergeObject
 * @param {Array} object An abject with properties.
 * @param {Boolean} merge Sets to true for merge the object.
 * @return {Boolean} Return true if added, otherwise return false.
 */
Dictionary.prototype.mergeObject = function(object, merge) {
    merge = (typeof(merge) == "boolean") ? merge : false;

    if (typeof(object) == "object") {

        for (var i in object) {
            this.add(i, object[i], merge);
        }

        return true;
    }

    return false;
};

module.exports = Dictionary;
