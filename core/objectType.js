export const Rectangle = (x, y, width, height) => ({
    x, 
    y, 
    width, 
    height
  });

export const Circle = (x, y, r) => ({
    x, 
    y,
    r
  });

export const Point = (x, y) => ({
    x,
    y
  });

export const Vecteur = (A, B) => {
  let x = (B.x - A.x);
  let y = (B.y - A.y);
  return {x,y}
}

export const Polygon = (points) => ({ // [{x,y},{x,y},...]
    points : points
});


export const EndPoint = (x, y, beginsSegment, segment, angle) => ({
  ...Point(x, y),
    beginsSegment,
    segment,
    angle
  });

export const Segment = (x1, y1, x2, y2) => {
    const p1 = EndPoint(x1, y1);
    const p2 = EndPoint(x2, y2);
    const segment = { p1, p2, d: 0 };

    p1.segment = segment;
    p2.segment = segment;

    return segment;
};
// Coefficient directeur d'une droite formée par pointA et pointB
export const Slope = (pointA, pointB) => {
    return (pointB.y - pointA.y) / (pointB.x - pointA.x);
}
