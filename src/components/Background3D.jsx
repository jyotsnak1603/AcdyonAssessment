import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const PARTICLE_COUNT = 140
const CONNECTION_DIST = 90
const MAX_CONNECTIONS  = 400
const COLORS = [0x6366f1, 0x8b5cf6, 0x22d3ee, 0xf43f5e]

export default function Background3D() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return
    const W = mount.clientWidth, H = mount.clientHeight

    // ── Core ─────────────────────────────────────────────────────────────────
    const scene    = new THREE.Scene()
    scene.fog      = new THREE.FogExp2(0x000008, 0.0018)
    const camera   = new THREE.PerspectiveCamera(55, W / H, 0.1, 3000)
    camera.position.set(0, 80, 420)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    // ── Tron Perspective Grid ─────────────────────────────────────────────────
    const GRID = 1600, DIVS = 28, HALF = GRID / 2, STEP = GRID / DIVS
    const gVerts = [], gCols = []
    const dim = new THREE.Color(0x0d0d26)
    const bright = new THREE.Color(0x6366f1)
    const rose   = new THREE.Color(0xf43f5e)

    for (let i = 0; i <= DIVS; i++) {
      const t = i / DIVS
      const pos = -HALF + i * STEP
      const isCenter = i === DIVS / 2
      const isMajor  = i % 7 === 0

      // Along Z
      gVerts.push(pos, 0, -HALF, pos, 0, HALF)
      // Along X
      gVerts.push(-HALF, 0, pos, HALF, 0, pos)

      const col = isCenter ? rose : isMajor ? bright : dim
      for (let k = 0; k < 4; k++) gCols.push(col.r, col.g, col.b)
    }

    const gridGeo = new THREE.BufferGeometry()
    gridGeo.setAttribute('position', new THREE.Float32BufferAttribute(gVerts, 3))
    gridGeo.setAttribute('color',    new THREE.Float32BufferAttribute(gCols, 3))
    const gridMat = new THREE.LineBasicMaterial({
      vertexColors: true, transparent: true, opacity: 0.4,
      blending: THREE.AdditiveBlending, depthWrite: false,
    })
    const grid = new THREE.LineSegments(gridGeo, gridMat)
    grid.position.y = -160
    grid.rotation.x = 0.18 // slight tilt toward horizon
    scene.add(grid)

    // Horizon glow line
    const hGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-HALF, -160, -500),
      new THREE.Vector3(HALF,  -160, -500),
    ])
    const hMat = new THREE.LineBasicMaterial({
      color: 0x6366f1, transparent: true, opacity: 0.6,
      blending: THREE.AdditiveBlending,
    })
    scene.add(new THREE.Line(hGeo, hMat))

    // ── Glowing Particles ─────────────────────────────────────────────────────
    const ptCanvas = document.createElement('canvas')
    ptCanvas.width = ptCanvas.height = 64
    const ptCtx = ptCanvas.getContext('2d')
    const g = ptCtx.createRadialGradient(32,32,0, 32,32,32)
    g.addColorStop(0,   'rgba(255,255,255,1)')
    g.addColorStop(0.25,'rgba(255,255,255,0.8)')
    g.addColorStop(1,   'rgba(255,255,255,0)')
    ptCtx.fillStyle = g; ptCtx.fillRect(0,0,64,64)
    const sprite = new THREE.CanvasTexture(ptCanvas)

    const posArr   = new Float32Array(PARTICLE_COUNT * 3)
    const colArr   = new Float32Array(PARTICLE_COUNT * 3)
    const livePos  = []
    const vel      = []

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = (Math.random()-0.5)*700
      const y = (Math.random()-0.5)*350
      const z = (Math.random()-0.5)*300
      livePos.push({ x, y, z })
      posArr[i*3]=x; posArr[i*3+1]=y; posArr[i*3+2]=z
      const c = new THREE.Color(COLORS[Math.floor(Math.random()*COLORS.length)])
      colArr[i*3]=c.r; colArr[i*3+1]=c.g; colArr[i*3+2]=c.b
      vel.push({ x:(Math.random()-.5)*0.07, y:(Math.random()-.5)*0.06, z:(Math.random()-.5)*0.025 })
    }

    const ptGeo = new THREE.BufferGeometry()
    ptGeo.setAttribute('position', new THREE.BufferAttribute(posArr,3))
    ptGeo.setAttribute('color',    new THREE.BufferAttribute(colArr,3))
    const ptMat = new THREE.PointsMaterial({
      size:4, map:sprite, vertexColors:true, transparent:true,
      opacity:0.85, blending:THREE.AdditiveBlending, depthWrite:false, sizeAttenuation:true,
    })
    scene.add(new THREE.Points(ptGeo, ptMat))

    // ── Connection Lines ──────────────────────────────────────────────────────
    const lPosArr = new Float32Array(MAX_CONNECTIONS * 6)
    const lColArr = new Float32Array(MAX_CONNECTIONS * 6)
    const lineGeo = new THREE.BufferGeometry()
    lineGeo.setAttribute('position', new THREE.BufferAttribute(lPosArr,3))
    lineGeo.setAttribute('color',    new THREE.BufferAttribute(lColArr,3))
    const lineMat = new THREE.LineBasicMaterial({
      vertexColors:true, transparent:true, opacity:0.18,
      blending:THREE.AdditiveBlending, depthWrite:false,
    })
    const lineSegs = new THREE.LineSegments(lineGeo, lineMat)
    scene.add(lineSegs)

    // ── Floating Data Rings ───────────────────────────────────────────────────
    const ringData = [
      { color:0x6366f1, r:55,  x:-120, y:30,  z:-80 },
      { color:0xf43f5e, r:40,  x:140,  y:-20, z:-60 },
      { color:0x22d3ee, r:70,  x:20,   y:-40, z:-120 },
    ]
    const rings = ringData.map(d => {
      const geo = new THREE.TorusGeometry(d.r, 0.8, 8, 64)
      const mat = new THREE.MeshBasicMaterial({
        color:d.color, transparent:true, opacity:0.13,
        blending:THREE.AdditiveBlending, depthWrite:false,
        wireframe: true,
      })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.set(d.x, d.y, d.z)
      mesh.rotation.set(Math.random()*Math.PI, Math.random()*Math.PI, 0)
      scene.add(mesh)
      return mesh
    })

    // ── Mouse parallax ────────────────────────────────────────────────────────
    let mx=0, my=0
    const onMouse = e => {
      mx = (e.clientX/window.innerWidth -.5)*2
      my = (e.clientY/window.innerHeight-.5)*2
    }
    window.addEventListener('mousemove', onMouse, { passive:true })
    window.addEventListener('resize', () => {
      camera.aspect = mount.clientWidth/mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    })

    // ── Animation ─────────────────────────────────────────────────────────────
    let raf
    const animate = () => {
      raf = requestAnimationFrame(animate)

      for (let i=0; i<PARTICLE_COUNT; i++) {
        livePos[i].x += vel[i].x; livePos[i].y += vel[i].y; livePos[i].z += vel[i].z
        if (Math.abs(livePos[i].x)>350) vel[i].x*=-1
        if (Math.abs(livePos[i].y)>175) vel[i].y*=-1
        if (Math.abs(livePos[i].z)>150) vel[i].z*=-1
        posArr[i*3]=livePos[i].x; posArr[i*3+1]=livePos[i].y; posArr[i*3+2]=livePos[i].z
      }
      ptGeo.attributes.position.needsUpdate=true

      let cc=0
      for (let i=0;i<PARTICLE_COUNT&&cc<MAX_CONNECTIONS;i++) {
        for (let j=i+1;j<PARTICLE_COUNT&&cc<MAX_CONNECTIONS;j++) {
          const dx=livePos[i].x-livePos[j].x
          const dy=livePos[i].y-livePos[j].y
          const dz=livePos[i].z-livePos[j].z
          if (Math.sqrt(dx*dx+dy*dy+dz*dz)<CONNECTION_DIST) {
            const b=cc*6
            lPosArr[b]=livePos[i].x; lPosArr[b+1]=livePos[i].y; lPosArr[b+2]=livePos[i].z
            lPosArr[b+3]=livePos[j].x; lPosArr[b+4]=livePos[j].y; lPosArr[b+5]=livePos[j].z
            const ci=i*3,cj=j*3
            lColArr[b]=(colArr[ci]+colArr[cj])/2; lColArr[b+1]=(colArr[ci+1]+colArr[cj+1])/2; lColArr[b+2]=(colArr[ci+2]+colArr[cj+2])/2
            lColArr[b+3]=lColArr[b]; lColArr[b+4]=lColArr[b+1]; lColArr[b+5]=lColArr[b+2]
            cc++
          }
        }
      }
      lineGeo.setDrawRange(0,cc*2)
      lineGeo.attributes.position.needsUpdate=true
      lineGeo.attributes.color.needsUpdate=true

      rings[0].rotation.x+=0.003; rings[0].rotation.y+=0.002
      rings[1].rotation.y+=0.004; rings[1].rotation.z+=0.002
      rings[2].rotation.x-=0.002; rings[2].rotation.z+=0.003

      camera.position.x += (mx*40 - camera.position.x)*0.04
      camera.position.y += (-my*25 + 80 - camera.position.y)*0.04
      camera.lookAt(0,0,0)
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMouse)
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [])

  return <div ref={mountRef} aria-hidden="true" style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none' }} />
}
