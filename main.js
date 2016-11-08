window.onload = function() {
            
    var theCanvas = document.getElementById("myCanvas");
    var ctx = theCanvas.getContext("2d");
    var squares=[];
    var contexts = [];
    var turn  = "x";
    var level = "medium"


    //creates grid
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
    
    //gets all canvas ids and creates 9 contexts
    function makeVariables (){
        for (i = 1; i < 10; i++) {
            squares[i] = document.getElementById( "square" +i );
            contexts[i]= squares[i].getContext("2d");
            contexts[i].filledBy = undefined;

        } 
        

    }
    makeVariables();

    //checks if all contexts are there - onclick event for user turn for all 9
    function checkContexts (){
        for (i = 1; i < 10; i++) { 
            if(squares[i] && squares[i].getContext ) {  


                if (contexts[i]) {
                    
                    squares[i].addEventListener("click", function() {userTurn(contexts[event.target.id.split("e").pop()])} );
                    
                } 
            } 
        }
    }
    checkContexts();

    //creates circle for computer turn, switches current turn
    function makeCircle(ctx){
            ctx.strokeStyle="#000";
            ctx.lineWidth = 20;
            ctx.lineCap = "round";
            ctx.clearRect(0,0,300,300);
            ctx.beginPath();
            ctx.arc(150,150,110,0,2*Math.PI);
            ctx.stroke();
            ctx.filledBy=turn;
            console.log(ctx.filledBy);
            turn="x"
    
    }

    /* user turn
    1. checks if contexts clicked is already chosen - if it is empty it is undefined, if not they cannot choose it
    2.checks if it's users turn (there's a delay for the computer function), if it - draw x, if not, alert that it's not their turn yet
    3. switches current turn
    */
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
            turn="y";
            setTimeout(computerTurn,500);
        } else  {
            alert("not your turn!");
  
        }
    }
    
    function computerTurn(){
                
        var possibleWin=false;
        var emptyContexts=[];
        var rows= [
           [contexts[1],contexts[2],contexts[3]],
           [contexts[4],contexts[5],contexts[6]],
           [contexts[7],contexts[8],contexts[9]],
           [contexts[1],contexts[4],contexts[7]],
           [contexts[2],contexts[5],contexts[8]],
           [contexts[3],contexts[6],contexts[9]],
           [contexts[1],contexts[5],contexts[9]],
           [contexts[3],contexts[5],contexts[7]]
        ];
        
        function checkForPossibleWin (s1, s2, s3, currTurn){
            if(turn==="y"){
                if (s1.filledBy  === currTurn && s2.filledBy === currTurn && s3.filledBy === undefined) {
                    makeCircle(s3);
                    turn="x";
                } else if (s2.filledBy === currTurn && s3.filledBy === currTurn && s1.filledBy === undefined) {
                    makeCircle(s1);
                    turn="x";
                } else if (s1.filledBy === currTurn && s3.filledBy === currTurn && s2.filledBy ===undefined ) {
                    makeCircle(s2);
                    turn="x";
                }
            }
        }
        

        if(level==="easy") {
            easy();
        } else {
            medium();
        }
             
        function easy (){
            for(i=1; i<10; i++) {
                if (contexts[i].filledBy == undefined) {
                emptyContexts.push(contexts[i]);  
                }          
            }
        
            var currContext = emptyContexts[Math.round(Math.random()*(emptyContexts.length-1))];


            if (currContext.filledBy !== undefined) {
                alert("O-this square has already been chosen!")   
            } else if (turn =="y"){
                makeCircle(currContext);
            } else {
                alert("not your turn!");

            }   
        }
        
        function medium (){
            for (i=0; i<8; i++){
                checkForPossibleWin(...rows[i],"y");
            }
            if (turn==="y"){
                for (i=0; i<8; i++){
                    checkForPossibleWin(...rows[i],"x");
                }

            }

            if (turn==="y"){
                easy();
                turn="x";
            }

            turn="x";

        }
        
        function hard(){
            for (i=0; i<8; i++){
                checkForPossibleWin(...rows[i],"y");
            }
            if (possibleWin===false){
                for (i=0; i<8; i++){
                    checkForPossibleWin(...rows[i],"x");
                }

            }
            
            if (turn="y") {
                if (contexts[5].filledBy===undefined){
                    makecircle(contexts[5]);
                }
            }
            
            
        }
        
        
    }

    
    
    

    


 
    
}
    
    
    