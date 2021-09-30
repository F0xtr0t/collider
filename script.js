import { Rectangle, Circle, Point, Polygon} from './core/objectType.js';
import { collider } from './core/colliderv2.js'

const c = collider();


let rect2 = Rectangle(100, 50 , 100, 100);

let point1 = Point(120, 30);
let point2 = Point(150, 30);

let rect1 = Rectangle(0, 0 , 100, 100);

let circle1 = Circle(50, 150, 50);
let circle2 = Circle(50, 50, 50);

let pointd1 = Point(0, 50);
let pointd2 = Point(100, 50);


let polygon1 = c.convertrectangleToPolygon(rect1);

let debugDiv = document.getElementById("debug");
//debugDiv.innerHTML = c.pointRectangleCollision(point1, polygon1, true);

//console.log('segment', Segment(point1.x, point1.y, point2.x, point2.y));

console.log('CheckCollision', c.rectanglesCollision(rect1, rect2, true));