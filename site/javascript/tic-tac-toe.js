const ComboVincenti= [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

var img = document.getElementById("img");
let vincitore = document.getElementById('Vincitore');

//creo array dei box per verificare le combo vincenti
var Arrbox=Array.from(document.getElementsByClassName('box'));

//tutto l'array all'inizio è null, quindi i box sono null
let StatoCaselle= [null,null,null,null,null,null,null,null,null];
//Giocatori
const O="O";
const X="X";
//Giocatore iniziale
let Giocatore=X;


function InizioGioco() {
    
    //appena clicchi, parte la funzione boxclicked
    for(j=0;j<Arrbox.length;j++) {
        Arrbox[j].addEventListener('click', CasellaCliccata);
    }

    Turno = document.getElementById("carduser1");
    Turno2 = document.getElementById("carduser2");
    Turno.classList.add('Ombra');
    Turno2.classList.remove('Ombra');
} 

function CasellaCliccata(e) {
    Turno = document.getElementById("carduser1");
    Turno2 = document.getElementById("carduser2");
    //l'id è quello nel file index del box che ha innestato l'evento
    const id = e.target.id; 
    if(!StatoCaselle[id]) {
        StatoCaselle[id]=Giocatore;
        //cambia il valore della casella con quello del current player
        e.target.innerText = Giocatore; 
    
        if(GiocatoreVincente()!=false) {
            //cambia la scritta del popup e mette chi ha vinto
            if (Giocatore==X) vincitore.innerHTML = 'X ha vinto!';
            else vincitore.innerHTML = 'O ha vinto!';   
            openPopup();
            return;
        }
        //cambio il giocatore
        if (Giocatore==X){
        Turno2.classList.add('Ombra');
        Turno.classList.remove('Ombra');
        Giocatore=O;
        }
        else if(Giocatore==O){
        Turno.classList.add('Ombra');
        Turno2.classList.remove('Ombra'); 
        Giocatore=X;
        }
    }

    //controllo di pareggio
    if(GiocatoreVincente()==false) {
        var cont=0;
        for(i=0; i<StatoCaselle.length;i++) {
            if(StatoCaselle[i]==null) cont=1;
        }
        if(cont==0) { 
            //cambia la scritta del popup e mette il pareggio
            vincitore.innerHTML = 'Pareggio!';
            openPopup();
        } 
    }
}

function GiocatoreVincente() {
    for (i=0; i<ComboVincenti.length; i++) {
        var [a, b, c]=ComboVincenti[i];
        //se in StatoCaselle in posizione a,b,c ci sta lo stesso Giocatore allora la combo è vincente
        if(StatoCaselle[a]!=null && (StatoCaselle[a] == StatoCaselle[b] && StatoCaselle[a] == StatoCaselle[c])) { 
            return [a,b,c];
        }
    }
    return false;
}


function Restart() {
    //riporta tutti i valori dell'array a null
    StatoCaselle.fill(null); 
    //Azzeramento delle variabili
    for(i=0;i<Arrbox.length;i++){
        //riporta tutte le caselle vuote
        Arrbox[i].innerText = '';
    }
    //riporta il giocatore iniziale a X
    Giocatore = X; 
    //riporta le caselle di combo di vincita allo stesso colore dello sfondo 
    //box.style.backgroundColor=''; 
}

//inizia il gioco
InizioGioco();


//gestione apertura e chiusura del popup
let popup=document.getElementById("popup");
let Blurred = document.getElementById("PaginaTot");

function openPopup(Giocatore) {
    popup.classList.add("open-popup");
    Blurred.classList.add("Blurra"); 
}

function closePopup(user) {
    popup.classList.remove("open-popup");
    Blurred.classList.remove("Blurra");
    sendResult(user);
    Restart();
}

function sendResult(user){

    if(user != 'NULL'){

        var gameresult = document.getElementById("Vincitore").innerHTML;

        if(gameresult == "X ha vinto!"){

            fetch("/games/result", {
                method: "POST",
                headers: {'Content-Type': 'application/json'}, 
                body: JSON.stringify({
                    'game': 'Tic-Tac-Toe',
                    'user': user,
                    'result': 'win'
                })
            }).then(console.log("Game result sent!"));

        }else if(gameresult == "O ha vinto!"){

            fetch("/games/result", {
                method: "POST",
                headers: {'Content-Type': 'application/json'}, 
                body: JSON.stringify({
                    'game': 'Tic-Tac-Toe',
                    'user': user,
                    'result': 'lose'
                })
            }).then(console.log("Game result sent!"));

        }else if(gameresult == "Pareggio!"){

            fetch("/games/result", {
                method: "POST",
                headers: {'Content-Type': 'application/json'}, 
                body: JSON.stringify({
                    'game': 'Tic-Tac-Toe',
                    'user': user,
                    'result': 'drow'
                })
            }).then(console.log("Game result sent!"));

        }
    }
}         