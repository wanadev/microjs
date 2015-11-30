# Microjs
 
## What is microjs?
 
Microjs (ujs) is a lightweight utility library written in JavaScript. The aim is to provide minimal but useful utility features.
There are also a few extensions to extend existing features.
 
## Features
 
* Trigger an event on a `DOMElement`
* Add/Remove attributes
* Add/Remove styles
* Ajax method for `GET` and `POST` (IE9+)
* Some aliases
* [Extension] ArrayList
* [Extension] Dictionary
 
## Examples
 
### Ajax
 
```javascript
ujs.ajax({
  method: "POST",
  url: "process.php",
  params: "action=1&user_id=45",
  success: function (response) {
    console.log(response);
  }
});
```
 
### Trigger events
 
```html
<div id="btnValidate" class="button red">OK</div>
```
 
```javascript
// Gets the button
var button = ujs.getById("btnValidate");
 
// Trigger a click event
ujs.triggerEvent(button, "click");
```
 
### [Extension] The `ArrayList` class
 
```javascript
// Creates a list
var list = new ujs.ArrayList(); 
 
// Adds an array
list.add([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
 
// Adds an element
list.add(45);
 
// Removes the element at the fourth position
list.removeAt(4);
 
// Inserts the element 42 at the fourth position
list.insertAt(4, 42);
 
// Starts a loop on all elements.
list.forEach(function (el) { elements.push(el); });
```
 
### [Extension] The `Dictionary` class
 
```javascript
// Creates the dictionary
var dictionary = new ujs.Dictionary();
 
// Adds an element.
dictionary.add("chat", { name: "Boby", age: 1 });
 
// Creates an array of keys and values.
var keys = ["animaux", "humains", "reptiles"];
var values =  [{ name: "animal", age: 25 }, { name: "humain", age: 48 }, { name: "reptile", age: 18 }];
 
// Adds them.
dictionary.addRange(keys, values);
 
// Removes an element.
dictionary.remove("humains");
 
// Clones the collection.
var dico2 = dictionary.clone();
 
// Edits the element with the key cat
dico2.getElement("cat").foo = "bar";
dico2.getElement("cat").age = 42;
dico2.getElement("cat").name = "Miaou";
dico2.getElement("cat").bar = "foo";
 
// Merges a collection into another.
dico2.merge(dictionary);
```
 
## Build the library
 
Type the following commands to build the library and the documentation:
 
    npm install
    npm run build
 
## Licence
 
MIT Licence, please read the `LICENSE` file for more information.