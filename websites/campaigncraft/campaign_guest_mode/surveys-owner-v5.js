function startCampaignCraftAuthenticatedApp(){
(() => {
  const $ = id => document.getElementById(id);
  const SURVEY_KEY = window.CampaignCraftAuth.storageKey('campaigncraft_surveys_v1');
  const CAMPAIGN_KEY = window.CampaignCraftAuth.storageKey('campaigncraft_campaigns_v2');
  const CURRENT_KEY = window.CampaignCraftAuth.storageKey('campaigncraft_current_survey_v1');
  const currentUser = window.CampaignCraftAuth.getUser();
  let currentId = localStorage.getItem(CURRENT_KEY) || '';
  let currentQuestions = [];

  const safe = s => String(s ?? '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const uid = prefix => (['survey','response'].includes(prefix) && crypto.randomUUID) ? crypto.randomUUID() : `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const isUuid = value => /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(String(value||''));
  const db = window.campaignCraftSupabase || null;
  const read = (key, fallback=[]) => { try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch { return fallback; } };
  const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));
  const toast = message => { const el=$('saveToast'); el.textContent=message; el.classList.add('show'); clearTimeout(el._t); el._t=setTimeout(()=>el.classList.remove('show'),1900); };
  const formUrl = survey => `${location.href.replace(/surveys\.html.*$/,'survey.html')}?id=${encodeURIComponent(survey.id)}`;

  async function copyTextSafely(text){
    const value=String(text||'');
    try{
      if(navigator.clipboard && window.isSecureContext){
        await navigator.clipboard.writeText(value);
        return true;
      }
    }catch(error){
      console.warn('Clipboard API failed, using fallback:',error);
    }
    const area=document.createElement('textarea');
    area.value=value;
    area.setAttribute('readonly','');
    area.style.position='fixed';
    area.style.inset='0 auto auto -9999px';
    document.body.appendChild(area);
    area.focus();
    area.select();
    area.setSelectionRange(0,area.value.length);
    let copied=false;
    try{copied=document.execCommand('copy');}catch(error){console.warn('Copy fallback failed:',error);}
    area.remove();
    return copied;
  }

  const templates = {
    audience: [
      {text:'ما الفئة العمرية التي تنتمي إليها؟',type:'single',role:'age',required:true,options:['أقل من 13 سنة','13–17 سنة','18–24 سنة','25–34 سنة','35–44 سنة','45–54 سنة','55 سنة فأكثر']},
      {text:'ما الوصف الأقرب لك؟',type:'single',role:'audienceType',required:true,options:['طالب/ـة','ولي أمر أو فرد من الأسرة','موظف/ـة','متخصص/ـة','صاحب عمل أو صانع قرار','مستفيد من خدمة','أخرى']},
      {text:'في أي نطاق جغرافي تعيش؟',type:'single',role:'location',required:true,options:['جدة','الرياض','المنطقة الغربية','المنطقة الوسطى','المنطقة الشرقية','جميع مناطق المملكة','خارج المملكة']},
      {text:'ما الموضوع أو الفائدة الأكثر أهمية لك؟',type:'multiple',role:'interest',required:true,options:['السلامة والحماية','توفير الوقت','توفير المال','الثقة والمصداقية','التعلم وفهم المعلومات','الترفيه','المشاركة المجتمعية']},
      {text:'ما المنصة التي تستخدمها أكثر لمتابعة هذا النوع من المحتوى؟',type:'single',role:'platform',required:true,options:['Instagram','TikTok','X','Snapchat','YouTube','LinkedIn']}
    ],
    behavior: [
      {text:'عندما تواجه هذا الموضوع، ما التصرف الذي تقوم به غالبًا؟',type:'single',role:'behavior',required:true,options:['أبحث وأتحقق قبل القرار','أعتمد على رأي الأسرة أو الأصدقاء','أتخذ القرار بسرعة','أتجاهل الموضوع غالبًا','أؤجل القرار']},
      {text:'ما أكبر عائق يمنعك من اتخاذ الإجراء الصحيح؟',type:'single',role:'barrier',required:true,options:['عدم وضوح المعلومات','قلة الوقت','عدم الثقة','كثرة الخيارات','التكلفة','لا أرى أهمية كافية']},
      {text:'كم تعرف عن الموضوع حاليًا؟',type:'scale',role:'funnel',required:true,options:['1','2','3','4','5']},
      {text:'ما الذي قد يجعلك تغيّر سلوكك؟',type:'multiple',role:'motivation',required:true,options:['دليل واضح','قصة واقعية','رأي خبير','تجربة شخص قريب','تنبيه أو تذكير','فائدة مباشرة']},
      {text:'اكتب موقفًا واجهته مرتبطًا بهذا الموضوع.',type:'text',role:'open',required:false,options:[]}
    ],
    message: [
      {text:'ما مدى وضوح رسالة الحملة من أول قراءة؟',type:'scale',role:'messageClarity',required:true,options:['1','2','3','4','5']},
      {text:'أي صياغة تبدو أكثر إقناعًا؟',type:'single',role:'messagePreference',required:true,options:['صياغة مباشرة وقصيرة','صياغة عاطفية وقصصية','صياغة مبنية على أرقام وأدلة','صياغة تحذيرية','صياغة إيجابية ومحفزة']},
      {text:'ما الإجراء الذي فهمت أن الحملة تطلبه منك؟',type:'text',role:'ctaUnderstanding',required:true,options:[]},
      {text:'ما الشعور الذي تركته الرسالة لديك؟',type:'single',role:'tone',required:true,options:['ثقة','أمان','فضول','حماس','قلق','لم تترك أثرًا واضحًا']},
      {text:'ما الذي يحتاج إلى توضيح أكثر؟',type:'text',role:'open',required:false,options:[]}
    ],
    platform: [
      {text:'أين تفضل مشاهدة محتوى هذه الحملة؟',type:'single',role:'platform',required:true,options:['Instagram','TikTok','X','Snapchat','YouTube','LinkedIn']},
      {text:'ما نوع المحتوى الذي يجذب انتباهك أكثر؟',type:'multiple',role:'contentFormat',required:true,options:['فيديو قصير','Carousel معلوماتي','قصة واقعية','إنفوجرافيك','بث أو لقاء','اختبار تفاعلي']},
      {text:'ما المدة المناسبة للفيديو؟',type:'single',role:'videoLength',required:true,options:['أقل من 15 ثانية','15–30 ثانية','30–60 ثانية','أكثر من دقيقة']},
      {text:'متى تتفاعل عادة مع المحتوى؟',type:'single',role:'publishTime',required:true,options:['الصباح','الظهر','بعد العصر','المساء','بعد منتصف الليل']},
      {text:'ما الذي يجعلك تحفظ أو تشارك منشورًا؟',type:'text',role:'shareReason',required:false,options:[]}
    ]
  };

  function campaigns(){ return read(CAMPAIGN_KEY, []); }
  function surveys(){ return read(SURVEY_KEY, []); }
  function saveSurveys(items){ write(SURVEY_KEY, items); renderList(); }
  function selectedSurvey(){ return surveys().find(s=>s.id===currentId); }


  async function syncSurveyToDatabase(record){
    if(!db) return {ok:false,error:new Error('Supabase client is unavailable')};

    // Always read the authenticated user from Supabase immediately before saving.
    // This prevents a stale account value after switching accounts on the same device.
    const {data:userData,error:userError}=await db.auth.getUser();
    const authUser=userData?.user;
    if(userError||!authUser){
      const error=userError||new Error('No authenticated user session');
      console.error('Supabase auth user unavailable:',error);
      return {ok:false,error};
    }

    const makePayload=id=>({
      id,
      title:record.title,
      description:record.description||'',
      campaign_id:record.campaignId||null,
      questions:record.questions||[],
      owner_id:authUser.id,
      is_published:Boolean(record.published)
    });

    let payload=makePayload(record.id);

    // Insert new surveys and update only surveys already owned by this account.
    // Avoid upsert because a UUID left locally by another account can collide with
    // a row hidden by RLS and make every new publish fail.
    const {data:ownedRow,error:lookupError}=await db
      .from('surveys')
      .select('id')
      .eq('id',record.id)
      .eq('owner_id',authUser.id)
      .maybeSingle();

    if(lookupError){
      console.error('Supabase survey lookup failed:',lookupError);
      return {ok:false,error:lookupError};
    }

    let result;
    if(ownedRow){
      result=await db
        .from('surveys')
        .update(payload)
        .eq('id',record.id)
        .eq('owner_id',authUser.id)
        .select('id')
        .single();
    }else{
      result=await db.from('surveys').insert(payload).select('id').single();

      // If the local id already belongs to another account, generate a fresh UUID,
      // update the local draft, and retry once.
      if(result.error && (result.error.code==='23505'||/duplicate|unique/i.test(result.error.message||''))){
        const oldId=record.id;
        const freshId=crypto.randomUUID();
        record.id=freshId;
        currentId=freshId;
        localStorage.setItem(CURRENT_KEY,freshId);
        const localList=surveys().map(item=>item.id===oldId?{...item,id:freshId}:item);
        saveSurveys(localList);
        payload=makePayload(freshId);
        result=await db.from('surveys').insert(payload).select('id').single();
      }
    }

    if(result.error){
      console.error('Supabase survey save failed:',result.error);
      return {ok:false,error:result.error};
    }
    return {ok:true,id:result.data?.id||record.id};
  }

  async function deleteSurveyFromDatabase(id){
    if(!db||!isUuid(id)) return;
    const {error}=await db.from('surveys').delete().eq('id',id);
    if(error) console.error('Supabase survey delete failed:',error);
  }

  async function fetchResponsesFromDatabase(surveyId){
    if(!db||!isUuid(surveyId)) return null;
    const {data,error}=await db.from('survey_responses').select('id,survey_id,answers,submitted_at').eq('survey_id',surveyId).order('submitted_at',{ascending:true});
    if(error){console.warn('Supabase response read unavailable:',error.message);return null;}
    return (data||[]).map(row=>({id:row.id,answers:row.answers||{},submittedAt:row.submitted_at}));
  }


  async function loadOwnerSurveysFromDatabase(){
    if(!db||!currentUser) return;
    // One-time claim for legacy surveys created before accounts were added.
    await db.from('surveys').update({owner_id:currentUser.id}).is('owner_id',null);
    const {data,error}=await db.from('surveys').select('id,title,description,campaign_id,questions,is_published,created_at,updated_at').eq('owner_id',currentUser.id).order('updated_at',{ascending:false});
    if(error){console.warn('Supabase owner survey load failed:',error.message);return;}
    const localById=new Map(surveys().map(item=>[item.id,item]));
    const merged=[];
    for(const row of data||[]){
      const local=localById.get(row.id)||{};
      const responses=await fetchResponsesFromDatabase(row.id)||local.responses||[];
      merged.push({
        ...local,
        id:row.id,title:row.title,description:row.description||'',campaignId:row.campaign_id||'',questions:row.questions||[],
        published:Boolean(row.is_published),responses,createdAt:row.created_at,updatedAt:row.updated_at
      });
    }
    saveSurveys(merged);
  }

  function fillCampaigns(){
    const list=campaigns();
    $('surveyCampaign').innerHTML='<option value="">بدون ربط بحملة</option>'+list.map(c=>`<option value="${safe(c.id)}">${safe(c.name)}</option>`).join('');
  }

  function statusLabel(s){ return s.published ? 'منشور' : 'مسودة'; }
  function renderList(){
    const list=surveys().sort((a,b)=>new Date(b.updatedAt)-new Date(a.updatedAt));
    const responses=list.reduce((n,s)=>n+(s.responses?.length||0),0);
    $('surveyCount').textContent=list.length;
    $('responseCount').textContent=responses;
    $('publishedCount').textContent=list.filter(s=>s.published).length;
    $('insightCount').textContent=list.filter(s=>s.appliedAt).length;
    $('surveyEmpty').classList.toggle('hidden',list.length>0);
    $('surveyList').innerHTML=list.map(s=>`<article class="survey-card">
      <div class="survey-card-head"><div><h3>${safe(s.title||'استبيان بدون عنوان')}</h3><p>${safe(s.description||'بدون وصف')}</p></div><span class="status-badge ${s.published?'status-completed':'status-draft'}">${statusLabel(s)}</span></div>
      <div class="survey-card-meta"><span><b>${s.questions?.length||0}</b>أسئلة</span><span><b>${s.responses?.length||0}</b>إجابات</span><span><b>${s.campaignId?'✓':'—'}</b>مرتبط بحملة</span></div>
      <div class="survey-actions"><button class="edit-survey" data-edit="${s.id}">فتح وإدارة</button><button data-share="${s.id}" title="نسخ الرابط">رابط</button><button data-delete="${s.id}" title="حذف">حذف</button></div>
    </article>`).join('');
  }

  function blankQuestion(type='single'){
    return {id:uid('q'),text:'',type,role:'custom',required:true,options:type==='scale'?['1','2','3','4','5']:(type==='text'?[]:['الخيار الأول','الخيار الثاني'])};
  }

  function loadTemplate(name){ currentQuestions=(templates[name]||[]).map(q=>({...q,id:uid('q')})); renderQuestions(); toast('تمت إضافة القالب ويمكنك تعديل الأسئلة'); }

  function renderQuestions(){
    $('questionList').innerHTML=currentQuestions.map((q,i)=>`<article class="question-item" data-id="${q.id}">
      <span class="question-number">${String(i+1).padStart(2,'0')}</span>
      <div class="question-main">
        <input class="q-text" value="${safe(q.text)}" placeholder="اكتبي السؤال هنا">
        <div class="question-config"><select class="q-type"><option value="single" ${q.type==='single'?'selected':''}>اختيار واحد</option><option value="multiple" ${q.type==='multiple'?'selected':''}>اختيارات متعددة</option><option value="scale" ${q.type==='scale'?'selected':''}>مقياس 1–5</option><option value="text" ${q.type==='text'?'selected':''}>إجابة نصية</option></select><select class="q-role"><option value="custom" ${q.role==='custom'?'selected':''}>سؤال عام</option><option value="age" ${q.role==='age'?'selected':''}>الفئة العمرية</option><option value="audienceType" ${q.role==='audienceType'?'selected':''}>نوع الجمهور</option><option value="location" ${q.role==='location'?'selected':''}>النطاق الجغرافي</option><option value="interest" ${q.role==='interest'?'selected':''}>الاهتمام</option><option value="platform" ${q.role==='platform'?'selected':''}>المنصة</option><option value="behavior" ${q.role==='behavior'?'selected':''}>السلوك</option><option value="funnel" ${q.role==='funnel'?'selected':''}>مرحلة الوعي</option><option value="barrier" ${q.role==='barrier'?'selected':''}>العائق</option><option value="messageClarity" ${q.role==='messageClarity'?'selected':''}>وضوح الرسالة</option></select></div>
        ${q.type==='text'?'' : `<div class="option-editor">${q.options.map((o,oi)=>`<div class="option-row"><input data-option="${oi}" value="${safe(o)}"><button data-remove-option="${oi}" type="button">×</button></div>`).join('')}<button class="add-option" type="button">+ إضافة خيار</button></div>`}
        <label class="required-toggle"><input class="q-required" type="checkbox" ${q.required?'checked':''}> سؤال مطلوب</label>
      </div>
      <button class="remove-question" type="button">حذف</button>
    </article>`).join('');
  }

  function syncQuestionsFromDom(){
    document.querySelectorAll('.question-item').forEach(item=>{
      const q=currentQuestions.find(x=>x.id===item.dataset.id); if(!q)return;
      q.text=item.querySelector('.q-text').value.trim(); q.type=item.querySelector('.q-type').value; q.role=item.querySelector('.q-role').value; q.required=item.querySelector('.q-required').checked;
      q.options=[...item.querySelectorAll('[data-option]')].map(x=>x.value.trim()).filter(Boolean);
      if(q.type==='scale')q.options=['1','2','3','4','5']; if(q.type==='text')q.options=[];
    });
  }

  function draftFromFields(){
    syncQuestionsFromDom();
    const old=selectedSurvey();
    return {id:currentId||uid('survey'),title:$('surveyTitle').value.trim()||'استبيان بدون عنوان',description:$('surveyDescription').value.trim(),campaignId:$('surveyCampaign').value,researchGoal:$('researchGoal').value,language:$('surveyLanguage').value,targetResponses:Number($('targetResponses').value)||30,questions:currentQuestions,responses:old?.responses||[],published:old?.published||false,appliedAt:old?.appliedAt||null,createdAt:old?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()};
  }

  function saveCurrent(publish=false,options={}){
    const {silent=false}=options;
    if(!currentQuestions.length){toast('أضيفي سؤالًا واحدًا على الأقل');return null;}
    const previousId=currentId;
    const record=draftFromFields();
    if(!isUuid(record.id)) record.id=uid('survey');
    if(publish)record.published=true;
    currentId=record.id;
    localStorage.setItem(CURRENT_KEY,currentId);
    let list=surveys();
    if(previousId && previousId!==record.id) list=list.filter(s=>s.id!==previousId);
    const i=list.findIndex(s=>s.id===record.id);
    if(i>=0)list[i]=record;else list.unshift(record);
    saveSurveys(list);
    updatePublish(record);
    record._syncPromise=syncSurveyToDatabase(record).then(result=>{
      if(result.ok){
        if(result.id && result.id!==record.id){
          record.id=result.id;
          currentId=result.id;
          localStorage.setItem(CURRENT_KEY,currentId);
        }
        updatePublish(record);
        if(!silent)toast(publish?'تم حفظ الاستبيان ونشره في قاعدة البيانات':'تم حفظ الاستبيان في قاعدة البيانات');
      }else if(!silent){
        const detail=result.error?.message||result.error?.code||'خطأ غير معروف';
        toast(`تعذر الحفظ في قاعدة البيانات: ${detail}`);
      }
      return result;
    });
    return record;
  }

  function updatePublish(s){
    const url=formUrl(s);
    const field=$('shareLink');
    field.value=url;
    field.dir='ltr';
    field.setAttribute('inputmode','url');
    renderQuality(s);
    renderAnalysis(s);
  }
  function renderQuality(s){
    const checks=[
      [s.title.length>=8,'عنوان واضح ومحدد'],
      [s.description.length>=20,'وصف يشرح الغرض للمشارك'],
      [s.questions.length>=5&&s.questions.length<=10,'عدد الأسئلة مناسب (5–10)'],
      [s.questions.every(q=>q.text&& (q.type==='text'||q.options.length>=2)),'كل الأسئلة والخيارات مكتملة'],
      [s.questions.filter(q=>q.type==='text').length<=2,'عدد الأسئلة النصية لا يرهق المشارك'],
      [s.questions.some(q=>['age','audienceType','behavior','platform','interest'].includes(q.role)),'يوجد سؤال قابل لتحويله إلى قرار استراتيجي']
    ];
    $('qualityChecks').innerHTML=checks.map(([ok,text])=>`<div class="quality-item"><span>${text}</span><b class="${ok?'good':'warn'}">${ok?'مكتمل ✓':'يحتاج مراجعة'}</b></div>`).join('');
  }

  async function switchStep(step){
    document.querySelectorAll('.builder-tab').forEach(x=>x.classList.toggle('active',x.dataset.step===step));
    document.querySelectorAll('.survey-step').forEach(x=>x.classList.toggle('active',x.dataset.panel===step));
    if(step==='publish'){
      const s=saveCurrent(true);
      if(s) updatePublish(s);
    }
    if(step==='analysis'){
      const s=saveCurrent();
      if(s){
        const remoteResponses=await fetchResponsesFromDatabase(s.id);
        if(remoteResponses){
          s.responses=remoteResponses;
          const list=surveys();
          const index=list.findIndex(item=>item.id===s.id);
          if(index>=0){list[index]=s;saveSurveys(list);}
        }
        renderAnalysis(s);
      }
    }
    document.querySelector('.builder-shell').scrollIntoView({behavior:'smooth',block:'start'});
  }

  async function openSurvey(id){
    const s=surveys().find(x=>x.id===id); if(!s)return;
    currentId=s.id; localStorage.setItem(CURRENT_KEY,id); currentQuestions=(s.questions||[]).map(q=>({...q,options:[...(q.options||[])]}));
    $('surveyTitle').value=s.title||''; $('surveyDescription').value=s.description||''; $('surveyCampaign').value=s.campaignId||''; $('researchGoal').value=s.researchGoal||'audience'; $('surveyLanguage').value=s.language||'ar'; $('targetResponses').value=s.targetResponses||30;
    $('builderTitle').textContent=`إدارة: ${s.title}`; renderQuestions(); updatePublish(s); $('builder').classList.remove('hidden'); switchStep('setup');
    const remoteResponses=await fetchResponsesFromDatabase(s.id);
    if(remoteResponses){
      s.responses=remoteResponses;
      const list=surveys(),index=list.findIndex(x=>x.id===s.id);
      if(index>=0){list[index]=s;saveSurveys(list);}
      renderAnalysis(s);
    }
  }

  function newSurvey(){
    currentId=''; localStorage.removeItem(CURRENT_KEY); currentQuestions=[]; $('surveyTitle').value=''; $('surveyDescription').value=''; $('surveyCampaign').value=''; $('researchGoal').value='audience'; $('surveyLanguage').value='ar'; $('targetResponses').value=30; $('builderTitle').textContent='إنشاء استبيان جديد'; renderQuestions(); $('builder').classList.remove('hidden'); $('builder').scrollIntoView({behavior:'smooth'});
  }

  function responseValues(s,q){
    return (s.responses||[]).map(r=>r.answers?.[q.id]).filter(v=>v!==undefined&&v!==null&&v!=='').flatMap(v=>Array.isArray(v)?v:[v]);
  }
  function tally(values){ return values.reduce((m,v)=>(m[v]=(m[v]||0)+1,m),{}); }
  function topValue(values){ const t=tally(values); return Object.entries(t).sort((a,b)=>b[1]-a[1])[0]?.[0]||'—'; }
  function mapAge(v){ if(/أقل من 13/.test(v))return'children';if(/13/.test(v))return'teens';if(/18/.test(v))return'young';if(/25/.test(v))return'adults';if(/35/.test(v))return'mature';if(/45/.test(v))return'older';if(/55/.test(v))return'senior';return'multi'; }
  function mapAudience(v){ if(/طالب/.test(v))return'students';if(/ولي|أسرة/.test(v))return'parents';if(/موظف/.test(v))return'employees';if(/متخصص/.test(v))return'professionals';if(/عمل|قرار/.test(v))return'businesses';if(/مستفيد/.test(v))return'beneficiaries';return'general'; }
  function mapLocation(v){ if(/جدة/.test(v))return'jeddah';if(/رياض/.test(v))return'riyadh';if(/الغربية/.test(v))return'western';if(/الوسطى/.test(v))return'central';if(/الشرقية/.test(v))return'eastern';if(/المملكة/.test(v))return'saudi';return'other'; }
  function mapPlatform(v){ const m={Instagram:'instagram',TikTok:'tiktok',X:'x',Snapchat:'snapchat',YouTube:'youtube',LinkedIn:'linkedin'};return m[v]||'instagram'; }

  function deriveInsights(s){
    const insights=[]; const updates={};
    for(const q of s.questions){ const vals=responseValues(s,q); if(!vals.length)continue; const top=topValue(vals); const share=Math.round((tally(vals)[top]||0)/vals.length*100);
      if(q.role==='age'){updates.age=mapAge(top);insights.push({label:'الفئة العمرية الأبرز',title:top,text:`تمثل نحو ${share}% من الإجابات، لذا يجب ضبط الأمثلة واللغة والإيقاع لتناسبها.`});}
      if(q.role==='audienceType'){updates.audienceType=mapAudience(top);insights.push({label:'الجمهور الأساسي',title:top,text:`الشريحة الأكثر ظهورًا في العينة بنسبة ${share}% ويمكن اعتمادها كجمهور أولي للحملة.`});}
      if(q.role==='location'){updates.location=mapLocation(top);insights.push({label:'النطاق الأبرز',title:top,text:`الأولوية الجغرافية المقترحة بناءً على توزيع المشاركين.`});}
      if(q.role==='platform'){updates.platform=mapPlatform(top);insights.push({label:'المنصة المفضلة',title:top,text:`اختارها ${share}% من الإجابات، لذلك تستحق الحصة الأكبر من المحتوى أو الاختبار الأول.`});}
      if(q.role==='interest'){updates.interestCustom=top;updates.interest='other';insights.push({label:'الفائدة الأهم',title:top,text:`اجعليها محور القيمة المقدمة والافتتاحيات لأنها الأكثر تكرارًا.`});}
      if(q.role==='behavior'){updates.behaviorCustom=top;updates.behavior='other';insights.push({label:'السلوك الحالي',title:top,text:'استخدمي هذا السلوك كنقطة بداية للرسالة بدل افتراض أن الجمهور جاهز للتصرف المطلوب.'});}
      if(q.role==='barrier')insights.push({label:'العائق الأكبر',title:top,text:`عالجي هذا العائق داخل المحتوى والـCTA قبل طلب الإجراء النهائي.`});
      if(q.role==='messageClarity'){const avg=vals.reduce((a,v)=>a+Number(v),0)/vals.length;insights.push({label:'وضوح الرسالة',title:`${avg.toFixed(1)} من 5`,text:avg<3.5?'الرسالة تحتاج تبسيطًا وCTA أوضح.':'الرسالة مفهومة ويمكن اختبار نسخة أكثر إقناعًا.'});}
    }
    return {insights:insights.slice(0,6),updates};
  }

  function renderAnalysis(s){
    const responses=s.responses||[]; const has=responses.length>0; $('analysisEmpty').classList.toggle('hidden',has); $('surveyAnalysis').classList.toggle('hidden',!has); if(!has)return;
    const answered=responses.reduce((n,r)=>n+Object.values(r.answers||{}).filter(v=>Array.isArray(v)?v.length:String(v||'').trim()).length,0);
    const completion=Math.round(answered/(responses.length*Math.max(s.questions.length,1))*100);
    const confidence=responses.length>=100?'مرتفعة':responses.length>=30?'جيدة':responses.length>=10?'مبدئية':'منخفضة';
    const derived=deriveInsights(s);
    $('analysisResponses').textContent=responses.length; $('completionRate').textContent=`${completion}%`; $('researchConfidence').textContent=confidence; $('topSegment').textContent=derived.insights[0]?.title||'—';
    $('insightCards').innerHTML=derived.insights.map(i=>`<article class="insight-card"><small>${safe(i.label)}</small><h4>${safe(i.title)}</h4><p>${safe(i.text)}</p></article>`).join('')||'<article class="insight-card"><h4>تحتاج أسئلة مرتبطة بالاستراتيجية</h4><p>حددي دور السؤال مثل العمر أو المنصة أو السلوك حتى يتحول إلى استنتاج قابل للتطبيق.</p></article>';
    $('questionAnalysis').innerHTML=s.questions.map(q=>{
      const vals=responseValues(s,q); if(!vals.length)return'';
      if(q.type==='text')return `<article class="analysis-question"><h4>${safe(q.text)}</h4><div class="text-answer-list">${vals.slice(-5).map(v=>`<p>${safe(v)}</p>`).join('')}</div></article>`;
      const counts=tally(vals), max=Math.max(...Object.values(counts),1);
      return `<article class="analysis-question"><h4>${safe(q.text)}</h4>${Object.entries(counts).sort((a,b)=>b[1]-a[1]).map(([label,count])=>`<div class="analysis-bar"><span title="${safe(label)}">${safe(label)}</span><i><b style="width:${count/max*100}%"></b></i><b>${count}</b></div>`).join('')}</article>`;
    }).join('');
    $('applyInsights').disabled=!s.campaignId||!Object.keys(derived.updates).length;
    $('applySummary').textContent=!s.campaignId?'اربطي الاستبيان بحملة أولًا لتطبيق الاستنتاجات.':Object.keys(derived.updates).length?`جاهز لتحديث ${Object.keys(derived.updates).length} من بيانات الجمهور والمنصة مع حفظ نسخة الحملة الحالية.`:'لا توجد تحديثات تلقائية لأن أدوار الأسئلة غير محددة.';
    $('applyInsights').onclick=()=>applyToCampaign(s,derived.updates);
  }

  function applyToCampaign(s,updates){
    const list=campaigns(); const i=list.findIndex(c=>c.id===s.campaignId); if(i<0){toast('لم يتم العثور على الحملة المرتبطة');return;}
    list[i].formData={...(list[i].formData||{}),...updates}; list[i].surveyInsights={surveyId:s.id,appliedAt:new Date().toISOString(),updates}; list[i].updatedAt=new Date().toISOString(); write(CAMPAIGN_KEY,list);
    const ss=surveys(),si=ss.findIndex(x=>x.id===s.id);ss[si].appliedAt=new Date().toISOString();saveSurveys(ss);toast('تم تحديث بيانات الحملة بناءً على النتائج ✓');
  }

  const THEME_KEY='campaigncraft_theme_v1';
  function applyTheme(theme='dark'){
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
  }
  (function initTheme(){
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
  })();
  $('newSurvey').onclick=newSurvey;
  document.querySelectorAll('.builder-tab').forEach(b=>b.onclick=()=>switchStep(b.dataset.step));
  document.querySelectorAll('[data-next]').forEach(b=>b.onclick=()=>switchStep(b.dataset.next));
  document.querySelectorAll('[data-prev]').forEach(b=>b.onclick=()=>switchStep(b.dataset.prev));
  document.querySelectorAll('[data-template]').forEach(b=>b.onclick=()=>loadTemplate(b.dataset.template));
  function addCustomQuestion(type='single'){
    const q=blankQuestion(type);
    currentQuestions.push(q);
    renderQuestions();
    requestAnimationFrame(()=>{
      const item=document.querySelector(`.question-item[data-id="${q.id}"]`);
      if(item){item.scrollIntoView({behavior:'smooth',block:'center'});item.querySelector('.q-text')?.focus();}
    });
    toast('تمت إضافة سؤال جديد — اكتبي سؤالك وعدّلي الخيارات');
  }
  $('addQuestion').onclick=()=>addCustomQuestion('single');
  $('questionMenu').onclick=e=>{const b=e.target.closest('[data-type]');if(!b)return;addCustomQuestion(b.dataset.type);};
  $('questionList').addEventListener('input',syncQuestionsFromDom);
  $('questionList').addEventListener('change',e=>{syncQuestionsFromDom();if(e.target.matches('.q-type'))renderQuestions();});
  $('questionList').addEventListener('click',e=>{
    const item=e.target.closest('.question-item');if(!item)return;const q=currentQuestions.find(x=>x.id===item.dataset.id);
    if(e.target.closest('.remove-question')){currentQuestions=currentQuestions.filter(x=>x.id!==q.id);renderQuestions();}
    if(e.target.closest('.add-option')){syncQuestionsFromDom();q.options.push(`خيار ${q.options.length+1}`);renderQuestions();}
    const rem=e.target.closest('[data-remove-option]');if(rem){syncQuestionsFromDom();q.options.splice(Number(rem.dataset.removeOption),1);renderQuestions();}
  });
  $('shareSurvey').onclick=async()=>{
    const button=$('shareSurvey');
    button.disabled=true;
    const s=saveCurrent(true,{silent:true});
    if(!s){button.disabled=false;return;}
    const result=await s._syncPromise;
    if(!result.ok){toast('تعذر نشر الاستبيان في قاعدة البيانات');button.disabled=false;return;}
    const url=formUrl(s);
    updatePublish(s);
    if(navigator.share){
      try{
        await navigator.share({title:s.title||'استبيان CampaignCraft',text:'شارك في هذا الاستبيان',url});
        toast('تم فتح خيارات المشاركة');
      }catch(error){
        if(error?.name!=='AbortError') toast('تعذر فتح المشاركة، اختاري «نسخ» من نافذة المشاركة أو حاولي مرة أخرى');
      }
    }else{
      const copied=await copyTextSafely(url);
      if(copied) toast('تم نسخ رابط الاستبيان');
      else window.prompt('انسخي رابط الاستبيان:',url);
    }
    button.disabled=false;
  };

  $('viewResponses').onclick=()=>switchStep('analysis');
  $('openPreview').onclick=async()=>{
    const button=$('openPreview');
    // Open immediately while the tap is still active so iPhone/Safari does not block it.
    const previewWindow=window.open('about:blank','_blank');
    button.disabled=true;
    const s=saveCurrent(true,{silent:true});
    if(!s){previewWindow?.close();button.disabled=false;return;}
    const result=await s._syncPromise;
    if(!result.ok){previewWindow?.close();toast('تعذر نشر الاستبيان في قاعدة البيانات');button.disabled=false;return;}
    const url=formUrl(s);
    updatePublish(s);
    if(previewWindow){
      previewWindow.location.replace(url);
    }else{
      window.location.href=url;
    }
    toast('تم فتح معاينة الاستبيان');
    button.disabled=false;
  };
  $('copyEmbed').onclick=async()=>{
    const s=saveCurrent(true,{silent:true});
    if(!s)return;
    const result=await s._syncPromise;
    if(!result.ok){toast('تعذر نشر الاستبيان في قاعدة البيانات');return;}
    const code=`<iframe src="${formUrl(s)}" width="100%" height="720" style="border:0;border-radius:20px"></iframe>`;
    const copied=await copyTextSafely(code);
    toast(copied?'تم نسخ كود التضمين':'تعذر نسخ كود التضمين تلقائيًا');
  };
  $('downloadSurvey').onclick=()=>{const s=saveCurrent(true);if(!s)return;const blob=new Blob([JSON.stringify(s,null,2)],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`survey-${s.id}.json`;a.click();URL.revokeObjectURL(a.href);};
  $('importResponses').onchange=async e=>{const s=saveCurrent();if(!s)return;let added=0;for(const file of e.target.files){try{const data=JSON.parse(await file.text());const arr=Array.isArray(data)?data:[data];for(const r of arr){if((r.surveyId===s.id||r.survey?.id===s.id)&&r.answers){s.responses.push({id:r.id||uid('response'),answers:r.answers,submittedAt:r.submittedAt||new Date().toISOString()});added++;}}}catch{}}
    const list=surveys(),i=list.findIndex(x=>x.id===s.id);list[i]=s;saveSurveys(list);renderAnalysis(s);toast(`تم استيراد ${added} إجابة`);e.target.value='';};
  $('surveyList').onclick=async e=>{const edit=e.target.closest('[data-edit]'),share=e.target.closest('[data-share]'),del=e.target.closest('[data-delete]');if(edit)openSurvey(edit.dataset.edit);if(share){const s=surveys().find(x=>x.id===share.dataset.share);await navigator.clipboard.writeText(formUrl(s));toast('تم نسخ الرابط');}if(del){const s=surveys().find(x=>x.id===del.dataset.delete);if(confirm(`حذف «${s.title}»؟`)){saveSurveys(surveys().filter(x=>x.id!==s.id));deleteSurveyFromDatabase(s.id);toast('تم حذف الاستبيان');}}};

  fillCampaigns(); renderList();
  loadOwnerSurveysFromDatabase().finally(()=>{const saved=selectedSurvey(); if(saved) openSurvey(saved.id);});
})();

}
if(window.CampaignCraftAuth?.ready){startCampaignCraftAuthenticatedApp();}else{window.addEventListener('campaigncraft:auth-ready',startCampaignCraftAuthenticatedApp,{once:true});}
