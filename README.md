Microjs 
=======

### 1. Qu'est ce que Microjs ?

Microjs (ujs) est une petite biblioth�que JavaScript qui se veut l�g�re. 
Le but d'ujs est de proposer des fonctionnalit�s minimales mais n�cessaires, lors du d�veloppement d'une application web en JavaScript.

Vous trouverez aussi quelques extensions pour la biblioth�que afin d'�tendre ses fonctionnalit�s.

### 2. Fonctionnalit�s

* D�clanchement manuel d'un �v�nement sur un �l�ment du dom ;
* Ajout/Suppression d'un attribut ;
* Ajout/Suppression d'une classe ;
* Ajout/Suppression d'un style ;
* Ajax Get et Post (non compatible IE8 et inf�rieur) ;
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

#### D�clanchement d'�v�nements

```html
<div id="btnValidate" class="button red">Valider</div>
```

```javascript
// R�cup�ration du bouton
var button = ujs.getById("btnValidate");

// D�clancher l'�venement click
ujs.triggerEvent(button, "click");
```

#### Ajouter / Supprimer une classe

```html
<div id="btnValidate" class="button red">Valider</div>
```

```javascript
// R�cup�ration du bouton
var button = ujs.getById("btnValidate");

// Ajoute la classe selected si elle n'est pas d�j� pr�sente
ujs.addClass(button, "selected");

// Supprime la classe selected si elle est pr�sente
ujs.removeClass(button, "selected");
```

#### Utilisation de la classe ArrayList

```javascript
// nouvelle instance de ArrayList
var list = new ujs.ArrayList(); 

// Ajoute un tableau � la collection
list.add([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

// Ajoute un seul �l�ment � la fin de la collection
list.add(45);

// Supprime l'�l�ment � la position 4
list.removeAt(4);

// Ins�re l'�l�ment 42 � la position 4
list.insertAt(4, 42);

// Boucle sur tous les �l�ments de la collection
list.forEach(function (el) { elements.push(el); });
```

### 4. Licence

Licence MIT, voir le fichier LICENSE pour plus d'information
