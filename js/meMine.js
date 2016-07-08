
var minecraft = {};

minecraft.init = function () {
    minecraft.savedTile = "";
    minecraft.matrix = [
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "cloud", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "cloud", "cloud", "cloud", "cloud", "", "cloud", "cloud", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "cloud", "cloud", "cloud", "cloud", "cloud", "cloud", "cloud", "cloud", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "cloud", "cloud", "", "", "", "", "", "", "leaf", "leaf", "leaf", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "leaf", "leaf", "leaf", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "leaf", "leaf", "leaf", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "tree", "", "", ""],
        ["", "", "", "", "leaf", "", "", "", "", "", "", "", "", "", "", "", "tree", "", "", ""],
        ["", "", "", "leaf", "leaf", "leaf", "", "", "", "", "", "", "", "rock", "rock", "", "tree", "", "", "rock"],
        ["grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass"],
        ["dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt"],
        ["dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt"],
        ["dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt"],
        ["dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt"]

    ];
    minecraft.canvas = $("<div/>");
    minecraft.canvas.attr("id" , "canvas");
    
    for (var i = 0; i < 20; i++) {
        var bigBox = $("<div/>");
        bigBox.addClass("row");
        minecraft.canvas.append(bigBox);
        $('body').append(minecraft.canvas);

        for (var j = 0; j < 20; j++) {
            var box = $("<div/>");
            box.addClass("box");
            bigBox.append(box);
        }
    }

    var logo = $("<div/>").addClass("logo");
    $('body').append(logo);

    createTools();

    $(".tool").click(function () {
        var clickedTool = $(this);
        $(".tool.selected").removeClass("selected");
        clickedTool.addClass("selected");
    });


    for (var i = 0; i < minecraft.matrix.length; i++) {
        for (var j = 0; j < minecraft.matrix[i].length; j++) {
            if (minecraft.matrix[i][j] === "") {
                minecraft.matrix[i][j] = "sky";
            }
            $('.box').eq(i * 20 + j).data("i", i).data("j", j).addClass(minecraft.matrix[i][j]).click(function () {
                var clickedTile = $(this);
                var clickedTool = $(".tool.selected");
                var storedTile = $("#storedTile");


                if ((clickedTool.attr("id") === "axe") && (clickedTile.hasClass("tree"))) {
                    minecraft.mineTile("tree" ,clickedTile, storedTile);
                }

                else if ((clickedTool.attr("id") === "axe") && (clickedTile.hasClass("leaf"))) {
                    minecraft.mineTile("leaf" ,clickedTile, storedTile);
                }

                else if ((clickedTool.attr("id") === "pick") && (clickedTile.hasClass("rock"))) {
                    minecraft.mineTile("rock"  ,clickedTile, storedTile);
                }

                else if ((clickedTool.attr("id") === "shovel") && (clickedTile.hasClass("grass"))) {
                    minecraft.mineTile("grass" ,clickedTile, storedTile);
                }

                else if ((clickedTool.attr("id") === "shovel") && (clickedTile.hasClass("dirt"))) {
                    minecraft.mineTile("dirt" ,clickedTile, storedTile);

                }else if (clickedTool.attr("id")=="storedTile" && clickedTile.hasClass("sky") && minecraft.savedTile != ""){
                    clickedTile.removeClass("sky").addClass(minecraft.savedTile);
                    storedTile.removeClass(minecraft.savedTile);
                    minecraft.savedTile = "";
                }

                //if clicked on tile without selecting a tool first-
                else {
                    clickedTool.addClass("errorClick");
                    setTimeout(function () {
                        clickedTool.removeClass("errorClick");
                    }, 500);
                }
            });
        }
    }
};

var createTools = function () {
    minecraft.toolSet = $("<div/>");
    minecraft.toolSet.attr("id", "toolSet");
    $("body").append(minecraft.toolSet);

    var toolTree = $("<div/>");
    minecraft.tool(toolTree, "axe");

    var toolRock = $("<div/>");
    minecraft.tool(toolRock, "pick");

    var toolGround = $("<div/>");
    minecraft.tool(toolGround, "shovel");


    var store = $("<div/>").attr("id", "storedTile").addClass("store tool");
    minecraft.toolSet.append(store);
};

minecraft.tool = function (toolType, toolId) {
    toolType.attr("id", toolId);
    toolType.addClass("tool");
    minecraft.toolSet.append(toolType);
};

minecraft.mineTile = function(tileType ,clickedTile, storedTile){
    storedTile.removeClass().addClass("tool").addClass(tileType);
    minecraft.savedTile = tileType;
    clickedTile.removeClass(tileType).addClass("sky")
};

minecraft.init();
