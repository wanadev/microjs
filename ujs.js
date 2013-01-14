/**
 * MicroJS aka ujs class library
 *
 * @module ujs
 * @namespace ujs
 */

var ujs = window.ujs || {};

(function () {
  var events = [];

  /**
   * Trigger an event on a DOM element
   *
   * @method triggerEvent
   * @param {DOMElement} A DOM element
   * @return {Object} The event name
   */
  ujs.triggerEvent = function (element, eventName)
  {
    if ((element[eventName] || false) && typeof element[eventName] == 'function') {
      element[eventName](element);
    }
  };

  /**
   * Trigger an event and notify all subscribers that this event has been triggered
   * If the specified event isn't already created and cached, it's created and cached
   *
   * @method notify
   * @param {String} The event name
   * @return {Object} An object with paramaters (optional)
   */
  ujs.notify = function (name, params) 
  {
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

      return ujs.notify(name, params);
    }
  }

  /**
   * Gets a get parameter from the browser url
   *
   * @method getURLParameter
   * @param {String} Params name
   * @return {String} Get value
   */
  ujs.getURLParameter = function (name) 
  {
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
   * Add a value to an attribute on a DOM element
   *
   * @method addOnAttribute
   * @param {String} The attribute of the element
   * @param {DOMElement} The DOM element
   * @param {String} The value to set in the attribute
   */
  ujs.addOnAttribute = function (attribute, element, value)
  {
    var separator = attribute == "style" ? ";" : " ";
    
    var content = element.getAttribute(attribute);
    var alreadyHere = false;  
    var contentArray = [];
    
    if (content != null && content != "") {
      contentArray = content.split(separator);
      
      // A remplacer par un while
      for (var i = 0, l = contentArray.length; i < l; i++) {
        if (contentArray[i] == value)
          alreadyHere = true;
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
   * @param {String} The attribute of the element
   * @param {DOMElement} The DOM element
   * @param {String} The value to set in the attribute
   */
  ujs.removeOnAttribute = function (attribute, element, value)
  {
    if (typeof(element) != "object")
      return;
      
    var separator = attribute == "style" ? ";" : " ";
    
    var content = element.getAttribute(attribute);
    
    if (content != null && content != "")
    {
      var contentArray = content.split(separator);
      var size = contentArray.length;
      var finalContent = [];
      
      for (var i = 0, l = contentArray.length; i < l; i++)
      {
        if (contentArray[i] != value)
          finalContent.push(contentArray[i]);
      }
      
      element.setAttribute(attribute, finalContent.join(separator));
    }
  };
  
  /**
   * Add a class on a DOM element. If it exists it is not re-added
   *
   * @method addClass
   * @param {DOMElement} The DOM element
   * @param {String} The class name
   */
  ujs.addClass = function (element, className)
  {
    this.addOnAttribute("class", element, className);
  };
   
   /**
   * Remove a class from a DOM element.
   *
   * @method removeClass
   * @param {DOMElement} The DOM element
   * @param {String} The class name
   */
  ujs.removeClass = function (element, className)
  {
    this.removeOnAttribute("class", element, className);
  };
  
  /**
   * Add a style on a DOM element. if it exists it is not re-added.
   *
   * @method addStyle
   * @param {DOMElement} The DOM element
   * @param {String} The style name
   */
  ujs.addStyle = function (element, styleName)
  {
    this.addOnAttribute("style", element, styleName);
  };
  
  /**
   * Remove a style from a DOM element.
   *
   * @method removeStyle
   * @param {DOMElement} The DOM element
   * @param {String} The style name
   */
  ujs.removeStyle = function (element, styleName)
  {
    this.removeOnAttribute("style", element, styleName);
  };

  /**
   * Merge two object in one object
   *
   * @method mergeObjects
   * @param {Object} An object
   * @param {Object} Another object
   * @param {Object} An merged object
   */
  ujs.mergeObjects = function (object1, object2)
  {
    var result = {};

    // Prepare the result var
    for(var i in object1){
      if(object1.hasOwnProperty(i)) {
        result[i] = object1[i];
      }
    }

    // merging
    for (var i in object2) {
      if (object2.hasOwnProperty(i)) {
        if (typeof object2[i] == 'object') {
          result[i] = ujs.mergeObjects(result[i], object2[i]);
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
   * @param {Object} An object of parameters
   *
   * @exemple 
   *     parameters {
   *       url: "you_url.php",
   *       method: "POST",
   *       params: "id=25&age=45",
   *       callback: function (response) { }
   *     }; 
   */
  ujs.ajax = function (parameters)
  {
    var url = parameters.url;
    var method = parameters.method || "GET";
    var params = parameters.params || "";
    var callback = parameters.success || null;
    
    var xhr = new XMLHttpRequest();
    
    if (method == "POST")
    {
      xhr.open("POST", url, true);
    
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.setRequestHeader("Content-length", params.length);
      xhr.setRequestHeader("Connection", "close");
      
      xhr.onreadystatechange = function() 
      {
      	if(xhr.readyState == 4 && xhr.status == 200) {
          if (callback != null)
            callback(xhr.responseText);
        }
      };
      xhr.send(params);
    }
    else {
      var finalUrl = params != "" ? url + "?" + params : url;
      xhr.open("GET", finalUrl, true);

      xhr.onreadystatechange = function() { 
          if(xhr.readyState == 4) {
            if (callback != null)
              callback(xhr.responseText);
          }    
      };
      xhr.send(null);
    }
  };

  /**
   * Load a css file and add it in the head tag
   *
   * @method loadCSS
   * @param {String} The path of the css file
   * @param {Object} An object of paramaters for configure the tag
   */
  ujs.loadCSS = function (path, params) {
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
  ujs.loadJavaScript = function (path, params) {
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
  ujs.inArray = function (search, array) {
    return (array.indexOf(search) > -1);
  };
  
  /**
   * Gets elements by class name (alias to document.getElementsByClassName)
   *
   * @method getByClass
   * @param {String} Class of elements
   * @return {Array} An array of DOM elements with this class name
   */
  ujs.getByClass = function (className)
  {
    return document.getElementsByClassName(className);
  };
  
  /**
   * Gets an element by its id (alias to document.getElementById)
   *
   * @method getById
   * @param {String} Id of the element
   * @return {DOMElement} The DOM element with the specified id
   */
  ujs.getById = function (id)
  {
    return document.getElementById(id);
  };
  
  /**
   * Gets if an element is defined (alias to typeof(element) != "undefined")
   *
   * @method idDef
   * @param {DOMElement} A DOM element
   * @return {Boolean} True if defined then false
   */
  ujs.isDef = function (element)
  {
    return typeof element != "undefined";
  };
})();