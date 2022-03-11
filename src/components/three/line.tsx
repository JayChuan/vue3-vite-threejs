import { defineComponent, onMounted } from "vue"
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  LineBasicMaterial,
  BufferGeometry,
  Vector3,
  Line
} from 'three'
export default defineComponent({
  name: 'line',
  setup () {
    const lineRender = () => (
      <div id="line" class="line"></div>
    )
    const scene = new Scene()
    const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500)
    const renderer = new WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.position.set(0, 0, 100)
    camera.lookAt(0, 0, 0)
    // 线条材质
    const material = new LineBasicMaterial({color: 0xf44336})
    const points = [
      new Vector3(-10, 0, 0),
      new Vector3(0, 10, 0),
      new Vector3(10, 0, 0),
    ]
    const geometry = new BufferGeometry().setFromPoints(points)
    const lineElem = new Line(geometry, material)
    scene.add(lineElem)
    // const animate = () => {
    //   requestAnimationFrame(animate)
    //   renderer.render(scene, camera)
    // }
    onMounted(() => {
      const line = document.getElementById('line')
      line?.appendChild(renderer.domElement)
      renderer.render(scene, camera)
    })
    return () => (
      lineRender()
    )
  }
})