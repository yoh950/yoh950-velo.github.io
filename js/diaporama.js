class Diaporama {
    constructor(image, texte, idtxt, idimg) {
        this.image = image;
        this.texte = texte;
        this.i = 0;
        this.idtxt = idtxt;
        this.idimg = idimg;
    }
    back() {
        this.i--;
        if (this.i < 0) {
            this.i = this.image.length -1;
        }
        this.idimg.src = this.image[this.i];
        this.idtxt.innerHTML = this.texte[this.i];
    }
    next() {
        this.i++;
        if (this.i > this.image.length - 1) {
            this.i = 0;
        }
        this.idimg.src = this.image[this.i];
        this.idtxt.innerHTML = this.texte[this.i];
        this.idimg.animate([
            { transform: 'translate(-100%)' },
            {transform: 'scale(0.8)'},
            { transform: 'translate(0%)' },
        ], {
                duration: 1000,
        })
    };
    show() {
        this.idimg.src = this.image[this.i];
        this.idtxt.innerHTML = this.texte[this.i];


    }
}