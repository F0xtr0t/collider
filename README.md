# Collider.js

Kesako ?
-------------------
Collider.js est un algorythme de collision de forme sur un plan en deux dimensions.

L'algorythm permet de savoir (Vrai / Faux) si deux formes positionnées dans un même plan sont en collision (se touchent) ou non. 

Il permet également, au besoin, d'obtenir les points d'intersection des côtés de chaques formes.

Installation :
-------------------

Copier la libraire dans votre projet puis importez les éléments suivant

```javascript
import { Rectangle, Circle, Point, Polygon} from './core/objectType.js';
import { collider } from './core/colliderv2.js'

```
Charger collider :
```javascript
var c = collider();
```

Utilisation :
-------------------
Ex - Collision de 2 rectangles :

```javascript

let rect1 = Rectangle(0, 0 , 100, 100); //Rectangle(x, y , width, height)
let rect2 = Rectangle(50, 50 , 100, 100);//Rectangle(x, y , width, height)
let testCollision = c.rectanglesCollision(rect1, rect2);
console.log(testCollision);

// Response :
// Array : [true, [{ x: 100, y: 50 },{ x: 50, y: 100 }]]
// First entry => Boolean : Collision (or not)
// Second entry => Array : List of intersection points (if asked)
```
Methods :
-------------------
#### 1. Point collision

| Methods | Arguments | Response | 
|----------|-------------|------| 
| **Between Point & Rectangle**<br />```pointRectangleCollision(point, rect, intersect = false)``` | <ol><li>**Point(x,y) :** Point object</li><li>**Rectangle(x,y,width,height) :** Rectangle object</li><li>**Boolean(Optionnal) :** If intersection points needed</li></ol> | **Array(Boolean, Array())** <ol><li>Collision or not</li><li>List of intersection points</li><ol> |
| **Between Point & Circle**<br />```pointCircleCollision(point, circle, intersect = false)``` | <ol><li>**Point(x,y) :** Point object</li><li>**Circle(x,y,r) :** Circle object</li><li>**Boolean(Optionnal) :** If intersection points needed</li></ol> | same  |
| **Between Point & Polygon**<br />```pointPolygonCollision(point, polygon, intersect = false)``` | <ol><li>**Point(x,y) :** Point object</li><li>**Polygon([{x,y},{x,y},...]) :** Polygon object</li><li>**Boolean(Optionnal) :** If intersection points needed</li></ol> | same  |
| **Between Point & Line**<br />```pointLineCollision(pointP, pointA, pointB, intersect = false)``` | <ol><li>**Point(x,y) :** Point object</li><li>**Point(x,y) :** Line first point (Point object)</li><li>**Point(x,y) :** Line second point (Point object)</li><li>**Boolean(Optionnal) :** If intersection points needed</li></ol> | same  |
| **Between Point & Segment**<br />```pointSegmentCollision(pointP, pointA, pointB, intersect = false)``` | <ol><li>**Point(x,y) :** Point object</li><li>**Point(x,y) :** Segment start point (Point object)</li><li>**Point(x,y) :** Segment end point (Point object)</li><li>**Boolean(Optionnal) :** If intersection points needed</li></ol> | same  |

#### 2. Rectangle collision

| Methods | Arguments | Response | 
|----------|-------------|------| 
| **Between 2 Rectangles**<br />```rectanglesCollision(rect1, rect2, intersect = false)``` | <ol><li>**Rectangle(x,y,width,height) :** Rectangle object</li><li>**Rectangle(x,y,width,height) :** Rectangle object</li><li>**Boolean(Optionnal) :** If intersection points needed</li></ol> | **Array(Boolean, Array())** <ol><li>Collision or not</li><li>List of intersection points</li><ol> |
| **Rectangle inside another (shortcut)**<br />```boundCollision(rectInside, Limit, intersect = false)``` | <ol><li>**Rectangle(x,y,width,height) :** Rectangle object inside the "limit"</li><li>**Rectangle(x,y,width,height) :** "Limit" Rectangle object</li><li>**Boolean(Optionnal) :** If intersection points needed</li></ol> | same |
| **Between Rectangle & Circle**<br />```rectangleCircleCollision(rect, circle, intersect = false)``` | <ol><li>**Rectangle(x,y,width,height) :** Rectangle object</li><li>**Circle(x,y,r) :** Circle object</li><li>**Boolean(Optionnal) :** If intersection points needed</li></ol> | same |
| **Between Rectangle & Polygon**<br />```rectanglePolygonCollision(rect, polygon, intersect = false)``` | <ol><li>**Rectangle(x,y,width,height) :** Rectangle object</li><li>**Polygon([{x,y},{x,y},...]) :** Polygon object</li><li>**Boolean(Optionnal) :** If intersection points needed</li></ol> | same |

#### 3. Circle collision

| Methods | Arguments | Response | 
|----------|-------------|------| 
| **Between 2 Circles**<br />```circleCollision(circle1, circle2, intersect = false)``` | <ol><li>**Circle(x,y,r) :** Circle object</li><li>**Circle(x,y,r) :** Circle object</li><li>**Boolean(Optionnal) :** If intersection points needed</li></ol> | **Array(Boolean, Array())** <ol><li>Collision or not</li><li>List of intersection points</li><ol> |
| **Between Line & Circle**<br />```lineCircleCollision(pointA, pointB, circle, intersect = false)``` | <ol><li>**Point(x,y) :** Line first point (Point object)</li><li>**Point(x,y) :** Line second point (Point object)</li><li>**Circle(x,y,r) :** Circle object</li><li>**Boolean(Optionnal) :** If intersection points needed</li></ol> | same |
| **Between Segment & Circle**<br />```segmentCircleCollision(pointA, pointB, circle, intersect = false)``` | <ol><li>**Point(x,y) :** Segment start point (Point object)</li><li>**Point(x,y) :** Segment end point (Point object)</li><li>**Circle(x,y,r) :** Circle object</li><li>**Boolean(Optionnal) :** If intersection points needed</li></ol> | same |

#### 4. Polygon collision

| Methods | Arguments | Response | 
|----------|-------------|------| 
| **Between 2 Polygon**<br />```polygonPolygonCollision(polygonA, polygonB, intersect = false)``` | <ol><li>**Polygon([{x,y},{x,y},...]) :** Polygon object</li><li>**Polygon([{x,y},{x,y},...]) :** Polygon object</li><li>**Boolean(Optionnal) :** If intersection points needed</li></ol> | **Array(Boolean, Array())** <ol><li>Collision or not</li><li>List of intersection points</li><ol> |

#### 5. Line & Segment collision

| Methods | Arguments | Response | 
|----------|-------------|------| 
| **Between Line & Segment**<br />```lineSegmentCollision(pointA, pointB, pointO, pointP, intersect = false)``` | <ol><li>**Point(x,y) :** Line first point (Point object)</li><li>**Point(x,y) :** Line second point (Point object)</li><li>**Point(x,y) :** Segment start point (Point object)</li><li>**Point(x,y) :** Segment end point (Point object)</li><li>**Boolean(Optionnal) :** If intersection points needed</li></ol> | **Array(Boolean, Array())** <ol><li>Collision or not</li><li>List of intersection points</li><ol> |
| **Between 2 segments (First method)**<br />```segmentsCollision(pointA, pointB, pointO, pointP, intersect = false)``` | <ol><li>**Point(x,y) :** Segment 1 start point (Point object)</li><li>**Point(x,y) :** Segment 1 end point (Point object)</li><li>**Point(x,y) :** Segment 2 start point (Point object)</li><li>**Point(x,y) :** Segment 2 end point (Point object)</li><li>**Boolean(Optionnal) :** If intersection points needed</li></ol> | same |
| **Between 2 segments (Second method)**<br />```segmentsCollisionParametric(pointA, pointB, pointO, pointP, intersect = false)``` | <ol><li>**Point(x,y) :** Segment 1 start point (Point object)</li><li>**Point(x,y) :** Segment 1 end point (Point object)</li><li>**Point(x,y) :** Segment 2 start point (Point object)</li><li>**Point(x,y) :** Segment 2 end point (Point object)</li><li>**Boolean(Optionnal) :** If intersection points needed</li></ol> | same |
| **Between Segment & Rectangle**<br />```segmentRectangleCollision(pointA, pointB, rect, intersect = false)``` | <ol><li>**Point(x,y) :** Segment 1 start point (Point object)</li><li>**Point(x,y) :** Segment 1 end point (Point object)</li><li>**Rectangle(x,y,width,height) :** Rectangle object</li><li>**Boolean(Optionnal) :** If intersection points needed</li></ol> | same |
| **Between Segment & Polygon**<br />```segmentPolygonCollision(pointA, pointB, polygon, intersect = false)``` | <ol><li>**Point(x,y) :** Segment 1 start point (Point object)</li><li>**Point(x,y) :** Segment 1 end point (Point object)</li><li>**Polygon([{x,y},{x,y},...]) :** Polygon object</li><li>**Boolean(Optionnal) :** If intersection points needed</li></ol> | same |


Intersection point Methods :
----------------------------

| Methods | Arguments | Response | 
|----------|-------------|------| 
| **Between Line & Line**<br />```getLineIntersection(PointA, PointB, PointC, PointD)``` | <ol><li>**Point(x,y) :** Line 1 first point (Point object)</li><li>**Point(x,y) :** Line 1 second point (Point object)</li><li>**Point(x,y) :** Line 2 first point (Point object)</li><li>**Point(x,y) :** Line 2 second point (Point object)</li></ol> | **Boolean or Point(x,y)** <br /> False if 0 intersection point or Intersection Point object |
| **Between 2 Rectangles**<br />```getRectIntersection(rect1, rect2)``` | <ol><li>**Rectangle(x,y,width,height) :** Rectangle object</li><li>**Rectangle(x,y,width,height) :** Rectangle object</li></ol> | **Array(Point(x,y),...)** <br /> Array of all Intersection Point object. Array could be empty |
| **Between Line & Circle**<br />```getLineCircleIntersection(PointA, PointB, circle)``` | <ol><li>**Point(x,y) :** Line first point (Point object)</li><li>**Point(x,y) :** Line second point (Point object)</li><li>**Circle(x,y,r) :** Circle object</li></ol> | **Array(Point(x,y),...)** <br /> Array of all Intersection Point object. Array could be empty |
| **Between Rectanlge & Circle**<br />```getRectCircleIntersection(rect, circle)``` | <ol><li>**Rectangle(x,y,width,height) :** Rectangle object</li><li>**Circle(x,y,r) :** Circle object</li></ol> | **Array(Point(x,y),...)** <br /> Array of all Intersection Point object. Array could be empty |
| **Between 2 Circles**<br />```getCircleIntersection(circle1, circle2)``` | <ol><li>**Circle(x,y,r) :** Circle object</li><li>**Circle(x,y,r) :** Circle object</li></ol> | **Array(Point(x,y),...)** <br /> Array of all Intersection Point object. Array could be empty |


