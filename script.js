const header=document.querySelector('.site-header');
const menuBtn=document.querySelector('.menu-btn');
const nav=document.querySelector('.nav-links');

const setHeader=()=>header?.classList.toggle('scrolled',window.scrollY>20);
setHeader();
window.addEventListener('scroll',setHeader,{passive:true});

const setMenu=open=>{
  menuBtn?.classList.toggle('open',open);
  nav?.classList.toggle('open',open);
  header?.classList.toggle('menu-open',open);
  document.body.classList.toggle('menu-open',open);
  menuBtn?.setAttribute('aria-expanded',String(open));
  menuBtn?.setAttribute('aria-label',open?'Close menu':'Open menu');
};

menuBtn?.addEventListener('click',()=>setMenu(!nav?.classList.contains('open')));
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));

if('IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}
  }),{threshold:.1});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
}else{
  document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));
}

const dateInput=document.getElementById('visitDate');
if(dateInput){
  const now=new Date();
  dateInput.min=new Date(now.getTime()-now.getTimezoneOffset()*60000).toISOString().split('T')[0];
}

const clean=value=>(value||'').trim();

document.getElementById('bookingForm')?.addEventListener('submit',event=>{
  event.preventDefault();
  const type=document.getElementById('spaceType')?.value||'workspace';
  const date=document.getElementById('visitDate')?.value;
  const people=clean(document.getElementById('people')?.value);
  const name=clean(document.getElementById('visitorName')?.value);
  const notes=clean(document.getElementById('notes')?.value);
  const details=[];
  if(date) details.push(`Date: ${date}`);
  if(people) details.push(`People: ${people}`);
  if(notes) details.push(`Notes: ${notes}`);
  const intro=name?`Hi RuangKu, I'm ${name}.`:'Hi RuangKu.';
  const message=[`${intro} I'd like to check availability for your ${type}.`,details.join('\n'),'Could you share the availability and details?'].filter(Boolean).join('\n\n');
  window.open(`https://wa.me/601111096978?text=${encodeURIComponent(message)}`,'_blank','noopener,noreferrer');
});

const modal=document.getElementById('roleModal');
const modalRole=document.getElementById('modalRole');
let selectedRole='';

const openModal=role=>{
  selectedRole=role;
  if(modalRole) modalRole.textContent=role;
  modal?.classList.add('open');
  modal?.setAttribute('aria-hidden','false');
  document.body.classList.add('modal-open');
  setTimeout(()=>document.getElementById('applicantName')?.focus(),180);
};

const closeModal=()=>{
  modal?.classList.remove('open');
  modal?.setAttribute('aria-hidden','true');
  document.body.classList.remove('modal-open');
};

document.querySelectorAll('.role-row').forEach(row=>row.addEventListener('click',()=>openModal(row.dataset.role)));
document.querySelectorAll('[data-close-modal]').forEach(el=>el.addEventListener('click',closeModal));

document.addEventListener('keydown',event=>{
  if(event.key!=='Escape') return;
  if(modal?.classList.contains('open')) closeModal();
  if(nav?.classList.contains('open')) setMenu(false);
});

document.getElementById('applyWhatsApp')?.addEventListener('click',()=>{
  const name=clean(document.getElementById('applicantName')?.value);
  const status=clean(document.getElementById('applicantStatus')?.value);
  const intro=name?`Hi RuangKu, I'm ${name}.`:'Hi RuangKu.';
  const details=status?`Qualification / status: ${status}\n\n`:'';
  const message=`${intro} I'd like to apply for the ${selectedRole} position for the September 2026 intake.\n\n${details}I can share my CV / portfolio here. Please let me know the next step. Thank you.`;
  window.open(`https://wa.me/601111096978?text=${encodeURIComponent(message)}`,'_blank','noopener,noreferrer');
});