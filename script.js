import { Rectangle, Circle, Point, Polygon, EndPoint, Segment, Vecteur} from './core/objectType.js';
import { collider } from './core/colliderv2.js'

const c = collider();

let rect1 = Rectangle(20, -10 , 600, 150);
let rect2 = Rectangle(50, -50 , 40, 200);

let point1 = Point(50, 0);
let point2 = Point(50, 100);

let circle1 = Circle(50, 50, 50);

let pointd1 = Point(0, 50);
let pointd2 = Point(100, 50);


let polygon1 = c.convertrectangleToPolygon(rect1);

let debugDiv = document.getElementById("debug");
//debugDiv.innerHTML = c.pointRectangleCollision(point1, polygon1, true);

//console.log('segment', Segment(point1.x, point1.y, point2.x, point2.y));

console.log('CheckCollision', c.rectangleCircleCollision(rect1, circle1, true));