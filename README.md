# map
Dynamic map of the Tibetan cultural region rendered with Mapbox GL JS and Vue.js.

![sample image of the map](https://treasuryoflives.org/images/map-gl.png "Treasury of Lives Map")


## Usage
1. Clone or download the repository.
2. Add your Mapbox access token at the top of `js/treasury-mapbox.js` [Read more about access tokens](https://docs.mapbox.com/help/how-mapbox-works/access-tokens/)
3. Open index.html in your browser.

## How does this version differ from the map on treasuryoflives.org?
* No site header
* The data for communities, county seats, and folk regions is sample data and is not guaranteed to be up-to-date or accurate
* When clicking certain features on the map, content for the modal window is loaded via treasuryoflives.org using CORS, but some links in descriptions may be broken due to using relative URLs

