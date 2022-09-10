const autofrefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
	plugins: [
	autofrefixer,
	cssnano({preset: 'default'})
	]
};