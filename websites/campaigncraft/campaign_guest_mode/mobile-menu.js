
(() => {
  const mq = window.matchMedia('(max-width: 760px)');
  let home = null;
  const button = document.querySelector('.mobile-menu-button');
  const drawer = document.querySelector('.mobile-site-menu');
  if (!button || !drawer) return;

  function openMenu() {
    document.body.classList.add('mobile-menu-open');
    button.setAttribute('aria-expanded','true');
    drawer.setAttribute('aria-hidden','false');
  }
  function closeMenu() {
    document.body.classList.remove('mobile-menu-open');
    button.setAttribute('aria-expanded','false');
    drawer.setAttribute('aria-hidden','true');
  }

  function moveNode(node, slot) {
    if (!node || !slot || slot.contains(node)) return;
    if (!node.__menuHome) node.__menuHome = {parent: node.parentNode, next: node.nextSibling};
    slot.appendChild(node);
  }
  function restoreNode(node) {
    const h=node?.__menuHome;
    if (!node || !h?.parent || node.parentNode===h.parent) return;
    if (h.next && h.next.parentNode===h.parent) h.parent.insertBefore(node,h.next); else h.parent.appendChild(node);
  }
  function syncLayout() {
    const topbar=document.querySelector('.topbar');
    const nav=topbar?.querySelector(':scope > nav') || drawer.querySelector('nav');
    const theme=topbar?.querySelector(':scope > .theme-switcher') || drawer.querySelector('.theme-switcher');
    const account=topbar?.querySelector(':scope > .account-controls') || drawer.querySelector('.account-controls');
    if (mq.matches) {
      moveNode(nav, drawer.querySelector('.mobile-nav-slot'));
      moveNode(theme, drawer.querySelector('.mobile-preferences-slot'));
      moveNode(account, drawer.querySelector('.mobile-account-slot'));
    } else {
      [nav,theme,account].forEach(restoreNode);
      closeMenu();
    }
  }

  button.addEventListener('click', () => document.body.classList.contains('mobile-menu-open') ? closeMenu() : openMenu());
  document.querySelectorAll('[data-mobile-menu-close]').forEach(el=>el.addEventListener('click',closeMenu));
  drawer.addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', e => { if (e.key==='Escape') closeMenu(); });
  mq.addEventListener?.('change',syncLayout);

  const observer=new MutationObserver(syncLayout);
  observer.observe(document.querySelector('.topbar'),{childList:true});
  syncLayout();
  setTimeout(syncLayout,100);
  setTimeout(syncLayout,500);
})();
