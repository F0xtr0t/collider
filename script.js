import { Rectangle, Circle, Point, Polygon} from './core/objectType.js';
import { collider } from './core/colliderv2.js'
const c = collider();

let rect1 = Rectangle(0, 0 , 100, 100);
let rect2 = Rectangle(50, 50 , 100, 100);

let point1 = Point(120, 30);
let point2 = Point(150, 30);

let circle1 = Circle(70, 70, 50);
let circle2 = Circle(50, 50, 50);

let pointd1 = Point(0, 50);
let pointd2 = Point(100, 50);

let polygon1 = c.convertrectangleToPolygon(rect1);

console.log('CheckCollision', c.rectangleCircleCollision(rect1, circle1, true));