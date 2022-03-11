import { defineComponent, onMounted } from 'vue'

import { Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, MeshBasicMaterial, Mesh } from 'three'


export default defineComponent({
  name: 'box',
  setup () {
    const scene = new Scene()
    const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 )
    const renderer = new WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    const geometry = new BoxGeometry()
    const material = new MeshBasicMaterial({color: 0xffffff})
    const cube = new Mesh(geometry, material)
    scene.add(cube)
    camera.position.z = 5
    const animate = () => {
      cube.rotation.x += 0.01
      cube.rotation.y += 0.01
      requestAnimationFrame(animate)
      renderer.render(scene, camera)
    }
    const renderDom = () => (
      <div id="box" class="box"></div>
    )
    onMounted(() => {
      const sceneDom = document.getElementById('box')
      sceneDom?.appendChild(renderer.domElement)
      animate()
    })
    return () => (
      renderDom()
    )
  }
})