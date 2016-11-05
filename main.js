window.onload = function() {
            
    var theCanvas = document.getElementById("myCanvas");
    var ctx = theCanvas.getContext("2d");
    var squares=[];
    var contextes = [];
    var turn  = "x";
    /*        var squaresFilled = {
            s1: false,
            s2: false,
            s3: false,
            s4: false,
            s5: false,
            s6: false,
            s7: false,
            s8: false,
            s9: false
    }; */



    if(theCanvas && theCanvas.getContext ) {

        if (ctx) {
            ctx.strokeStyle="#000";
            ctx.lineWidth = 15;
            ctx.lineCap = "round";

            ctx.beginPath();
            ctx.moveTo(300, 0);
            ctx.lineTo(300,900);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(600, 0);
            ctx.lineTo(600,900);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(0, 300);
            ctx.lineTo(900,300);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(0, 600);
            ctx.lineTo(900,600);
            ctx.stroke();



          }
    }

    function makeVariables (){
        for (i = 1; i < 10; i++) {
            squares[i] = document.getElementById( "square" +i );
            contextes[i]= squares[i].getContext("2d");
            contextes[i].filledBy = undefined;

        } 
        

    }

    makeVariables();



    for (i = 1; i < 10; i++) { 
            if(squares[i] && squares[i].getContext ) {  


                if (contextes[i]) {
                    
                    squares[i].addEventListener("click", function() {userTurn(contextes[event.target.id.split("e").pop()])} );
                    
                } 
            } 
        }

    

  /*  function userTurn(currContext){
            currContext.strokeStyle="#000";
            currContext.lineWidth = 20;
            currContext.lineCap = "round";
        if(currContext.filledBy==undefined && turn=="x"){
            currContext.clearRect(0,0,300,300);
            currContext.beginPath();
            currContext.moveTo(50, 50);
            currContext.lineTo(250, 250);
            currContext.stroke();

            currContext.beginPath();
            currContext.moveTo(250, 50);
            currContext.lineTo(50, 250);
            currContext.stroke(); 
            currContext.filledBy=turn;
            console.log(currContext.filledBy);
            turn="y";
        } else if (currContext.filledBy==undefined) {
            currContext.clearRect(0,0,300,300);
            currContext.beginPath();
            currContext.arc(150,150,110,0,2*Math.PI);
            currContext.stroke();
            currContext.filledBy=turn;
            console.log(currContext.filledBy);
            turn="x"

        } else {
            alert("this square has already been chosen!");
        } 
    } */
    
    
    function userTurn(currContext){
        if (currContext.filledBy !== undefined) {
            alert("X-this square has already been chosen!")   
        } else if (turn =="x"){
            currContext.strokeStyle="#000";
            currContext.lineWidth = 20;
            currContext.lineCap = "round";
            currContext.clearRect(0,0,300,300);
            currContext.beginPath();
            currContext.moveTo(50, 50);
            currContext.lineTo(250, 250);
            currContext.stroke();
            currContext.beginPath();
            currContext.moveTo(250, 50);
            currContext.lineTo(50, 250);
            currContext.stroke(); 
            currContext.filledBy=turn;
            console.log(currContext.filledBy);
            turn="y";
            computerTurn(5);
        } else  {
            alert("not your turn!");
  
        }
    }
    
    function computerTurn(compContext){
        var currContext = contextes[compContext];
        if (currContext.filledBy !== undefined) {
            alert("O-this square has already been chosen!")   
        } else if (turn =="y"){
            currContext.strokeStyle="#000";
            currContext.lineWidth = 20;
            currContext.lineCap = "round";
            currContext.clearRect(0,0,300,300);
            currContext.beginPath();
            currContext.arc(150,150,110,0,2*Math.PI);
            currContext.stroke();
            currContext.filledBy=turn;
            console.log(currContext.filledBy);
            turn="x"
        } else {
            alert("not your turn!");
  
        }
    
    }

    
    
    
    
    
}
    
    
    