window.onload = function() {
            
    var theCanvas = document.getElementById("myCanvas");
    var ctx = theCanvas.getContext("2d");
    var squares=[];
    var contexts = [];
    var turn  = "x";
    var level = "hard"


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
            ctx.filledBy= turn;
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
        } else if (turn==="x"){
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
        
        function getEmptyContexts(){
                for(i=1; i<10; i++) {
                    if (contexts[i].filledBy == undefined) {
                        emptyContexts.push(contexts[i]);  
                }          
            }
        }
        
        
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
        } else if (level==="medium") {
            medium();
        } else {
            hard();
        }
             
        function easy (){
            
            getEmptyContexts();
            var currContext = emptyContexts[Math.round(Math.random()*(emptyContexts.length-1))];


            makeCircle(currContext);
            turn="x";
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
            var sides =[contexts[2], contexts[4], contexts[6], contexts[8]];
            var corners =[contexts[1], contexts[3], contexts[7], contexts[9]];
            var emptySides =[];
            var emptyCorners =[];
            
            getEmptyContexts();
            console.log(emptyContexts.length);
            for(i=0; i<sides.length; i++) {
                if (sides[i].filledBy === undefined) {
                emptySides.push(sides[i]); 
                   
                } 
                
              
            }
            for(i=0; i<corners.length; i++) {
                if (corners[i].filledBy === undefined) {
                emptyCorners.push(corners[i]); 
                console.log("working");
                } 
          
            }
            console.log(emptyCorners);
            console.log(emptySides);
            
            
            for (i=0; i<8; i++){
                checkForPossibleWin(...rows[i],"y");
            }
            if (possibleWin===false){
                for (i=0; i<8; i++){
                    checkForPossibleWin(...rows[i],"x");
                }

            }
            
            if (turn==="y") {
                
                if (contexts[5].filledBy===undefined){
                    makeCircle(contexts[5]);
                    turn="x"
                    console.log("opt 1");
                    
                } else if (emptyContexts.length ==="6"){ 
                    console.log("6 empties");
                    
                    if ((contexts[1].filledBy === "x" && contexts[9].filledBy ==="x" && contexts[5].filledBy==="y") ||
                    (contexts[3].filledBy === "x" && contexts[7].filledBy ==="x" && contexts[5].filledBy==="y")) {
                        makeCircle(emptySides[Math.floor(Math.random() * emptySides.length)]);
                        turn="x";
                        console.log("opt 2");
                        
                    } else if (contexts[5].filledBy === "y") {
                        
                        
                        if (contexts[7].filledBy === "x" && contexts[6].filledBy ==="x"){
                           options = [contexts[8], contexts[9]];
                           makeCircle(options[Math.floor(Math.random() * options.length)]);
                            turn="x";
                            console.log("opt 3");
                        } else if(contexts[1].filledBy === "x" && contexts[6].filledBy ==="x") {
                           options = [contexts[2], contexts[3]];
                           makeCircle(options[Math.floor(Math.random() * options.length)]);
                             turn="x";
                            console.log("opt 4");
                        } else if(contexts[3].filledBy === "x" && contexts[9].filledBy) {
                           options = [contexts[7], contexts[8]];
                           makeCircle(options[Math.floor(Math.random() * options.length)]);
                             turn="x";
                            console.log("opt 5");
                        } else if (contexts[4].filledBy === "x" && contexts[3].filledBy ==="x"){
                           options = [contexts[1], contexts[2]];
                           makeCircle(options[Math.floor(Math.random() * options.length)]);
                             turn="x";
                            console.log("opt 6");
                        } else if (contexts[4].filledBy === "x" && contexts[7].filledBy ==="x"){
                            makeCircle(contexts[7]);
                             turn="x";
                            console.log("opt 7");
                        } else if (contexts[6].filledBy === "x" && contexts[8].filledBy ==="x"){
                            makeCircle(contexts[9]);
                             turn="x";
                            console.log("opt 8");
                        } else if (contexts[2].filledBy === "x" && contexts[4].filledBy ==="x"){
                            makeCircle(contexts[1]);
                             turn="x";
                            console.log("opt 9");
                        } else if (contexts[2].filledBy === "x" && contexts[6].filledBy ==="x"){
                            makeCircle(contexts[3]);
                             turn="x";
                            console.log("opt 10");
                        }
                        turn="x";
                    }
            } else if (emptyCorners.length !== 0) {
                        makeCircle(emptyCorners[Math.floor(Math.random() * emptyCorners.length)]);
                        turn="x";
                        console.log("opt 11");
            } else if (emptySides.length !== 0) {
                        makeCircle(emptySides[Math.floor(Math.random() * emptySides.length)]);
                        turn="x";
                console.log("opt 12");
            } else{
                        alert("game over"); 
                         turn="x";
                
            }
            turn="x";
                   
            }


                

                }
                    
                    
                    
                    
             }


    
    
    

    


 
    
}
    
    
    