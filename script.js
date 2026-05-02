/* CURSOR */
const cur=document.getElementById('cur'),ring=document.getElementById('cur-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY});
(function loop(){rx+=(mx-rx)*.16;ry+=(my-ry)*.16;cur.style.left=mx+'px';cur.style.top=my+'px';ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(loop)})();
 
/* DATA */
const feats=[
  {icon:'✦',h:'Contextual AI',p:'Understands your brand, style guide, and design history — not just what you ask for right now.'},
  {icon:'◈',h:'Smart Components',p:'Generates production-ready component systems that follow your existing tokens and patterns.'},
  {icon:'⬡',h:'Live Collaboration',p:'Real-time multiplayer editing with presence indicators, comments, and version branching.'},
  {icon:'◉',h:'Design Tokens',p:'Auto-extracts and maintains a living token library synced with your code repositories.'},
  {icon:'▣',h:'Motion Studio',p:'AI-choreographed animations that feel considered and human — export as Lottie or CSS.'},
  {icon:'◫',h:'Accessibility Engine',p:'Continuous WCAG 2.1 AA checks baked into the workflow — not an afterthought.'},
];
document.getElementById('featGrid').innerHTML=feats.map((f,i)=>`
<div class="feat-card reveal" style="transition-delay:${i*.07}s">
  <div class="feat-icon">${f.icon}</div>
  <div class="feat-h">${f.h}</div>
  <p class="feat-p">${f.p}</p>
  <a href="#" class="feat-link">Learn more →</a>
</div>`).join('');
 
const tests=[
  {stars:'★★★★★',q:'"Lumina cut our design-to-dev handoff time in half. The token sync alone is worth the subscription."',name:'Arjun Mehta',role:'Design Lead, Stripe',init:'AM'},
  {stars:'★★★★★',q:'"I was sceptical about AI design tools. Lumina changed my mind — it feels like a collaborator, not a crutch."',name:'Sofia Chen',role:'Senior Designer, Notion',init:'SC'},
  {stars:'★★★★★',q:'"The component generation is scary good. It understood our design system from the first import."',name:'James Okafor',role:'Design Eng, Linear',init:'JO'},
];
document.getElementById('testGrid').innerHTML=tests.map((t,i)=>`
<div class="test-card reveal" style="transition-delay:${i*.1}s">
  <div class="test-stars">${t.stars}</div>
  <p class="test-quote">${t.q}</p>
  <div class="test-author">
    <div class="test-avatar">${t.init}</div>
    <div><div class="test-name">${t.name}</div><div class="test-role">${t.role}</div></div>
  </div>
</div>`).join('');
 
const plans=[
  {plan:'Starter',price:'$0',period:'per month, forever',features:['3 projects','50 AI generations/mo','Basic components','Community support'],cta:'Get Started',style:'light',featured:false},
  {plan:'Pro',price:'$29',period:'per month, billed monthly',features:['Unlimited projects','500 AI generations/mo','Advanced components','Motion Studio','Priority support','Token sync'],cta:'Start Free Trial',style:'dark',featured:true,badge:'Most Popular'},
  {plan:'Team',price:'$79',period:'per seat/month',features:['Everything in Pro','Unlimited generations','Live collaboration','Custom brand AI','SSO & security','Dedicated support'],cta:'Contact Sales',style:'light',featured:false},
];
document.getElementById('pricingGrid').innerHTML=plans.map((p,i)=>`
<div class="price-card${p.featured?' featured':''} reveal" style="transition-delay:${i*.1}s">
  ${p.badge?`<div class="price-badge">${p.badge}</div>`:''}
  <div class="price-plan">${p.plan}</div>
  <div class="price-amount">${p.price}</div>
  <div class="price-period">${p.period}</div>
  <div class="price-divider"></div>
  <ul class="price-features">${p.features.map(f=>`<li>${f}</li>`).join('')}</ul>
  <button class="price-cta ${p.style==='dark'?'price-cta-dark':'price-cta-light'}">${p.cta}</button>
</div>`).join('');
 
const faqs=[
  {q:'Can I import my existing Figma files?',a:'Yes — Lumina connects directly to your Figma workspace and reads your existing component library, styles, and tokens.'},
  {q:'How does the AI learn my brand?',a:'You provide a brief during onboarding (or import your existing design system) and Lumina builds a contextual model specific to your brand.'},
  {q:'Is there a free plan?',a:'Absolutely. Our Starter plan is free forever with no credit card required. Upgrade when you need more.'},
  {q:'What happens to my data?',a:'Your designs stay yours. We never train models on your data without explicit consent. SOC 2 Type II certified.'},
  {q:'Can my whole team use it?',a:'Yes — our Team plan includes multiplayer collaboration, shared libraries, and admin controls for managing access.'},
];
document.getElementById('faqGrid').innerHTML=faqs.map((f,i)=>`
<div class="faq-item">
  <button class="faq-q" onclick="this.closest('.faq-item').classList.toggle('open')">${f.q}<span class="icon">+</span></button>
  <div class="faq-a"><p>${f.a}</p></div>
</div>`).join('');
 
/* CANVAS — Floating orbs */
function initOrbs(id,dark){
  const c=document.getElementById(id);if(!c)return;
  const ctx=c.getContext('2d');let t=0;
  function r(){c.width=c.offsetWidth;c.height=c.offsetHeight||600}r();new ResizeObserver(r).observe(c);
  const orbs=Array.from({length:8},(_,i)=>({x:.1+Math.random()*.8,y:.1+Math.random()*.8,r:.08+Math.random()*.12,speed:.0003+Math.random()*.0004,phase:Math.random()*Math.PI*2}));
  function d(){
    const w=c.width,h=c.height;ctx.clearRect(0,0,w,h);
    orbs.forEach(o=>{
      const x=(o.x+Math.sin(t*o.speed*60+o.phase)*.06)*w;
      const y=(o.y+Math.cos(t*o.speed*50+o.phase)*.05)*h;
      const r=o.r*Math.min(w,h);
      const grd=ctx.createRadialGradient(x,y,0,x,y,r);
      if(dark){grd.addColorStop(0,'rgba(184,150,90,.18)');grd.addColorStop(.5,'rgba(184,150,90,.06)');grd.addColorStop(1,'transparent')}
      else{grd.addColorStop(0,'rgba(184,150,90,.22)');grd.addColorStop(.5,'rgba(212,180,131,.08)');grd.addColorStop(1,'transparent')}
      ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fillStyle=grd;ctx.fill();
    });
    t+=.016;requestAnimationFrame(d);
  }
  requestAnimationFrame(d);
}
initOrbs('heroCanvas',false);initOrbs('ctaCanvas',true);
 
/* REVEAL */
const obs=new IntersectionObserver(e=>e.forEach(en=>{if(en.isIntersecting)en.target.classList.add('vis')}),{threshold:.1});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
