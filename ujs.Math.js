var ujs = window.ujs || {};
ujs.Math = ujs.Math || {};

(function () {

  // Obtient un nombre aléatoire compris entre min et max
  ujs.Math.getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Obtient une valeur comprise dans un interval
  ujs.Math.clamp = function (value, min, max) {

    if (value < min) {
      return min;
    }
    else if (value > max) {
      return max;
    }

    return value;
  };

  // Obtient une interpolation linéaire entre 2 valeurs
  ujs.Math.lerp = function (value1, value2, amount) {
    amount = amount < 0 ? 0 : amount;
    amount = amount > 1 ? 1 : amount;
    return value1 + (value2 - value1) * amount;
  }
})();