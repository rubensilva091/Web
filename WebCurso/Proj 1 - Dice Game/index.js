
// Criar o numero aleatorio
var random_number1 = Math.floor((Math.random()*6)+1);
var scr1= "images/dice"+random_number1+".png";
document.querySelector(".img1").setAttribute("src", scr1);

var random_number2 = Math.floor((Math.random()*6)+1);
var scr2= "images/dice"+random_number2+".png";
document.querySelector(".img2").setAttribute("src", scr2);

//Avisar quem ganhou
var titlo=document.querySelector("#main_title");
titlo.textContent = "DRAW";
if (random_number1>random_number2)
{
    titlo.textContent = "Player 1 GANHOU";
}
if(random_number1<random_number2)
{
    titlo.textContent = "Player 2 GANHOU";
}