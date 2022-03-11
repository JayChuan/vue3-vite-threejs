import {defineComponent, onMounted } from 'vue'
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  sRGBEncoding,
  Color,
  PMREMGenerator,
  AnimationMixer,
  Clock
} from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'

export default defineComponent({
  name: 'load',
  setup () {
    let mixer: any
    const clock = new Clock()
    const stats = Stats()
    const loadRender = () => (
      <div id="loader" class="loader"></div>
    )
    const renderer = new WebGLRenderer()
    renderer.setPixelRatio( window.devicePixelRatio )
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.outputEncoding = sRGBEncoding

    const pmremGenerator = new PMREMGenerator(renderer)
    const scene = new Scene()
    scene.background = new Color(0xbfe3dd)
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture

    const camera = new PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 100 );
    camera.position.set( 5, 2, 8 );

    const controls = new OrbitControls( camera, renderer.domElement );
    controls.target.set( 0, 0.5, 0 );
    controls.update();
    controls.enablePan = false;
    controls.enableDamping = true;

    
    const animate = () => {
      requestAnimationFrame(animate)
      const delta = clock.getDelta()
      mixer.update(delta)
      controls.update()
      stats.update()
      renderer.render(scene, camera)
    }
    onMounted(() => {
      const load = document.getElementById('loader')
      load?.appendChild(renderer.domElement)
			load?.appendChild( stats.dom );
      const dracoLoader = new DRACOLoader()
      dracoLoader.setDecoderPath('/node_modules/three/examples/js/libs/draco/gltf/')

      const loader = new GLTFLoader()
      loader.setDRACOLoader(dracoLoader)
      loader.load('src/assets/gltf/LittlestTokyo.glb', (gltf) => {
        const model = gltf.scene
        model.position.set( 1, 1, 0 )
        model.scale.set( 0.01, 0.01, 0.01 )
        scene.add( model )
        mixer = new AnimationMixer(model)
        mixer.clipAction(gltf.animations[0]).play()
        animate()
      }, undefined, function ( error ) {
        console.error( error )
      })
    })
    
    return () => (
      loadRender()
    )
  }
})