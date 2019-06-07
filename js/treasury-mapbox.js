
mapboxgl.accessToken = '<YOUR_MAPBOX_ACCESS_TOKEN>';

var initialStyle = 'mapbox://styles/treasuryoflives/cjrghwm5q0tl62sogcn3eig71?fresh=true';

var zoomThreshold = {
    communities: 5,
    mountains: 5,
    lakes: 5,
    countySeats: 5,
    folkRegions: 1
};

var layout = {
    communities: {
        "visibility": "none",
        "icon-image": "dot-9",
        "icon-size": 1,
        "icon-padding": 1,
        "text-size": 12.5,
        "text-padding": [
            "interpolate",
            ["linear"],
            ["zoom"],
            0,
            1.75,
            8,
            .75,
            12,
            0.25
        ],
        "text-field": "{map_display_name}",
        "text-line-height": .9,
        "text-max-width": 7,
        "text-font": [
            "Overpass Light",
            "Arial Unicode MS Regular"
        ],
        "text-anchor": "top-left",
        "text-justify": "left",
        "icon-optional": true,
    },
    searchResults: {
        "visibility": "none",
        "icon-image": "dot-9",
        "icon-size": .9,
        "icon-padding": 1,
        "text-size": 12.5,
        "text-field": "{map_display_name}",
        "text-line-height": .9,
        "text-max-width": 7,
        "text-font": [
            "Overpass SemiBold",
            "Arial Unicode MS Regular"
        ],
        "text-anchor": "top-left",
        "text-justify": "left",
        "text-padding": .75,
    },
    countySeats: {
        "visibility": "none",
        "text-size": [
            "step",
            ["zoom"],
            13,
            10,
            0
        ],
        "text-field": "{label}",
        "text-line-height": 1,
        "text-transform": "none",
        "text-font": [
            "Overpass SemiBold",
            "Arial Unicode MS Regular"
        ],
        "text-anchor": "bottom-right",
        "text-justify": "left",
        "text-padding": [
            "interpolate",
            ["linear"],
            ["zoom"],
            0,
            1.75,
            8,
            1,
            12,
            0.5,
            13,
            0
        ],
        "icon-optional": true,
        "icon-image": [
            "step",
            ["zoom"],
            "border-dot-13",
            9,
            ""
        ],
        "icon-size": .75,
    },
    folkRegions1: {
        "text-size": [
            "step",
            ["zoom"],
            22,
            5,
            21,
            6,
            0
        ],
        "text-field": "{label}",
        "text-line-height": 1,
        "text-transform": "uppercase",
        "text-font": [
            "Overpass Black",
            "Arial Unicode MS Regular"
        ],
        "text-anchor": "center",
        "text-justify": "center",
    },
    folkRegions2: {
        "text-size": [
            "step",
            ["zoom"],
            18,
            5,
            19,
            6,
            0
        ],
        "text-padding": [
            "interpolate",
            ["linear"],
            ["zoom"],
            0,
            2,
            7,
            1
        ],
        "text-field": "{label}",
        "text-line-height": 1,
        "text-transform": "uppercase",
        "text-font": [
            "Overpass SemiBold Italic",
            "Arial Unicode MS Regular"
        ],
        "text-anchor": "center",
        "text-justify": "center",
        "text-max-width": 10
    },
    folkRegions3: {
        "text-size": [
            "step",
            ["zoom"],
            13.5,
            6,
            15.5,
            9,
            0
        ],
        "text-padding": [
            "interpolate",
        ["linear"],
        ["zoom"],
        0,
        2,
        9,
            .75
        ],
        "text-field": "{label}",
        "text-line-height": 1,
        "text-transform": "uppercase",
        "text-font": [
            "Overpass ExtraLight Italic",
            "Arial Unicode MS Regular"
        ],
        "text-anchor": "center",
        "text-justify": "center",
        "text-max-width": 5.5
    }
};

var paint = {
    countySeats: {
        "text-color": "#222222",
        "text-halo-color": "#fdfdf1",
        "text-halo-width": 1,
        "text-halo-blur": 1,

    },
    searchResults: {
        "text-color": "#8a0a0a",
        "text-halo-width": 1,
        "text-halo-color": "#fdfdf1"

    },
    communities: {
        "text-color": "#2c1402",
        "text-halo-color": "#fdfdf1",
        "text-halo-width": .7,
        "text-halo-blur": .7,
    },
    folkRegions1: {
        "text-color": "hsl(348, 2%, 31%)",
        "text-halo-color": "#fdfdf1",
        "text-halo-width": 1
    },
    folkRegions2: {
        "text-color": "#625b5b",
        "text-halo-color": "#fdfdf1",
        "text-halo-width": 1
    },
    folkRegions3: {
        "text-color": "hsl(348, 2%, 31%)",
        "text-halo-color": "#fdfdf1",
        "text-halo-width": 1
    }
};

var map = initMap();
var vmLayersToggle = initLayersToggle();
addFeatureLayers();
bindUserEvents();
// vm is a Vue instance and we need to be able to access it to open the modal and populate it
var vm = initModal();

function initMap() {

    var map = new mapboxgl.Map({
        container: 'map',
        style: initialStyle,
        center: [92.210260, 31.823679],
        zoom: 5,
        hash: true,
        maxZoom: 18.5,
        minZoom: 1.75,
    });
    map.addControl(new mapboxgl.NavigationControl());

    var scaleI = new mapboxgl.ScaleControl({
        maxWidth: 100,
        unit: 'imperial'
    });
    map.addControl(scaleI);

    var scaleM = new mapboxgl.ScaleControl({
        maxWidth: 100,
        unit: 'metric'
    });
    map.addControl(scaleM);

    return map;
}

function addCountySeats() {
    map.addSource('county-seats', {
        type: 'geojson',
        data: countySeats
    });

    map.addLayer({
        "id": "countySeats",
        "type": "symbol",
        "source": 'county-seats',
        "layout": layout.countySeats,
        "paint": paint.countySeats
    });
}

function addSearchResults() {
    map.addLayer({
        "id": "searchResults",
        "type": "symbol",
        "source": "communities",
        "layout": layout.searchResults,
        "paint": paint.searchResults
    });
}

function addCommunities() {
    map.addSource('communities', {
        type: 'geojson',
        data: {
            "type": "FeatureCollection",
            "crs": {
                "type": "name",
                "properties": {
                    "name": "urn:ogc:def:crs:OGC:1.3:CRS84"
                }
            },
            features: communities.features.filter(function (community) {
                return !(['mountains', 'lakes'].indexOf(community.properties.feature_category) > -1);
            })
        }
    });

    map.addSource('mountains', {
        type: 'geojson',
        data: {
            "type": "FeatureCollection",
            "crs": {
                "type": "name",
                "properties": {
                    "name": "urn:ogc:def:crs:OGC:1.3:CRS84"
                }
            },
            features: communities.features.filter(function (community) {
                return community.properties.feature_category == 'mountains';
            })
        }
    });

    map.addSource('lakes', {
        type: 'geojson',
        data: {
            "type": "FeatureCollection",
            "crs": {
                "type": "name",
                "properties": {
                    "name": "urn:ogc:def:crs:OGC:1.3:CRS84"
                }
            },
            features: communities.features.filter(function (community) {
                return community.properties.feature_category == 'lakes';
            })
        }
    });

    // monasteries
    map.addLayer({
        "id": "communities",
        "type": "symbol",
        "source": 'communities',
        "layout": layout.communities,
        "paint": paint.communities
    });

    // mountains
    map.addLayer({
        "id": "mountains",
        "type": "symbol",
        "source": 'mountains',
        "layout": layout.communities,
        "paint": paint.communities
    });
    map.setLayoutProperty('mountains', 'icon-image', 'mountain-11');
    map.setLayoutProperty('mountains', 'icon-size', 1);

    // lakes
    map.addLayer({
        "id": "lakes",
        "type": "symbol",
        "source": 'lakes',
        "layout": layout.communities,
        "paint": paint.communities
    });
    map.setLayoutProperty('lakes', 'icon-image', 'none');
}

function addFolkRegions() {
    map.addSource('folk-regions', {
        type: 'geojson',
        data: folkRegions
    });

    map.addLayer({
        "id": "folkRegions3",
        "type": "symbol",
        "source": 'folk-regions',
        "layout": layout.folkRegions3,
        "paint": paint.folkRegions3
    });
    var filteredRegions3 = folkRegions.features.filter(function (feature) {
        return feature.properties.map_priority_level_id >= 3;
    });
    map.setFilter('folkRegions3', ['match', ['get', 'label'], filteredRegions3.map(function (feature) {
        return feature.properties.label;
    }), true, false]);

    map.addLayer({
        "id": "folkRegions2",
        "type": "symbol",
        "source": 'folk-regions',
        "layout": layout.folkRegions2,
        "paint": paint.folkRegions2
    });
    var filteredRegions2 = folkRegions.features.filter(function (feature) {
        return feature.properties.map_priority_level_id == 2;
    });
    map.setFilter('folkRegions2', ['match', ['get', 'label'], filteredRegions2.map(function (feature) {
        return feature.properties.label;
    }), true, false]);

    map.addLayer({
        "id": "folkRegions1",
        "type": "symbol",
        "source": 'folk-regions',
        "layout": layout.folkRegions1,
        "paint": paint.folkRegions1
    });
    var filteredRegions1 = folkRegions.features.filter(function (feature) {
        return feature.properties.map_priority_level_id == 1;
    });
    map.setFilter('folkRegions1', ['match', ['get', 'label'], filteredRegions1.map(function (feature) {
        return feature.properties.label;
    }), true, false]);
}

function addFeatureLayers() {
    map.on('load', function () {
        $('#map_loading_image').hide();
        addCommunities();
        addCountySeats();
        addFolkRegions();
        addSearchResults();

        // run the toggle methods when we load the page in case we happen to be zoomed-in via URL param
        vmLayersToggle.toggleLayer('communities');
        vmLayersToggle.toggleLayer('countySeats');
    });
}

function bindUserEvents() {
    map.on("mousemove", "communities", function (e) {
        document.getElementsByClassName('mapboxgl-canvas')[0].style.cursor = 'pointer';
    });

    map.on("mouseleave", "communities", function (e) {
        document.getElementsByClassName('mapboxgl-canvas')[0].style.cursor = 'grab';
    });

    map.on('click', "communities", function (e) {
        // don't bubble up to document because that will try to close the modal
        e.originalEvent.cancelBubble = true;
        var geoJSON = e.features[0].properties;
        showModal(geoJSON);
    });

    map.on("mousemove", "searchResults", function (e) {
        document.getElementsByClassName('mapboxgl-canvas')[0].style.cursor = 'pointer';
    });

    map.on("mouseleave", "searchResults", function (e) {
        document.getElementsByClassName('mapboxgl-canvas')[0].style.cursor = 'grab';
    });

    map.on('click', "searchResults", function (e) {
        // don't bubble up to document because that will try to close the modal
        e.originalEvent.cancelBubble = true;
        var geoJSON = e.features[0].properties;
        showModal(geoJSON);
    });

    map.on("mousemove", "mountains", function (e) {
        document.getElementsByClassName('mapboxgl-canvas')[0].style.cursor = 'pointer';
    });

    map.on("mouseleave", "mountains", function (e) {
        document.getElementsByClassName('mapboxgl-canvas')[0].style.cursor = 'grab';
    });

    map.on('click', "mountains", function (e) {
        // don't bubble up to document because that will try to close the modal
        e.originalEvent.cancelBubble = true;
        var geoJSON = e.features[0].properties;
        showModal(geoJSON);
    });

    map.on("mousemove", "lakes", function (e) {
        document.getElementsByClassName('mapboxgl-canvas')[0].style.cursor = 'pointer';
    });

    map.on("mouseleave", "lakes", function (e) {
        document.getElementsByClassName('mapboxgl-canvas')[0].style.cursor = 'grab';
    });

    map.on('click', "lakes", function (e) {
        // don't bubble up to document because that will try to close the modal
        e.originalEvent.cancelBubble = true;
        var geoJSON = e.features[0].properties;
        showModal(geoJSON);
    });

    // need to get these zoom levels corrected
    map.on('zoomend', function (e) {
        var zoom = map.getZoom();
        if (zoom > zoomThreshold.countySeats && vmLayersToggle.countySeats) {
            map.setLayoutProperty('countySeats', 'visibility', 'visible');
        }
        else {
            map.setLayoutProperty('countySeats', 'visibility', 'none');
        }

        if (zoom > zoomThreshold.communities) {
            map.setLayoutProperty('communities', 'visibility', 'visible');
        }
        else {
            map.setLayoutProperty('communities', 'visibility', 'none');
        }

        if (zoom > zoomThreshold.mountains && vmLayersToggle.features.mountains) {
            map.setLayoutProperty('mountains', 'visibility', 'visible');
        }
        else {
            map.setLayoutProperty('mountains', 'visibility', 'none');
        }

        if (zoom > zoomThreshold.lakes && vmLayersToggle.features.lakes) {
            map.setLayoutProperty('lakes', 'visibility', 'visible');
        }
        else {
            map.setLayoutProperty('lakes', 'visibility', 'none');
        }
    });
}

function isInZoomRange(feature) {
    var zoom = map.getZoom();
    return feature.properties.zoom_min <= zoom && zoom <= +feature.properties.zoom_max;
}

function showModal(geoJsonCommunity) {
    $.getJSON('https://treasuryoflives.org/api/place/' + geoJsonCommunity.community_id)
        .then(function (res) {
            // merge the data we already have with the data we just fetched
            var community = Object.assign(geoJsonCommunity, res.community);
            if (currentLanguage() != 'English') {
                community.community_name = geoJsonCommunity.wylie_name_script;
            }
            if (community.tbrc_id == "null") {
                // mapbox converts null to "null"
                community.tbrc_id = '';
            }
            vm.community = community;
            vm.showModal = true;
        });
}

function currentLanguage() {
    if (document.getElementById('toggleLang').innerText == 'English') {
        return 'བོད་ཡིག';
    }
    return 'English';
}

function toggleLanguage() {
    if (currentLanguage() != 'English') {
        var layerIds = ['communities', 'countySeats', 'folkRegions1', 'folkRegions2', 'folkRegions3', 'searchResults'];
        layerIds.forEach(function (layerId) {
            map.setLayoutProperty(layerId, 'text-field', layout[layerId]['text-field']);
            map.setLayoutProperty(layerId, 'text-font', layout[layerId]['text-font']);
            map.setLayoutProperty(layerId, 'text-size', layout[layerId]['text-size']);
        });
        return document.getElementById('toggleLang').innerText = 'བོད་ཡིག';
    }
    map.setLayoutProperty('communities', 'text-field', '{map_display_name_script}');
    map.setLayoutProperty('communities', 'text-font', ["Tibetan Machine Uni Regular"]);
    map.setLayoutProperty('communities', 'text-size', 16);

    map.setLayoutProperty('mountains', 'text-field', '{map_display_name_script}');
    map.setLayoutProperty('mountains', 'text-font', ["Tibetan Machine Uni Regular"]);
    map.setLayoutProperty('mountains', 'text-size', 16);

    map.setLayoutProperty('lakes', 'text-field', '{map_display_name_script}');
    map.setLayoutProperty('lakes', 'text-font', ["Tibetan Machine Uni Regular"]);
    map.setLayoutProperty('lakes', 'text-size', 16);

    map.setLayoutProperty('searchResults', 'text-field', '{map_display_name_script}');
    map.setLayoutProperty('searchResults', 'text-font', ["Tibetan Machine Uni Regular"]);
    map.setLayoutProperty('searchResults', 'text-size', 16);

    map.setLayoutProperty('countySeats', 'text-field', '{wylie_script}');
    map.setLayoutProperty('countySeats', 'text-font', ["Tibetan Machine Uni Regular"]);
    map.setLayoutProperty('countySeats', 'text-size', 16);

    map.setLayoutProperty('folkRegions1', 'text-field', '{wylie_script}');
    map.setLayoutProperty('folkRegions1', 'text-font', ["Tibetan Machine Uni Regular"]);
    map.setLayoutProperty('folkRegions1', 'text-size', 30);

    map.setLayoutProperty('folkRegions2', 'text-field', '{wylie_script}');
    map.setLayoutProperty('folkRegions2', 'text-font', ["Tibetan Machine Uni Regular"]);
    map.setLayoutProperty('folkRegions2', 'text-size', 27);

    map.setLayoutProperty('folkRegions3', 'text-field', '{wylie_script}');
    map.setLayoutProperty('folkRegions3', 'text-font', ["Tibetan Machine Uni Regular"]);
    map.setLayoutProperty('folkRegions3', 'text-size', 22);

    return document.getElementById('toggleLang').innerText = 'English';
}

function normalize(string) {
    if (!string) {
        return '';
    }
    return string.trim().toLowerCase();
}

function isMatchFeature(terms, feature) {
    var name = normalize(feature.properties.community_name);
    var wylieName = normalize(feature.properties.wylie_name);
    var wylieNameScript = feature.properties.wylie_name_script;
    var chineseName = feature.properties.chinese_name;
    var nameVariants = normalize(feature.properties.name_variants);
    var tbrcId = normalize(feature.properties.tbrc_id);
    var pNums = normalize(feature.properties.p_nums).split(',');
    var founder = normalize(feature.properties.founder_tbrc_rid).split(',');
    var cat = feature.properties.feature_category;
    var catEnabled = !cat || vmLayersToggle.features[cat];
    return catEnabled && (
        name.indexOf(terms) > -1 ||
        wylieName && wylieName.indexOf(terms) > -1 ||
        wylieName && wylieNameScript.indexOf(terms) > -1 ||
        chineseName && chineseName.indexOf(terms) > -1 ||
        nameVariants && nameVariants.indexOf(terms) > -1 ||
        pNums && pNums.indexOf(terms) > -1 ||
        founder && founder.indexOf(terms) > -1 ||
        tbrcId == terms
    );
}

function searchMap() {
    var terms = document.getElementById('search_terms').value;
    // ignore the word "monastery" in searches since it's removed from many feature names
    terms = normalize(terms).replace('monastery', '');

    if (!terms) {
        map.setFilter('searchResults'); // clear filter
        return;
    }

    var filteredCommunities = communities.features.filter(function (feature) {
        return isMatchFeature(terms, feature);
    });

    if (filteredCommunities.length > 0) {
        results = true;
        map.setFilter('searchResults', ['match', ['get', 'community_id'], filteredCommunities.map(function (feature) {
            return feature.properties.community_id;
        }), true, false]);
        map.setLayoutProperty('searchResults', 'visibility', 'visible');

        var bounds = new mapboxgl.LngLatBounds();

        filteredCommunities.forEach(function (feature) {
            bounds.extend(feature.geometry.coordinates);
        });

        map.fitBounds(bounds, {
            padding: 150
        });
    }
    else {
        map.setLayoutProperty('searchResults', 'visibility', 'none');
        document.getElementById('no_results').style.display = 'block';
        setTimeout(function () {document.getElementById('no_results').style.display = 'none';}, 3000);
    }
    document.getElementById('clear_search').style.display = 'block';
    return false;
}

function clearSearch() {
    map.setLayoutProperty('searchResults', 'visibility', 'none');
    document.getElementById('search_terms').value = '';
    document.getElementById('clear_search').style.display = 'none';
}

function checkClearedSearch() {
    if (document.getElementById('search_terms').value == '') {
        document.getElementById('clear_search').style.display = 'none';
    }
}

function initModal() {
    $(document).click(function () {
        // any unhandled clicks should close the modal
        vm.showModal = false;
    });

    return new Vue({
        el: '#vue_modal',
        data: {
            community: {},
            showModal: false
        }
    });
}

function initLayersToggle() {
    return new Vue({
        el: '#vue_layers_toggle',
        data: {
            visible: false,
            satellite: false,
            features: {
                hermitages: true,
                monasteries: true,
                stupas: true,
                temples: true,
                manorhouse: true,
                palaces: true,
                governmentbuildings: true,
                lakes: true,
                castles: true,
                mountains: true,
                hospitals: true,
                hiddenvalley: true,
                schools: true
            },
            counts: {
                hermitages: 0,
                monasteries: 0,
                stupas: 0,
                temples: 0,
                manorhouse: 0,
                palaces: 0,
                governmentbuildings: 0,
                lakes: 0,
                castles: 0,
                mountains: 0,
                hospitals: 0,
                hiddenvalley: 0,
                schools: 0
            },
            countySeats: true,
            folkRegions: true
        },
        created: function () {
            var self = this;
            communities.features.forEach(function (community) {
                var cat = community.properties.feature_category;
                if (cat) {
                    self.counts[cat]++;
                }
            });
        },
        computed: {
            allFeaturesChecked: function () {
                var allChecked = true;
                for (var prop in this.features) {
                    if (this.features.hasOwnProperty(prop)) {
                        if (!this.features[prop]) {
                            allChecked = false;
                        }
                    }
                }
                return allChecked;
            }
        },
        methods: {
            setAllFeatures: function (value) {
                for (var prop in this.features) {
                    if (this.features.hasOwnProperty(prop)) {
                        this.features[prop] = value;
                    }
                }
            },
            toggleAllFeatures: function () {
                if (this.allFeaturesChecked) {
                    this.setAllFeatures(false);
                }
                else {
                    this.setAllFeatures(true);
                }
                this.refreshFeatures();
            },
            refreshFeatures: function () {
                this.toggleMountainsAndLakes();

                var terms = document.getElementById('search_terms').value;
                if (terms) {
                    searchMap();
                }

                var filteredCommunities = communities.features.filter(function (feature) {
                    var cat = feature.properties.feature_category;
                    return !cat || ['mountains', 'lakes'].indexOf(cat) == -1 && vmLayersToggle.features[cat];
                });
                map.setFilter('communities', ['match', ['get', 'community_id'], filteredCommunities.map(function (feature) {
                    return feature.properties.community_id;
                }), true, false]);
            },
            toggleMountainsAndLakes: function () {
                if (this.features.lakes) {
                    var zoom = map.getZoom();
                    if (zoom > zoomThreshold.lakes) {
                        map.setLayoutProperty('lakes', 'visibility', 'visible');
                    }
                }
                else {
                    map.setLayoutProperty('lakes', 'visibility', 'none');
                }
                if (this.features.mountains) {
                    var zoom = map.getZoom();
                    if (zoom > zoomThreshold.mountains) {
                        map.setLayoutProperty('mountains', 'visibility', 'visible');
                    }
                }
                else {
                    map.setLayoutProperty('mountains', 'visibility', 'none');
                }
            },
            toggleLayerList: function () {
                this.visible = !this.visible;
            },
            toggleSatellite: function () {
                if (this.satellite) {
                    map.setLayoutProperty('mapbox-satellite', 'visibility', 'visible');
                    map.setPaintProperty('communities', 'text-color', "#ffffff");
                    map.setPaintProperty('mountains', 'text-color', "#ffffff");
                    map.setPaintProperty('lakes', 'text-color', "#ffffff");
                    map.setPaintProperty('countySeats', 'text-color', "hsl(0, 1%, 98%)");
                    map.setPaintProperty('folkRegions1', 'text-color', "#ffffff");
                    map.setPaintProperty('folkRegions2', 'text-color', "#ffffff");
                    map.setPaintProperty('folkRegions3', 'text-color', "#ffffff");

                    map.setPaintProperty('communities', 'text-halo-color', "hsl(0, 0%, 0%)");
                    map.setPaintProperty('mountains', 'text-halo-color', "hsl(0, 0%, 0%)");
                    map.setPaintProperty('lakes', 'text-halo-color', "hsl(0, 0%, 0%)");
                    map.setPaintProperty('countySeats', 'text-halo-color', "hsl(0, 0%, 0%)");
                    map.setPaintProperty('folkRegions1', 'text-halo-color', "hsl(0, 0%, 0%)");
                    map.setPaintProperty('folkRegions2', 'text-halo-color', "hsl(0, 0%, 0%)");
                    map.setPaintProperty('folkRegions3', 'text-halo-color', "hsl(0, 0%, 0%)");

                    map.setPaintProperty('communities', 'text-halo-width', 1);
                    map.setPaintProperty('mountains', 'text-halo-width', 1);
                    map.setPaintProperty('lakes', 'text-halo-width', 1);
                    map.setPaintProperty('countySeats', 'text-halo-width', 1);
                    map.setPaintProperty('folkRegions1', 'text-halo-width', 1);
                    map.setPaintProperty('folkRegions2', 'text-halo-width', 1);
                    map.setPaintProperty('folkRegions3', 'text-halo-width', 1);
                    return;
                }
                map.setLayoutProperty('mapbox-satellite', 'visibility', 'none');
                map.setPaintProperty('communities', 'text-color', paint.communities['text-color']);
                map.setPaintProperty('mountains', 'text-color', paint.communities['text-color']);
                map.setPaintProperty('lakes', 'text-color', paint.communities['text-color']);
                map.setPaintProperty('countySeats', 'text-color', paint.countySeats['text-color']);
                map.setPaintProperty('folkRegions1', 'text-color', paint.folkRegions1['text-color']);
                map.setPaintProperty('folkRegions2', 'text-color', paint.folkRegions2['text-color']);
                map.setPaintProperty('folkRegions3', 'text-color', paint.folkRegions3['text-color']);

                map.setPaintProperty('communities', 'text-halo-color', paint.communities['text-halo-color']);
                map.setPaintProperty('mountains', 'text-halo-color', paint.communities['text-halo-color']);
                map.setPaintProperty('lakes', 'text-halo-color', paint.communities['text-halo-color']);
                map.setPaintProperty('countySeats', 'text-halo-color', paint.countySeats['text-halo-color']);
                map.setPaintProperty('folkRegions1', 'text-halo-color', paint.folkRegions1['text-halo-color']);
                map.setPaintProperty('folkRegions2', 'text-halo-color', paint.folkRegions2['text-halo-color']);
                map.setPaintProperty('folkRegions3', 'text-halo-color', paint.folkRegions3['text-halo-color']);

                map.setPaintProperty('communities', 'text-halo-width', paint.communities['text-halo-width']);
                map.setPaintProperty('mountains', 'text-halo-width', paint.communities['text-halo-width']);
                map.setPaintProperty('lakes', 'text-halo-width', paint.communities['text-halo-width']);
                map.setPaintProperty('countySeats', 'text-halo-width', paint.countySeats['text-halo-width']);
                map.setPaintProperty('folkRegions1', 'text-halo-width', paint.folkRegions1['text-halo-width']);
                map.setPaintProperty('folkRegions2', 'text-halo-width', paint.folkRegions2['text-halo-width']);
                map.setPaintProperty('folkRegions3', 'text-halo-width', paint.folkRegions3['text-halo-width']);
            },
            toggleLayer: function (id) {
                if (this[id]) {
                    var zoom = map.getZoom();
                    if (zoom > zoomThreshold[id]) {
                        if (id == 'folkRegions') {
                            map.setLayoutProperty('folkRegions1', 'visibility', 'visible');
                            map.setLayoutProperty('folkRegions2', 'visibility', 'visible');
                            map.setLayoutProperty('folkRegions3', 'visibility', 'visible');
                        }
                        else {
                            map.setLayoutProperty(id, 'visibility', 'visible');
                        }
                    }
                }
                else {
                    if (id == 'folkRegions') {
                        map.setLayoutProperty('folkRegions1', 'visibility', 'none');
                        map.setLayoutProperty('folkRegions2', 'visibility', 'none');
                        map.setLayoutProperty('folkRegions3', 'visibility', 'none');
                    }
                    else {
                        map.setLayoutProperty(id, 'visibility', 'none');
                    }
                }
            }
        }
    });
}

