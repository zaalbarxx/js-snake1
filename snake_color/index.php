<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Snake gra</title>

        <script src="http://code.jquery.com/jquery-1.9.0.min.js"></script>
        <script src="snake_color.js" type="text/javascript"></script>
    </title>
</head>
<body>
    <style type="text/css">
        #stage {
            background-color: black;
            width: 500px;
            height: 500px;
            border:2px solid green;
        }
        #stage tr{
            border:1px solid green;
        }
        #stage td{
            border:1px solid green;
        }
        .color1{
            background-color:#FF0000;
        }
        .color2{
            background-color:#00FF00;
        }            
        .color3{
            background-color:#0000FF;
        }            
        .color4{
            background-color:#FFFF00;
        }            
        .color5{
            background-color:#00FFFF;
        }            
        .color6{
            background-color:#FF00FF;
        }
        .color7{
            background-color:#666600;
        }
        .color10{
            background-color:white;
        }
    </style>
    <table id="stage">


    </table>
    <div id="kupa" class="klacz">
        cos
    </div>


    <div name="config">
        <form name="gameconfig">
            Speed(1-10): <input type="text" name="speed"><br>
            Level(1-10): <input type="text" name="level"><br>
            <input type="button" name="start" value="Graj" onclick="Game(this.form)">
        </form>

</body>
</html>
