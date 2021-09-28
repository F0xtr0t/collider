import { Rectangle, Circle, Point, Polygon, EndPoint, Segment, Vecteur, Slope} from './objectType.js';

export const collider = () => {
// COLLISIONS
  // 1. Collisions des points
	// 1.1 - Test la collision entre un point(x,y) et un rectangle(x,y,width,height).
	const pointRectangleCollision = (point, rect, intersect = false) => {
		let collision = false;
		let intersects = [];
		if ( point.x >= rect.x &&
			 point.x <= rect.x + rect.width &&
			 point.y >= rect.y && 
			 point.y <= rect.y + rect.height) {
			 collision = true;
			 if(intersect) {
				 if(
				 	point.x === rect.x ||
					point.y === rect.y ||
				 	point.x === rect.x + rect.width ||
					point.y === rect.y + rect.height) {
					 intersects.push(point);
				 }
			 }
       }
       return [collision, intersects];
	}

	// 1.2 - Test la collision entre un point (x,y) et un cercle (x,y,r);
	const pointCircleCollision = (point, circle, intersect = false) => {
		let collision = false;
		let intersects = [];
		let d2 = ((point.x - circle.x) * (point.x - circle.x)) + ((point.y - circle.y) * (point.y - circle.y));
		   if (d2 <= (circle.r * circle.r)) {
			   if(intersect) {
				   if(d2 === (circle.r * circle.r)) {
					   intersects.push(point);
				   }
			   }
		   }
	   return [collision, intersects];
	}

	// 1.3 - Test la collision entre un point (x,y) et un polygon (Tableau de points [{x,y},{x,y},...]).
	const PointPolygonCollision =  (pointP, polygon) => {
		let pointI = Point();
		pointI.x = 10000 + Math.random()%100;   // 10000 + un nombre aléatoire entre 0 et 99
		pointI.y = 10000 + Math.random()%100;	// 10000 + un nombre aléatoire entre 0 et 99
		let nbintersections = 0;
		for(let i=0;i<polygon.points.length;i++)
		  {
		     let pointA = polygon.points[i];
		     let pointB = Point();

		     if (i==polygon.points.length-1) {  // si c'est le dernier point, on relie au premier
		         pointB = polygon.points[0];
		     } else {         // sinon on relie au suivant.
		         pointB = polygon.points[i+1];
		     }
		     let iseg = intersectsegment(pointA,pointB,pointI,pointP);
		     if (iseg == -1) {
		     	break;
		        return PointPolygonCollision(pointP,polygon);  // cas limite, on relance la fonction.
		     }
		     nbintersections += iseg;
		  }

	   if (nbintersections%2==1) {  // nbintersections est-il impair ?
	     return true;
	   }
	   return false;
	}

	// 1.4 Test la collision entre un point (x,y) et une droite formée de 2 points.
	const PointStraightLineCollision =  (pointP, pointA, pointB) => {
		const s = Slope(pointA, pointB);
		const p = pointA.y - (s * pointA.x);
		//y = (s * x) + p

	}

  // 2. Collisions des rectangles
  	// 2.1 Test la collision entre 2 rectangles
	const rectanglesCollision = (rect1, rect2) => {
		if( rect1.x < rect2.x + rect2.width &&
			rect1.x + rect1.width > rect2.x &&
			rect1.y < rect2.y + rect2.height &&
			rect1.height + rect1.y > rect2.y) {
			return true;
		}
		return false;
	}
	// 2.2 Test la collisition d'un rectangle à l'interieur d'un autre rectangle. (Ex : Box vs Level/plateau de jeu)
	const boundCollision = (rectInside, Limit) => {
		if(rectInside.x + rectInside.width > Limit.width || rectInside.x < Limit.x || rectInside.y + rectInside.height > Limit.height || rectInside.y < Limit.y) {
			return true;
		}
		return false;
	}
	// 2.3 Test la collision entre un rectangle(x,y,width,height) et un cercle(x,y,r).
	const rectangleCircleCollision = (rect, circle) => {
		let circleDistance = {};
		circleDistance.x = Math.abs(circle.x - rect.x - rect.width/2);
		circleDistance.y = Math.abs(circle.y - rect.y - rect.height/2);
		if (circleDistance.x > (rect.width/2 + circle.r)) { return false; }
		if (circleDistance.y > (rect.height/2 + circle.r)) { return false; }
		if (circleDistance.x <= (rect.width/2)) { return true; }
		if (circleDistance.y <= (rect.height/2)) { return true; }
		let cornerDistance_sq = ((circleDistance.x - rect.width/2) * (circleDistance.x - rect.width/2)) + ((circleDistance.y - rect.height/2) * (circleDistance.y - rect.height/2));
		return (cornerDistance_sq <= (circle.r*circle.r));
	}
	// 2.4 Test la collision entre un rectangle(x,y,width,height) et un polygon (Tableau de points [{x,y},{x,y},...]).
	const rectanglePolygonCollision =  (rectangle, polygon) => { 
		return PolygonPolygonCollision(convertrectangleToPolygon(rectangle),polygon);
	};



  // 3. Collisions des cercles
  	// 3.1 Test la collision entre 2 cercles (x,y,r)
	const circleCollision = (circle1, circle2) => {
		let dx = circle1.x - circle2.x;
		let dy = circle1.y - circle2.y;
		let distance = Math.sqrt((dx * dx) + (dy * dy));
		if (distance < circle1.r + circle2.r) {
			return true;
		}
		return false;
	}
	// 3.2 Test la collision entre 1 segment(p1,p2) et 1 cercle(x,y,r)
	const segmentCircleCollision = (pointA, pointB, circle) => {
	   if (droiteCircleCollision(pointA,pointB,circle) == false) {
	     return false;  // si on ne touche pas la droite, on ne touchera jamais le segment
	   }
	   let ab = vecteur(pointA,pointB);
	   let ac = vecteur(pointA,circle);
	   let bc = vecteur(pointB,circle);
	   let pscal1 = (ab.x * ac.x) + (ab.y * ac.y);  // produit scalaire
	   let pscal2 = ((-ab.x) * bc.x) + ((-ab.y) * bc.y);  // produit scalaire
	   if (pscal1>=0 && pscal2>=0) {
	      return true;   // I entre A et B, ok.
	   }
	   // dernière possibilité, A ou B dans le cercle
	   if (pointCircleCollision(pointA,circle)) {
	     return true;
	   }
	   if (pointCircleCollision(pointB,circle)) {
	     return true;
	   }
	   return false;
	}

  // 4. Collisions des polygons
  	// 4.1 Test la collision entre 2 polygons (Gourmand)
  	const PolygonPolygonCollision =  (polygonA, polygonB) => { 
		for(let i = 0;i < polygonA.points.length;i++) {
			let pointA = polygonA.points[i];
		    let pointB = Point();
		    if (i == polygonA.points.length - 1) {  // si c'est le dernier point, on relie au premier
		         pointB = polygonA.points[0];
		    } else { // sinon on relie au suivant.
		         pointB = polygonA.points[i+1];
		    }		
			if(segmentPolygonCollision(pointA, pointB, polygonB)) {
				return true;
			}
		}
		return false;
	}


  // 5. Collisions des droites
  	// 5.1 Test la collision entre une droite et 1 cercle(x,y,r)
	const droiteCircleCollision = (pointA, pointB, circle) => {
	   let u = Vecteur(pointA, pointB);
	   let ac = Vecteur(circle, pointA);
	   let numerateur = (u.x * ac.y) - (u.y * ac.x);
	   if (numerateur < 0) {
	      numerateur = -numerateur ;   // valeur absolue ; si c'est négatif, on prend l'opposé.
	   }
	   let denominateur = Math.sqrt((u.x * u.x) + (u.y * u.y));
	   let ci = numerateur / denominateur;
	   if (ci<circle.r) {
	      return true;
	   }
	   return false;
	}
	// 5.2 Test la collision entre une droite et un segment
	const droiteSegmentCollision = (pointA, pointB, pointO, pointP) => {  
	  let ab = Vecteur(pointA,pointB);
	  let ap = Vecteur(pointA,pointP);
	  let ao = Vecteur(pointA,pointO);
	  if (((ab.x * ap.y) - (ab.y * ap.x)) * ((ab.x * ao.y) - (ab.y * ao.x)) < 0) {
	     return true;
	  }
	  return false;
	}

  // 6. Collisions des segments
  	// 6.1 Test la collision entre 2 segments
	const segmentsCollision = (pointA, pointB, pointO, pointP) => {
		if (droiteSegmentCollision(pointA,pointB,pointO,pointP) == false) {
		  return false;  // inutile d'aller plus loin si le segment [OP] ne touche pas la droite (AB)
		}
		if (droiteSegmentCollision(pointO,pointP,pointA,pointB) == false) {
		  return false;
		}	     
		return true; // ATTENTION COMPARER avec intersectsegment
	}
	// 6.2 Test la collision entre 2 segments, forme paramétrique (Ce calcul permet de calculer un point d'intersection)
	const segmentsCollisionParametric = (pointA, pointB, pointO, pointP) => {
	  if (droiteSegmentCollision(pointA,pointB,pointO,pointP) == false) {
		 return false;  // inutile d'aller plus loin si le segment [OP] ne touche pas la droite (AB)
	  }
	  let ab = Vecteur(pointA,pointB);
	  let op = Vecteur(pointO,pointP);
	  let k = -((pointA.x * op. y) - (pointO.x * op.y) - (op.x * pointA.y) + (op.x * pointO.y)) / ((ab.x * op.y) - (ab.y * op.x));
	  if (k < 0 || k > 1) {
	     return false;
	  }
	  return true; // ATTENTION COMPARER avec intersectsegment
	}

	// 6.3 Test la collision entre un segment et un rectangle 
	const segmentRectangleCollision = (pointA, pointB, rectangle) => {
		return segmentPolygonCollision(pointA, pointB, convertrectangleToPolygon(rectangle));
	}
	// 6.4 Test la collision entre un segment et un polygon 
	const segmentPolygonCollision = (pointA, pointB, polygon) => {
		for(let i=0;i < polygon.points.length; i++) {
			let pointO = polygon.points[i];
		    let pointP = Point();
		     if (i == polygon.points.length - 1) {  // si c'est le dernier point, on relie au premier
		         pointP = polygon.points[0];
		     } else { // sinon on relie au suivant.
		         pointP = polygon.points[i+1];
		     }
		     if(segmentsCollision(pointA,pointB,pointO,pointP)) {
		     	return true;
		     }  
		}
		return false;
	}

// AUTRES CALCUL UTILE
	// 1. Calcul si 2 vecteur/segment se croisent (Vecteur AB et vecteur IP)
	const intersectsegment = (pointA, pointB, pointO, pointP) => { // FONCTION A FUSIONNER EVENTUELLEMENT AVEC segmentsCollisionParametric
		let ab = Vecteur(pointA,pointB);
		let op = Vecteur(pointO,pointP);
   		let denominateur = (ab.x * op.y) - (ab.y * op.x);
   		if(denominateur == 0) { return -1; } // Ex : segments parallèles
   		let t = - (((pointA.x * op.y) - (pointO.x * op.y) - (op.x * pointA.y) + (op.x*pointO.y)) / denominateur);
   		if(t<0 || t >=1) { return 0; }
   		let u = - (-(ab.x * pointA.y) + (ab.x * pointO.y) + (ab.y * pointA.x) - (ab.y * pointO.x)) / denominateur;
   		if (u<0 || u>=1) { return 0; }
   		return 1;
	}

	// Récupère les coordonnées d'un point C Projeté sur une droite
	const projectionPointDroite = (pointA, pointB, pointProjete) => {
		let u = Vecteur(pointA,pointB);
		let ac = Vecteur(pointA,pointProjete)
		let ti = ((u.x * ac.x) + (u.y * ac.y)) / ((u.x * u.x) + (u.y * u.y));
		let i = Point();
		i.x = pointA.x + (ti * u.x);
		i.y = pointA.y + (ti * u.y);
		return i;
	}
	// Calcul si un point C projecté projeté sur un segment AB est en dehors (0) ou dans (1) le segment.
	const projectionPointSegment = (pointA, pointB, pointProjete) => {
		let ac = Vecteur(pointA,pointProjete);
		let ab = Vecteur(pointA,pointB);
		let bc = Vecteur(pointB,pointProjete);
		let s1 = (ac.x * ab.x) + (ac.y * ab.y);
		let s2 = (bc.x * ab.x) + (bc.y * ab.y);
		if (s1 * s2 > 0) {
		   return 0;
		}
		return 1;
	}

	// Calcul d'une normale 
	const calculNormale = (pointA, pointB, pointC) => {
		let u = Vecteur(pointA,pointB);
		let ac = Vecteur(pointA,pointC);
	  	let parenthesis = (u.x *ac.y) - (u.y * ac.x);  // calcul une fois pour les deux
	  	let n = {};
	  	n.x = (-u.y) * parenthesis;
	  	n.y = u.x * parenthesis;
	  	let norme = Math.sqrt((n.x * n.x) + (n.y * n.y));
		n.x /= norme;
		n.y /= norme;
	  	return n;
	}

	// Calculera d'un vecteur de rebond 
	const calculVecteurRebond = (vecteurA, vecteurNormale) => {
		  let vRebond = {};
		  let pscal = ((vecteurA.x * vecteurNormale.x) +  (vecteurA.y * vecteurNormale.y));
		  vRebond.x = vecteurA.x - (2 * pscal * vecteurNormale.x);
		  vRebond.y = vecteurA.y - (2 * pscal * vecteurNormale.y);
		  return vRebond;
	}

	// Distance entre 2 points
	const distanceAB = (a,b) => {
		let carreX = Math.pow((b.x - a.x), 2);
		let carreY = Math.pow((b.y - a.y), 2);
		let distance =  Math.sqrt(carreX + carreY);
		return distance;
	};


// Convertisseur d'elements
	// Converti un rectangle en Polygon
	const convertrectangleToPolygon = (rectangle) => {
		let points = [
			{x:rectangle.x, y:rectangle.y},
			{x:(rectangle.x+rectangle.width), y:rectangle.y},
			{x:(rectangle.x+rectangle.width), y:(rectangle.y+rectangle.height)},
			{x:rectangle.x, y:(rectangle.y+rectangle.height)}
		]
		return Polygon(points);
	};

	// Converti un cercle en rectangle 
	const convertCircleToRectangle = (circle) => {
		return Rectangle(
			(circle.x - circle.r),
			(circle.y - circle.y),
			(circle.r * 2),
			(circle.r * 2)
		);
	};

	// Converti un cercle en polygon de x shape
	const convertCircleToPolygon = (circle, shape) => {
		let n_angles = 2*Math.PI/shape
		// building the value of the `points` attribute for the polygon
		let points = [];
		for(let i = 0; i < shape; i++){
		  let x = circle.x + circle.r * Math.cos(i*n_angles);
		  let y = circle.y + circle.r * Math.sin(i*n_angles);
		  points.push(Point(x,y));
		}
		return Polygon(points);
	}


	//Converti un rectangle en tableau de segments
	const convertRectangleToSegments = (r) => {
		let polygon = convertrectangleToPolygon(r);
		let segments = convertPolygonToSegments(polygon);
		return segments;
	};

	//Converti un polygon en tableau de segments
	const convertPolygonToSegments = (polygon) => {
		let segments = [];
		
		for(let p=0;p<polygon.points.length;p++) {
			let a,b;
			a = polygon.points[p];
			if(polygon.points[p+1]) {
				b = polygon.points[p+1];
			} else {
				b = polygon.points[0];
			}
			segments.push({a:a, b:b});
		}
		return segments;
	};



	return {
		rectanglesCollision,
		pointCircleCollision,
		boundCollision,
		circleCollision,
		pointRectangleCollision,
		rectangleCircleCollision,
		PointPolygonCollision,
		rectanglePolygonCollision,
		PolygonPolygonCollision,

		convertRectangleToSegments,
		convertPolygonToSegments,
		convertCircleToPolygon,
		convertrectangleToPolygon,
		projectionPointDroite,

		distanceAB
	}
}