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
			   collision = true;
			   if(intersect) {
				   if(d2 === (circle.r * circle.r)) {
					   intersects.push(point);
				   }
			   }
		   }
	   return [collision, intersects];
	}

	// 1.3 - Test la collision entre un point (x,y) et un polygon (Tableau de points [{x,y},{x,y},...]).
	const pointPolygonCollision =  (pointP, polygon,  intersect = false) => {
		let collision = false;
		let intersects = [];
		let pointI = Point();
		pointI.x = 10000 + Math.random()%100;   // 10000 + un nombre aléatoire entre 0 et 99
		pointI.y = 10000 + Math.random()%100;	// 10000 + un nombre aléatoire entre 0 et 99
		let nbintersections = 0;
		let pointOnPoly = false;
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
		        return pointPolygonCollision(pointP,polygon);  // cas limite, on relance la fonction.
		     }
		     nbintersections += iseg;
			  if(!pointOnPoly && intersect) {
				  if(pointSegmentCollision(pointP, pointA, pointB)[0]) {
					  intersects.push(pointP);
					  pointOnPoly = true;
				  }
			  }
		  }
	   if (nbintersections%2==1 || pointOnPoly) {  // nbintersections est-il impair ?
		   collision = true;
	   }
		return [collision, intersects];
	}

	// 1.4 Test si pointP appartient à la droite formée de 2 points A et B.
	const pointLineCollision =  (pointP, pointA, pointB, intersect = false) => {
		let collision = false;
		let intersects = [];
		const s = Slope(pointA, pointB);
		const p = pointA.y - (s * pointA.x);
		if(((s * pointP.x) + p - pointP.y === 0) || (s === Infinity && pointP.x - pointA.x === 0)) {
			collision = true;
			if(intersect) {
				intersects.push(pointP);
			}
		}
		return [collision, intersects];
	}

	// 1.5 Test si pointP appartient au segment formé de 2 points A et B.
	const pointSegmentCollision =  (pointP, pointA, pointB, intersect = false) => {
		let collision = false;
		let intersects = [];
		let d1 = distanceAB(pointP, pointA);
		let d2 = distanceAB(pointP, pointB);
		let sLength = distanceAB(pointA, pointB);
		if(d1+d2 === sLength) {
			collision = true;
			if(intersect) {
				intersects.push(pointP);
			}
		}
		return [collision, intersects];
	}


  // 2. Collisions des rectangles
  	// 2.1 Test la collision entre 2 rectangles
	const rectanglesCollision = (rect1, rect2, intersect = false) => {
		let collision = false;
		let intersects = [];
		if( rect1.x <= rect2.x + rect2.width &&
			rect1.x + rect1.width >= rect2.x &&
			rect1.y <= rect2.y + rect2.height &&
			rect1.height + rect1.y >= rect2.y) {
			collision = true;
			if(intersect) {
				intersects = getRectIntersection(rect1,rect2);
			}
		}
		return [collision, intersects];
	}
	// 2.2 Test la collisition d'un rectangle à l'interieur d'un autre rectangle. (Ex : Box vs Level/plateau de jeu)
	const boundCollision = (rectInside, Limit, intersect = false) => {
		let collision = false;
		let intersects = [];
		if(rectInside.x + rectInside.width > Limit.width || rectInside.x < Limit.x || rectInside.y + rectInside.height > Limit.height || rectInside.y < Limit.y) {
			collision = true;
			if(intersect) {
				intersects = getRectIntersection(rectInside,Limit);
			}
		}
		return [collision, intersects];
	}
	// 2.3 Test la collision entre un rectangle(x,y,width,height) et un cercle(x,y,r).
	const rectangleCircleCollision = (rect, circle, intersect = false) => {
		let collision = false;
		let intersects = [];
		if(!rectanglesCollision(rect, convertCircleToRectangle(circle))[0]) {
			return [collision, intersects];
		}
		let testIntersects = getRectCircleIntersection(rect, circle);
		if(testIntersects.length > 0) {
			collision = true;
			if(intersect) {
				intersects = testIntersects;
			}
		} else {
			collision = false;
		}
		if (pointCircleCollision(Point(rect.x,rect.y), circle)[0]
			|| pointCircleCollision(Point(rect.x,rect.y+rect.height),circle)[0]
			|| pointCircleCollision(Point(rect.x+rect.width,rect.y),circle)[0]
			|| pointCircleCollision(Point(rect.x+rect.width,rect.y+rect.height),circle)[0]) {
			collision = true;
		}
		return [collision, intersects];
	}

	// 2.4 Test la collision entre un rectangle(x,y,width,height) et un polygon (Tableau de points [{x,y},{x,y},...]).
	const rectanglePolygonCollision =  (rectangle, polygon, intersect = false) => {
		return polygonPolygonCollision(convertrectangleToPolygon(rectangle),polygon, intersect = false);
	};

  // 3. Collisions des cercles
  	// 3.1 Test la collision entre 2 cercles (x,y,r)
	const circleCollision = (circle1, circle2, intersect = false) => {
		let collision = false;
		let intersects = [];
		let dx = circle1.x - circle2.x;
		let dy = circle1.y - circle2.y;
		let distance = Math.sqrt((dx * dx) + (dy * dy));
		if (distance <= circle1.r + circle2.r) {
			collision = true;
			if(intersect) {
				intersects = getCircleIntersection(circle1, circle2);
			}
		}
		return [collision, intersects];
	}
	// 3.2 Test la collision entre 1 segment(p1,p2) et 1 cercle(x,y,r)
	const segmentCircleCollision = (pointA, pointB, circle, intersect = false) => {
		let collision = false;
		let intersects = [];
		let firsTest = lineCircleCollision(pointA,pointB,circle,true);

	   if (firsTest[0] == false) {
		   return [collision, intersects];
	   }
	   let ab = Vecteur(pointA,pointB);
	   let ac = Vecteur(pointA,circle);
	   let bc = Vecteur(pointB,circle);
	   let pscal1 = (ab.x * ac.x) + (ab.y * ac.y);  // produit scalaire
	   let pscal2 = ((-ab.x) * bc.x) + ((-ab.y) * bc.y);  // produit scalaire
		if (pscal1>=0 && pscal2>=0) {
		   collision = true;   // I entre A et B, ok.
			if(intersect) {
				intersects = firsTest[1];
			}
	   }
	   // A ou B dans le cercle
	   if (pointCircleCollision(pointA,circle)[0] || pointCircleCollision(pointB,circle)[0]) {
		   collision = true;
		   if(intersect) {
			   intersects = [];
			   for(let i=0;i<firsTest[1].length;i++) {
				   if(pointSegmentCollision(firsTest[1][i], pointA, pointB)[0]) {
					   intersects.push(firsTest[1][i]);
				   }
			   }
		   }
	   }
	   return [collision, intersects];
	}

  // 4. Collisions des polygons
  	// 4.1 Test la collision entre 2 polygons (Gourmand)
  	const polygonPolygonCollision =  (polygonA, polygonB, intersect = false) => {
		let collision = false;
		let intersects = [];
		for(let i = 0;i < polygonA.points.length;i++) {
			let pointA = polygonA.points[i];
		    let pointB = Point();
		    if (i === polygonA.points.length - 1) {  // si c'est le dernier point, on relie au premier
		         pointB = polygonA.points[0];
		    } else { // sinon on relie au suivant.
		         pointB = polygonA.points[i+1];
		    }
		    let col = segmentPolygonCollision(pointA, pointB, polygonB, intersect);
			if(col[0]) {
				collision = true
				if(intersect) {
					intersects = intersects.concat(col[1]);
				}
			}
		}
		return [collision, deduplicatePoints(intersects)];
	}


  // 5. Collisions des droites
  	// 5.1 Test la collision entre une droite et 1 cercle(x,y,r)
	const lineCircleCollision = (pointA, pointB, circle, intersect = false) => {
		let collision = false;
		let intersects = [];
	   let u = Vecteur(pointA, pointB);
	   let ac = Vecteur(circle, pointA);
	   let numerateur = (u.x * ac.y) - (u.y * ac.x);
	   if (numerateur < 0) {
	      numerateur = -numerateur ;   // valeur absolue ; si c'est négatif, on prend l'opposé.
	   }
	   let denominateur = Math.sqrt((u.x * u.x) + (u.y * u.y));
	   let ci = numerateur / denominateur;
	   if (ci<=circle.r) {
		   collision = true;
	   }
	   if(collision && intersect) {
		   intersects = getLineCircleIntersection(pointA, pointB, circle);
	   }
		return [collision, intersects];
	}
	// 5.2 Test la collision entre une droite et un segment
	const lineSegmentCollision = (pointA, pointB, pointO, pointP, intersect = false) => {
	  let collision = false;
	  let intersects = [];
	  let ab = Vecteur(pointA,pointB);
	  let ap = Vecteur(pointA,pointP);
	  let ao = Vecteur(pointA,pointO);
	  if (((ab.x * ap.y) - (ab.y * ap.x)) * ((ab.x * ao.y) - (ab.y * ao.x)) < 0) {
	     collision = true;
		  if(intersect) {
			  intersects = getLineIntersection(pointA, pointB, pointO, pointP);
		  }
	  }
	  return [collision, intersects];
	}

  // 6. Collisions des segments
  	// 6.1 Test la collision entre 2 segments
	const segmentsCollision = (pointA, pointB, pointO, pointP, intersect = false) => {
		let collision = false;
		let intersects = [];
		if (lineSegmentCollision(pointA,pointB,pointO,pointP)[0] === false) {
			return [collision, intersects];  // inutile d'aller plus loin si le segment [OP] ne touche pas la droite (AB)
		}
		if (lineSegmentCollision(pointO,pointP,pointA,pointB)[0] === false) {
			return [collision, intersects];
		}
		collision = true;
		if(intersect) {
			intersects = getLineIntersection(pointA, pointB, pointO, pointP);
		}
		return [collision, intersects];
	}
	// 6.2 Test la collision entre 2 segments, forme paramétrique (Ce calcul permet de calculer un point d'intersection)
	const segmentsCollisionParametric = (pointA, pointB, pointO, pointP, intersect = false) => {
	  let collision = false;
	  let intersects = [];
	  if (lineSegmentCollision(pointA,pointB,pointO,pointP)[0] === false) {
		 return [collision, intersects];  // inutile d'aller plus loin si le segment [OP] ne touche pas la droite (AB)
	  }
	  let ab = Vecteur(pointA,pointB);
	  let op = Vecteur(pointO,pointP);
	  let k = -((pointA.x * op. y) - (pointO.x * op.y) - (op.x * pointA.y) + (op.x * pointO.y)) / ((ab.x * op.y) - (ab.y * op.x));
	  if (k >= 0 && k <= 1) {
		  collision = true;
	  }
	  if(intersect) {
	  	  let itr = getLineIntersection(pointA, pointB, pointO, pointP)
		  if(itr) {
			  intersects.push(itr);
		  }
	  }
	  return [collision, intersects];
	}

	// 6.3 Test la collision entre un segment et un rectangle 
	const segmentRectangleCollision = (pointA, pointB, rect, intersect = false) => {
		return segmentPolygonCollision(pointA, pointB, convertrectangleToPolygon(rect), intersect);
	}
	// 6.4 Test la collision entre un segment et un polygon 
	const segmentPolygonCollision = (pointA, pointB, polygon, intersect = false) => {
		let collision = false;
		let intersects = [];
		for(let i=0;i < polygon.points.length; i++) {
			let pointO = polygon.points[i];
		    let pointP = Point();
		     if (i == polygon.points.length - 1) {  // si c'est le dernier point, on relie au premier
		         pointP = polygon.points[0];
		     } else { // sinon on relie au suivant.
		         pointP = polygon.points[i+1];
		     }
		     let col = segmentsCollisionParametric(pointA,pointB,pointO,pointP, intersect);
		     if(col[0]) {
				 collision = true;
				 if(intersect) {
				 	intersects = intersects.concat(col[1]);
				 }
		     }  
		}
		return [collision, intersects];
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

	// Calcul du point d'intersection de 2 droites
	const getLineIntersection = (PointA, PointB, PointC, PointD) => {
		const s1 = PointD.x - PointC.x;
		const s2 = PointB.x - PointA.x;
		let s3 = null;
		let s4 = null;
		const s5 = PointB.y - PointA.y;
		const s6 = PointD.y - PointC.y;
		let s7 = null;
		let m1 = s1 * s5;
		let m2 = s6 * s2;
		if(m1 !== m2) { // Si les lignes ne sont pas parrallèle
			s3 = PointA.y - PointC.y;
			s4 = PointA.x - PointC.x;
			s7 = m2 - m1;
			let Ua = ((s1 * s3) - (s6 * s4)) / s7;
			let Ub = ((s2 * s3) - (s5 * s4)) / s7;

			if(Ua > 0 && Ua < 1 && Ub > 0 && Ub < 1) {
				let ix = PointA.x + (Ua * s2);
				let iy = PointA.y + (Ua * s5);
				return Point(ix, iy);
			}
		}
		return false;
	}
	// Calcul des points d'intersections de 2 rectangles
	const getRectIntersection = (rect1, rect2) => {
		let intersects = [];
		let r1 = convertrectangleToPolygon(rect1);
		let r2 = convertrectangleToPolygon(rect2);
		for(let i=0;i<r1.points.length;i++) {
			let pointA = r1.points[i];
			let pointB = Point();
			if (i == r1.points.length - 1) {  // si c'est le dernier point, on relie au premier
				pointB = r1.points[0];
			} else {  // sinon on relie au suivant.
				pointB = r1.points[i + 1];
			}
			for(let e=0;e<r2.points.length;e++) {
				let pointC = r2.points[e];
				let pointD = Point();
				if (e == r2.points.length - 1) {  // si c'est le dernier point, on relie au premier
					pointD = r2.points[0];
				} else {  // sinon on relie au suivant.
					pointD = r2.points[e + 1];
				}
				let getIntersect = segmentsCollisionParametric(pointA, pointB, pointC, pointD, true);
				if(getIntersect[0] && getIntersect[1].length >0) {
					intersects = intersects.concat(getIntersect[1]);
				}
			}
		}
		return intersects;
	}
	// Calcul des points d'intersection entre une droite et un cercle
	const getLineCircleIntersection = (pointA, pointB, circle) => {
		let intersects = [];
		const LAB = distanceAB(pointA, pointB);
		const Dx = (pointB.x - pointA.x) / LAB;
		const Dy = (pointB.y - pointA.y) / LAB;
		const t = Dx * (circle.x - pointA.x) + Dy * (circle.y - pointA.y);
		const Ex = t * Dx + pointA.x;
		const Ey = t * Dy + pointA.y;
		const LEC = distanceAB(Point(Ex, Ey), Point(circle.x, circle.y));
		if(LEC < circle.r) {
			let dt = Math.sqrt( (circle.r * circle.r) - (LEC * LEC))
			let Fx = (t - dt) * Dx + pointA.x;
			let Fy = (t - dt) * Dy + pointA.y;
			intersects.push(Point(Fx, Fy));
			let Gx = (t + dt) * Dx + pointA.x;
			let Gy = (t + dt) * Dy + pointA.y;
			intersects.push(Point(Gx, Gy));
		} else if(LEC === circle.r) {
			intersects.push(Point(Ex, Ey));
		}
		return intersects;
	}

	// Calcul des points d'intersection d'un rectangle et d'un cercle
	const getRectCircleIntersection = (rect, circle) => {
		let intersects = [];
		let r = convertrectangleToPolygon(rect);
		for(let i=0;i<r.points.length;i++) {
			let pointA = r.points[i];
			let pointB = Point();
			if (i === r.points.length - 1) {  // si c'est le dernier point, on relie au premier
				pointB = r.points[0];
			} else {  // sinon on relie au suivant.
				pointB = r.points[i + 1];
			}
			let getIntersect = segmentCircleCollision(pointA, pointB, circle, true);
			if(getIntersect[0] && getIntersect[1].length >0) {
				intersects = intersects.concat(getIntersect[1]);
			}
		}

		return deduplicatePoints(intersects);
	}

	// Calcul des points d'intersection de deux cercle
	const getCircleIntersection = (circle1, circle2) => {
		const EPS = 0.0000001;
		let intersects = [];
		let r, R, d, dx, dy, cx, cy, Cx, Cy;
		if (circle1.r < circle2.r) {
			r  = circle1.r;  R = circle2.r;
			cx = circle1.x; cy = circle1.y;
			Cx = circle2.x; Cy = circle2.y;
		} else {
			r  = circle2.r; R  = circle1.r;
			Cx = circle1.x; Cy = circle1.y;
			cx = circle2.x; cy = circle2.y;
		}
		dx = cx - Cx;
		dy = cy - Cy;
		d = Math.sqrt( (dx * dx) + (dy * dy) );
		// Cercles l'un sur l'autre
		if (d < EPS && Math.abs(R-r) < EPS) {
			return intersects;
		// Cercles l'un dans l'autre
		} else if (d < EPS) {
			return intersects;
		}
		let x = (dx / d) * R + Cx;
		let y = (dy / d) * R + Cy;
		let P = Point(x, y);

		// Cercles disjoint.
		if ( (d+r) < R || (R+r < d) ) {
			return intersects;
		}
		// Une seule intersection (les cercles se touchent juste)
		if (Math.abs((R+r)-d) < EPS || Math.abs(R-(r+d)) < EPS) {
			intersects.push(P);
			return intersects;
		};
		var C = Point(Cx, Cy);
		var angle = acossafe((r*r-d*d-R*R)/(-2.0*d*R));
		var pt1 = rotatePoint(C, P, +angle);
		var pt2 = rotatePoint(C, P, -angle);
		intersects.push(pt1);
		intersects.push(pt2);
		return intersects;
	}

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

// Utilitaire
	const deduplicatePoints = (arr) => {
		let a = arr.reduce((accumulator, current) => {
			if (checkIfAlreadyExist(current)) {
				return accumulator;
			} else {
				return [...accumulator, current];
			}
			function checkIfAlreadyExist(currentVal) {
				return accumulator.some((item) => {
					return (item.x === currentVal.x &&
						item.y === currentVal.y);
				});
			}
		}, []);
		return a;
	}
	const acossafe = (x) => {
		if (x >= +1.0) return 0;
		if (x <= -1.0) return Math.PI;
		return Math.acos(x);
	}
	const rotatePoint = (fp, pt, a) => {
		let x = pt.x - fp.x;
		let y = pt.y - fp.y;
		let xRot = x * Math.cos(a) + y * Math.sin(a);
		let yRot = y * Math.cos(a) - x * Math.sin(a);
		return Point(fp.x + xRot,fp.y + yRot);
	}

	return {
		rectanglesCollision,
		pointCircleCollision,
		boundCollision,
		circleCollision,
		pointRectangleCollision,
		rectangleCircleCollision,
		pointPolygonCollision,
		pointSegmentCollision,
		rectanglePolygonCollision,
		polygonPolygonCollision,
		pointLineCollision,
		lineCircleCollision,
		segmentCircleCollision,
		segmentPolygonCollision,
		segmentRectangleCollision,
		convertRectangleToSegments,
		convertPolygonToSegments,
		convertCircleToPolygon,
		convertrectangleToPolygon,

		segmentsCollision,
		getLineIntersection,

		distanceAB
	}
}