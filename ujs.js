/**
 * MicroJS aka ujs class library
 *
 * @class ujs
 */

var events = [];

var ujs = {

    /**
     * Trigger an event on a DOM element.
     *
     * @method triggerEvent
     * @param {DOMElement} A DOM element.
     * @return {Object} The event name or an array of event names.
     */
    triggerEvent: function(element, eventName) {
        if (eventName instanceof Array) {
            for (var i = 0, l = eventName.length; i < l; i++) {
                ujs.triggerEvent(element, eventName[i]);
            }
        } else if ((element[eventName] || false) && typeof element[eventName] == 'function') {
            element[eventName](element);
        }
    },

    /**
     * Send a event to all listeners.
     * @method notify
     * @static
     * @param {String} name The event's name.
     * @param {Object} params A object that contains parameters to send to listeners.
     */
    notify: function(name, params) {
        var event = document.createEvent("HTMLEvents");
        event.initEvent(name, true, false);

        if (typeof(params) === "object") {
            for (var i in params) {
                event[i] = params[i];
            }
        }

        try {
            document.dispatchEvent(event);
        } catch (e) {
            // pass
        }
    },

    /**
     * Gets a get parameter from the browser url.
     *
     * @method getURLParameter
     * @param {String} Params name.
     * @return {String} Get value.
     */
    getURLParameter: function(name) {
        var temp = document.location.href.split("?");
        var getString = temp[1];
        var getParameters = getString.split("&");
        var i = 0,
            size = getParameters.length,
            value = null;

        while (i < size && value == null) {
            var tmp = getParameters[i].split("=");

            if (tmp[0] == name) {
                value = tmp[1];
            }
            i++;
        }

        return value;
    },

    /**
     * Add a value to an attribute on a DOM element.
     *
     * @method addOnAttribute
     * @param {String} The attribute of the element.
     * @param {DOMElement} The DOM element.
     * @param {String} The value to set in the attribute.
     */
    addOnAttribute: function(attribute, element, value) {
        var separator = attribute == "style" ? ";" : " ";
        var content = element.getAttribute(attribute);
        var alreadyHere = false;
        var contentArray = [];

        if (content != null && content != "") {
            contentArray = content.split(separator);

            var arraySize = contentArray.length;
            var i = 0;

            while (i < arraySize && !alreadyHere) {
                if (contentArray[i] == value) {
                    alreadyHere = true;
                }
                i++;
            }
        }

        if (!alreadyHere) {
            contentArray.push(value);
        }

        element.setAttribute(attribute, contentArray.join(" "));
    },

    /**
     * Remove a value from an attribute on a DOM element
     *
     * @method removeOnAttribute
     * @param {String} The attribute of the element.
     * @param {DOMElement} The DOM element.
     * @param {String} The value to set in the attribute.
     */
    removeOnAttribute: function(attribute, element, value) {
        if (typeof(element) != "object") {
            return;
        }

        var separator = attribute == "style" ? ";" : " ";
        var content = element.getAttribute(attribute);

        if (content != null && content != "") {
            var contentArray = content.split(separator);
            var size = contentArray.length;
            var finalContent = [];

            for (var i = 0, l = contentArray.length; i < l; i++) {
                if (contentArray[i] != value) {
                    finalContent.push(contentArray[i]);
                }
            }

            element.setAttribute(attribute, finalContent.join(separator));
        }
    },

    /**
     * Add a class on a DOM element. If it exists it is not re-added.
     *
     * @method addClass
     * @param {DOMElement} The DOM element.
     * @param {String} The class name or an Array of class names.
     */
    addClass: function(element, className) {
        if (className instanceof Array) {
            for (var i = 0, l = className.length; i < l; i++) {
                ujs.addOnAttribute("class", element, className[i]);
            }
        } else {
            ujs.addOnAttribute("class", element, className);
        }
    },

    /**
     * Remove a class from a DOM element.
     *
     * @method removeClass
     * @param {DOMElement} The DOM element.
     * @param {String} The class name or an Array of class names.
     */
    removeClass: function(element, className) {
        if (className instanceof Array) {
            for (var i = 0, l = className.length; i < l; i++) {
                ujs.removeOnAttribute("class", element, className[i]);
            }
        } else {
            ujs.removeOnAttribute("class", element, className);
        }
    },

    /**
     * Replace a class by another class on a DOM element.
     *
     * @method replaceClass
     * @param {DOMElement} element The DOM element or an array of DOM elements.
     * @param {String} classToRemove The class to remove.
     * @param {String} classToAdd The class to add.
     */
    replaceClass: function(element, classToRemove, classToAdd) {
        if (element instanceof Array) {
            for (var i = 0, l = element.length; i < l; i++) {
                ujs.removeClass(element[i], classToRemove);
                ujs.addClass(element[i], classToAdd);
            }
        } else {
            ujs.removeClass(element, classToRemove);
            ujs.addClass(element, classToAdd);
        }
    },

    /**
     * Remove all classes from a DOM element.
     *
     * @method removeClasses
     * @param {DOMElement} element The DOM element.
     */
    removeClasses: function(element) {
        element.setAttribute("class", "");
    },

    /**
     * Add a style on a DOM element. if it exists it is not re-added.
     *
     * @method addStyle
     * @param {DOMElement} The DOM element.
     * @param {String} The style name.
     */
    addStyle: function(element, styleName) {
        if (styleName instanceof Array) {
            for (var i = 0, l = styleName.length; i < l; i++) {
                ujs.addOnAttribute("style", element, styleName[i]);
            }
        } else {
            ujs.addOnAttribute("style", element, styleName);
        }
    },

    /**
     * Remove a style from a DOM element.
     *
     * @method removeStyle
     * @param {DOMElement} The DOM element.
     * @param {String} The style name.
     */
    removeStyle: function(element, styleName) {
        if (styleName instanceof Array) {
            for (var i = 0, l = styleName.length; i < l; i++) {
                ujs.removeOnAttribute("style", element, styleName[i]);
            }
        }
        ujs.removeOnAttribute("style", element, styleName);
    },

    /**
     * Determine if the element has a class.
     *
     * @method hasClass
     * @param {DOMElement} The DOM element.
     * @param {String} The class name to search.
     * @return {Boolean} Return true if the element has the class name, otherwise return false.
     */
    hasClass: function(element, className) {
        var classes = element.getAttribute("class");
        var hasClass = false;

        if (classes != null) {
            var classArray = classes.split(" ");
            var i = 0;
            var arraySize = classArray.length;

            while (i < arraySize && !hasClass) {
                if (classArray[i] == className) {
                    hasClass = true;
                }
                i++;
            }
        }
        return hasClass;
    },

    /**
     * Merge two object in one object.
     *
     * @method mergeObjects
     * @param {Object} An object.
     * @param {Object} Another object.
     * @param {Object} An merged object.
     * @param {Boolean} force_recursion
     * @param {String} typeresult
     */
    mergeObjects: function(object1, object2, force_recursion, typeresult) {
        var force_recursion = force_recursion === true ? true : false;
        var result = typeresult == "array" ? [] : {};

        // Prepare the result var
        for (var i in object1) {
            if (object1.hasOwnProperty(i)) {
                result[i] = object1[i];
            }
        }

        // merging
        for (var i in object2) {
            if (object2.hasOwnProperty(i) && typeof(object2[i]) != "undefined") {
                if (object2[i] instanceof Array && force_recursion) {
                    result[i] = this.mergeObjects(result[i], object2[i], force_recursion, "array");
                } else if (object2[i] instanceof Object && force_recursion) {
                    result[i] = this.mergeObjects(result[i], object2[i]);
                } else {
                    result[i] = object2[i];
                }
            }
        }

        return result;
    },

    /**
     * Get a property in nested objects???
     *
     * @function getProperty
     * @param {Object} obj
     * @param {String} path
     * @return {} the property
     */
    getProperty: function(obj, path) {
        var parts = path.split('.');
        var i, tmp;
        for (i = 0; i < parts.length; i++) {
            tmp = obj[parts[i]];
            if (i == parts.length - 1) {
                return obj[parts[i]];
            } else if (tmp === undefined) {
                tmp = obj[parts[i]] = {};
            }
            obj = tmp;
        }
        return false;
    },

    /**
     * Set a property in nested objects???
     *
     * @function setProperty
     * @param {Object} obj
     * @param {String} path
     * @param {} value
     * @return {} the property
     */
    setProperty: function(obj, path, value) {
        var parts = path.split('.');
        var i, tmp;
        for (i = 0; i < parts.length; i++) {
            tmp = obj[parts[i]];
            if (value !== undefined && i == parts.length - 1) {
                tmp = obj[parts[i]] = value;
            } else if (tmp === undefined) {
                tmp = obj[parts[i]] = {};
            }
            obj = tmp;
        }
        return obj;
    },

    /**
     * A simple ajax method to make GET and POST calls.
     *
     * @method ajax
     * @param {Object} parameters An object of parameters.
     * @exemple
     *     parameters {
     *       url: "your_url.php",
     *       async: true,
     *       method: "POST",
     *       data: "id=25&age=45",
     *       success: function (response) { },
     *       error: function (response) { }
     *     };
     */
    ajax: function(parameters) {
        var url = parameters.url;
        var method = parameters.method || "GET";
        var params = parameters.params || parameters.data || "";
        var callback = parameters.success || function() {};
        var errorCallback = parameters.onerror || parameters.error || function() {};
        var async = (typeof(parameters.async) != "undefined") ? parameters.async : true;
        var withCredentials = (typeof(parameters.withCredentials) != "undefined") ? parameters.withCredentials : false;
        var xhr;

        // For browser
        if (typeof(window) !== "undefined") {
            xhr = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
        } else { // For node or Worker
            xhr = new XMLHttpRequest();
        }

        if (parameters.mimeType) {
            xhr.overrideMimeType(parameters.mimeType);
        }

        if (method == "POST") {
            xhr.open("POST", url, async);

            if (withCredentials) {
                xhr.withCredentials = true;
            }

            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    if (callback != null) {
                        callback(xhr.responseText);
                    }
                } else if (xhr.readyState == 4 && xhr.status != 200) {
                    if (errorCallback != null) {
                        errorCallback();
                    }
                }
            };
            xhr.send(params);
        } else {
            var finalUrl = params != "" ? url + "?" + params : url;
            xhr.open("GET", finalUrl, async);

            if (withCredentials) {
                xhr.withCredentials = true;
            }

            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    if (callback != null) {
                        callback(xhr.responseText);
                    }
                } else if (xhr.readyState == 4 && xhr.status != 200) {
                    if (errorCallback != null) {
                        errorCallback();
                    }
                }
            };
            xhr.send(null);
        }
    },

    /**
     * An alias to ajax method who make a POST operation.
     * @method post
     * @param {Object} An object of parameters.
     */
    post: function(url, parameters) {
        var parameters = parameters || {};
        parameters.method = "POST";
        parameters.url = url;
        return this.ajax(parameters);
    },

    /**
     * Load a css file and add it in the head tag.
     *
     * @method loadCSS
     * @param {String} The path of the css file.
     * @param {Object} An object of paramaters for configure the tag.
     */
    loadCSS: function(path, params) {
        var link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("type", "text/css");
        link.setAttribute("href", path);

        if (typeof(params) == "object") {
            for (var i in params) {
                link.setAttribute(i, params[i]);
            }
        }

        document.getElementsByTagName("head")[0].appendChild(link);
    },

    /**
     * Load a JavaScript file and add it at the end of the body
     *
     * @method loadCSS
     * @param {String} The path of the css file
     * @param {Object} An object of paramaters for configure the tag
     */
    loadJavaScript: function(path, params) {
        var js = document.createElement("script");
        js.setAttribute("src", path);

        if (typeof(params) == "object") {
            for (var i in params) {
                js.setAttribute(i, params[i]);
            }
        }

        document.getElementsByTagName("body")[0].appendChild(js);
    },

    /**
     * Test if an object is in an array
     *
     * @method inArray
     * @param {Object} An object (can be a string, number, object)
     * @param {Array} An array of element
     * @return {Boolean} True if the searched element is in the array then false
     */
    inArray: function(search, array) {
        return (array.indexOf(search) > -1);
    },

    /**
     * Clone an array.
     *
     * @method cloneArray
     * @param {Array} array The array to clone
     * @param {Boolean} force_recursion
     * @return {Array} The new array
     */
    cloneArray: function(array, force_recursion) {
        var newArray = [];
        var force_recursion = force_recursion || false;
        for (var i = 0, l = array.length; i < l; i++) {
            if (force_recursion) {
                if (object[i] instanceof Array) {
                    newArray[i] = this.cloneArray(array[i]);
                } else if (array[i] instanceof Object) {
                    newArray[i] = this.cloneObject(array[i]);
                } else {
                    newArray[i] = array[i];
                }
            } else {
                newArray[i] = array[i];
            }
        }
        return newArray;
    },

    /**
     * Clone an object
     *
     * @method cloneObject
     * @param {Object} object
     * @return {Object} the clonned object
     */
    cloneObject: function(object) {
        var newObject = {};
        for (var i in object) {
            if (object.hasOwnProperty(i)) {
                if (object[i] instanceof Array) {
                    newObject[i] = this.cloneArray(object[i]);
                } else if (object[i] instanceof Object) {
                    newObject[i] = this.cloneObject(object[i]);
                } else {
                    newObject[i] = object[i];
                }
            }
        }
        return newObject;
    },

    /**
     * Inserts an object in a sorted array
     *
     * @method insertSorted
     * @param {Object} An object (can be a string, number, object)
     * @param {Function} The sorting function, same arguments and return values as in array.sort
     * @param {Array} An array of element
     * @return {Array} array in input
     */
    insertSorted: function(element, sortfunction, array) {
        var current = 0;
        if (array.length == 0) {
            array.push(element);
        } else {
            while (current < array.length && sortfunction(element, array[current]) > 0) {
                current++;
            }

            array.splice(current, 0, element);
        }

        return array;
    },

    /**
     * Gets elements by class name (alias to document.getElementsByClassName)
     *
     * @method getByClass
     * @param {String} Class of elements
     * @return {Array} An array of DOM elements with this class name
     */
    getByClass: function(className) {
        return document.getElementsByClassName(className);
    },

    /**
     * Gets elements by tag name (alias to document.getElementsByTagName)
     *
     * @method getByTag
     * @param {String} Tag to search
     * @return {Array} An array of DOM elements with this tag name
     */
    getByTag: function(tagName) {
        return document.getElementsByTagName(tagName);
    },

    /**
     * Gets an element by its id (alias to document.getElementById)
     *
     * @method getById
     * @param {String} Id of the element
     * @return {DOMElement} The DOM element with the specified id
     */
    getById: function(id) {
        return document.getElementById(id);
    },

    /**
     * Gets if an element is defined (alias to typeof(element) != "undefined")
     *
     * @method idDef
     * @param {DOMElement} A DOM element
     * @return {Boolean} True if defined then false
     */
    isDef: function(element) {
        return typeof element != "undefined";
    },

    /**
     * Remove all spaces in a string.
     *
     * @method removeSpaces
     * @param {String} The string to use.
     * @return {String} The string with stripped spaces.
     */
    removeSpaces: function(str) {
        var regExp = new RegExp("[ ]+", "g");
        return str.replace(regExp, "");
    },

    /**
     * Find a function nested into an object???
     *
     * @method stringToFunction
     * @param {String} str
     * @return {Function}
     */
    stringToFunction: function(str) {
        var arr = str.split(".");

        var fn = (window || this);
        for (var i = 0, len = arr.length; i < len; i++) {
            fn = fn[arr[i]];
        }

        if (typeof fn !== "function") {
            throw new Error("function not found");
        }

        return fn;
    },

    /**
     * Recursively deserializes an object
     *
     * @method deserializeObject
     * @param {Object} hybrid The serialized object
     * @param optionnalTarget
     * @param propertyList
     * @param blackList
     * @return {Object} A deserialized Object
     */
    deserializeObject: function(hybrid, optionnalTarget, propertyList, blackList) {
        var object = null;
        var deserialized;
        if (hybrid && hybrid.class && hybrid.class.name && !optionnalTarget) {
            var classInstance = this.stringToFunction(hybrid.class.name);
            object = classInstance.Deserialize(hybrid);
        } else {
            if (hybrid instanceof Array) {
                if (hybrid.length == 0)
                    return object;
                object = optionnalTarget || [];
                for (var i = 0; i < hybrid.length; i++) {
                    deserialized = this.deserializeObject(hybrid[i]);
                    if (deserialized !== null) object.push(deserialized);
                }
            } else if (hybrid instanceof Object) {
                object = optionnalTarget || {};
                for (var props in hybrid) {
                    if ((!propertyList || (propertyList && propertyList.indexOf(props) != -1)) &&
                        (!blackList || (blackList && blackList.indexOf(props) == -1))) {
                        deserialized = this.deserializeObject(hybrid[props]);
                        if (deserialized !== null) object[props] = deserialized;
                    }
                }
            } else if (object !== undefined) {
                object = hybrid;
            }
        }
        return object;
    },

    /**
     * Recursively serializes an object
     *
     * @method serializeObject
     * @param {Object} hybrid The serialized object
     * @param optionnalTarget
     * @param propertyList
     * @param blackList
     * @return {Object} A deserialized Object
     */
    serializeObject: function(object, optionnalTarget, propertyList, blackList) {
        var hybrid;
        var ser;
        if (object && object.serialize && !optionnalTarget) {
            hybrid = object.serialize();
        } else {
            if (object instanceof Array) {
                hybrid = [];
                for (var i = 0; i < object.length; i++) {
                    hybrid.push(this.serializeObject(object[i]));
                }
                if (hybrid.length == 0)
                    return null;
            } else if (object instanceof Object) {
                if (!(object instanceof Function)) {
                    hybrid = optionnalTarget || {};
                    for (var props in object) {
                        if (object.hasOwnProperty(props)) {
                            if ((!propertyList || (propertyList && propertyList.indexOf(props) != -1)) &&
                                (!blackList || (blackList && blackList.indexOf(props) == -1))) {
                                ser = this.serializeObject(object[props]);
                                // To avoid functions to be serialized as "undefined"
                                if (ser !== undefined && ser !== null) hybrid[props] = ser;
                            }
                        }
                    }
                }
            } else {
                hybrid = object;
            }
        }
        return hybrid;
    }
};

module.exports = ujs;