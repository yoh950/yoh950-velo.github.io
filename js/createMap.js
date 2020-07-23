class createMap {
    constructor(latitude, longitude, layer, maxZoom, zoom, idmap, streetMap, showMap, idname, idaddress, idnbbike, infobike, reservationname, freestandbike) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.layer = layer;
        this.maxZoom = maxZoom;
        this.zoom = zoom;
        this.idmap = idmap;
        this.streetMap = streetMap;
        this.showMap = showMap;
        this.idname = idname;
        this.idaddress = idaddress;
        this.idnbbike = idnbbike;
        this.infobike = infobike;
        this.reservationname = reservationname;
        this.freestandbike = freestandbike;
    }
    viewMap() {
        var WorlStreetMap = L.tileLayer(this.layer, { maxZoom: this.maxZoom });
        this.map = L.map(this.idmap, { center: [this.latitude, this.longitude], zoom: this.zoom, layers: [WorlStreetMap] });
    }
    showMarker() {
        var fNameStation = document.getElementById('stationName');
        var nameStation = document.getElementById('stationAddress');
        var numberBike = document.getElementById('bike');
        var infoBike = document.getElementById('formulaire');
        var reservationName = document.getElementById('name');
        var reservation_fName = document.getElementById('fName');
        var freeStandBike = document.getElementById('freeStand');
        var card = document.getElementById('card');

        infoBike.style.display = 'none';
        var freeStandBike = document.getElementById('freeStand');
        var response;
        fetch('https://api.jcdecaux.com/vls/v3/stations?contract=cergy-pontoise&apiKey=0091fe567097c5c00b5908a72dbf0e3f1a2d9ad9')
            .then(response => response.json())
            .then(data => {
                let marker;
                var markers = new L.MarkerClusterGroup();
                for (var i = 0; i < data.length; i++) {
                    marker = new L.marker([data[i].position.latitude, data[i].position.longitude]);
                    marker.number = data[i].number;
                    marker.addEventListener('click', function () {                      
                        fetch('https://api.jcdecaux.com/vls/v3/stations/' + this.number + '?contract=cergy-pontoise&apiKey=0091fe567097c5c00b5908a72dbf0e3f1a2d9ad9')
                            .then(response => response.json())
                            .then(data => {
                                fNameStation.innerHTML = data.name;
                                sessionStorage.station = data.name;
                                nameStation.innerHTML = data.address;
                                numberBike.innerHTML = data.mainStands.availabilities.bikes;
                                freeStandBike.innerHTML = data.mainStands.availabilities.stands;
                                if (data.mainStands.availabilities.bikes == 0) {
                                    infoBike.style.display = 'none';
                                } else if (localStorage.nom != undefined && localStorage.prenom != undefined) {
                                    infoBike.style.display = 'initial';
                                    reservationName.value = localStorage.nom;
                                    reservation_fName.value = localStorage.prenom;
                                } else if (localStorage.nom == undefined && localStorage.prenom == undefined) {
                                    infoBike.style.display = 'initial';
                                    reservationName.value = "";
                                    reservation_fName.value = "";

                                }
                            });
                    })
                    markers.addLayer(marker);
                    this.map.addLayer(markers);
                }
            })
    }
}
      
    
    


