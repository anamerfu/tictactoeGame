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
                
        
                    
                  };  
            }
            
            function makeVariables (){
                for (i = 1; i < 10; i++) {
                    squares[i] = document.getElementById( "square" +i );
                    contextes[i]= squares[i].getContext("2d");
                    console.log(squares[i]);
                        
                } 
                return contextes;
                return squares;
              
                
                
            };
            
            makeVariables();

        
        
            for (i = 1; i < 10; i++) { 
                    if(squares[i] && squares[i].getContext ) {  
                        
                           
                        if (contextes[i]) {
                            var number = i;
                            squares[i].addEventListener("click", function() {userClicked(contextes[event.target.id.split("e").pop()])} );
                            ;
                            
                        } 
                    } 
                }
            
        
           function userClicked(squareNumber){
                console.log(squareNumber);
                squareNumber.clearRect(0,0,300,300);
                console.log("working")
                if(turn=="x"){
                    turn ="y";
                } else {
                    turn = "x";    
                };
                    squareNumber.strokeStyle="#000";
                    squareNumber.lineWidth = 20;
                    squareNumber.lineCap = "round";
                                      
                if(turn=="x"){
                    squareNumber.beginPath();
                    squareNumber.moveTo(50, 50);
                    squareNumber.lineTo(250, 250);
                    squareNumber.stroke();

                    squareNumber.beginPath();
                    squareNumber.moveTo(250, 50);
                    squareNumber.lineTo(50, 250);
                    squareNumber.stroke(); 
                } else {
                    squareNumber.beginPath();
                    squareNumber.arc(150,150,110,0,2*Math.PI);
                    squareNumber.stroke();

                };
            }; 
    
        };