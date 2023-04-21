export class Snake {
    next: Snake | null = null;
    point: [number,number];
    constructor(x: number,y: number){
        this.point = [x,y];
    }
    nextPoint(point: [number,number]){
    	const [x,y] = this.point;this.point = point;
    	return [x,y];
    }
}