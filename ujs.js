var ujs = window.ujs || {};

(function () {
  var events = [];

  // Déclanche un évènement sur un élèment du dom
  ujs.triggerEvent = function (element, eventName) {
    if ((element[eventName] || false) && typeof element[eventName] == 'function') {
      element[eventName](element);
    }
  };

  // Déclanche un évènement personnalisé sur le document
  // Si l'évènement n'existe pas il est créé.
  ujs.notify = function (name, params) {
    if (typeof (events[name]) != "undefined") {

      var event = events[name];

      if (params instanceof Object) {
        for (var i in params) {
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
  };

  // Ajouter une valeur à un attribut d'un élèment du dom
  ujs.addOnAttribute = function (attribute, element, value) {
    var separator = attribute == "style" ? ";" : " ";

    var content = element.getAttribute(attribute);
    var alreadyHere = false;
    var contentArray = [];

    if (content != null && content != "") {

      contentArray = content.split(separator);

      // A remplacer par un while
      for (var i = 0, l = contentArray.length; i < l; i++) {
        if (contentArray[i] == value) {
          alreadyHere = true;
        }
      }
    }

    if (!alreadyHere) {
      contentArray.push(value);
    }

    element.setAttribute(attribute, contentArray.join(" "));
  };

  // Supprimer une valeur à un attribut d'un élèment du dom
  ujs.removeOnAttribute = function (attribute, element, value) {
    var separator = attribute == "style" ? ";" : " ";

    var content = element.getAttribute(attribute);

    if (content != null && content != "") {
      var contentArray = content.split(separator);
      var size = contentArray.length;
      var finalContent = [];

      for (var i = 0, l = contentArray.length; i < l; i++) {
        if (contentArray[i] != value) finalContent.push(contentArray[i]);
      }

      element.setAttribute(attribute, finalContent.join(separator));
    }
  };

  // Ajouter une classe à une élèment du dom (avec vérification)
  ujs.addClass = function (element, className) {
    this.addOnAttribute("class", element, className);
  };

  // Supprimer une classe à un élèment du dom (avec vérification)
  ujs.removeClass = function (element, className) {
    this.removeOnAttribute("class", element, className);
  };

  // Ajouter un style à un élèment du dom (avec vérification)
  ujs.addStyle = function (element, styleName) {
    this.addOnAttribute("style", element, styleName);
  };

  // Supprimer une classe à un élèment du dom (avec vérification)
  ujs.removeStyle = function (element, styleName) {
    this.removeOnAttribute("style", element, styleName);
  };

  ujs.ajax = function (parameters) {
    var url = parameters.url;
    var method = parameters.method || "GET";
    var params = parameters.params || "";
    var callback = parameters.success || null;

    var xhr = new XMLHttpRequest();

    if (method == "POST") {
      xhr.open("POST", url, true);

      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.setRequestHeader("Content-length", params.length);
      xhr.setRequestHeader("Connection", "close");

      xhr.onreadystatechange = function () {

        if (xhr.readyState == 4 && xhr.status == 200) {
          if (callback != null) {
            callback(xhr.responseText);
          }
        }
      };
      xhr.send(params);
    }
    else {
      xhr.open("GET", url + "?" + params, true);

      xhr.onreadystatechange = function () {

        if (xhr.readyState == 4) {
          if (callback != null) {
            callback(xhr.responseText);
          }
        }
      };
      xhr.send(null);
    }
  };

  // Charge un fichier css dans la balise head
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

  // Charge un fichier javascript et l'ajoute à la fin de la balise body
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

  // Récupère un groupe d'élèment du dom par leur classe
  ujs.getByClass = function (className) {
    return document.getElementsByClassName(className);
  };

  // Récupère un élèment du dom par son Id
  ujs.getById = function (id) {
    return document.getElementById(id);
  };

  // Indique si la propriété est définie
  ujs.isDef = function (element) {
    return typeof element != "undefined";
  };
})();