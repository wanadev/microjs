Microjs 
=======

### 1. Qu'est ce que Microjs ?

Microjs (ujs) est une petite bibliothèque JavaScript qui se veut légère. 
Le but d'ujs est de proposer des fonctionnalités minimales mais nécessaires, lors du développement d'une application web en JavaScript.

### 2. Fonctionnalités

* Déclanchement manuel d'un évènement sur un élément du dom ;
* Ajout/Suppression d'un attribut ;
* Ajout/Suppression d'une classe ;
* Ajout/Suppression d'un style ;
* Ajax Get et Post (non compatible IE8 et inférieur) ;
* Quelques alias.

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
### 4. Licence

Licence MIT, voir le fichier LICENSE pour plus d'information
