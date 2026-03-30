
(function(){
  const btn = document.querySelector('.hamburger');
  const mobile = document.getElementById('mobileNav');
  if(btn && mobile){
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      mobile.hidden = expanded;
    });

    mobile.querySelectorAll('a').forEach(a=>{
      a.addEventListener('click', ()=> {
        btn.setAttribute('aria-expanded','false');
        mobile.hidden = true;
      });
    });
  }

  // reveal on scroll
  const els = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add('is-visible'); io.unobserve(e.target); }
    })
  }, {threshold: 0.12});
  els.forEach(el=> io.observe(el));

  // menu filtering
  const tabs = document.querySelectorAll('.tab');
  const cards = document.querySelectorAll('.product');
  function setActive(cat){
    tabs.forEach(t => t.setAttribute('aria-selected', String(t.dataset.cat===cat)));
    cards.forEach(c => {
      const show = (cat==='__all') || (c.dataset.cat===cat);
      c.style.display = show ? '' : 'none';
    });
    const grid = document.getElementById('menuGrid');
    if(grid) grid.setAttribute('data-filter', cat);
  }
  tabs.forEach(t=>{
    t.addEventListener('click', ()=> setActive(t.dataset.cat));
  });
  setActive('__all');
})();
