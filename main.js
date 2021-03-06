window.onload = function() {
            
    var theCanvas = document.getElementById("myCanvas");
    var ctx = theCanvas.getContext("2d");
    var squares=[];
    var contexts = [];
    var turn  = "x";
    var level;
    var winner = "false";
    
    var easyButton = document.getElementById("easy");
    var mediumButton = document.getElementById("medium");
    var hardButton = document.getElementById("hard");
    
    
    function levelSelect (levelSelected){
        level = levelSelected;
        document.getElementById("options").innerHTML = "";
        document.getElementById("options").innerHTML = levelSelected;
        console.log("function played");
    }
    
    easyButton.addEventListener("click", function() {levelSelect("easy")});
    mediumButton.addEventListener("click", function() {levelSelect("medium")});
    hardButton.addEventListener("click", function() {levelSelect("hard")});
    
    

    
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

    //checks all rows for a win
    function checkForWin() {
        function check(ctx1, ctx2, ctx3){
            if(ctx1.filledBy ==="x" && ctx2.filledBy === ctx3.filledBy & ctx2.filledBy === ctx1.filledBy){
                alert("You win!");
                setTimeout(location.reload(), 500);
            } else if (ctx1.filledBy === "y" && ctx2.filledBy === ctx3.filledBy & ctx2.filledBy===ctx1.filledBy){
                alert("You lose!");
                setTimeout(location.reload(), 500);
            }
        }
            for (i=0; i<rows.length; i++){
                check(...rows[i]);
                console.log("checked 1");
            }
    
    }
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
            turn="x";
            checkForWin();
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
            checkForWin();
        } else  {
            alert("not your turn!");
  
        }
    }
    
    function computerTurn(){
                

        var emptyContexts=[];

        //makes an array of currently empty squares
        function getEmptyContexts(){
                for(i=1; i<10; i++) {
                    if (contexts[i].filledBy == undefined) {
                        emptyContexts.push(contexts[i]);  
                }          
            }
        }
        

        //checks potention wins 
        function checkForPossibleWin (s1, s2, s3, currTurn){
            if(turn==="y"){
                if (s1.filledBy  === currTurn && s2.filledBy === currTurn && s3.filledBy === undefined) {
                    makeCircle(s3);
                    turn="x";
                    console.log("found1");
                } else if (s2.filledBy === currTurn && s3.filledBy === currTurn && s1.filledBy === undefined) {
                    makeCircle(s1);
                    turn="x";
                    console.log("found2");
                } else if (s1.filledBy === currTurn && s3.filledBy === currTurn && s2.filledBy === undefined ) {
                    makeCircle(s2);
                    turn="x";
                    console.log("found3");
                    return;
                }
            }
            
        }
        
        //checks what level player selected
        if(level==="easy") {
            easy();
        } else if (level==="medium") {
            medium();
        } else {
            hard();
        }
        
        //easy - picks random square
        function easy (){
            
            getEmptyContexts();
            var currContext = emptyContexts[Math.round(Math.random()*(emptyContexts.length-1))];

            makeCircle(currContext);
            turn="x";
        }
        
        //medium, blocks possible wins and will win if sees two in a row
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
            
            //gets empty sides our of emptyContexts
            for(i=0; i<sides.length; i++) {
                if (sides[i].filledBy === undefined) {
                emptySides.push(sides[i]); 
                   
                } 
            }
            
            //gets empty corners out of empty Contexts
            for(i=0; i<corners.length; i++) {
                if (corners[i].filledBy === undefined) {
                    emptyCorners.push(corners[i]); 
                } 

            }
            
            //choses a random square out of 2
            function twoOptions(opt1, opt2){
                var options = [contexts[opt1], contexts[opt2]];
                makeCircle(options[Math.floor(Math.random() * options.length)]);

                    
            }
            
            //checks for possible wins on computer side
            for (i=0; i<8; i++){
                checkForPossibleWin(...rows[i],"y");
                console.log("checking for computer win" + i);
            }
            
            //checks for possible wins on user side
            if (turn==="y"){
                for (i=0; i<8; i++){
                    checkForPossibleWin(...rows[i],"x");
                    console.log("checking for user win" + i);
                }

            }
            
            //function to check certain scenerios of 3 filled
            function checkScenerio(ctx1, ctx2){
                if (emptyContexts.length ===6 && contexts[5].filledBy ==="y" && contexts[ctx1].filledBy === "x" && contexts[ctx2].filledBy ==="x"){
                    return true;
                }
            }
            
            if (turn==="y") {
                
                if (contexts[5].filledBy===undefined){
                    makeCircle(contexts[5]);
                    
                } else if (checkScenerio(1,9) || checkScenerio(3,7) ) {
                        makeCircle(emptySides[Math.floor(Math.random() * emptySides.length)]);
                        console.log("opt 2"); 
                } else if (checkScenerio(6,7)){
                   twoOptions(8,9);
                    console.log("opt 3");
                } else if(checkScenerio(1,6)) {
                   twoOptions(2,3);
                    console.log("opt 4");
                } else if(checkScenerio(3,9)) {
                   twoOptions(7,8);
                    console.log("opt 5");
                } else if (checkScenerio(3,4)){
                   twoOptions(1,2);
                    console.log(contexts[4].filledBy);
                } else if (checkScenerio(4,8)){
                    makeCircle(contexts[7]);
                    console.log("opt 7");
                } else if (checkScenerio(6,8)){
                    makeCircle(contexts[9]);
                    console.log("opt 8");
                } else if (checkScenerio(2,4)){
                    makeCircle(contexts[1]);
                    console.log("opt 9");
                } else if (checkScenerio(2,6)){
                    makeCircle(contexts[3]);
                    console.log("opt 10");
                } else if (emptyCorners.length !== 0) {
                        makeCircle(emptyCorners[Math.floor(Math.random() * emptyCorners.length)]);
                        console.log("opt 11");
                } else if (emptySides.length !== 0) {
                        makeCircle(emptySides[Math.floor(Math.random() * emptySides.length)]);

                        console.log("opt 12");
                } else{
                   alert("It's a draw!");
                setTimeout(location.reload(), 500);
                }
                turn="x";
                   
            }


                

        }
                    
          
                    
                    
    }


    
    
    

    


 
    
}
    
    
    