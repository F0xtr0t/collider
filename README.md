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
| pointRectangleCollision(point, rect, intersect = false) | 1. Point(x,y) : Point object 2. Rectangle(x,y,width,height) : Rectangle object 3. Boolean(Optionnal) : If intersection points needed | Array(Boolean, Array()) 1. Collision or not 2. List of intersection points |
| pointCircleCollision(point, circle, intersect = false) | 1. Point(x,y) : Point object 2. Circle(x,y,r) : Circle object 3. Boolean(Optionnal) : If intersection points needed | Array(Boolean, Array())  |


