gsap.registerPlugin(ScrollTrigger);

/* ---------- Cursor custom ---------- */
const cursorDot = document.getElementById('cursorDot');
window.addEventListener('mousemove', e=>{
  gsap.to(cursorDot,{x:e.clientX,y:e.clientY,duration:.4,ease:'power3.out'});
});

/* ---------- Preloader ---------- */
const tlPre = gsap.timeline({
  onComplete(){
    document.getElementById('preloader').style.pointerEvents='none';
    iniciarHero();
  }
});
tlPre.from('#pl-oxe',{opacity:0,y:30,duration:.6,ease:'power3.out'})
     .to('#pl-oxe',{opacity:1,duration:.5})
     .to('#preloader',{yPercent:-100,duration:.9,ease:'power4.inOut',delay:.35});

/* ---------- Hero: entrada em linhas ---------- */
function iniciarHero(){
  const tl = gsap.timeline();
  tl.to('.hero-title .linha span',{
      y:'0%',duration:1.1,ease:'power4.out',stagger:.12
    })
    .to('.hero-eyebrow',{opacity:1,duration:.7,ease:'power2.out'},'-=0.9')
    .to('.hero-sub',{opacity:1,duration:.7,ease:'power2.out'},'-=0.6')
    .to('.hero-scroll',{opacity:1,duration:.7,ease:'power2.out'},'-=0.4');
}

/* ---------- Parallax: Sol de fundo em toda a rolagem ---------- */

/* ---------- Hero: parallax 3D no mouse ---------- */
const heroStage = document.querySelector('.hero-stage');
const heroSection = document.querySelector('.hero');
heroSection.addEventListener('mousemove', e=>{
  const r = heroSection.getBoundingClientRect();
  const px = (e.clientX - r.left)/r.width - .5;
  const py = (e.clientY - r.top)/r.height - .5;
  gsap.to(heroStage,{
    rotateY: px*10,
    rotateX: -py*10,
    duration:.8,ease:'power3.out'
  });
});
heroSection.addEventListener('mouseleave', ()=>{
  gsap.to(heroStage,{rotateY:0,rotateX:0,duration:1,ease:'power3.out'});
});
gsap.to('.hero-title',{
  yPercent:30,opacity:.3,
  scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}
});

/* ---------- Marquee infinito ---------- */
const track = document.getElementById('marqueeTrack');
gsap.to(track,{
  xPercent:-50,
  duration:18,
  repeat:-1,
  ease:'none'
});

/* ---------- Reveal genérico (fade + up) ---------- */
gsap.utils.toArray('.reveal-up').forEach(el=>{
  gsap.from(el,{
    y:50,opacity:0,duration:1,ease:'power3.out',
    scrollTrigger:{trigger:el,start:'top 85%'}
  });
});
gsap.utils.toArray('.reveal-left').forEach((el,i)=>{
  gsap.from(el,{
    x:-40,opacity:0,duration:.9,ease:'power3.out',delay:i*.05,
    scrollTrigger:{trigger:el,start:'top 88%'}
  });
});

/* ---------- Título editorial das seções: reveal por linha ---------- */
gsap.utils.toArray('.editorial-title, .proposito-titulo').forEach(el=>{
  gsap.from(el,{
    y:60,opacity:0,duration:1.1,ease:'power4.out',
    scrollTrigger:{trigger:el,start:'top 85%'}
  });
});
gsap.from('.kicker-num',{opacity:0,x:-20,duration:.7,stagger:.1,
  scrollTrigger:{trigger:'.kicker-num',start:'top 90%'}
});

/* ---------- Mandacaru: parallax vertical ---------- */
gsap.to('.mandacaru-side',{
  y:-120,ease:'none',
  scrollTrigger:{trigger:'.secao-proposito',start:'top bottom',end:'bottom top',scrub:1}
});

/* ---------- Valores: cards com tilt 3D no mouse + entrada ---------- */
gsap.utils.toArray('.valor-card').forEach((card,i)=>{
  gsap.from(card,{
    y:80,opacity:0,rotateX:-15,duration:1,ease:'power3.out',delay:i*.12,
    scrollTrigger:{trigger:'.valores-cards',start:'top 80%'}
  });
  card.addEventListener('mousemove', e=>{
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left)/r.width - .5;
    const py = (e.clientY - r.top)/r.height - .5;
    gsap.to(card,{
      rotateY: px*16,
      rotateX: -py*16,
      duration:.5,ease:'power2.out'
    });
  });
  card.addEventListener('mouseleave', ()=>{
    gsap.to(card,{rotateY:0,rotateX:0,duration:.8,ease:'elastic.out(1,.6)'});
  });
});

/* ---------- Personalidade: deck de cartas com tilt e entrada em leque ---------- */
gsap.utils.toArray('.pers-card').forEach((card,i)=>{
  gsap.from(card,{
    y:60,opacity:0,rotateZ: i%2===0 ? -6 : 6,duration:.9,ease:'power3.out',delay:i*.08,
    scrollTrigger:{trigger:'.pers-grid',start:'top 82%'}
  });
  card.addEventListener('mousemove', e=>{
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left)/r.width - .5;
    const py = (e.clientY - r.top)/r.height - .5;
    gsap.to(card,{rotateY:px*14,rotateX:-py*14,scale:1.03,duration:.4,ease:'power2.out'});
  });
  card.addEventListener('mouseleave', ()=>{
    gsap.to(card,{rotateY:0,rotateX:0,scale:1,duration:.7,ease:'power2.out'});
  });
});

/* ---------- Voz cards: leve rotação alternada ---------- */
gsap.utils.toArray('.voz-card').forEach((el,i)=>{
  gsap.set(el,{rotate: i%2===0 ? -1.2 : 1.2});
});

/* ---------- Como Funciona: passos em stagger ---------- */
gsap.from('.cf-passo',{
  y:40,opacity:0,duration:.8,stagger:.12,ease:'power3.out',
  scrollTrigger:{trigger:'.cf-passos',start:'top 82%'}
});

/* ---------- Feche com a Oxe: cards em stagger ---------- */
gsap.from('.feche-card',{
  y:40,opacity:0,duration:.8,stagger:.1,ease:'power3.out',
  scrollTrigger:{trigger:'.feche-grid',start:'top 82%'}
});
gsap.from('.feche-banner',{
  scale:.96,opacity:0,duration:.9,ease:'power3.out',
  scrollTrigger:{trigger:'.feche-banner',start:'top 88%'}
});

/* ---------- Manifesto: linhas se iluminando conforme rola, pinado ---------- */
(function(){
  const linhas = gsap.utils.toArray('.manifesto-linha');
  ScrollTrigger.create({
    trigger:'#manifesto',
    start:'top top',
    end:'+='+(linhas.length*140),
    pin:true,
    scrub:.5,
    onUpdate(self){
      const idx = self.progress * linhas.length;
      linhas.forEach((l,i)=>{
        gsap.set(l,{opacity: i < idx ? 1 : 0.12});
      });
    }
  });
})();

/* ---------- CTA final: leve zoom-in do título ---------- */
gsap.from('.cta-titulo',{
  scale:.9,opacity:0,duration:1.2,ease:'power4.out',
  scrollTrigger:{trigger:'.secao-cta',start:'top 75%'}
});
gsap.from('.cta-sub, .cta-botoes',{
  y:20,opacity:0,duration:.9,stagger:.1,ease:'power3.out',
  scrollTrigger:{trigger:'.secao-cta',start:'top 65%'}
});

/* ---------- Nav: esconder ao rolar para baixo ---------- */
let lastY = 0;
ScrollTrigger.create({
  start:'top top',
  end:99999,
  onUpdate(self){
    const dir = self.direction;
    gsap.to('.nav',{yPercent: dir === 1 ? -120 : 0, duration:.4, ease:'power2.out'});
  }
});


/* =====================================================
   THREE.JS — SOL DO SERTÃO (fundo 3D do hero, com paralaxe)
===================================================== */
(function heroSun3D(){
  const wrap = document.getElementById('solFundo');
  const canvas = document.getElementById('solCanvas');
  if(!wrap || !canvas || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 100);
  camera.position.set(0,0,9);

  const renderer = new THREE.WebGLRenderer({canvas, antialias:true, alpha:true});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));

  function resize(){
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize);

  const sunGroup = new THREE.Group();

  const coreGeo = new THREE.IcosahedronGeometry(1.55, 1);
  const coreMat = new THREE.MeshBasicMaterial({color:0xE8620A});
  const core = new THREE.Mesh(coreGeo, coreMat);
  sunGroup.add(core);

  const coreGlowGeo = new THREE.IcosahedronGeometry(1.95, 1);
  const coreGlowMat = new THREE.MeshBasicMaterial({color:0xF5C200, transparent:true, opacity:0.16, wireframe:true});
  sunGroup.add(new THREE.Mesh(coreGlowGeo, coreGlowMat));

  const rayMat = new THREE.MeshBasicMaterial({color:0xF5C200, transparent:true, opacity:0.5});
  const rayMatDim = new THREE.MeshBasicMaterial({color:0xE8620A, transparent:true, opacity:0.3});
  const rayCount = 22;
  const rays = [];
  for(let i=0;i<rayCount;i++){
    const long = i % 2 === 0 ? 2.7 : 1.85;
    const rayGeo = new THREE.ConeGeometry(0.055, long, 6);
    const ray = new THREE.Mesh(rayGeo, i % 2 === 0 ? rayMat : rayMatDim);
    const ang = (Math.PI*2/rayCount)*i;
    ray.position.set(Math.cos(ang)*(1.55+long/2), Math.sin(ang)*(1.55+long/2), 0);
    ray.rotation.z = ang - Math.PI/2;
    sunGroup.add(ray);
    rays.push(ray);
  }
  scene.add(sunGroup);

  // poeira do sertão — partículas suspensas
  const particleCount = 240;
  const positions = new Float32Array(particleCount*3);
  for(let i=0;i<particleCount;i++){
    positions[i*3]   = (Math.random()-0.5)*20;
    positions[i*3+1] = (Math.random()-0.5)*20;
    positions[i*3+2] = (Math.random()-0.5)*10 - 2;
  }
  const partGeo = new THREE.BufferGeometry();
  partGeo.setAttribute('position', new THREE.BufferAttribute(positions,3));
  const partMat = new THREE.PointsMaterial({color:0xF9EED1, size:0.05, transparent:true, opacity:0.45});
  const particles = new THREE.Points(partGeo, partMat);
  scene.add(particles);

  let mouseX = 0, mouseY = 0;
  window.addEventListener('mousemove', e=>{
    mouseX = (e.clientX/window.innerWidth) - 0.5;
    mouseY = (e.clientY/window.innerHeight) - 0.5;
  });

  let visible = true;
  document.addEventListener('visibilitychange', ()=>{ visible = !document.hidden; });

  function animate(){
    requestAnimationFrame(animate);
    if(!visible) return;

    sunGroup.rotation.z += 0.0016;
    particles.rotation.y += 0.0005;

    const maxScroll = (document.body.scrollHeight - window.innerHeight) || 1;
    const scrollP = Math.min(1, Math.max(0, window.scrollY / maxScroll));

    camera.position.x += (mouseX*0.7 - camera.position.x) * 0.05;
    camera.position.y += (-mouseY*0.7 - scrollP*3.4 - camera.position.y) * 0.05;
    camera.lookAt(0, -scrollP*3.4, 0);

    particles.position.y = -scrollP*2.4;

    renderer.render(scene, camera);
  }
  animate();
})();

/* =====================================================
   THREE.JS — PIZZA 3D INTERATIVA (arraste pra girar)
===================================================== */
(function pizza3D(){
  const stage = document.getElementById('pizza3dStage');
  const canvas = document.getElementById('pizzaCanvas');
  if(!stage || !canvas || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, stage.clientWidth/stage.clientHeight || 1, 0.1, 100);
  camera.position.set(0, 3.5, 5.6);
  camera.lookAt(0,-0.15,0);

  const renderer = new THREE.WebGLRenderer({canvas, antialias:true, alpha:true});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  function resize(){
    const w = stage.clientWidth, h = stage.clientHeight;
    if(!w || !h) return;
    renderer.setSize(w,h);
    camera.aspect = w/h;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize);

  // ---------- iluminação em 3 pontos ----------
  scene.add(new THREE.HemisphereLight(0xF9EED1, 0x150E05, 0.6));
  scene.add(new THREE.AmbientLight(0xF9EED1, 0.25));
  const key = new THREE.DirectionalLight(0xFFB066, 1.2);
  key.position.set(3,5.5,4);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xF9EED1, 0.35);
  fill.position.set(-4,2,2);
  scene.add(fill);
  const rim = new THREE.PointLight(0xF5C200, 0.75, 20);
  rim.position.set(-3.5,2.2,-3);
  scene.add(rim);

  // ---------- texturas procedurais (canvas) ----------
  function canvasTex(draw, size){
    size = size || 512;
    const c = document.createElement('canvas');
    c.width = c.height = size;
    draw(c.getContext('2d'), size);
    const tex = new THREE.CanvasTexture(c);
    tex.needsUpdate = true;
    return tex;
  }

  const cheeseTex = canvasTex((ctx,size)=>{
    ctx.fillStyle = '#F5C200';
    ctx.fillRect(0,0,size,size);
    for(let i=0;i<150;i++){
      const x = Math.random()*size, y = Math.random()*size, r = 6+Math.random()*22;
      const g = ctx.createRadialGradient(x,y,0,x,y,r);
      if(Math.random()<0.55){
        g.addColorStop(0,'rgba(255,226,130,.6)'); g.addColorStop(1,'rgba(255,226,130,0)');
      } else {
        g.addColorStop(0,'rgba(190,112,18,.4)'); g.addColorStop(1,'rgba(190,112,18,0)');
      }
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fill();
    }
    const edge = ctx.createRadialGradient(size/2,size/2,size*0.32,size/2,size/2,size*0.5);
    edge.addColorStop(0,'rgba(0,0,0,0)'); edge.addColorStop(1,'rgba(110,55,10,.45)');
    ctx.fillStyle = edge;
    ctx.beginPath(); ctx.arc(size/2,size/2,size*0.5,0,Math.PI*2); ctx.fill();
  });

  const woodTex = canvasTex((ctx,size)=>{
    ctx.fillStyle = '#8B5A2B';
    ctx.fillRect(0,0,size,size);
    for(let i=0;i<44;i++){
      const y = Math.random()*size;
      ctx.strokeStyle = `rgba(58,32,13,${0.12+Math.random()*0.22})`;
      ctx.lineWidth = 1+Math.random()*3;
      ctx.beginPath();
      for(let x=0;x<=size;x+=24){ ctx[x===0?'moveTo':'lineTo'](x, y+Math.sin(x*0.02+i)*7); }
      ctx.stroke();
    }
    const v = ctx.createRadialGradient(size/2,size/2,size*0.2,size/2,size/2,size*0.55);
    v.addColorStop(0,'rgba(0,0,0,0)'); v.addColorStop(1,'rgba(0,0,0,.35)');
    ctx.fillStyle = v; ctx.fillRect(0,0,size,size);
  });

  const shadowTex = canvasTex((ctx,size)=>{
    const g = ctx.createRadialGradient(size/2,size/2,0,size/2,size/2,size/2);
    g.addColorStop(0,'rgba(0,0,0,.55)'); g.addColorStop(0.6,'rgba(0,0,0,.25)'); g.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle = g; ctx.fillRect(0,0,size,size);
  });

  const dotTex = canvasTex((ctx,size)=>{
    const g = ctx.createRadialGradient(size/2,size/2,0,size/2,size/2,size/2);
    g.addColorStop(0,'rgba(255,255,255,.85)'); g.addColorStop(1,'rgba(255,255,255,0)');
    ctx.fillStyle = g; ctx.fillRect(0,0,size,size);
  }, 64);

  // ---------- tábua de madeira ----------
  const board = new THREE.Mesh(
    new THREE.CylinderGeometry(2.62, 2.7, 0.14, 48),
    new THREE.MeshStandardMaterial({map:woodTex, roughness:0.85})
  );
  board.position.y = -0.22;
  scene.add(board);

  // sombra de contato (fake AO, mais barato que shadow map real)
  const contactShadow = new THREE.Mesh(
    new THREE.PlaneGeometry(5.6,5.6),
    new THREE.MeshBasicMaterial({map:shadowTex, transparent:true, depthWrite:false})
  );
  contactShadow.rotation.x = -Math.PI/2;
  contactShadow.position.y = -0.145;
  scene.add(contactShadow);

  const pizza = new THREE.Group();

  // crosta orgânica — anel levemente irregular, como massa feita à mão
  const crustGeo = new THREE.TorusGeometry(2.02, 0.27, 20, 90);
  const cPos = crustGeo.attributes.position;
  const v3 = new THREE.Vector3();
  for(let i=0;i<cPos.count;i++){
    v3.fromBufferAttribute(cPos, i);
    const theta = Math.atan2(v3.y, v3.x);
    const noise = Math.sin(theta*3)*0.05 + Math.sin(theta*7+1.3)*0.03 + Math.sin(theta*13+0.4)*0.016;
    const len = Math.hypot(v3.x, v3.y);
    if(len > 0.0001){
      v3.x += (v3.x/len)*noise;
      v3.y += (v3.y/len)*noise;
    }
    cPos.setXYZ(i, v3.x, v3.y, v3.z);
  }
  crustGeo.computeVertexNormals();
  const crust = new THREE.Mesh(crustGeo, new THREE.MeshStandardMaterial({color:0xC98A4B, roughness:0.8}));
  crust.rotation.x = Math.PI/2;
  pizza.add(crust);

  const base = new THREE.Mesh(
    new THREE.CylinderGeometry(2.02, 2.02, 0.22, 60),
    new THREE.MeshStandardMaterial({color:0xE3B072, roughness:0.88})
  );
  pizza.add(base);

  const sauce = new THREE.Mesh(
    new THREE.CylinderGeometry(1.82, 1.82, 0.06, 60),
    new THREE.MeshStandardMaterial({color:0x7A1200, roughness:0.65})
  );
  sauce.position.y = 0.14;
  pizza.add(sauce);

  const cheese = new THREE.Mesh(
    new THREE.CylinderGeometry(1.76, 1.76, 0.06, 60),
    new THREE.MeshStandardMaterial({map:cheeseTex, roughness:0.5, bumpMap:cheeseTex, bumpScale:0.015})
  );
  cheese.position.y = 0.2;
  pizza.add(cheese);

  function varied(mat, hue, light){
    const m = mat.clone();
    m.color.offsetHSL((Math.random()-0.5)*(hue||0.02), 0, (Math.random()-0.5)*(light||0.06));
    return m;
  }
  function scatter(count, build){
    for(let i=0;i<count;i++){
      const ang = Math.random()*Math.PI*2;
      const rad = 0.35 + Math.random()*1.25;
      const mesh = build();
      mesh.position.set(Math.cos(ang)*rad, mesh.position.y || 0.24, Math.sin(ang)*rad);
      pizza.add(mesh);
    }
  }

  // rodelas de carne (tipo pepperoni) — leve variação de cor e tamanho
  const topMat = new THREE.MeshStandardMaterial({color:0x9C3A12, roughness:0.62});
  scatter(9, ()=>{
    const s = 0.9 + Math.random()*0.25;
    const m = new THREE.Mesh(new THREE.CylinderGeometry(0.22,0.22,0.055,18), varied(topMat,0.02,0.1));
    m.scale.set(s,1,s);
    m.position.y = 0.245;
    return m;
  });

  // cubos de queijo coalho
  const cuboMat = new THREE.MeshStandardMaterial({color:0xF9EED1, roughness:0.4});
  scatter(6, ()=>{
    const c = new THREE.Mesh(new THREE.BoxGeometry(0.19,0.19,0.19), varied(cuboMat,0.01,0.05));
    c.rotation.y = Math.random();
    c.position.y = 0.27;
    return c;
  });

  // ervinhas frescas (orégano/coentro), no lugar da pimenta
  const herbMat = new THREE.MeshStandardMaterial({color:0x4B6B2A, roughness:0.65, side:THREE.DoubleSide});
  scatter(16, ()=>{
    const h = new THREE.Mesh(new THREE.PlaneGeometry(0.1,0.032), varied(herbMat,0.04,0.1));
    h.rotation.x = -Math.PI/2 + (Math.random()-0.5)*0.4;
    h.rotation.z = Math.random()*Math.PI;
    h.position.y = 0.235;
    return h;
  });

  pizza.rotation.x = 0.05;
  pizza.position.y = -0.02;
  scene.add(pizza);

  // ---------- vapor subindo (pizza saindo do forno) ----------
  const steamCount = 26;
  const steamData = [];
  const steamGeo = new THREE.BufferGeometry();
  const steamPos = new Float32Array(steamCount*3);
  for(let i=0;i<steamCount;i++){
    const ang = Math.random()*Math.PI*2, rad = Math.random()*1.2;
    steamData.push({ang, rad, speed:0.35+Math.random()*0.35, phase:Math.random()});
    steamPos[i*3] = Math.cos(ang)*rad;
    steamPos[i*3+1] = 0.3 + Math.random()*1.6;
    steamPos[i*3+2] = Math.sin(ang)*rad;
  }
  steamGeo.setAttribute('position', new THREE.BufferAttribute(steamPos,3));
  const steamMat = new THREE.PointsMaterial({map:dotTex, size:0.42, transparent:true, opacity:0.22, depthWrite:false});
  const steam = new THREE.Points(steamGeo, steamMat);
  scene.add(steam);

  // interação: arrastar para girar
  let isDown = false, prevX = 0, prevY = 0, spin = 0.0032;
  const el = renderer.domElement;
  el.style.touchAction = 'none';

  function onDown(x,y){ isDown = true; prevX = x; prevY = y; }
  function onMove(x,y){
    if(!isDown) return;
    const dx = x - prevX, dy = y - prevY;
    pizza.rotation.y += dx*0.008;
    pizza.rotation.x = THREE.MathUtils.clamp(pizza.rotation.x + dy*0.006, -0.45, 0.55);
    spin = dx*0.0009;
    prevX = x; prevY = y;
  }
  function onUp(){ isDown = false; }

  el.addEventListener('pointerdown', e=>{ el.setPointerCapture(e.pointerId); onDown(e.clientX,e.clientY); });
  el.addEventListener('pointermove', e=> onMove(e.clientX,e.clientY));
  el.addEventListener('pointerup', onUp);
  el.addEventListener('pointerleave', onUp);

  let visible = false;
  const io = new IntersectionObserver(entries=>{ visible = entries[0].isIntersecting; }, {threshold:0.15});
  io.observe(stage);

  const clock = new THREE.Clock();

  function animate(){
    requestAnimationFrame(animate);
    if(!visible) return;
    if(!isDown){
      pizza.rotation.y += spin;
      spin *= 0.94;
      if(Math.abs(spin) < 0.0032) spin = 0.0032;
    }

    const dt = Math.min(clock.getDelta(), 0.05);
    const pos = steam.geometry.attributes.position;
    for(let i=0;i<steamCount;i++){
      let y = pos.getY(i) + steamData[i].speed*dt;
      if(y > 2.1){ y = 0.25; }
      pos.setY(i, y);
    }
    pos.needsUpdate = true;
    steamMat.opacity = 0.16 + Math.sin(clock.elapsedTime*1.4)*0.05;

    renderer.render(scene, camera);
  }
  animate();
})();