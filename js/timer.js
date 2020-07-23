class Timer {
    constructor(minutes, secondes, idtime) {
        this.minutes = minutes;
        this.secondes = secondes;
        this.idtime = idtime;
    }
    time() {
        this.secondes--;
        document.getElementById(this.idtime).textContent = this.minutes + " min et " + this.secondes + " secondes";
        if (this.secondes < 0) {
            this.secondes = 59;
            this.minutes--;
            document.getElementById(this.idtime).textContent = this.minutes + " min et " + this.secondes + " secondes";
        } else if (this.minutes == 0 && this.secondes == 0) {
            clearInterval(this.temps);
            document.getElementById(this.idtime).textContent = "expiré";

        } else {
            sessionStorage.reservationMin = this.minutes;
            sessionStorage.reservationSec = this.secondes;
        }            
    }
    timeReservation() {
        if (sessionStorage.reservationMin < this.minutes || sessionStorage.reservationSec < this.secondes) {
            this.minutes = sessionStorage.reservationMin;
            this.secondes = sessionStorage.reservationSec;
            document.getElementById(this.idtime).textContent = this.minutes + " min et " + this.secondes + " secondes";
        }
    }
}