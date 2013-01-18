window.onload = function(){
    points = 0,
    level = 0,
    direction = 3,
    snake = new Array(3),
    active = true,
    speed = 500;
    
    var map = new Array(20);
    for (var i = 0; i < map.length; i++) {
        map[i] = new Array(20);
    };
    DrawTable();
    map = Snake(map);
    map = makeFood(map);
    //startGame();
    setInterval(startGame,500);
    
    $(document).keypress(function(event) {
        var position = ({
            x: snake[0].x, 
            y: snake[0].y
            });
        var x = position.x;
        var y = position.y;
        switch (event.keyCode) {
            case 37:
                //left
                event.preventDefault();
                if (direction !== 3){
                    direction = 1;
                } 
                break;
            case 38:
                //up
                event.preventDefault();
                if (direction !== 4){
                    direction = 2;
                }
                break;
                
            case 39:
                //right
                event.preventDefault();
                if (direction !== 1){
                    direction = 3;
                }
                break;
                
            case 40:
                //down
                event.preventDefault();
                if (direction !== 2){
                    direction = 4;
                }
                break;
                
        }
    })

    function startGame(){
        for (var i = snake.length - 1; i >= 0; i--) {
            if(i == 0){
                switch(direction) {
                    case 3: // Right
                        snake[0] = {
                            x: snake[0].x + 1, 
                            y: snake[0].y
                        }
                        break;
                    case 1: // Left
                        snake[0] = {
                            x: snake[0].x - 1, 
                            y: snake[0].y
                        }
                        break;
                    case 2: // Up
                        snake[0] = {
                            x: snake[0].x, 
                            y: snake[0].y - 1
                        }
                        break;
                    case 4: // Down
                        snake[0] = {
                            x: snake[0].x, 
                            y: snake[0].y + 1
                        }
                        break;
                }
            
                CheckBounds();
                CheckFood(map);
                BodyHit();
            
                map[snake[0].x][snake[0].y] = 1;
            }
            else{
                if(i == (snake.length - 1)){
                    map[snake[i].x][snake[i].y] = null;
                }
                    snake[i] = ({
                        x:snake[i-1].x, 
                        y :snake[i-1].y
                        });
                        map[snake[i].x][snake[i].y] = 1;
                }
            }
        
        DrawMap();
    }

function DrawMap(){
    
        for(i=0;i<map.length;i++){
        for(j=0;j<map[i].length;j++){
         $('#cell-'+j+'-'+i).removeClass();
         console.log(i+" "+j);
        }
        }
        
    for(i=0;i<map.length;i++){
        for(j=0;j<map[i].length;j++){
           
            if(map[j][i] == 1){
               $('#cell-'+j+'-'+i).addClass('snake');
            }
            else if(map[j][i] == 2){
               $('#cell-'+j+'-'+i).addClass('food');
            }
            }
            
            
        }
        
        
    }
function DrawTable(){
        var html = '';     
        html = html + '<tr>';
        for (i = 0;i<map.length;i++){

            for(j=0;j<map[i].length;j++){
                html = html + '<td id="cell-'+j+'-'+i+'"></td>';
            }
            html = html + '</tr>';  
        }
        $('#stage').append( html );
    }

        function BodyHit(){
            if(map[snake[0].x][snake[0].y] == 1){
                gameOver();
                return;
            }
    
        }
        function CheckFood(map){
            if(map[snake[0].x][snake[0].y]==2){
                points = points + 100;
                makeFood(map);
                snake.push({
                    x: snake[snake.length - 1].x, 
                    y: snake[snake.length - 1].y
                });
                map[snake[snake.length - 1].x][snake[snake.length - 1].y] = 1;    
            }
        };

        function Snake(map){
            snake[0] = ({
                x:2
                ,
                y:0
            }
            )
            snake[1] = ({
                x:1
                ,
                y:0
            }
            )
            snake[2] = ({
                x:0
                ,
                y:0
            }
            )
            for(i=0;i<snake.length;i++){
                console.log(snake[i].x+" "+snake[i].y+ "KOORDY PRZY DODAWANIU WEZA");
                map[snake[i].x][snake[i].y] = 1;
            }
            return map;
        }

        function CheckBounds(){
            var x = snake[0].x;
            var y = snake[0].y;
            if(x>map.length-1 || x < 0 || y < 0 || y>map.length-1){
                gameOver();
                active = false;
                return;
            }  
        }
        function makeFood(map){
            var x = Math.round(Math.random()*(map.length-1));
            var y = Math.round(Math.random()*(map.length-1));
            console.log(x+" X - Y "+y);
            while(map[x][y] == 1){
                x = Math.round(Math.random()*(map.length-1));
                y = Math.round(Math.random()*(map.length-1));
            }
            map[x][y] = 2;
            return map;
        }

        function gameOver(){
            alert("Przegrałeś. Twój wynik to: "+points+ ". Odśwież by spróbować ponownie");

        }


    
}