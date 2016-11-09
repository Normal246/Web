var canvas = document.creatElement("canvas");
var ctx = document.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);
//Background image
var bkReady = false;
var bkImage = new Image();
bkImage.onload = function(){
	bkReady = true;
}
bkImage.src = "/Users/puny/Downloads/image/background.png";

//Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload =  function(){
	heroReady = true;
}
heroImage.src = "/Users/puny/Downloads/image/hero.png";

//Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload =	function(){
	monsterReady = true;
} 
monsterImage.src = "/Users/puny/Downloads/image/monster.png"

//Handl keyboard controls
var keysDown = {};

addEventLinster("keydown",function(e){
	keysDown[e.keycode] = true;
},false);
addEventLinster("keyup",function(e){
	detlete keysDown[e.keydown] ;
},false);
//重置游戏,当玩家抓到怪物
var reset = function(){
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;

	//在屏幕上随机设置怪物
	monster.x = 32 + (Math.random()*(canvas.width - 64));
	monster.y = 32 + (Math.random()*(canvas.height - 64));
}
//游戏画面更新
var update = function(){
	if (38 in keysDown) {
		//玩家按向上键
		hero.y -=hero.speed * modfidier ;
	};
	if (40 in keysDown) {
		//玩家按向下键
		hero.y +=hero.speed * modfidier ;
	};
	if (37 in keysDown) {
		//玩家按向左键
		hero.x -=hero.speed * modfidier ;
	};
	if (39 in keysDown) {
		//玩家按向右键
		hero.x +=hero.speed * modfidier ;

	};
	//发生碰撞
	if (
		hero.x <= (monster.x +31)
		&& monster.x <=(hero.x + 31)
		&& hero.y <= (monster.y +32)
		&& monster.y <= (hero.y + 32)
		) {
		++monsterCaught;
		reset();
	};
}


//渲染物体
var render = function(){
	if (bkReady) {
		ctx.drawImage(bkImage,0,0);
	};
	if (heroReady) {
		ctx.drawImage(heroImage,hero.x,hero.y);
	};
	if (monsterReady) {
		ctx.drawImage(monsterImage,monster.x,monster.y);
	};
	//Score
	ctx.fillStyle = "rgb(250,250,250)";
	ctx.font = "24px Helvetica";
	ctx.textAlgin = "left";
	ctx.textBaseLine = "top";
	ctx.fillText("Goblines Caught: "+ monsterCaught, 32,32);
}
//主循环函数
var main = function(){
	var now = Date.now();

	var delta = now - then;
	//console.log(delta);
	update(delta/1000);
	render();

	then = now;
	//
	requestAnimationFrame(main);
}
//设置requestAnimationFrame()函数
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitrequestAnimationFrame
 ||w.msRequestAnimationFrame||w.mozRequestAnimationFrame;

 //启动函数
 var then = Date.now;
 reset();
 main();



















