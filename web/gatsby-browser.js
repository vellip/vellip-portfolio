/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
const parallax = require('./src/lib/parallax')

exports.onPreRouteUpdate = () => {
  parallax.default.remove()
}
