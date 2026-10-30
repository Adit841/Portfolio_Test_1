
varying vec2 vUv;
uniform float uScrollSpeed;

void main(){

    vec3 pos = position;    

    float normalizeY = pos.y/0.35;

    float curveFactor = 1.0 - normalizeY * normalizeY;

    pos.x += uScrollSpeed * curveFactor * 0.45;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.0);
    vUv = uv;
}