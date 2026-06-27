(() => {
  const $=id=>document.getElementById(id);
  const SURVEY_KEY='campaigncraft_surveys_v1';
  const db=window.campaignCraftSupabase||null;
  const isUuid=value=>/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(String(value||''));
  const decode=s=>JSON.parse(decodeURIComponent(escape(atob(s.replace(/-/g,'+').replace(/_/g,'/').padEnd(Math.ceil(s.length/4)*4,'=')))));
  const safe=s=>String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const THEME_KEY='campaigncraft_theme_v1';
  const applyTheme=(theme='dark')=>{
    const isLight=theme==='light';
    document.body.classList.toggle('light',isLight);
    document.body.classList.toggle('dark',!isLight);
    document.querySelectorAll('[data-theme-choice]').forEach(btn=>{
      const active=btn.dataset.themeChoice===theme;
      btn.classList.toggle('active',active);
      btn.setAttribute('aria-pressed',active?'true':'false');
    });
    document.querySelectorAll('[data-theme-toggle]').forEach(btn=>{
      btn.classList.toggle('is-light',isLight);
      btn.setAttribute('aria-pressed',isLight?'true':'false');
      btn.setAttribute('aria-label',isLight?'التبديل إلى الوضع الداكن':'التبديل إلى الوضع الفاتح');
    });
  };
  applyTheme(localStorage.getItem(THEME_KEY)||'dark');
  document.querySelectorAll('[data-theme-choice]').forEach(btn=>btn.addEventListener('click',()=>{
    const theme=btn.dataset.themeChoice;
    localStorage.setItem(THEME_KEY,theme);
    applyTheme(theme);
  }));
  document.querySelectorAll('[data-theme-toggle]').forEach(btn=>btn.addEventListener('click',()=>{
    const next=document.body.classList.contains('light')?'dark':'light';
    localStorage.setItem(THEME_KEY,next);
    applyTheme(next);
  }));
  let survey,responsePackage;

  async function loadSurvey(){
    const params=new URLSearchParams(location.search);
    const surveyId=params.get('id');
    const legacyPayload=params.get('s');

    if(surveyId&&db&&isUuid(surveyId)){
      const {data,error}=await db
        .from('surveys')
        .select('id,title,description,questions,is_published')
        .eq('id',surveyId)
        .eq('is_published',true)
        .maybeSingle();
      if(!error&&data){
        survey={
          id:data.id,
          title:data.title,
          description:data.description,
          language:'ar',
          questions:Array.isArray(data.questions)?data.questions:[]
        };
      }else if(error){
        console.error('Could not load published survey:',error);
      }
    }

    // Backward compatibility for links created before the clean-link update.
    if(!survey&&legacyPayload){
      try{survey=decode(legacyPayload);}catch(error){console.error('Invalid legacy survey link:',error);}
    }

    if(!survey?.questions?.length){
      $('surveyInvalid').classList.remove('hidden');
      return;
    }

    document.documentElement.lang=survey.language||'ar';
    $('surveyFormCard').classList.remove('hidden');
    $('publicTitle').textContent=survey.title;
    $('publicDescription').textContent=survey.description||'نقدّر مشاركتك. يستغرق الاستبيان دقائق قليلة.';
    $('publicQuestions').innerHTML=survey.questions.map((q,i)=>`<article class="public-question" data-id="${q.id}"><h3>${i+1}. ${safe(q.text)} ${q.required?'<em>*</em>':''}</h3>${renderInput(q)}</article>`).join('');
    bindSurveyInteractions();
    updateProgress();
  }
  function renderInput(q){
    if(q.type==='text')return `<textarea name="${q.id}" ${q.required?'required':''} placeholder="اكتب إجابتك هنا"></textarea>`;
    if(q.type==='scale')return `<div class="scale-options">${['1','2','3','4','5'].map(v=>`<label><input type="radio" name="${q.id}" value="${v}" ${q.required?'required':''}><b>${v}</b></label>`).join('')}</div>`;
    const type=q.type==='multiple'?'checkbox':'radio';return `<div class="public-options">${q.options.map(o=>`<label class="public-option"><input type="${type}" name="${q.id}" value="${safe(o)}" ${q.required&&type==='radio'?'required':''}><span>${safe(o)}</span></label>`).join('')}</div>`;
  }
  function updateProgress(){const required=survey.questions.filter(q=>q.required),done=required.filter(q=>{const els=[...document.querySelectorAll(`[name="${CSS.escape(q.id)}"]`)];return els.some(e=>e.type==='radio'||e.type==='checkbox'?e.checked:e.value.trim());}).length;const pct=required.length?Math.round(done/required.length*100):100;$('progressText').textContent=`${pct}%`;$('progressBar').style.width=`${pct}%`;}
  function bindSurveyInteractions(){
    $('publicSurveyForm').addEventListener('input',updateProgress);
    $('publicSurveyForm').addEventListener('change',updateProgress);
    $('publicSurveyForm').onsubmit=async e=>{
    e.preventDefault();
    const submitButton=e.currentTarget.querySelector('[type="submit"]');
    const originalText=submitButton.textContent;
    submitButton.disabled=true;
    submitButton.textContent='جارٍ حفظ الإجابة...';
    const answers={};
    for(const q of survey.questions){
      const els=[...document.querySelectorAll(`[name="${CSS.escape(q.id)}"]`)];
      if(q.type==='multiple')answers[q.id]=els.filter(x=>x.checked).map(x=>x.value);
      else{
        const chosen=els.find(x=>x.checked)||els[0];
        answers[q.id]=chosen?.type==='textarea'?chosen.value.trim():chosen?.value||'';
      }
      if(q.required&&(Array.isArray(answers[q.id])?!answers[q.id].length:!answers[q.id])){
        alert('يرجى الإجابة عن جميع الأسئلة المطلوبة.');
        submitButton.disabled=false;
        submitButton.textContent=originalText;
        return;
      }
    }

    responsePackage={
      id:crypto.randomUUID?crypto.randomUUID():`response-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      surveyId:survey.id,
      survey:{id:survey.id,title:survey.title},
      answers,
      submittedAt:new Date().toISOString()
    };

    let savedToDatabase=false;
    let databaseError=null;
    if(db&&isUuid(survey.id)){
      const {error}=await db.from('survey_responses').insert({
        survey_id:survey.id,
        answers
      });
      if(error) databaseError=error;
      else savedToDatabase=true;
    }else{
      databaseError=new Error('الاستبيان قديم أو الاتصال بقاعدة البيانات غير متاح');
    }

    try{
      const list=JSON.parse(localStorage.getItem(SURVEY_KEY))||[];
      const i=list.findIndex(s=>s.id===survey.id);
      if(i>=0){
        list[i].responses=list[i].responses||[];
        list[i].responses.push(responsePackage);
        list[i].updatedAt=new Date().toISOString();
        localStorage.setItem(SURVEY_KEY,JSON.stringify(list));
      }
    }catch{}

    if(savedToDatabase){
      $('thanksMessage').textContent='تم حفظ إجابتك بنجاح في قاعدة البيانات. شكرًا لوقتك ومشاركتك.';
      $('downloadResponse').classList.add('hidden');
    }else{
      console.error('Supabase response insert failed:',databaseError);
      $('thanksMessage').textContent='تعذر إرسال الإجابة إلى قاعدة البيانات. تم الاحتفاظ بنسخة احتياطية على هذا الجهاز، ويمكنك تنزيلها وإرسالها لصاحب الاستبيان.';
      $('downloadResponse').classList.remove('hidden');
    }

    $('surveyFormCard').classList.add('hidden');
    $('surveyThanks').classList.remove('hidden');
    window.scrollTo({top:0,behavior:'smooth'});
    };
    $('downloadResponse').onclick=()=>{if(!responsePackage)return;const blob=new Blob([JSON.stringify(responsePackage,null,2)],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`campaigncraft-response-${survey.id}.json`;a.click();URL.revokeObjectURL(a.href);};
  }
  loadSurvey();
})();
