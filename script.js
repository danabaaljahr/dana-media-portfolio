const menuToggle=document.querySelector(".menu-toggle");
const nav=document.querySelector(".main-nav");
menuToggle?.addEventListener("click",()=>{
  const open=nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded",open);
});
document.querySelectorAll(".main-nav a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting) entry.target.classList.add("show");
  });
},{threshold:.12});
document.querySelectorAll(".category-card,.feature-card,.gallery-grid figure,.design-grid figure,.video-grid article,.campaign-grid>*,.data-grid>*,.website-grid article,.about-section>*,.contact-section>*")
.forEach(el=>{el.classList.add("reveal");observer.observe(el)});

const topButton=document.querySelector(".floating-top");
window.addEventListener("scroll",()=>{
  topButton.classList.toggle("show",window.scrollY>600);
});
topButton.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));

const sections=[...document.querySelectorAll("main section[id]")];
const navLinks=[...document.querySelectorAll(".main-nav a")];
window.addEventListener("scroll",()=>{
  let current="";
  sections.forEach(section=>{
    const top=section.offsetTop-180;
    if(window.scrollY>=top) current=section.id;
  });
  navLinks.forEach(link=>{
    link.classList.toggle("active",link.getAttribute("href")==="#"+current);
  });
});

const lastUpdatedElement = document.getElementById("lastUpdated");
if (lastUpdatedElement) {
  const rawDate = document.lastModified;
  const parsedDate = rawDate ? new Date(rawDate) : new Date();
  const safeDate = Number.isNaN(parsedDate.getTime()) ? new Date() : parsedDate;
  lastUpdatedElement.textContent = new Intl.DateTimeFormat("ar-SA", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(safeDate);
}

const currentYearElement = document.getElementById("currentYear");
if (currentYearElement) {
  currentYearElement.textContent = new Date().getFullYear().toString();
}
