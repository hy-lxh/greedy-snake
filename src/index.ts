import './index.css';
import { Snake } from './snake';
const cvs: HTMLCanvasElement = document.querySelector('.greedy-snake')!,
	ctx: CanvasRenderingContext2D = cvs.getContext('2d')!;
const { width, height } = cvs,
	r = 60,
	c = 60,
	cellWidth = width / c,
	cellHeight = height / r;

// 根据方向获取x、y前进值
const steps = [
	[-1, 0],
	[0, -1],
	[1, 0],
	[0, 1],
];
enum Dir {
	LEFT,
	TOP,
	RIGHT,
	BOTTOM,
}
let snakeHead: Snake,// 蛇头
	snakeTail: Snake,// 蛇尾
	dir = Dir.BOTTOM,// 前进方向
	timer: NodeJS.Timer | null, // 定时器
	fruitX: number,// 水果x点
	fruitY: number;// 水果y点
/**
 * 初始化
 */
function init() {
	ctx.clearRect(0, 0, width, height);
	snakeHead = new Snake(0, 1),snakeTail = new Snake(0,0);
	snakeHead.next = snakeTail;
	dir = Dir.BOTTOM;
	renderSnake();
	genFruit();
	renderFruit();
}
/**
 * 游戏开始或暂停
 */
function gameStart(){
	if(timer){
		clearInterval(timer);
		timer = null;
	}else{
		next();
		timer = setInterval(next,300);
	}
}
/**
 * 游戏结束,清空画布，重置游戏
 */
function gameOver(){
	clear();
	if(timer)clearInterval(timer);
	timer = null;
	init();
}

/**
 * 清空画布
 */
function clear(){
	ctx.clearRect(0, 0, width, height);
}

/**
 * 生成新的水果
 */
function genFruit(){
	fruitX = Math.floor(Math.random() * c),fruitY = Math.floor(Math.random() * r);
}

/**
 * 下一步
 * @returns 
 */
function next() {
	const [xStep, yStep] = steps[dir];
	let {
		point: [x, y],
	} = snakeHead;
	const curX = x + xStep,
		curY = y + yStep;
	snakeHead.nextPoint([curX, curY]);
	// 撞墙
	if (curX >= c || curX < 0 || curY >= r || curY < 0) {
		gameOver();
		return;
	}
	
	let { next } = snakeHead,eat = false;
	while (next) {
		// 吃到果实了
		if(x === fruitX && y === fruitY){
			eat = true;
		}
		const [tempx, tempy] = next.nextPoint([x, y]);
		(x = tempx), (y = tempy);
		next = next.next;
	}
	if(eat){
		// 吃到果实挂到最后面去
		snakeTail = snakeTail.next = new Snake(x,y);
		genFruit();
	}
	clear();
	renderFruit();
	renderSnake();
}

/**
 * 渲染蛇蛇
 */
function renderSnake(){
	let snake: Snake | null = snakeHead;
	while(snake){
		const [x,y] = snake.point,[headX,headY] = snakeHead.point;
		if(!(snake !== snakeHead && x === headX && y === headY)){
			strokeSnake(x,y,snake === snakeHead ? 'red' : '#000');
		}else{
			// 身体相撞
			gameOver();
		}
		snake = snake.next;
	}
}

/**
 * 渲染水果
 */
function renderFruit(){
	ctx.fillRect(fruitX * cellWidth,fruitY * cellHeight,cellWidth,cellHeight);
}

/**
 * 绘制蛇蛇的某个身体块
 * @param x 
 * @param y 
 * @param fillStyle 头和身体区分显示
 */
function strokeSnake(x: number,y: number,fillStyle = '#000'){
	ctx.fillStyle = fillStyle;
	ctx.fillRect(x * cellWidth,y * cellHeight,cellWidth,cellHeight);
}


window.addEventListener(
	'keyup',
	(ev: KeyboardEvent) => {
		if(timer){
			// 游戏开始时生效
			switch (ev.code) {
			case 'ArrowUp':
				dir = Dir.TOP;
				break;
			case 'ArrowDown':
				dir = Dir.BOTTOM;
				break;
			case 'ArrowLeft':
				dir = Dir.LEFT;
				break;
			case 'ArrowRight':
				dir = Dir.RIGHT;
				break;
			}
		}
		if(ev.code === 'Space'){
			gameStart();
		}
	},
	false
);

init();