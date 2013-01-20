 function Game(){
    
    //define variables
    points = 0,
    level = 0,
    direction = 3,
    snake = new Array(3),
    active = true,
    speed = 500;
    
    //array which will be our map
    var map = new Array(20);
    for (var i = 0; i < map.length; i++) {
        map[i] = new Array(20);
    };
    
    //initialize table, snake and food
    DrawTable();
    map = Snake(map);
    map = makeFood(map);
    
    //set interval on function startGame
    
    setInterval(startGame,300);
    
    //handle user arrows and change snake direction if button pressed
    $(document).keypress(function(event) {
        
        //determine position of snake head
        var position = ({
            x: snake[0].x, 
            y: snake[0].y
            });
        var x = position.x;
        var y = position.y;
        
        //if button pressed switch direction of head
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

// function which control flow of the game
    function startGame(){
        
        //if game is active then proceed
        if (active == true){
            //count elements of snake body from end to his head
        for (var i = snake.length - 1; i >= 0; i--) {
            
            //if i == 0 then this is his head and depending on direction we move it to other place
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
            
            //function CheckBounds checks if snake head did not hit map bounds, if it does then game is over
                CheckBounds();
                
             //checks if snake head hit food and if it does it adds element to his body
                CheckFood(map);
                
                //checks if snake head did not hit its own body and if it does game is over
                BodyHit();
            
                map[snake[0].x][snake[0].y] = 1;
            }
            // if snake element is not head 
            else{
                //if snake body element is last then remove it
                if(i == (snake.length - 1)){
                    map[snake[i].x][snake[i].y] = null;
                }
                
                //if element is not head or end of snake then move element to position of element before it
                    snake[i] = ({
                        x:snake[i-1].x, 
                        y :snake[i-1].y
                        });
                        
                        //add snake body coords to map
                        map[snake[i].x][snake[i].y] = 1;
                }
            }
        //draw calculated map to html table
        DrawMap();
    }
    }
function DrawMap(){
    //remove class from every cell in table
        $('td').removeClass();
        
        //loop which checks if map value is 1 or 2, depending on value it adds class snake or food to proper cell
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
    
    //function which draws table elements depending on map dimensions
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

    //if snake hit its own body then calls function gameOver which stops game
        function BodyHit(){
            if(map[snake[0].x][snake[0].y] == 1){
                gameOver();
                return;
            }
    
        }
        
        //checks if snake just moved to food position
        function CheckFood(map){
            //checks if map value with snake head coords is = 2, if it does it adds 100 points to score and calls function 
            //makeFood to generate new food 
            if(map[snake[0].x][snake[0].y]==2){
                points = points + 100;
                makeFood(map);
                
                //push new object to snake array with coords of last snake element
                snake.push({
                    x: snake[snake.length - 1].x, 
                    y: snake[snake.length - 1].y
                });
                
                //adds new value 1 to map with snake last element coords
                map[snake[snake.length - 1].x][snake[snake.length - 1].y] = 1;    
            }
        };
        //snake creation function, simply creates an object to snake array with indexes 0,1,2
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
                //put newly made snake to map
            for(i=0;i<snake.length;i++){
                map[snake[i].x][snake[i].y] = 1;
            }
            return map;
        }
        //check if snake head is not out of map bounds
        function CheckBounds(){
            var x = snake[0].x;
            var y = snake[0].y;
            if(x>map.length-1 || x < 0 || y < 0 || y>map.length-1){
                gameOver();
                return;
            }  
        }
        
        //creates food on random position, repeat this until food coords are not same as snake body coords
        function makeFood(map){
            //make a random x coordination depending on map length so map dimensions can be easily changed
            var x = Math.round(Math.random()*(map.length-1));
            var y = Math.round(Math.random()*(map.length-1));
            
            //if map value in xy coords is equal to 1 then repeat until it is not
            while(map[x][y] == 1){
                x = Math.round(Math.random()*(map.length-1));
                y = Math.round(Math.random()*(map.length-1));
            }
            //add value 2 to map[x][y], so basically add food
            map[x][y] = 2;
            return map;
        }
        //function sets active value to false and shows alert with amount of points earned 
        function gameOver(){
            active = false;
            alert("Przegrałeś. Twój wynik to: "+points+ ". Odśwież by spróbować ponownie");
            return;
        }


    
}