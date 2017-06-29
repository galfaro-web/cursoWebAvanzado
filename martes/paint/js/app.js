var color= $(".selected").css("background-color");
var $canvas= $("canvas");
var context =$canvas[0].getContext("2d");
var lastEvent;
var mouseDown=false;
//Cuando hagamos click en la lista de control de colores

$(".controls").on("click","li",function(){

	$(this).siblings().removeClass("selected");

	$(this).addClass("selected");

	color=$(this).css("background-color");
});

//Cuando nuevo color sea presionado
$('#revelarColor').click(function(){
	//Muestra el color seleccionado o el color oculto
	changeColor();
	$('#colorSelect').toggle();
});

//Actualizar el color
function changeColor(){
	var r = $('#red').val();
	var g = $('#green').val();
	var b = $('#blue').val();

	$("#newColor").css("background-color","rgb("+r+","+g+","+b+")");
}

$("input[type=range]").change(changeColor);

//Cuando "Agregar color" sea presionado
$('#addColor').click(function(){
	//Agregar color a los controles ya asignados
	var $newColor=$("<li></li>");

	$newColor.css("background-color",$("#newColor").css("background-color"));
	$(".controls ul").append($newColor);
	//Seleccionamos el nuevo color
	$newColor.click();
});

//Cuando demos click en el area de canvas
$canvas.mousedown(function(e){
	lastEvent=e;
	mouseDown= true;
}).mousemove(function(e){
	//Para dibujar línead
	if(mouseDown) //equivale a if(mouseDown)==true)
	{
		context.beginPath();
		context.moveTo(lastEvent.offsetX,lastEvent.offsetY);
		context.lineTo(e.offsetX,e.offsetY);
		context.strokeStyle= color;
		context.stroke();
		lastEvent=e;
	}
}).mouseup(function(){
	mouseDown=false;
}).mouseleave(function(){
	$canvas.mouseup();
});

//Cuando "Goma" sea presionado
$('#eraser').click(function(){
	context.beginPath();
	context.moveTo(lastEvent.offsetX,lastEvent.offsetY);
	context.lineTo(e.offsetX,e.offsetY);
	context.clear();
	/*canvas.background.context.beginPath();
    canvas.background.context.arc(offsetX, offsetY, state.lineThickness, 0, 2 * Math.PI, false);
    canvas.background.context.clear();*/
 });
