(() => {
  const $ = id => document.getElementById(id);
  const STORAGE_KEY = 'campaigncraft_campaigns_v2';
  const SESSION_KEY = 'campaigncraft_current_campaign_v2';
  const colors = {draft:'#9aa4b5',active:'#b8ff3d',completed:'#62e7c2',archived:'#ad8cff'};
  const labels = {draft:'مسودة',active:'قيد التنفيذ',completed:'مكتملة',archived:'مؤرشفة'};
  const metricIds = ['Impressions','Reach','Views','Likes','Comments','Shares','Saves','Clicks','Conversions','Followers','Downloads','Registrations','Revenue','Spend'];
  const targetIds = ['Engagement','ViewRate','Ctr','Conversion','ReachCount','ViewsCount','LikesCount','CommentsCount','SharesCount','SavesCount','ClicksCount','ConversionsCount','FollowersCount','DownloadsCount','RegistrationsCount','RevenueCount'];
  const read = () => { try{return JSON.parse(localStorage.getItem(STORAGE_KEY))||[]}catch{return[]} };
  const write = x => localStorage.setItem(STORAGE_KEY,JSON.stringify(x));
  const number = id => Math.max(0,Number($(id)?.value)||0);
  const fmt = n => new Intl.NumberFormat('ar-SA',{notation:n>=10000?'compact':'standard',maximumFractionDigits:1}).format(n||0);
  const pct = n => Number.isFinite(n) ? `${n.toFixed(2)}%` : '—';
  const escapeHtml = s => String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  function renderPortfolio(){
    const campaigns=read();
    const counts=Object.fromEntries(Object.keys(labels).map(s=>[s,campaigns.filter(c=>c.status===s).length]));
    const total=campaigns.length; const parts=[]; let start=0;
    Object.keys(labels).forEach(s=>{const share=total?counts[s]/total*100:0;if(share){parts.push(`${colors[s]} ${start}% ${start+share}%`);start+=share;}});
    $('portfolioDonut').style.setProperty('--donut',parts.length?`conic-gradient(${parts.join(',')})`:'conic-gradient(#252b36 0 100%)');
    $('donutTotal').textContent=total;$('portfolioCompletion').textContent=total?`${Math.round(counts.completed/total*100)}% مكتملة`:'0%';
    $('donutLegend').innerHTML=Object.keys(labels).map(s=>`<div><i style="background:${colors[s]}"></i><span>${labels[s]}</span><b>${counts[s]}</b></div>`).join('');
    const analyzed=campaigns.filter(c=>Number.isFinite(c.analytics?.score));
    const avg=analyzed.length?Math.round(analyzed.reduce((a,c)=>a+c.analytics.score,0)/analyzed.length):null;
    const best=analyzed.slice().sort((a,b)=>b.analytics.score-a.analytics.score)[0];
    $('portfolioInsights').innerHTML=`<article><strong>${analyzed.length}</strong><span>حملات أمكن الحكم عليها ببيانات كافية</span></article><article><strong>${avg==null?'—':avg+'%'}</strong><span>متوسط تحقيق الأهداف المحددة</span></article><article><strong>${best?escapeHtml(best.name):'—'}</strong><span>${best?`الأعلى تحقيقًا لأهدافها: ${best.analytics.score}%`:'لا توجد حملة مكتملة القياس بعد'}</span></article>`;
  }

  function goalMode(){
    const goal=$('goal')?.value||'awareness';
    if(['sales','leads','traffic','adoption','fundraising','recruitment'].includes(goal))return'conversion';
    if(['engagement','retention'].includes(goal))return'engagement';
    if(['educationGoal','behaviorChange','socialImpact','crisis'].includes(goal))return'education';
    return'awareness';
  }

  function validate(m){
    const issues=[];
    if(m.impressions && m.reach > m.impressions)issues.push('الوصول أكبر من مرات الظهور. راجعي الأرقام أو تعريف المنصة للمؤشرين قبل الاعتماد على النتيجة.');
    if(m.impressions && m.views > m.impressions)issues.push('المشاهدات أكبر من مرات الظهور؛ قد تكون الوحدات مأخوذة من فترات أو تقارير مختلفة.');
    if(m.reach && (m.likes+m.comments+m.shares+m.saves)>m.reach*3)issues.push('عدد التفاعلات مرتفع جدًا مقارنة بالوصول. تأكدي أن الأرقام لنفس الفترة ونفس المنشورات.');
    if(!m.reach&&!m.impressions)issues.push('لا يمكن حساب معدل التفاعل أو CTR بدقة دون الوصول أو مرات الظهور.');
    return issues;
  }

  function analyze(metrics,targets){
    const base=metrics.reach||metrics.impressions||0;
    const interactions=metrics.likes+metrics.comments+metrics.shares+metrics.saves;
    const engagement=base?interactions/base*100:NaN;
    const ctr=base?metrics.clicks/base*100:NaN;
    const conversion=metrics.clicks?metrics.conversions/metrics.clicks*100:NaN;
    const viewDen=metrics.impressions||metrics.reach||0;
    const viewRate=viewDen?metrics.views/viewDen*100:NaN;
    const cpc=metrics.clicks?metrics.spend/metrics.clicks:NaN;
    const cpa=metrics.conversions?metrics.spend/metrics.conversions:NaN;
    const mode=goalMode();
    const relevant=mode==='conversion'?['ctr','conversion','engagement']:mode==='engagement'?['engagement','viewRate']:mode==='education'?['viewRate','engagement','ctr']:['viewRate','engagement'];
    const actual={engagement,viewRate,ctr,conversion};
    const pairs=relevant.filter(k=>Number.isFinite(actual[k])&&targets[k]>0).map(k=>({key:k,actual:actual[k],target:targets[k],achievement:actual[k]/targets[k]*100}));
    const countActual={reach:metrics.reach,views:metrics.views,likes:metrics.likes,comments:metrics.comments,shares:metrics.shares,saves:metrics.saves,clicks:metrics.clicks,conversions:metrics.conversions,followers:metrics.followers,downloads:metrics.downloads,registrations:metrics.registrations,revenue:metrics.revenue};
    Object.entries(countActual).forEach(([k,v])=>{const target=targets[k+'Count'];if(v>0&&target>0)pairs.push({key:k,actual:v,target,achievement:v/target*100})});
    const score=pairs.length>=2?Math.round(Math.min(100,pairs.reduce((a,x)=>a+Math.min(120,x.achievement),0)/pairs.length)):null;
    const confidence=base<100?'insufficient':base<500?'low':base<2000?'medium':'high';
    const finalScore=confidence==='insufficient'?null:score;
    return {base,interactions,engagement,ctr,conversion,viewRate,cpc,cpa,score:finalScore,rawScore:score,mode,pairs,confidence,issues:validate(metrics)};
  }

  const confidenceText={insufficient:'العينة أقل من 100؛ لا تكفي للحكم',low:'ثقة منخفضة',medium:'ثقة متوسطة',high:'ثقة جيدة'};
  function recommendations(m,a){
    const r=[];
    if(a.confidence==='insufficient')r.push('لا تعتمدي نتيجة نجاح أو فشل الآن: اجمعي بيانات من وصول لا يقل عن 100 على الأقل، والأفضل عينة أكبر قبل تغيير الخطة جذريًا.');
    if(a.issues.length)r.push('راجعي جودة البيانات أولًا؛ اختلاف الفترات أو كون الوصول أكبر من الظهور يجعل المقارنة غير موثوقة.');
    if(Number.isFinite(a.viewRate)&&a.viewRate<20)r.push('المشاهدة منخفضة: اختصري المقدمة وابدئي بالفائدة أو المشكلة من أول ثانيتين.');
    if(Number.isFinite(a.engagement)&&a.engagement<1)r.push('التفاعل منخفض: اختبري سؤالًا واضحًا، Carousel قابلًا للحفظ، أو محتوى يدفع للمشاركة بدل الاكتفاء بالمعلومة العامة.');
    if(Number.isFinite(a.ctr)&&a.ctr<0.5)r.push('CTR منخفض: اجعلي CTA واحدًا ومحددًا، ووضحي الفائدة من النقر ومكان الرابط.');
    if(a.mode==='conversion'&&Number.isFinite(a.conversion)&&a.conversion<1)r.push('التحويل منخفض: راجعي صفحة الوصول، قللي الخطوات، واختبري عرضًا أو دليل ثقة أوضح.');
    if(a.score!=null&&a.score<70)r.unshift('الحملة لم تحقق أهداف القياس المحددة بعد؛ عدّلي أضعف مؤشر فقط ثم أعيدي الاختبار للمقارنة.');
    else if(a.score!=null)r.unshift('الحملة حققت أغلب أهداف القياس المحددة. وسّعيها تدريجيًا مع مراقبة النسب نفسها.');
    if(!r.length)r.push('أدخلي أهداف القياس والبيانات الأساسية حتى تظهر توصيات مرتبطة بالنتيجة الفعلية.');
    return r.slice(0,6);
  }

  function setDonut(el,legend,data){
    const total=data.reduce((a,x)=>a+x.value,0);let start=0;const grad=[];
    data.forEach(x=>{const sh=total?x.value/total*100:0;if(sh){grad.push(`${x.color} ${start}% ${start+sh}%`);start+=sh;}});
    el.style.setProperty('--donut',grad.length?`conic-gradient(${grad.join(',')})`:'conic-gradient(#252b36 0 100%)');
    legend.innerHTML=data.map(x=>`<div><i style="background:${x.color}"></i><span>${x.label}</span><b>${fmt(x.value)}</b></div>`).join('');
  }

  function comparison(actual,target){
    if(!Number.isFinite(actual)||!target)return '<small class="metric-comparison">لا يوجد هدف للمقارنة</small>';
    const diff=actual-target,good=diff>=0;return `<small class="metric-comparison ${good?'good':'bad'}">${good?'حقق الهدف بفارق':'أقل من الهدف بفارق'} ${Math.abs(diff).toFixed(2)} نقطة</small>`;
  }

  function renderAnalytics(metrics,targets){
    const a=analyze(metrics,targets);
    $('analyticsEmpty').classList.add('hidden');$('analyticsResults').classList.remove('hidden');
    const validation=$('analyticsValidation');validation.classList.toggle('hidden',!a.issues.length);validation.innerHTML=a.issues.map(x=>`• ${escapeHtml(x)}`).join('<br>');
    const ring=$('successRing');ring.classList.toggle('is-unknown',a.score==null);
    $('successScore').textContent=a.score==null?'—':`${a.score}%`;ring.style.setProperty('--score',`${(a.score||0)*3.6}deg`);
    let level;
    if(a.score==null)level=['لا يمكن الحكم',`${confidenceText[a.confidence]}. حددي هدفين على الأقل من مؤشرات الحملة وأدخلي بيانات كافية ومتسقة.`];
    else if(a.score>=85)level=['حققت الأهداف','الحملة حققت أهداف القياس المحددة وفق البيانات المدخلة.'];
    else if(a.score>=70)level=['قريبة من النجاح','الحملة حققت معظم الأهداف، مع وجود مؤشر أو أكثر يحتاج تحسينًا.'];
    else level=['لم تحقق الأهداف','النسب الفعلية أقل من الأهداف المحددة؛ لا يُنصح بالتوسع قبل الاختبار والتحسين.'];
    $('successLabel').textContent=level[0];$('successHeadline').textContent=a.score==null?'البيانات الحالية لا تكفي لنتيجة موثوقة':`تحقيق أهداف الحملة: ${a.score} من 100`;$('successSummary').textContent=level[1];
    const cards=[['معدل التفاعل',a.engagement,'engagement'],['معدل المشاهدة',a.viewRate,'viewRate'],['معدل النقر CTR',a.ctr,'ctr'],['معدل التحويل',a.conversion,'conversion']];
    $('derivedMetrics').innerHTML=cards.map(([label,val,key])=>`<article><strong>${pct(val)}</strong><span>${label}</span>${comparison(val,targets[key])}</article>`).join('')+`<article><strong>${confidenceText[a.confidence]}</strong><span>موثوقية الحكم</span><small class="metric-comparison">حسب حجم الوصول المدخل</small></article>`;
    const bars=[['الوصول',metrics.reach],['المشاهدات',metrics.views],['التفاعل',a.interactions],['النقرات',metrics.clicks],['الإجراءات',metrics.conversions],['متابعون',metrics.followers],['تحميلات',metrics.downloads],['تسجيلات',metrics.registrations]];const max=Math.max(...bars.map(x=>x[1]),1);
    $('performanceBars').innerHTML=bars.map(x=>`<div class="metric-bar-row"><span>${x[0]}</span><div class="metric-bar-track"><div class="metric-bar-fill" style="width:${x[1]?Math.max(1,x[1]/max*100):0}%"></div></div><b>${fmt(x[1])}</b></div>`).join('');
    const engagement=[{label:'إعجابات',value:metrics.likes,color:'#b8ff3d'},{label:'تعليقات',value:metrics.comments,color:'#62e7c2'},{label:'مشاركات',value:metrics.shares,color:'#73a8ff'},{label:'حفظ',value:metrics.saves,color:'#ad8cff'}];
    setDonut($('engagementDonut'),$('engagementLegend'),engagement);$('engagementTotal').textContent=fmt(a.interactions);
    $('analyticsRecommendations').innerHTML=recommendations(metrics,a).map(x=>`<p>${escapeHtml(x)}</p>`).join('');
    return a;
  }

  function loadCurrentAnalytics(){
    const id=localStorage.getItem(SESSION_KEY);const c=read().find(x=>x.id===id);const m=c?.analytics?.metrics;const t=c?.analytics?.targets||{};
    metricIds.forEach(k=>{const el=$(`metric${k}`);if(el)el.value=m?.[k.toLowerCase()]??''});
    targetIds.forEach(k=>{const el=$(`target${k}`);if(el)el.value=t?.[k.charAt(0).toLowerCase()+k.slice(1)]??''});
    if(m)renderAnalytics(m,t);else{$('analyticsEmpty')?.classList.remove('hidden');$('analyticsResults')?.classList.add('hidden');$('analyticsValidation')?.classList.add('hidden');}
  }

  $('saveAnalytics')?.addEventListener('click',()=>{
    const id=localStorage.getItem(SESSION_KEY);if(!id){alert('احفظي الحملة أولًا ثم أضيفي نتائجها.');return;}
    const metrics=Object.fromEntries(metricIds.map(k=>[k.toLowerCase(),number(`metric${k}`)]));
    const targets={engagement:number('targetEngagement'),viewRate:number('targetViewRate'),ctr:number('targetCtr'),conversion:number('targetConversion'),reachCount:number('targetReachCount'),viewsCount:number('targetViewsCount'),likesCount:number('targetLikesCount'),commentsCount:number('targetCommentsCount'),sharesCount:number('targetSharesCount'),savesCount:number('targetSavesCount'),clicksCount:number('targetClicksCount'),conversionsCount:number('targetConversionsCount'),followersCount:number('targetFollowersCount'),downloadsCount:number('targetDownloadsCount'),registrationsCount:number('targetRegistrationsCount'),revenueCount:number('targetRevenueCount')};
    if(!Object.values(metrics).some(Boolean)){alert('أضيفي قيمة واحدة على الأقل من نتائج الحملة.');return;}
    const analysis=analyze(metrics,targets);const campaigns=read();const i=campaigns.findIndex(c=>c.id===id);if(i<0)return;
    campaigns[i].analytics={metrics,targets,score:analysis.score,confidence:analysis.confidence,updatedAt:new Date().toISOString()};campaigns[i].updatedAt=new Date().toISOString();write(campaigns);
    renderAnalytics(metrics,targets);renderPortfolio();window.dispatchEvent(new CustomEvent('campaigncraft:library-updated'));
    const toast=$('saveToast');if(toast){toast.textContent=analysis.score==null?'تم الحفظ — لا توجد بيانات كافية للحكم':'تم حفظ النتائج ومقارنتها بالأهداف ✓';toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),2200)}
  });

  window.addEventListener('campaigncraft:library-updated',renderPortfolio);
  document.addEventListener('click',e=>{if(e.target.closest('[data-open]'))setTimeout(loadCurrentAnalytics,250);if(e.target.closest('#newCampaign'))setTimeout(loadCurrentAnalytics,100)});
  window.addEventListener('load',()=>{renderPortfolio();setTimeout(loadCurrentAnalytics,150)});
})();
