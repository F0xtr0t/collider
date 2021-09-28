import { Rectangle, Circle, Point, Polygon, EndPoint, Segment, Vecteur} from './core/objectType.js';
import { collider } from './core/colliderv2.js'

const c = collider();

let rect1 = Rectangle(0, 0 , 100, 100);
let point1 = Point(50, 50);

let circle1 = Circle(50, 50, 50);
let polygon1 = c.convertrectangleToPolygon(rect1);

let debugDiv = document.getElementById("debug");
//debugDiv.innerHTML = c.pointRectangleCollision(point1, polygon1, true);

console.log('CheckCollision', c.PointPolygonCollision(point1, polygon1, true));