/**
 * MicroJS aka ujs class library
 *
 * @class ujs
 */

var ujs = (function () {
    var events = [];

    /**
     * Trigger an event on a DOM element.
     *
     * @method triggerEvent
     * @param {DOMElement} A DOM element.
     * @return {Object} The event name or an array of event names.
     */
    this.triggerEvent = function (element, eventName) {
        if (eventName instanceof Array) {
            for (var i = 0, l = eventName.length; i < l; i++) {
                this.triggerEvent(element, eventName[i]);
            }
        }

        else if ((element[eventName] || false) && typeof element[eventName] == 'function') {
            element[eventName](element);
        }
    };

    /**
     * Trigger an event and notify all subscribers that this event has been triggered.
     * If the specified event isn't already created and cached, it's created and cached.
     *
     * @method notify
     * @param {String} The event name or an array of event names
     * @return {Object} An object with paramaters (optional) or an array of objects used with event names.
     */
    this.notify = function (name, params) {
        if ((name instanceof Array) && (params instanceof Array)) {
            for (var i = 0, l = name.length; i < l; i++) {
                this.notify(name[i], (typeof(params[i]) != "undefined") ? params[i] : {});
            }
        }
        else { 
            if (typeof(events[name]) != "undefined") {
                var event = events[name];

                if (params instanceof Object) {
                    for(var i in params) {
                        event[i] = params[i];
                    }
                }

                document.dispatchEvent(event);
            }
            else {
                events[name] = document.createEvent("HTMLEvents");
                events[name].initEvent(name, true, false);
                return this.notify(name, params);
            }
        }
    };

    /**
     * Gets a get parameter from the browser url.
     *
     * @method getURLParameter
     * @param {String} Params name.
     * @return {String} Get value.
     */
    this.getURLParameter = function (name) {
        var temp = document.location.href.split("?");
        var getString = temp[1];
        var getParameters = getString.split("&");
        var i = 0, size = getParameters.length, value = null;

        while (i < size && value == null) {
            var tmp = getParameters[i].split("=");

            if (tmp[0] == name) {
                value = tmp[1];
            }
            i++;
        }

        return value;
    };
  
    /**
     * Add a value to an attribute on a DOM element.
     *
     * @method addOnAttribute
     * @param {String} The attribute of the element.
     * @param {DOMElement} The DOM element.
     * @param {String} The value to set in the attribute.
     */
    this.addOnAttribute = function (attribute, element, value) {
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
    };

    /**
     * Remove a value from an attribute on a DOM element
     *
     * @method removeOnAttribute
     * @param {String} The attribute of the element.
     * @param {DOMElement} The DOM element.
     * @param {String} The value to set in the attribute.
     */
    this.removeOnAttribute = function (attribute, element, value) {
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
    };
  
    /**
     * Add a class on a DOM element. If it exists it is not re-added.
     *
     * @method addClass
     * @param {DOMElement} The DOM element.
     * @param {String} The class name or an Array of class names.
     */
    this.addClass = function (element, className) {
        if (className instanceof Array) {
            for (var i = 0, l = className.length; i < l; i++) {
                this.addOnAttribute("class", element, className[i]);
            }
        }
        else {
            this.addOnAttribute("class", element, className);
        }
    };

    /**
     * Remove a class from a DOM element.
     *
     * @method removeClass
     * @param {DOMElement} The DOM element.
     * @param {String} The class name or an Array of class names.
     */
    this.removeClass = function (element, className) {
        if (className instanceof Array) {
            for (var i = 0, l = className.length; i < l; i++) {
                this.removeOnAttribute("class", element, className[i]);
            }
        }
        else {
            this.removeOnAttribute("class", element, className);
        }
    };

    /**
     * Replace a class by another class on a DOM element.
     *
     * @method replaceClass
     * @param {DOMElement} element The DOM element or an array of DOM elements.
     * @param {String} classToRemove The class to remove.
     * @param {String} classToAdd The class to add.
     */
    this.replaceClass = function (element, classToRemove, classToAdd) {
        if (element instanceof Array) {
            for (var i = 0, l = element.length; i < l; i++) {
                this.removeClass(element[i], classToRemove);
                this.addClass(element[i], classToAdd);
            }
        }
        else {
            this.removeClass(element, classToRemove);
            this.addClass(element, classToAdd);
        }
    };

    /**
     * Remove all classes from a DOM element.
     *
     * @method removeClasses
     * @param {DOMElement} element The DOM element.
     */
    this.removeClasses = function (element) {
        element.setAttribute("class", "");
    };

    /**
     * Add a style on a DOM element. if it exists it is not re-added.
     *
     * @method addStyle
     * @param {DOMElement} The DOM element.
     * @param {String} The style name.
     */
    this.addStyle = function (element, styleName) {
        if (styleName instanceof Array) {
            for (var i = 0, l = styleName.length; i < l; i++) {
                this.addOnAttribute("style", element, styleName[i]);
            }
        }
        else {
            this.addOnAttribute("style", element, styleName);
        }
    };

    /**
      * Remove a style from a DOM element.
      *
      * @method removeStyle
      * @param {DOMElement} The DOM element.
      * @param {String} The style name.
      */
    this.removeStyle = function (element, styleName) {
        if (styleName instanceof Array) {
            for (var i = 0, l = styleName.length; i < l; i++) {
                this.removeOnAttribute("style", element, styleName[i]);
            }
        }
        this.removeOnAttribute("style", element, styleName);
    };

    /**
     * Determine if the element has a class.
     *
     * @method hasClass
     * @param {DOMElement} The DOM element.
     * @param {String} The class name to search.
     * @return {Boolean} Return true if the element has the class name, otherwise return false.
     */
    this.hasClass = function (element, className) {
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
    };

    /**
     * Merge two object in one object.
     *
     * @method mergeObjects
     * @param {Object} An object.
     * @param {Object} Another object.
     * @param {Object} An merged object.
     */
    this.mergeObjects = function (object1, object2) {
        var result = {};

        // Prepare the result var
        for (var i in object1) {
            if(object1.hasOwnProperty(i)) {
                result[i] = object1[i];
            }
        }

        // merging
        for (var i in object2) {
            if (object2.hasOwnProperty(i)) {
                if (typeof object2[i] == 'object') {
                    result[i] = this.mergeObjects(result[i], object2[i]);
                } 
                else {
                    result[i] = object2[i];
                }
            }
        }

        return result;
    };
  
    /**
     * A simple ajax method to make GET and POST calls.
     *
     * @method ajax
     * @param {Object} An object of parameters.
     * @exemple 
     *     parameters {
     *       url: "your_url.php",
     *       async: true,
     *       method: "POST",
     *       params: "id=25&age=45",
     *       callback: function (response) { }
     *     }; 
     */
    this.ajax = function (parameters) {
        var url = parameters.url;
        var method = parameters.method || "GET";
        var params = parameters.params || "";
        var callback = parameters.success || null;
	    var async = (typeof(parameters.async) != "undefined") ? parameters.async : true;
        var xhr = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

        if (method == "POST") {
            xhr.open("POST", url, async);

            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.setRequestHeader("Content-length", params.length);
            xhr.setRequestHeader("Connection", "close");

            xhr.onreadystatechange = function() {
            	if(xhr.readyState == 4 && xhr.status == 200) {
                    if (callback != null) {
                        callback(xhr.responseText);
                    }
                }
            };
            xhr.send(params);
        }
        else {
            var finalUrl = params != "" ? url + "?" + params : url;
            xhr.open("GET", finalUrl, async);

            xhr.onreadystatechange = function() { 
                if (xhr.readyState == 4) {
                    if (callback != null) {
                        callback(xhr.responseText);
                    }
                }    
            };
            xhr.send(null);
        }
    };

    /**
     * Load a css file and add it in the head tag.
     *
     * @method loadCSS
     * @param {String} The path of the css file.
     * @param {Object} An object of paramaters for configure the tag.
     */
    this.loadCSS = function (path, params) {
        var link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("type", "text/css");
        link.setAttribute("href", path);

        if (typeof (params) == "object") {
            for (var i in params) {
                link.setAttribute(i, params[i]);
            }
        }

        document.getElementsByTagName("head")[0].appendChild(link);
    };

    /**
     * Load a JavaScript file and add it at the end of the body
     *
     * @method loadCSS
     * @param {String} The path of the css file
     * @param {Object} An object of paramaters for configure the tag
     */
    this.loadJavaScript = function (path, params) {
        var js = document.createElement("script");
        js.setAttribute("src", path);

        if (typeof (params) == "object") {
            for (var i in params) {
                js.setAttribute(i, params[i]);
            }
        }

        document.getElementsByTagName("body")[0].appendChild(js);
    };
  
    /**
     * Test if an object is in an array
     *
     * @method inArray
     * @param {Object} An object (can be a string, number, object)
     * @param {Array} An array of element
     * @return {Boolean} True if the searched element is in the array then false
     */
    this.inArray = function (search, array) {
        return (array.indexOf(search) > -1);
    };

    /**
     * Clone an array.
     *
     * @method arrayClone
     * @param {Array} array The array to clone
     * @return {Array} The new array
     */
    this.arrayClone(array) {
        var newArray = [];
        for (i=0 ; i<array.length ; i++) {
            newArray[i] = array[i];
        }
        return newArray;
    }

    /**
     * Inserts an object in a sorted array
     *
     * @method insertSorted
     * @param {Object} An object (can be a string, number, object)
     * @param {Function} The sorting function, same arguments and return values as in array.sort 
     * @param {Array} An array of element
     * @return {Array} array in input
     */
    this.insertSorted = function(element, sortfunction, array) {
        var current = 0;
        if (array.length == 0) {
            array.push(element);
        }
        else { 
            while (current < array.length && sortfunction(element, array[current]) > 0) {
                current++;
            }

            array.splice(current,0,element);
        }

        return array;
    };

    /**
     * Gets elements by class name (alias to document.getElementsByClassName)
     *
     * @method getByClass
     * @param {String} Class of elements
     * @return {Array} An array of DOM elements with this class name
     */
    this.getByClass = function (className) {
        return document.getElementsByClassName(className);
    };

    /**
     * Gets elements by tag name (alias to document.getElementsByTagName)
     *
     * @method getByTag
     * @param {String} Tag to search
     * @return {Array} An array of DOM elements with this tag name
     */
    this.getByTag = function (tagName) {
        return document.getElementsByTagName(tagName);
    };

    /**
     * Gets an element by its id (alias to document.getElementById)
     *
     * @method getById
     * @param {String} Id of the element
     * @return {DOMElement} The DOM element with the specified id
     */
    this.getById = function (id) {
        return document.getElementById(id);
    };
  
    /**
     * Gets if an element is defined (alias to typeof(element) != "undefined")
     *
     * @method idDef
     * @param {DOMElement} A DOM element
     * @return {Boolean} True if defined then false
     */
    this.isDef = function (element) {
        return typeof element != "undefined";
    };

    return this;
})();
