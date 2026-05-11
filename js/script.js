// Small script to make the mobile nav toggle work and set the year
document.addEventListener('DOMContentLoaded', function(){
  var navToggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('primary-navigation');
  navToggle.addEventListener('click', function(){
    var expanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', String(!expanded));
    if(!expanded){
      nav.style.display = 'block';
    } else {
      nav.style.display = '';
    }
  });

  var y = new Date().getFullYear();
  var yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = y;
});

// Tabs for About section
document.addEventListener('DOMContentLoaded', function(){
  var tabs = Array.from(document.querySelectorAll('.tabs .tab'));
  if(tabs.length === 0) return;

  function activateTab(tab){
    tabs.forEach(function(t){
      var panelId = t.getAttribute('aria-controls');
      var panel = document.getElementById(panelId);
      if(t === tab){
        t.classList.add('active');
        t.setAttribute('aria-selected','true');
        if(panel){ panel.setAttribute('aria-hidden','false'); }
      } else {
        t.classList.remove('active');
        t.setAttribute('aria-selected','false');
        if(panel){ panel.setAttribute('aria-hidden','true'); }
      }
    });
    tab.focus();
  }

  tabs.forEach(function(tab, idx){
    tab.addEventListener('click', function(){ activateTab(tab); });
    tab.addEventListener('keydown', function(e){
      if(e.key === 'ArrowRight'){
        e.preventDefault();
        var next = tabs[(idx+1) % tabs.length]; activateTab(next);
      } else if(e.key === 'ArrowLeft'){
        e.preventDefault();
        var prev = tabs[(idx-1+tabs.length) % tabs.length]; activateTab(prev);
      }
    });
  });
});
