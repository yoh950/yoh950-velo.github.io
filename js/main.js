class Main {
    constructor() {
        //diaporama

        var tblImage = ["images/1.jpg", "images/2.jpg", "images/3.jpg", "images/4.jpg", "images/5.jpg"];
        var tblText = ["Bienvenue dans votre nouveau site de réservation de vélo", "Cliquez sur la station où vous souhaitez louer votre vélo", "Veuillez indiquer votre nom et prénom", "Signer, vous avez 20 minutes pour aller chercher votre vélo", "Profité des routes et du geste que vous avez fait pour la planète"];
        var slider = new Diaporama(tblImage, tblText, txtSlide, imgSlide);

        slider.show();

        var prev = document.getElementById('pre');
        prev.addEventListener('click', function () {
            slider.back();
        });
        var nxt = document.getElementById('next');
        nxt.addEventListener('click', function () {
            slider.next();
        });

        document.addEventListener('keydown', function (event) {
            const key = event.key;
            if (key == "ArrowRight") {
                slider.next();
            } else if (key == "ArrowLeft") {
                slider.back();
            }
        });

        let nTimer = setInterval(() =>{
            slider.next();
        }, 5000);

        var play = document.getElementById('play');
        var pause = document.getElementById('pause');
        play.style.display = "none";

        pause.addEventListener('click', function () {
            pause.style.display = "none";
            play.style.display = "block";
            clearInterval(nTimer);
        });

        play.addEventListener('click', function () {
            play.style.display = "none";
            pause.style.display = "block";
            nTimer = setInterval(function () {
                slider.next();
            }, 5000);;
        });

        //map

        var mapStation = new createMap(49.0362434387207, 2.0800890922546387, 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', 20, 11, 'map',
            "stationName", "stationAddress", "bike", "formulaire", "name", "freeStand");
        mapStation.viewMap();
        mapStation.showMarker();

        //formulaire

        var firstName = document.getElementById('fName');
        var reservname = document.getElementById('name');
        var validation = document.getElementById('valider');
        var timer = document.getElementById('timeR');
        var namer = document.getElementById('nameR');
        var theSame = false;

        validation.addEventListener('click', function (e) {
            e.preventDefault();
                if (reservname.value.length > 2 && firstName.value.length > 2) {
                    sign.style.display = 'table-caption';
                    valid.style.display = "none";
                    cor.style.display = "none";
                    localStorage.nom = reservname.value;
                    localStorage.prenom = fName.value;
                } else {
                    alert("Veuillez remplir tous les champs svp");
                }
            

        });

        //canvas

        var canvas = document.querySelector("canvas");
        var signcanvas = new Canvas("2d", canvas, false, localStorage.nom, 'signer')
        signcanvas.ctx();
        var sign = document.getElementById("signer");
        var valid = document.getElementById("valid");
        var cor = document.getElementById("correction");
        sign.style.display = "none";
        signcanvas.signature();

        document.getElementById('signer').addEventListener('mousedown', e => {
            signcanvas.x = e.offsetX;
            signcanvas.y = e.offsetY;
            signcanvas.draw = true;
            valid.style.display = "initial";
            cor.style.display = "initial";
        });

        document.getElementById('signer').addEventListener('mousemove', e => {
            var rect = sign.getBoundingClientRect();
            if (signcanvas.draw == true) {
                signcanvas.x2 = e.offsetX;
                signcanvas.y2 = e.offsetY;
                signcanvas.drawLine(signcanvas.x, signcanvas.y, signcanvas.x2, signcanvas.y2);
                signcanvas.x = signcanvas.x2;
                signcanvas.y = signcanvas.y2;
            }
        });

        document.getElementById('signer').addEventListener('mouseup', e => {
            if (signcanvas.draw == true) {
                signcanvas.x2 = e.offsetX;
                signcanvas.y2 = e.offsetY;
                signcanvas.drawLine(signcanvas.x, signcanvas.y, signcanvas.x2, signcanvas.y2)
                signcanvas.x = 0;
                signcanvas.y = 0;
                signcanvas.draw = false;
            }
        });

        var x = 0;
        var y = 0;
        var draw = false;
        document.getElementById('signer').addEventListener("touchstart", function (e) {
            var rect = canvas.getBoundingClientRect();
            signcanvas.x = e.touches[0].clientX - rect.left;
            signcanvas.y = e.touches[0].clientY - rect.top;
            draw = true;
            valid.style.display = "initial";
            cor.style.display = "initial";
        }, false);
        document.getElementById('signer').addEventListener("touchend", function (e) {
            var rect = canvas.getBoundingClientRect();
            if (signcanvas.draw == true) {
                signcanvas.x2 = e.touches[0];
                signcanvas.y2 = e.touches[0];
                signcanvas.drawLine(signcanvas.x, signcanvas.y, signcanvas.x2, signcanvas.y2)
                signcanvas.x = e.touches[0];
                signcanvas.y = e.touches[0];
                signcanvas.draw = false;
            }
        }, false);

        sign.addEventListener("touchmove", function (e) {
            var rect = canvas.getBoundingClientRect();
            var touch = e.touches[0];
            signcanvas.x2 = touch.clientX - rect.left;
            signcanvas.y2 = touch.clientY - rect.top;
            signcanvas.drawLine(signcanvas.x, signcanvas.y, signcanvas.x2, signcanvas.y2)
            signcanvas.x = signcanvas.x2;
            signcanvas.y = signcanvas.y2;
        }, false);

        //réservation

        var timeres = new Timer(20, 0, 'timeR');
        sessionStorage.defaultMin = timeres.minutes;
        sessionStorage.defaultSec = timeres.secondes;
        valid.addEventListener('click', function () {
            sign.style.display = "none";
            valid.style.display = "none";
            cor.style.display = "none";
            clearInterval(timeres.temps);
            timeres.temps = setInterval(function () {
                timeres.time()
            }, 1000);
            nameR.textContent = "Monsieur " + localStorage.nom + " a reservé un vélo à " + sessionStorage.station + " , votre réservation expire dans :";
            if (validation.addEventListener('click', function (e) {
                e.preventDefault();
                valid.addEventListener('click', function () {
                    timeres.minutes = sessionStorage.defaultMin;
                    timeres.secondes = sessionStorage.defaultSec;
                    clearInterval(timeres.temps);
                    timeres.temps = setInterval(function () {
                        timeres.time()
                    }, 1000);
                });
            }));
        });

        cor.addEventListener('click', function () {
            signcanvas.clear();
            valid.style.display = "none";
            cor.style.display = "none";
        });
        if (document.location.reload) {
            if (sessionStorage.reservationMin < sessionStorage.defaultMin || sessionStorage.reservationSec < sessionStorage.defaultSec) {
                nameR.textContent = "Monsieur " + localStorage.nom + " a réservé un vélo à " + sessionStorage.station + " , votre réservation expire dans :";
                timeres.timeReservation();
                timeres.temps = setInterval(function () {
                    timeres.time()
                }, 1000);
                if (validation.addEventListener('click', function (e) {
                    e.preventDefault();
                    valid.addEventListener('click', function () {
                        timeres.minutes = sessionStorage.defaultMin;
                        timeres.secondes = sessionStorage.defaultSec;
                        clearInterval(timeres.temps);
                        timeres.temps = setInterval(function () {
                            timeres.time()
                        }, 1000);
                    });
                }));
            }
        }
    }
}
let monMain = new Main();
