varying vec2 vUv;
uniform float uScrollSpeed;
uniform float uHalfHeight;

void main() {
  vec3 pos = position;

  float normalizeY = pos.y / uHalfHeight;
  float curveFactor = 1.0 - normalizeY * normalizeY;

  pos.x += uScrollSpeed * curveFactor * 0.45;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  vUv = uv;
}
