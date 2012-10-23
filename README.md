Microjs 
=======

### 1. Qu'est ce que Microjs ?

Microjs (ujs) est une petite bibliothèque JavaScript qui se veut légère. 
Le but d'ujs est de proposer des fonctionnalités minimales mais nécessaires, lors du développement d'une application web en JavaScript.

Vous trouverez aussi quelques extensions pour la bibliothèque afin d'étendre ses fonctionnalités.

### 2. Fonctionnalités

* Déclanchement manuel d'un évènement sur un élément du dom ;
* Ajout/Suppression d'un attribut ;
* Ajout/Suppression d'une classe ;
* Ajout/Suppression d'un style ;
* Ajax Get et Post (non compatible IE8 et inférieur) ;
* Quelques alias ;
* Objet ArrayList (extension).

### 3. Exemples

#### Ajax

```javascript
ujs.ajax({
  method: "POST",
  url: "traitement.php",
  params: "action=1&user_id=45",
  success: function (response) {
	console.log(response); // retour serveur
  }
});
```

#### Déclanchement d'évènements

```html
<div id="btnValidate" class="button red">Valider</div>
```

```javascript
// Récupération du bouton
var button = ujs.getById("btnValidate");

// Déclancher l'évenement click
ujs.triggerEvent(button, "click");
```

#### Ajouter / Supprimer une classe

```html
<div id="btnValidate" class="button red">Valider</div>
```

```javascript
// Récupération du bouton
var button = ujs.getById("btnValidate");

// Ajoute la classe selected si elle n'est pas déjà présente
ujs.addClass(button, "selected");

// Supprime la classe selected si elle est présente
ujs.removeClass(button, "selected");
```

#### Utilisation de la classe ArrayList

```javascript
// nouvelle instance de ArrayList
var list = new ujs.ArrayList(); 

// Ajoute un tableau à la collection
list.add([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

// Ajoute un seul élément à la fin de la collection
list.add(45);

// Supprime l'élément à la position 4
list.removeAt(4);

// Insère l'élément 42 à la position 4
list.insertAt(4, 42);

// Boucle sur tous les éléments de la collection
list.forEach(function (el) { elements.push(el); });
```

### 4. Licence

Licence MIT, voir le fichier LICENSE pour plus d'information
