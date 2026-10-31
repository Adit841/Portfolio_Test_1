varying vec2 vUv;
uniform sampler2D uTexture;
uniform float uPlaneAspect;
uniform float uImageAspect;

void main() {
  vec2 uv = vUv;

  if (uImageAspect > uPlaneAspect) {
    uv.x = (vUv.x - 0.5) * (uPlaneAspect / uImageAspect) + 0.5;
  } else {
    uv.y = (vUv.y - 0.5) * (uImageAspect / uPlaneAspect) + 0.5;
  }

  vec4 tex = texture2D(uTexture, uv);
  gl_FragColor = vec4(tex.rgb, 1.0);

  #include <colorspace_fragment>
}
