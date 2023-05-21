var currentPlayer=1;
var Haivinto=true;
var HaiPareggiato=true;
var DefinitivaRED= false;
var DefinitivaYELLOW=false;
var definitivoP=false;
var VittoriaMezzo = false;
var VittoriaMezzo2=false;



function reset()
{
    
    const ResetBoard = document.querySelectorAll('.Board div');
    for(i = 0; i<42; i++)
    {
        if(ResetBoard[i].classList.contains('Taken')){
        ResetBoard[i].classList.remove('Giocatore1');
        ResetBoard[i].classList.remove('Giocatore2');
        ResetBoard[i].classList.add('base');
        ResetBoard[i].classList.remove('Taken');
        }
    }
    Popup = document.getElementById('popup');
    Blurred = document.getElementById("FullContainer");
    
    Blurred.classList.remove("Blurra");
    Popup.classList.remove('open-popup');
    Popup.classList.add('close-popup');
    
     DefinitivaRED= false;
     DefinitivaYELLOW=false;
     definitivoP=false;
    

}


function ciao(){
    Blurred = document.getElementById("FullContainer");
    Turno = document.getElementById("CU1");
    Turno2 = document.getElementById("CU2");
    Turno.classList.add('Ombra1');
    Turno2.classList.remove('Ombra2');
    
    
const Caselle = document.querySelectorAll('.Board div');
    for(let i= 0;i<Caselle.length;i++){
       Caselle[i].classList.add('base')
        Caselle[i].onclick = () => {
    let j = (i%7);
    let k = 0;
    while(k<=35){
    
        if(Caselle[35+j-k].classList.contains("Taken") ){
            
        }
        else{
            if(currentPlayer==1){
            currentPlayer=0;
            Turno2.classList.add('Ombra2');
            Turno.classList.remove('Ombra1');
            Caselle[35+j-k].classList.remove('base');
            Caselle[35+j-k].classList.add('Giocatore1');
            Caselle[35+j-k].classList.add('Taken')
            //Inizio funzione per il check di vittoria


            //PRIMO CASO:++++++++++++++++++++++++++++++++++++++++
            Haivinto=true;
            if((35+j-k)%7<3){
                if((k/7)>=3){
                //Orizzontale
                for(y=0;y<4;y++){
                    if(Caselle[35+j-k+y].classList.contains('Giocatore1')){}
                    else{Haivinto = false;}}
                    
                if(Haivinto){DefinitivaRED=true;}
                if(verificaRED(Caselle,k,VittoriaMezzo)){DefinitivaRED=true};
                //Verticale
                Haivinto=true;
                for(y=0;y<28;y=y+7){
                    if(Caselle[35+j-k+y].classList.contains('Giocatore1')){}
                    else{Haivinto = false;}}
                
                if(Haivinto){
                    DefinitivaRED=true;
                }
                //Obliquo avanti
                Haivinto=true;
                for(y=0,u=0;y<28;y=y+7,u++){
                    if(Caselle[35+j-k+y+u].classList.contains('Giocatore1')){}
                    else{Haivinto = false;}
                }

                if(Haivinto){
                    DefinitivaRED=true;
                }
                if(verificaObliquaRED(Caselle,VittoriaMezzo)){DefinitivaRED=true;}
            }   

            //SECONDO CASO
            else{
                //Orizzontale
                for(y=0;y<4;y++){
                    if(Caselle[35+j-k+y].classList.contains('Giocatore1')){}
                    else{Haivinto = false;}}
                    
                if(Haivinto){DefinitivaRED=true;}
                if(verificaRED(Caselle,k,VittoriaMezzo)){DefinitivaRED=true};

                //Verticale
                Haivinto=true;
                for(y=0;y<28;y=y+7){
                    if(Caselle[35+j-k-y].classList.contains('Giocatore1')){}
                    else{Haivinto = false;}}

                  
                if(Haivinto){
                    DefinitivaRED=true;
                }
                //obliquo avanti
                u = 0;
                Haivinto=true;
                for(y=0;y<28;y=y+7){
                    if(Caselle[35+j-k-y+u].classList.contains('Giocatore1')){}
                    else{Haivinto = false;}
                    u++;
                }




                if(Haivinto){
                    DefinitivaRED=true;
                }
                if(verificaObliquaRED(Caselle,VittoriaMezzo)){DefinitivaRED=true;}
            }
            }

            // TERZO CASO
            else if((35+j-k)%7==3){
                if((k/7)>=3){
                    
                        //Orizzontale
                        for(y=0;y<4;y++){
                            if(Caselle[35+j-k+y].classList.contains('Giocatore1')){}
                            else{Haivinto = false;}}
                            
                            
                        if(Haivinto){DefinitivaRED=true;}
                        if(verificaRED(Caselle,k,VittoriaMezzo)){DefinitivaRED=true};
                        Haivinto=true;
                        for(y=0;y<4;y++){
                            if(Caselle[35+j-k-y].classList.contains('Giocatore1')){}
                            else{Haivinto = false;}}
                            
                        if(Haivinto){DefinitivaRED=true;}
                           
                        //Verticale
                        Haivinto=true;
                        for(y=0;y<28;y=y+7){
                            if(Caselle[35+j-k+y].classList.contains('Giocatore1')){}
                            else{Haivinto = false;}}
                        
                        if(Haivinto){
                            DefinitivaRED=true;
                        }
                        //Obliquo avanti
                        Haivinto=true;
                        for(y=0,u=0;y<28;y=y+7,u++){
                            if(Caselle[35+j-k+y+u].classList.contains('Giocatore1')){}
                            else{Haivinto = false;}
                        }
        
                        if(Haivinto){
                            DefinitivaRED=true;
                        }
                        //Obliquo Indietro
                        Haivinto=true;
                        u=0;
                        for(y=0;y<28;y=y+7){
                            if(Caselle[35+j-k+y-u].classList.contains('Giocatore1')){}
                            else{Haivinto = false;}
                            u++;                        
                        }
                        if(Haivinto){
                            DefinitivaRED=true;
                        }
                        if(verificaObliquaRED(Caselle,VittoriaMezzo)){DefinitivaRED=true;}
                    }
                    //QUARTO CASO
                    else{
                        //orizzontale
                        for(y=0;y<4;y++){
                            if(Caselle[35+j-k+y].classList.contains('Giocatore1')){}
                            else{Haivinto = false;}}
                            
                        if(Haivinto){DefinitivaRED=true;}
                        if(verificaRED(Caselle,k,VittoriaMezzo)){DefinitivaRED=true};
                        Haivinto=true;
                        for(y=0;y<4;y++){
                            if(Caselle[35+j-k-y].classList.contains('Giocatore1')){}
                            else{Haivinto = false;}}
                            
                        if(Haivinto){DefinitivaRED=true;}
        
                        //Verticale
                        Haivinto=true;
                        for(y=0;y<28;y=y+7){
                            if(Caselle[35+j-k-y].classList.contains('Giocatore1')){}
                            else{Haivinto = false;}}
        
                          
                        if(Haivinto){
                            DefinitivaRED=true;
                        }
                        //obliquo avanti
                        u = 0;
                        Haivinto=true;
                        for(y=0;y<28;y=y+7){
                            if(Caselle[35+j-k-y+u].classList.contains('Giocatore1')){}
                            else{Haivinto = false;}
                            u++;
                        }
                    
                        if(Haivinto){
                            DefinitivaRED=true;
                        }
                        if(verificaObliquaRED(Caselle,VittoriaMezzo)){DefinitivaRED=true;}

                        //Obliquo Indietro
                        Haivinto=true;
                        u=0;
                        for(y=0;y<28;y=y+7){
                            if(Caselle[35+j-k-y-u].classList.contains('Giocatore1')){}
                            else{Haivinto = false;}
                            u++;
                        }
                        if(Haivinto){
                            DefinitivaRED=true;
                        }
                        if(verificaObliquaRED(Caselle,VittoriaMezzo)){DefinitivaRED=true;}
                    }

                    }   

            //QUINTO CASO
            else{
                if((k/7)>=3){
                    
                    //Orizzontale
                    for(y=0;y<4;y++){
                        if(Caselle[35+j-k-y].classList.contains('Giocatore1')){}
                        else{Haivinto = false;}}
                        
                    if(Haivinto){DefinitivaRED=true;}
                    if(verificaRED(Caselle,k,VittoriaMezzo)){DefinitivaRED=true};
                    
                    //Verticale
                    Haivinto=true;
                    for(y=0;y<28;y=y+7){
                        if(Caselle[35+j-k+y].classList.contains('Giocatore1')){}
                        else{Haivinto = false;}}
                    if(Haivinto){
                        DefinitivaRED=true;
                    }

                    //obliquo Indietro
                    Haivinto=true;
                    u=0;
                    for(y=0;y<28;y=y+7){
                        if(Caselle[35+j-k+y-u].classList.contains('Giocatore1')){}
                        else{Haivinto = false;}
                        u++;                    
                    }
                    if(Haivinto){
                        DefinitivaRED=true;
                    }
                    if(verificaObliquaRED(Caselle,VittoriaMezzo)){DefinitivaRED=true;}




                }   
                //SESTO CASO
                else{
                    //Orizzontale
                    for(y=0;y<4;y++){
                    if(Caselle[35+j-k-y].classList.contains('Giocatore1')){}
                    else{Haivinto = false;}}
                    
                if(Haivinto){DefinitivaRED=true;}
                if(verificaRED(Caselle,k,VittoriaMezzo)){DefinitivaRED=true};
                
                //Verticale
                Haivinto=true;
                for(y=0;y<28;y=y+7){
                    if(Caselle[35+j-k-y].classList.contains('Giocatore1')){}
                    else{Haivinto = false;}
                    u++;
                }
                if(Haivinto){
                    DefinitivaRED=true;
                }
                //Obliquo Indietro
                Haivinto=true;
                u=0;
                for(y=0;y<28;y=y+7){
                    if(Caselle[35+j-k-y-u].classList.contains('Giocatore1')){}
                    else{Haivinto = false;}
                    u++;
                }
                if(Haivinto){
                    DefinitivaRED=true;
                }
                if(verificaObliquaRED(Caselle,VittoriaMezzo)){DefinitivaRED=true;}
            }

                }


                if(DefinitivaRED){
                    let vincitoreR = document.getElementById('VincitoreR');
                    document.getElementById('VincitoreY').innerHTML = '';
                    document.getElementById('Pareggio').innerHTML = '';
                     vincitoreR.innerHTML = 'Il Viola ha vinto!';
                           
                    let popup=document.getElementById("popup");
                    popup.classList.remove('close-popup');
                    popup.classList.remove("Azzurro");
                    popup.classList.remove("Grigio");
                    popup.classList.add("Viola");

                    popup.classList.add("open-popup");
                    Blurred.classList.add("Blurra");
            }

            HaiPareggiato=true;
            for(y=0;y<42;y++){
                if(Caselle[y].classList.contains('Giocatore2') || Caselle[y].classList.contains('Giocatore1') ){}
                else{HaiPareggiato = false;}
                
            }
            if(HaiPareggiato){
                let vincitorey = document.getElementById('Pareggio');
                document.getElementById('VincitoreY').innerHTML = "";
                document.getElementById('VincitoreR').innerHTML = "";
                vincitorey.innerHTML = 'Pareggio';
                      
               let popup=document.getElementById("popup");
               popup.classList.remove('close-popup');
               popup.classList.remove("Azzurro");
               popup.classList.remove("Viola");
               popup.classList.add("Grigio");
               popup.classList.add("open-popup");
               Blurred.classList.add("Blurra");
               return true;
                
            
            }

            return true;
            }
        
            else{
                Caselle[35+j-k].classList.remove('base');
                Caselle[35+j-k].classList.add('Giocatore2');
                Caselle[35+j-k].classList.add('Taken');
                currentPlayer=1;
                Turno.classList.add('Ombra1');
                Turno2.classList.remove('Ombra2');





                //Inizio funzione per il check di vittoria


            //PRIMO CASO:++++++++++++++++++++++++++++++++++++++++
            Haivinto=true;
            if((35+j-k)%7<3){
                if((k/7)>=3){
                //Orizzontale
                for(y=0;y<4;y++){
                    if(Caselle[35+j-k+y].classList.contains('Giocatore2')){}
                    else{Haivinto = false;}}
                    
                if(Haivinto){DefinitivaYELLOW=true;}
                if(verificaYellow(Caselle,k,VittoriaMezzo)){DefinitivaYELLOW=true};
                   
                //Verticale
                Haivinto=true;
                for(y=0;y<28;y=y+7){
                    if(Caselle[35+j-k+y].classList.contains('Giocatore2')){}
                    else{Haivinto = false;}}
                
                if(Haivinto){
                    DefinitivaYELLOW=true;
                }
                //Obliquo avanti
                Haivinto=true;
                for(y=0,u=0;y<28;y=y+7,u++){
                    if(Caselle[35+j-k+y+u].classList.contains('Giocatore2')){}
                    else{Haivinto = false;}
                }

                if(Haivinto){
                    DefinitivaYELLOW=true;
                }
                if(verificaObliquaYELLOW(Caselle,VittoriaMezzo)){DefinitivaYELLOW=true;}
            }   

            //SECONDO CASO
            else{
                //Orizzontale
                for(y=0;y<4;y++){
                    if(Caselle[35+j-k+y].classList.contains('Giocatore2')){}
                    else{Haivinto = false;}}
                    
                if(Haivinto){DefinitivaYELLOW=true;}
                if(verificaYellow(Caselle,k,VittoriaMezzo)){DefinitivaYELLOW=true};

                //Verticale
                Haivinto=true;
                for(y=0;y<28;y=y+7){
                    if(Caselle[35+j-k-y].classList.contains('Giocatore2')){}
                    else{Haivinto = false;}}

                  
                if(Haivinto){
                    DefinitivaYELLOW=true;
                }
                //obliquo avanti
                u = 0;
                Haivinto=true;
                for(y=0;y<28;y=y+7){
                    if(Caselle[35+j-k-y+u].classList.contains('Giocatore2')){}
                    else{Haivinto = false;}
                    u++;
                }



                if(Haivinto){
                    DefinitivaYELLOW=true;
                }
                if(verificaObliquaYELLOW(Caselle,VittoriaMezzo)){DefinitivaYELLOW=true;}
            }
            }

            // TERZO CASO
            else if((35+j-k)%7==3){
                if((k/7)>=3){
                    
                        //Orizzontale
                        for(y=0;y<4;y++){
                            if(Caselle[35+j-k+y].classList.contains('Giocatore2')){}
                            else{Haivinto = false;}}
                            
                        if(Haivinto){DefinitivaYELLOW=true;}
                        if(verificaYellow(Caselle,k,VittoriaMezzo)){DefinitivaYELLOW=true};

                        Haivinto=true;
                        for(y=0;y<4;y++){
                            if(Caselle[35+j-k-y].classList.contains('Giocatore2')){}
                            else{Haivinto = false;}}
                            
                        if(Haivinto){DefinitivaYELLOW=true;}
                           
                        //Verticale
                        Haivinto=true;
                        for(y=0;y<28;y=y+7){
                            if(Caselle[35+j-k+y].classList.contains('Giocatore2')){}
                            else{Haivinto = false;}}
                        
                        if(Haivinto){
                            DefinitivaYELLOW=true;
                        }
                        //Obliquo avanti
                        Haivinto=true;
                        for(y=0,u=0;y<28;y=y+7,u++){
                            if(Caselle[35+j-k+y+u].classList.contains('Giocatore2')){}
                            else{Haivinto = false;}
                        }
        
                        if(Haivinto){
                            DefinitivaYELLOW=true;
                        }
                        if(verificaObliquaYELLOW(Caselle,VittoriaMezzo)){DefinitivaYELLOW=true;}
                        //Obliquo Indietro
                        Haivinto=true;
                        u=0;
                        for(y=0;y<28;y=y+7){
                            if(Caselle[35+j-k+y-u].classList.contains('Giocatore2')){}
                            else{Haivinto = false;}
                            u++;                        
                        }
                        if(Haivinto){
                            DefinitivaYELLOW=true;
                        }
                        if(verificaObliquaYELLOW(Caselle,VittoriaMezzo)){DefinitivaYELLOW=true;}
                    }
                    //QUARTO CASO
                    else{
                        //orizzontale
                        for(y=0;y<4;y++){
                            if(Caselle[35+j-k+y].classList.contains('Giocatore2')){}
                            else{Haivinto = false;}}
                            
                        if(Haivinto){DefinitivaYELLOW=true;}
                        if(verificaYellow(Caselle,k,VittoriaMezzo)){DefinitivaYELLOW=true};

                        Haivinto=true;
                        for(y=0;y<4;y++){
                            if(Caselle[35+j-k-y].classList.contains('Giocatore2')){}
                            else{Haivinto = false;}}
                            
                        if(Haivinto){DefinitivaYELLOW=true;}
        
                        //Verticale
                        Haivinto=true;
                        for(y=0;y<28;y=y+7){
                            if(Caselle[35+j-k-y].classList.contains('Giocatore2')){}
                            else{Haivinto = false;}}
        
                          
                        if(Haivinto){
                            DefinitivaYELLOW=true;
                        }
                        //obliquo avanti
                        u = 0;
                        Haivinto=true;
                        for(y=0;y<28;y=y+7){
                            if(Caselle[35+j-k-y+u].classList.contains('Giocatore2')){}
                            else{Haivinto = false;}
                            u++;
                        }
                        
                    
                        if(Haivinto){
                            DefinitivaYELLOW=true;
                        }
                        if(verificaObliquaYELLOW(Caselle,VittoriaMezzo)){DefinitivaYELLOW=true;}

                        //Obliquo Indietro
                        Haivinto=true;
                        u=0;
                        for(y=0;y<28;y=y+7){
                            if(Caselle[35+j-k-y-u].classList.contains('Giocatore2')){}
                            else{Haivinto = false;}
                            u++;
                        }
                        if(Haivinto){
                            DefinitivaYELLOW=true;
                        }
                        if(verificaObliquaYELLOW(Caselle,VittoriaMezzo)){DefinitivaYELLOW=true;}
                    }

                    }   
            
            //QUINTO CASO
            else{
                if((k/7)>=3){
                    
                    //Orizzontale
                    for(y=0;y<4;y++){
                        if(Caselle[35+j-k-y].classList.contains('Giocatore2')){}
                        else{Haivinto = false;}}
                        
                    if(Haivinto){DefinitivaYELLOW=true;}
                    if(verificaYellow(Caselle,k,VittoriaMezzo)){DefinitivaYELLOW=true};
                    
                    //Verticale
                    Haivinto=true;
                    for(y=0;y<28;y=y+7){
                        if(Caselle[35+j-k+y].classList.contains('Giocatore2')){}
                        else{Haivinto = false;}}
                    if(Haivinto){
                        DefinitivaYELLOW=true;
                    }

                    //obliquo Indietro
                    Haivinto=true;
                    u=0;
                    for(y=0;y<28;y=y+7){
                        if(Caselle[35+j-k+y-u].classList.contains('Giocatore2')){}
                        else{Haivinto = false;}
                        u++;                    
                    }
                    if(Haivinto){
                        DefinitivaYELLOW=true;
                    }
                    if(verificaObliquaYELLOW(Caselle,VittoriaMezzo)){DefinitivaYELLOW=true;}

                }   
                //SESTO CASO
                else{
                    //Orizzontale
                    for(y=0;y<4;y++){
                    if(Caselle[35+j-k-y].classList.contains('Giocatore2')){}
                    else{Haivinto = false;}}
                    
                if(Haivinto){DefinitivaYELLOW=true;}
                if(verificaYellow(Caselle,k,VittoriaMezzo)){DefinitivaYELLOW=true};
                
                //Verticale
                Haivinto=true;
                for(y=0;y<28;y=y+7){
                    if(Caselle[35+j-k-y].classList.contains('Giocatore2')){}
                    else{Haivinto = false;}
                    u++;
                }
                if(Haivinto){
                    DefinitivaYELLOW=true;
                }
                //Obliquo Indietro
                Haivinto=true;
                u=0;
                for(y=0;y<28;y=y+7){
                    if(Caselle[35+j-k-y-u].classList.contains('Giocatore2')){}
                    else{Haivinto = false;}
                    u++;
                }
                if(Haivinto){
                    DefinitivaYELLOW=true;
                }
                if(verificaObliquaYELLOW(Caselle,VittoriaMezzo)){DefinitivaYELLOW=true;}
            }

                }


                if(DefinitivaYELLOW){
                    document.getElementById('VincitoreR').innerHTML = "";
                        document.getElementById('Pareggio').innerHTML = "";
                    let vincitorey = document.getElementById('VincitoreY');
                    vincitorey.innerHTML = "L'Azzurro ha vinto!";
                          
                   let popup=document.getElementById("popup");
                   popup.classList.remove("Grigio");
                   popup.classList.remove("Viola");
                   popup.classList.add("Azzurro");
                   popup.classList.add("open-popup");
                   popup.classList.remove('close-popup');
                   Blurred.classList.add("Blurra");
                }
                HaiPareggiato=true;
                for(y=0;y<42;y++){
                         if(Caselle[y].classList.contains('Giocatore2') || Caselle[y].classList.contains('Giocatore1') ){}
                        else{HaiPareggiato = false;}
    
                    }
                if(HaiPareggiato){
                        let vincitorey = document.getElementById('Pareggio');
                        document.getElementById('VincitoreY').innerHTML = "";
                        document.getElementById('VincitoreR').innerHTML = "";
                        vincitorey.innerHTML = 'Pareggio';
          
                        let popup=document.getElementById("popup");
                        popup.classList.remove("Azzurro");
                        popup.classList.remove("Viola");
                        popup.classList.add("Grigio");
                        popup.classList.add("open-popup");
                        popup.classList.remove('close-popup');
                        Blurred.classList.add("Blurra");
                    }

                return true;
            }
        }



    k=k+7;
}



    return false;
};
    }
}


function verificaRED(Array,num1,VittoriaMezzo){
    num1 = (5-(num1/7))*7;
    for(j=0;j<4;j++){
        VittoriaMezzo=true;
    for(i=0; i<4;i++){
        
        
        if(Array[num1+i+j].classList.contains('Giocatore1')){}
        else{
            VittoriaMezzo=false;
            break;
        }
    }
if(VittoriaMezzo){return true;}
}
}

function verificaYellow(Array,num1,VittoriaMezzo){
    num1 = (5-(num1/7))*7;
    for(j=0;j<4;j++){
        VittoriaMezzo=true;
    for(i=0; i<4;i++){
        
        if(Array[num1+i+j].classList.contains('Giocatore2')){}
        else{
            VittoriaMezzo=false;
            break;
        }
    }
if(VittoriaMezzo){return true;}
}
return false;
}

function verificaObliquaRED(Array,VittoriaMezzo){
   for( i = 0; i<6;i++){
   
    for(j = 0; j<7;j++){
        VittoriaMezzo=true;
        if(i<3){
            if(j<3){
            u=0;
            for(y=0;y<28;y=y+7){
                if(Array[i*7+j+y+u].classList.contains('Giocatore1')){}
                else{VittoriaMezzo = false;}
                u++;
            }
            if(VittoriaMezzo){return true;}

        }
        else if(j>3){
            u=0;
            for(y=0;y<28;y=y+7){
                if(Array[i*7+j+y-u].classList.contains('Giocatore1')){}
                else{VittoriaMezzo = false;}
                u++;
            }
            if(VittoriaMezzo){return true;}
        }
        else{
            u=0;
            for(y=0;y<28;y=y+7){
                if(Array[i*7+j+y-u].classList.contains('Giocatore1')){}
                else{VittoriaMezzo = false;}
                u++;
            }
            if(VittoriaMezzo){return true;}

            u=0;
            for(y=0;y<28;y=y+7){
                if(Array[i*7+j+y+u].classList.contains('Giocatore1')){}
                else{VittoriaMezzo = false;}
                u++;
            }
            if(VittoriaMezzo){return true;}
        }
    }
    else{
        if(j<3){
            u=0;
            for(y=0;y<28;y=y+7){
                if(Array[i*7+j-y+u].classList.contains('Giocatore1')){}
                else{VittoriaMezzo = false;}
                u++;
            }
            if(VittoriaMezzo){return true;}

        }
        else if(j>3){
            u=0;
            for(y=0;y<28;y=y+7){
                if(Array[i*7+j-y-u].classList.contains('Giocatore1')){}
                else{VittoriaMezzo = false;}
                u++;
            }
            if(VittoriaMezzo){return true;}

        }
        else{
            u=0;
            for(y=0;y<28;y=y+7){
                if(Array[i*7+j-y-u].classList.contains('Giocatore1')){}
                else{VittoriaMezzo = false;}
                u++;
            }
            if(VittoriaMezzo){return true;}
            u=0;
            for(y=0;y<28;y=y+7){
                if(Array[i*7+j-y+u].classList.contains('Giocatore1')){}
                else{VittoriaMezzo = false;}
                u++;
            }
            if(VittoriaMezzo){return true}
        }
    }
    }
    }
    return false;
   }
function verificaObliquaYELLOW(Array,VittoriaMezzo){
    for( i = 0; i<6;i++){

        for(j = 0; j<7;j++){
            VittoriaMezzo=true;
            if(i<3){
                if(j<3){
                u=0;
                for(y=0;y<28;y=y+7){
                    if(Array[i*7+j+y+u].classList.contains('Giocatore2')){}
                    else{VittoriaMezzo = false;}
                    u++;
                }
                if(VittoriaMezzo){return true;}
    
            }
            else if(j>3){
                u=0;
                for(y=0;y<28;y=y+7){
                    if(Array[i*7+j+y-u].classList.contains('Giocatore2')){}
                    else{VittoriaMezzo = false;}
                    u++;
                }
                if(VittoriaMezzo){return true;}
            }
            else{
                u=0;
                for(y=0;y<28;y=y+7){
                    if(Array[i*7+j+y-u].classList.contains('Giocatore2')){}
                    else{VittoriaMezzo = false;}
                    u++;
                }
                if(VittoriaMezzo){return true;}
    
                u=0;
                for(y=0;y<28;y=y+7){
                    if(Array[i*7+j+y+u].classList.contains('Giocatore2')){}
                    else{VittoriaMezzo = false;}
                    u++;
                }
                if(VittoriaMezzo){return true;}
            }
        }
        else{
            if(j<3){
                u=0;
                for(y=0;y<28;y=y+7){
                    if(Array[i*7+j-y+u].classList.contains('Giocatore2')){}
                    else{VittoriaMezzo = false;}
                    u++;
                }
                if(VittoriaMezzo){return true;}
    
            }
            else if(j>3){
                u=0;
                for(y=0;y<28;y=y+7){
                    if(Array[i*7+j-y-u].classList.contains('Giocatore2')){}
                    else{VittoriaMezzo = false;}
                    u++;
                }
                if(VittoriaMezzo){return true;}
    
            }
            else{
                u=0;
                for(y=0;y<28;y=y+7){
                    if(Array[i*7+j-y-u].classList.contains('Giocatore2')){}
                    else{VittoriaMezzo = false;}
                    u++;
                }
                if(VittoriaMezzo){return true;}
                u=0;
                for(y=0;y<28;y=y+7){
                    if(Array[i*7+j-y+u].classList.contains('Giocatore2')){}
                    else{VittoriaMezzo = false;}
                    u++;
                }
                if(VittoriaMezzo){return true}
            }
        }
        }
        }
        return false;
}

function sendResult(user){

    if(user != 'NULL'){

        var gameresultPlayerR = document.getElementById("VincitoreR").innerHTML;
        var gameresultPlayerY = document.getElementById("VincitoreY").innerHTML;
        var gameresultDraw = document.getElementById("Pareggio").innerHTML;

        if(gameresultPlayerR == "Il Viola ha vinto!"){

            fetch("/games/result", {
                method: "POST",
                headers: {'Content-Type': 'application/json'}, 
                body: JSON.stringify({
                    'game': 'Connect-4',
                    'user': user,
                    'result': 'win'
                })
            }).then(console.log("Game result sent!"));

        }else if(gameresultPlayerY == "L'Azzurro ha vinto!"){

            fetch("/games/result", {
                method: "POST",
                headers: {'Content-Type': 'application/json'}, 
                body: JSON.stringify({
                    'game': 'Connect-4',
                    'user': user,
                    'result': 'lose'
                })
            }).then(console.log("Game result sent!"));

        }else if(gameresultDraw == "Pareggio"){

            fetch("/games/result", {
                method: "POST",
                headers: {'Content-Type': 'application/json'}, 
                body: JSON.stringify({
                    'game': 'Connect-4',
                    'user': user,
                    'result': 'drow'
                })
            }).then(console.log("Game result sent!"));

        }
    }
}