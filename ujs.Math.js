/**
 * @module ujs
 * @submodule Math
 */

/**
 * @class Math
 */
module.exports = {
    /**
     * Gets a random integer between min and max.
     *
     * @method getRandomInt
     * @param min Minimum value.
     * @param max Maximum value.
     * @return An integer between min and max.
     */
    getRandomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    /**
     * Gets a value between min and max.
     *
     * @method clamp
     * @return Value between min and max.
     */
    clamp: function(value, min, max) {
        if (value < min) {
            return min;
        } else if (value > max) {
            return max;
        }

        return value;
    },

    /**
     * Interpolates between value1 and value2 by amount.
     *
     * @method lerp
     * @param {Number} value1 Start value.
     * @param {Number} value2 End value.
     * @param {Number} amount Value between 0 and 1 indicating the weight of value2.
     * @return {Number} Interpolated value.
     */
    lerp: function(value1, value2, amount) {
        amount = amount < 0 ? 0 : amount;
        amount = amount > 1 ? 1 : amount;
        return value1 + (value2 - value1) * amount;
    },

    /**
     * Gets the sign of a number
     *
     * @method sign
     * @return {Number} Return 1 if the parameter is positive, otherwise return -1.
     */
    sign: function(x) {
        return x < 0 ? -1 : 1;
    }
};