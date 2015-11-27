/**
 * MicroJS aka ujs class library
 * Define an ArrayList collection.
 *
 * @module ujs
 */


var _members = [];

/** 
 * An array list
 *
 * @constructor
 * @class ArrayList
 *
 */
var ArrayList = function() {
    this.length = 0;
};

/**
 * Add an element to the list.
 *
 * @method add
 * @param {Object} element The element to add.
 */
ArrayList.prototype.add = function(element) {
    var size = element.length;

    if (size > 0) {

        for (var i = 0; i < size; i++) {
            _members.push(element[i]);
        }

        this.length = _members.length;
    } else {
        this.length = _members.push(element);
    }
};

/**
 * Gets the number of elements. Note that no calcul are made, you can use it in a loop safetly.
 *
 * @method coun
 * @return {Number} The number of elements.
 */
ArrayList.prototype.count = function() {
    return _members.length;
};

/**
 * Clear the collection.
 *
 * @method clear
 */
ArrayList.prototype.clear = function() {
    _members.length = 0;
    this.length = 0;
};

/**
 * Determine if an element is in the collection.
 *
 * @method contains
 * @param {Object} element The element to search.
 * @return {Boolean} Return true if exists, otherwise return false.
 */
ArrayList.prototype.contains = function(element) {
    var i = 0,
        contains = false;

    while (i < this.length && !contains) {
        if (_members[i] == element) {
            contains = true;
        }
        i++;
    }

    return contains;
};

/**
 * Copy an array in the collection.
 *
 * @param {Array} array An array to copy.
 * @param {Number} startIndex The start index to use with the array.
 */
ArrayList.prototype.copyTo = function(array, startIndex) {
    if (this.length > 0) {
        startIndex = (startIndex || 0) && Math.min(startIndex, this.length);
        for (var i = startIndex; i < this.length; i++) {
            array.push(_members[i]);
        }
    }
};

/**
 * Gets an element at the specified position.
 *
 * @method getAt
 * @param {Number} index The index of the element.
 * @return {Object} Return the object if exists, otherwise return null.
 */
ArrayList.prototype.getAt = function(index) {
    if (index > this.length - 1 || index < 0) {
        return null;
    }

    return _members[index];
};

/**
 * Execute a foreach loop on the collection and call a function with two parameters.
 *
 * @method forEach
 * @param {Function} callback The callback to use, it must be have two parameters, index and element.
 *
 */
ArrayList.prototype.forEach = function(callback) {
    if (this.length > 0) {
        for (var i = 0; i < this.length; i++) {
            callback(i, _members[i]);
        }
    }
};

/**
 * Gets the index of the element passed in parameter.
 *
 * @method indexOd
 * @param {Object} element The element to use to find index.
 * @return {Number} Return the index of the element, otherwise return -1.
 */
ArrayList.prototype.indexOf = function(element) {
    var i = 0,
        index = -1;

    while (i < this.length && index == -1) {
        if (_members[i] == element) {
            index = i;
        }
        i++;
    }

    return index;
};

/**
 * Insert an element at the specified index. If the index already exists the array is resized and elements are pushed to right.
 *
 * @method insertAt
 * @param {Number} index Desired index.
 * @param {Object} element The element to add who can be an object or a string.
 */
ArrayList.prototype.insertAt = function(index, element) {
    if (index > 0 && index < this.length) {
        var tempArray = [];

        for (var i = 0; i < this.length; i++) {
            if (i == index) {
                tempArray.push(element);
            }

            tempArray.push(_members[i]);
        }

        _members = tempArray;
        this.length = _members.length;
    }
};

/** 
 * Remove an element.
 *
 * @method removeAt
 * @param {Object} element The element to remove
 */
ArrayList.prototype.remove = function(element) {
    var i = 0,
        done = false;

    while (i < this.length && !done) {

        if (_members[i] == element) {
            done = true;
            this.removeAt(i);
        }
        i++;
    }
};

/** 
 * Remove an element at the specified position.
 *
 * @method removeAt
 * @param {Number} index The index of the element.
 * @return {Object} Return the removed object if exists, otherwise return null.
 */
ArrayList.prototype.removeAt = function(index) {
    var value = null;

    if (index > 0 && index < this.length) {

        var tempArray = [];

        for (var i = 0; i < this.length; i++) {
            if (i != index && i < this.length) {
                tempArray.push(_members[i]);
            } else {
                value = _members[i];
            }
        }

        _members = tempArray;
        this.length = _members.length;
    }

    return value;
};

/**
 * Gets a string of all value stored in the collection.
 *
 * @method toString
 * @return {String} A string of all value stored in the collection.
 */
ArrayList.prototype.toString = function() {
    var arrayString = "";

    for (var i = 0; i < this.length; i++) {
        arrayString += (i != 0 ? " - " : "") + _members[i];
    }

    return arrayString;
};

module.exports = ArrayList;
