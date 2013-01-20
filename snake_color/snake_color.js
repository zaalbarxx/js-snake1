function Game(form){
    document.getElementsByName("start")[0].disabled = true;
    //define variables used in script
    var points = 0;
    var level = form.level.value;
    var direction = 3;
    var snake = new Array(3);
    var active = true;
    
    //define var lastPress which holds time of last button press 
    var lastPress = new Date().getTime();
    
    //define var speed from start game form 
    var speed = form.speed.value;
    
    //checks if speed from input is between 1 and 10
    if (speed <1 || speed > 10){
        alert("Musisz wybrać prędkość z zakresu 1 do 10");
        return;  
    }
    
    //checks if level is correct
    if(level <1 || level > 10){
        alert("Musisz wybrać poziom z zakresu 1 do 10");
        return;
    }
    
    //sets speed of game, for example if speed chosen is 5 then interval between function startGame will be 350, if level is 10 it will be 100
    speed = 600 - (speed * 50);
    
    
    var diff = speed+1;
    
    //create new array which will 
    var map = new Array(20);
    for (var i = 0; i < map.length; i++) {
        map[i] = new Array(20);
    };
    
    DrawTable();
    map = Snake(map);
    map = makeFood(map);
    map = setLevel(map,level);
    //startGame();
    setInterval(startGame,speed);
    
    $(document).keypress(function(event) {
        var position = ({
            x: snake[0].x, 
            y: snake[0].y
        });
        var x = position.x;
        var y = position.y;
        
        //handle arrow keys and change direction if button is pressed, also if user press buttons too fast his direction wont change so it eliminates bug with 
        //pressing two buttons too fast so snake just moves to its body
        switch (event.keyCode) {
            //first we want to see what is delay between two button clicks (diff) then if diff is bigger than game speed / 2 then we change direction and set last button press to current time
            case 37:
                //left
                diff = new Date().getTime() - lastPress;
                event.preventDefault();
                if (direction !== 3 && diff > (speed/2)){
                    direction = 1;
                    lastPress = new Date().getTime();
                } 
                break;
            case 38:
                //up
                diff = new Date().getTime() - lastPress;
                event.preventDefault();
                if (direction !== 4 && diff > (speed/2)){
                    direction = 2;
                    lastPress = new Date().getTime();
                }
                break;
                
            case 39:
                //right
                diff = new Date().getTime() - lastPress;
                event.preventDefault();
                if (direction !== 1 && diff > (speed/2)){
                    direction = 3;
                    lastPress = new Date().getTime();
                }
                break;
                
            case 40:
                //down
                diff = new Date().getTime() - lastPress;
                console.log(diff);
                event.preventDefault();
                if (direction !== 2 && diff > (speed/2)){
                    direction = 4;
                    lastPress = new Date().getTime();
                }
                break;
                
        }
    })

    //function which control flow of the game
    function startGame(){
        
        //if active is true then proceed
        if (active == true){
            // from tail to head of snake body
            for (var i = snake.length - 1; i >= 0; i--) {
                
                //if i == 0 then element is head and switch/case depending on current direction
                if(i == 0){
                    switch(direction) {
                        case 3: // Right
                            snake[0] = {
                                x: snake[0].x + 1, 
                                y: snake[0].y,
                                color: snake[0].color
                            }
                            break;
                        case 1: // Left
                            snake[0] = {
                                x: snake[0].x - 1, 
                                y: snake[0].y,
                                color: snake[0].color
                            }
                            break;
                        case 2: // Up
                            snake[0] = {
                                x: snake[0].x, 
                                y: snake[0].y - 1,
                                color: snake[0].color
                            }
                            break;
                        case 4: // Down
                            snake[0] = {
                                x: snake[0].x, 
                                y: snake[0].y + 1,
                                color: snake[0].color
                            }
                            break;
                    }
                    
                    CheckBounds();
                    CheckFood(map);
                    BodyHit();
                    WallHit();
                    //set map[x][y] to 1 so it becomes snake body
                    map[snake[0].x][snake[0].y] = 1;
                }
                //if snake element is not head
                else{
                    //if element is last element of body then delete it from map
                    if(i == (snake.length - 1)){
                        map[snake[i].x][snake[i].y] = null;
                    }
                    snake[i] = ({
                        x:snake[i-1].x, 
                        y :snake[i-1].y,
                        color :snake[i].color
                    });
                    map[snake[i].x][snake[i].y] = 1;
                }
            }
        
            DrawMap();
        }
    }
    
    // draws map array which stores information about food and snake body
    function DrawMap(){
        //remove class from all cells 
        console.log("REMOVE");
        $('td').removeClass();
        
        //add class color[x] where x is color of cell to all cells[x][y] if map[x][y] has value
        for(i=0;i<map.length;i++){
            for(j=0;j<map[i].length;j++){
                if(map[j][i] > 0){
                    var cos = String(map[j][i]); 
                    $('#cell-'+j+'-'+i).addClass('color'+cos);
                }   
            }   
        }
        
        //overwrite cells with color for each snake element in snake array
        for(i=0;i<snake.length;i++){
            var x = snake[i].x;
            var y = snake[i].y;
            var color = snake[i].color;
            $('#cell-'+x+'-'+y).addClass('color'+color);
        }
    
    }
    
    //creates table which will store food and snake later, table dimensions will depend on map array dimensions
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
    
    //checks if head collides with its body and if it does calls function gameOver
    function BodyHit(){
        if(map[snake[0].x][snake[0].y] == 1){
            gameOver();
            return;
        }
    
    }
    
    //just like above, just checks if head hit obstacle
    function WallHit(){
        if(map[snake[0].x][snake[0].y] == 10){
            gameOver();
            return;
        }
    
    }
    //checks if head encountered food and if it did then grants points and creates new food on random position
    function CheckFood(map){
        if(map[snake[0].x][snake[0].y] > 1){
            var color = map[snake[0].x][snake[0].y];
            points = points + 100;
            makeFood(map);
            snake.push({
                x: snake[snake.length - 1].x, 
                y: snake[snake.length - 1].y,
                color: color 
            });
            map[snake[snake.length - 1].x][snake[snake.length - 1].y] = 1;    
        }
    };
    
    //this function creates random obstacles around map depending on what level is chosen, for example level 1 provides no obstacles while level 10 makes 9 obstacles
    function setLevel(map,level){
        var x = Math.round(Math.random()*(map.length-1));
        var y = Math.round(Math.random()*(map.length-1));
        if(level > 1){
            
            for(i=1;i<level;i++){
                while(map[x][y] > 0){
                    x = Math.round(Math.random()*(map.length-1));
                    y = Math.round(Math.random()*(map.length-1));
                }
                map[x][y] = 10
            }
        }
        return map;
        
    }
    //creates snake in first three cells in first row
    function Snake(map){
        snake[0] = ({
            x:2
            ,
            y:0
            ,
            color:1
        }
        )
        snake[1] = ({
            x:1
            ,
            y:0
            ,
            color:2
        }
        )
        snake[2] = ({
            x:0
            ,
            y:0
            ,
            color:3
        }
        )
           
           
        //push snake elements to map array
        for(i=0;i<snake.length;i++){
            map[snake[i].x][snake[i].y] = 1;
        }
        return map;
    }
    
    //checks if head is not out of bounds and if it does then gameOver
    function CheckBounds(){
        var x = snake[0].x;
        var y = snake[0].y;
        if(x>map.length-1 || x < 0 || y < 0 || y>map.length-1){
            gameOver();
            return;
        }  
    }
    
    //create food if last food has been eaten or just make first food on the map on game initialization
    function makeFood(map){
        var x = Math.round(Math.random()*(map.length-1));
        var y = Math.round(Math.random()*(map.length-1));
        var color = Math.round((Math.random()*7));
        //checks if color is greater than 2 because 1 is reserved for snake body
        while(color<2){
            color = Math.round((Math.random()*7));
        }
        //checks if map[x][y] is equal to 1 and if it does it randomize x and y again so food cant appear in place of snake body 
        while(map[x][y] == 1){
            x = Math.round(Math.random()*(map.length-1));
            y = Math.round(Math.random()*(map.length-1));
        }
        //push color value to map[x][y]
        map[x][y] = color;
        return map;
    }

    //handle end of game, if user lose game then alert appears and active value is set to false so game wont run again
    function gameOver(){
        alert("Przegrałeś. Twój wynik to: "+points+ ". Odśwież by spróbować ponownie");
        active = false;
        return;
    }


    
}