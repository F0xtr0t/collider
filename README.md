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
// Array : [true, []]
// First entry => Boolean : Collision (or not)
// Second entry => Array : List of intersection points (if asked)
```

| Methods | Arguments | Response | 
|----------|-------------|------| 
| pointRectangleCollision(point, rect, intersect = false) | <ol><li>**Point(x,y) :** Point object</li><li>**Rectangle(x,y,width,height) :** Rectangle object</li><li>**Boolean(Optionnal) :** If intersection points needed</li></ol> | **Array(Boolean, Array())** <ol><li>Collision or not</li><li>List of intersection points</li><ol> |
| pointCircleCollision(point, circle, intersect = false) | <ol><li>**Point(x,y) :** Point object</li><li>**Circle(x,y,r) :** Circle object</li><li>**Boolean(Optionnal) :** If intersection points needed</li></ol> | same  |
| pointPolygonCollision(point, polygon, intersect = false) | <ol><li>**Point(x,y) :** Point object</li><li>**Polygon([{x,y},{x,y},...]) :** Polygon object</li><li>**Boolean(Optionnal) :** If intersection points needed</li></ol> | same  |
| pointLineCollision(pointP, pointA, pointB, intersect = false) | <ol><li>**Point(x,y) :** Point object</li><li>**Point(x,y) :** Line first point (Point object)</li><li>**Point(x,y) :** Line second point (Point object)</li><li>**Boolean(Optionnal) :** If intersection points needed</li></ol> | same  |
| pointSegmentCollision(pointP, pointA, pointB, intersect = false) | <ol><li>**Point(x,y) :** Point object</li><li>**Point(x,y) :** Segment start point (Point object)</li><li>**Point(x,y) :** Segment end point (Point object)</li><li>**Boolean(Optionnal) :** If intersection points needed</li></ol> | same  |


