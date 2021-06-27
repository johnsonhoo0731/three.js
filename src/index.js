import * as THREE from 'three'
import { OrbitControls } from './orbit-controls'

function main() {
  const canvas = document.createElement('canvas')
  canvas.id = 'canvas'
  document.body.appendChild(canvas)
  const renderer = new THREE.WebGLRenderer({ canvas })
  const camera = new THREE.PerspectiveCamera(
    90,
    document.body.clientWidth / document.body.clientheight,
    0.1,
    100
  )
  camera.position.z = 0.01
  const scene = new THREE.Scene()
  const controls = new OrbitControls(camera, renderer.domElement)
  useBox()

  function useBox() {
    const materials = []
    const texture_left = new THREE.TextureLoader().load(
      require('./images/scene_left.jpeg')
    )
    materials.push(new THREE.MeshBasicMaterial({ map: texture_left }))

    const texture_right = new THREE.TextureLoader().load(
      require('./images/scene_right.jpeg')
    )
    materials.push(new THREE.MeshBasicMaterial({ map: texture_right }))

    const texture_top = new THREE.TextureLoader().load(
      require('./images/scene_top.jpeg')
    )
    materials.push(new THREE.MeshBasicMaterial({ map: texture_top }))

    const texture_bottom = new THREE.TextureLoader().load(
      require('./images/scene_bottom.jpeg')
    )
    materials.push(new THREE.MeshBasicMaterial({ map: texture_bottom }))

    const texture_front = new THREE.TextureLoader().load(
      require('./images/scene_front.jpeg')
    )
    materials.push(new THREE.MeshBasicMaterial({ map: texture_front }))

    const texture_back = new THREE.TextureLoader().load(
      require('./images/scene_back.jpeg')
    )
    materials.push(new THREE.MeshBasicMaterial({ map: texture_back }))

    const box = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), materials)
    box.geometry.scale(1, 1, -1)
    scene.add(box)
  }

  function render(time) {
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement
      camera.aspect = canvas.clientWidth / canvas.clientHeight
      camera.updateProjectionMatrix()
    }

    renderer.render(scene, camera)

    requestAnimationFrame(render)
  }

  requestAnimationFrame(render)

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement
    const pixelRatio = window.devicePixelRatio
    const width = (canvas.clientWidth * pixelRatio) | 0
    const height = (canvas.clientHeight * pixelRatio) | 0
    const needResize = canvas.width !== width || canvas.height !== height
    if (needResize) {
      renderer.setSize(width, height, false)
    }
    return needResize
  }
}

main()
