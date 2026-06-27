(() => {
  const AR_RE = /[\u0600-\u06FF]/;

  const exact = {
    'حملاتي':'My campaigns','المخطط':'Planner','الاستبيانات':'Surveys','عن المشروع':'About',
    'داكن':'Dark','فاتح':'Light','⚫ داكن':'Dark','⚪ فاتح':'Light','تسجيل الخروج':'Sign out','تسجيل الدخول':'Sign in','إنشاء حساب':'Create account',
    'البريد الإلكتروني':'Email','كلمة المرور':'Password','نسيت كلمة المرور؟':'Forgot password?','الاسم':'Name',
    'المتابعة باستخدام Google':'Continue with Google','أو':'or','حفظ تسجيل الدخول على هذا الجهاز':'Keep me signed in on this device',
    'من فكرة بسيطة إلى':'From a simple idea to','حملة قابلة للتنفيذ':'an execution-ready campaign',
    'أجيبي عن أسئلة واضحة تشبه نموذج عمل وكالات التسويق، وسيحوّل الموقع إجاباتك إلى استراتيجية، أهداف قابلة للقياس، خطة محتوى، ميزانية، تنفيذ وتحليل أداء.':'Answer clear agency-style questions, and CampaignCraft will turn your inputs into a strategy, measurable goals, a content plan, a budget, an execution roadmap, and performance analysis.',
    'ابني حملتك الآن':'Build your campaign now','كيف أستخدم الموقع؟':'How it works',
    'تحليل الجمهور':'Audience analysis','استبيانات وأبحاث':'Surveys and research','استراتيجية المنصة':'Platform strategy','تقويم محتوى':'Content calendar','كابشن وCTA':'Captions and CTAs',
    'طريقة استخدام الموقع في 5 خطوات':'How to use CampaignCraft in 5 steps',
    'لا تحتاجين خبرة تسويقية مسبقة. اكملي البيانات بالترتيب، ويمكنك حفظ المسودة والعودة لها في أي وقت.':'No prior marketing experience is required. Complete the steps in order, save your draft, and return at any time.',
    'عرّفي الحملة':'Define the campaign','حددي النجاح بالأرقام':'Set measurable success targets','صفي الجمهور':'Describe the audience','اختاري القنوات والموارد':'Choose channels and resources','نفّذي ثم قيسي':'Execute, then measure',
    'مصطلحات مهمة للمبتدئين':'Key terms for beginners','الوصول:':'Reach:','مرات الظهور:':'Impressions:','التحويل:':'Conversion:',
    'عدد الأشخاص الفريدين الذين شاهدوا المحتوى.':'The number of unique people who saw the content.',
    'عدد مرات عرض المحتوى، وقد يشاهده الشخص أكثر من مرة.':'The total number of times the content was shown; one person may see it more than once.',
    'نسبة من نقروا الرابط من إجمالي من شاهدوا الإعلان أو المحتوى.':'The percentage of viewers who clicked the link.',
    'الإجراء النهائي المطلوب مثل شراء أو تسجيل أو تحميل.':'The final desired action, such as a purchase, registration, or download.',
    'العبارة التي تطلب من الجمهور اتخاذ خطوة واضحة.':'A phrase that asks the audience to take a clear action.',
    'حملاتي المحفوظة':'Saved campaigns','كل حملة تُحفظ تلقائيًا على هذا الجهاز، ويمكنك الرجوع لها وتعديلها أو تحديد حالتها.':'Each campaign is saved automatically, so you can return, edit it, or update its status.',
    '+ حملة جديدة':'+ New campaign','مركز الاستبيانات':'Survey center','تصدير نسخة احتياطية':'Export backup','استيراد نسخة':'Import backup',
    'إجمالي الحملات':'Total campaigns','قيد التنفيذ':'Active','مكتملة':'Completed','مؤرشفة':'Archived','حالة جميع الحملات':'Campaign portfolio status','حملة':'Campaign','قراءة سريعة للمحفظة':'Portfolio snapshot',
    'الكل':'All','مسودات':'Drafts','الأرشيف':'Archive','لا توجد حملات محفوظة بعد':'No saved campaigns yet','ابدئي حملة جديدة، وسيتم حفظ بياناتها تلقائيًا أثناء الكتابة.':'Start a new campaign. Your progress will be saved automatically as you work.','ابدئي الآن ←':'Start now →',
    'نموذج تخطيط الحملة الكامل':'Complete campaign planner','أكملي الأقسام بالترتيب. كل سؤال يحمل شرحًا مختصرًا، والحقول الموسومة «أساسي» ضرورية لبناء خطة دقيقة وقابلة للقياس.':'Complete the sections in order. Each question includes a short explanation, and fields marked “Required” are essential for an accurate, measurable plan.',
    'ابدئي من الأعلى واتّبعي الأقسام بالترتيب':'Start at the top and follow the sections in order','اكتمال البيانات':'Data completion','أساسي':'Required','غير ذلك':'Other',
    'أساسيات المشروع':'Project basics','ما الذي ستسوّق له الحملة؟':'What will the campaign promote?','الجمهور المستهدف':'Target audience','كل اختيار يؤثر في الرسائل والأسلوب والتوقيت.':'Every selection affects the message, tone, and timing.',
    'السوق والرسالة والتميّز':'Market, message, and differentiation','القنوات والموارد والتنفيذ':'Channels, resources, and execution','أهداف الحملة ومعايير النجاح':'Campaign goals and success criteria',
    'المؤشرات الأساسية للحملة':'Core campaign metrics','مؤشرات خاصة بكل منصة':'Platform-specific metrics','مؤشرات إضافية اختيارية للحملات المتقدمة':'Optional advanced campaign metrics',
    'ابدئي هنا':'Start here','ديناميكي':'Dynamic','كيف أضع الأهداف؟':'How should I set targets?','ملاحظات على أهداف القياس':'Measurement notes',
    'إنشاء الخطة المتكاملة':'Generate complete plan','حفظ ومتابعة':'Save and continue','السابق':'Previous','القسم السابق':'Previous section','القسم التالي':'Next section',
    'الخطة جاهزة للتنفيذ':'Your plan is ready to execute','حفظ الحملة':'Save campaign','تعديل البيانات ↑':'Edit inputs ↑','نسخ الخطة':'Copy plan','حفظ PDF / طباعة':'Save PDF / Print',
    'ملخص الحملة':'Campaign summary','الجمهور والمنصات':'Audience and platforms','المحتوى والهوية':'Content and identity','جدول النشر':'Publishing schedule','القياس والتحسين':'Measurement and optimization','الإعلانات المدفوعة':'Paid media','نتائج الحملة الفعلية':'Actual campaign results','قائمة التنفيذ':'Execution checklist',
    'الهدف الذكي':'SMART objective','الرسالة الرئيسية':'Core message','القيمة المقدمة':'Value proposition','الدعوة لاتخاذ إجراء':'Primary CTA','مزيج الهاشتاقات':'Hashtag mix',
    'أهداف النجاح الرقمية':'Digital success targets','لم تُحدد أهداف رقمية بعد. أضيفيها قبل الإطلاق حتى يمكن قياس النجاح بدقة.':'No numeric targets have been set yet. Add them before launch so success can be measured accurately.',
    'فتح الكل':'Expand all','إغلاق الكل':'Collapse all','تنقّل في الخطة بسهولة':'Navigate the plan easily',
    'حفظ وتحليل النتائج':'Save and analyze results','قياس نتائج الحملة وتحليل نجاحها':'Measure campaign results and analyze success','أهداف القياس قبل الحكم':'Targets required before evaluation',
    'أضيفي النتائج الفعلية والأهداف المستهدفة ثم اضغطي «حفظ وتحليل النتائج». الحكم يعتمد على النسب الفعلية مقارنةً بأهدافك، وليس على أرقام افتراضية.':'Enter actual results and target values, then click “Save and analyze results.” The evaluation is based on actual performance compared with your targets.',
    'قائمة التنفيذ قبل الإطلاق':'Pre-launch execution checklist','0% مكتمل':'0% complete',
    'مشروع إعلام رقمي متكامل':'An integrated digital media project','يربط هدف الحملة بالجمهور، القناة، الرسالة، ومرحلة مسار التحويل.':'Connects the campaign objective with the audience, channel, message, and funnel stage.','ينشئ أفكارًا قابلة للتصوير والنشر مع صيغة ووقت وكابشن وCTA.':'Creates production-ready content ideas with format, timing, captions, and CTAs.','يقترح مؤشرات قياس وخطة تحسين بدل الاكتفاء بالأفكار الإبداعية.':'Recommends performance metrics and an optimization plan—not just creative ideas.',

    // Surveys
    'ابني قرار الحملة على':'Build campaign decisions on','إجابات حقيقية':'real answers','أنشئي استبيانًا، شاركيه مع الجمهور، حلّلي النتائج، ثم طبّقي أهم الاستنتاجات مباشرة على بيانات الحملة وخطتها.':'Create a survey, share it with your audience, analyze the results, then apply the strongest insights directly to your campaign data and plan.',
    'من السؤال إلى القرار':'From question to decision','بناء':'Build','نشر':'Publish','تحليل':'Analyze','تطبيق':'Apply',
    'استبياناتي':'My surveys','كل استبيان مرتبط بحملة، ويمكن تحويل نتائجه إلى تحديثات استراتيجية بضغطة واحدة.':'Each survey can be linked to a campaign and turned into strategic updates in one click.',
    '+ استبيان جديد':'+ New survey','استبيانات':'Surveys','إجابات':'Responses','منشورة':'Published','استنتاجات مطبقة':'Applied insights',
    'ما عندك استبيانات حتى الآن':'You do not have any surveys yet','ابدئي بقالب جاهز أو أنشئي أسئلتك الخاصة لفهم الجمهور قبل إطلاق الحملة.':'Start with a ready-made template or create your own questions to understand your audience before launch.',
    'إنشاء استبيان جديد':'Create a new survey','اختاري الأسئلة التي ستؤثر فعليًا في الجمهور والرسالة والمنصة، وليس أسئلة عامة بلا فائدة.':'Choose questions that genuinely influence the audience, message, and platform—not generic questions with no practical value.',
    'الإعداد':'Setup','الأسئلة':'Questions','النشر':'Publish','التحليل':'Analysis','عنوان الاستبيان':'Survey title','وصف مختصر':'Short description','ربط الاستبيان بحملة':'Link survey to a campaign','هدف البحث':'Research objective','لغة الاستبيان':'Survey language','الحد الأدنى المستهدف للإجابات':'Minimum target responses','العربية':'Arabic','الإنجليزية':'English',
    'قوالب سريعة':'Quick templates','تضيف مجموعة أسئلة قابلة للتعديل حسب هدفك.':'Adds a set of editable questions based on your objective.','التالي: بناء الأسئلة ←':'Next: Build questions →',
    'أسئلة الاستبيان':'Survey questions','اكتبي أسئلتك بنفسك، واختاري نوع كل سؤال وخياراته.':'Write your own questions and choose the type and options for each one.','+ إضافة سؤال جديد':'+ Add new question','إضافة مباشرة:':'Quick add:','اختيار واحد':'Single choice','اختيارات متعددة':'Multiple choice','مقياس 1–5':'Scale 1–5','إجابة نصية':'Text answer','→ السابق':'← Previous','حفظ وتجهيز النشر ←':'Save and prepare publishing →',
    'رابط المشاركة':'Share link','نسخ الرابط':'Copy link','معاينة':'Preview','تصدير الاستبيان JSON':'Export survey JSON','استيراد إجابات':'Import responses','نسخ كود التضمين':'Copy embed code','فحص جودة الاستبيان':'Survey quality check','عرض التحليل ←':'View analysis →',
    'تحديث الحملة بناءً على الاستبيان':'Update campaign based on survey results','تطبيق الاستنتاجات على الحملة':'Apply insights to campaign','العودة إلى الحملات':'Back to campaigns',
    'حفظ':'Save','حذف':'Delete','تعديل':'Edit','فتح':'Open','نسخ':'Copy','منشور':'Published','مسودة':'Draft','عدد الإجابات':'Responses','آخر تحديث':'Last updated','بدون حملة مرتبطة':'No linked campaign','غير منشور':'Not published','السؤال':'Question','مطلوب':'Required','اختياري':'Optional','إضافة خيار':'+ Add option','حذف السؤال':'Delete question','مكتمل':'Complete','يحتاج مراجعة':'Needs review'
  };

  const idLabels = {
    campaignName:'Campaign name or project',industry:'Campaign industry',organizationType:'Organization or campaign owner type',campaignSubject:'What is the campaign promoting?',offerDescription:'Short campaign description',campaignTrigger:'Why launch the campaign now?',campaignStage:'Campaign stage',goal:'Primary objective',subGoal:'Detailed objective',duration:'Campaign duration',
    audienceType:'Target audience type',age:'Age group',gender:'Gender',location:'Geographic scope',interest:'Top audience interest or need',funnel:'Audience funnel stage',behavior:'Audience behavior',audiencePain:'Audience pain point',audienceMotivation:'Audience motivation',audienceObjection:'Main audience objection',decisionMaker:'Decision maker',personaSummary:'Audience persona summary',
    uniqueValue:'Unique value proposition',competitionType:'Competitive situation',brandAwareness:'Current brand awareness',competitors:'Key competitors',desiredPerception:'Desired perception',messageAvoid:'Words or messages to avoid',previousData:'Previous campaign data',previousLearning:'Previous campaign learnings',
    platform:'Campaign platforms',tone:'Content tone',frequency:'Publishing frequency',budget:'Paid media budget',totalBudget:'Total campaign budget',teamSize:'Execution team size',availableAssets:'Available assets',destination:'Post-click destination',trackingSetup:'Measurement setup',approvalFlow:'Content approval workflow',compliance:'Legal or sensitive requirements',deliverables:'Required deliverables',constraints:'Important deadlines or constraints',
    planTargetImpressions:'Target impressions',planTargetReach:'Target reach',planTargetViews:'Target views',planTargetClicks:'Target clicks',planTargetConversions:'Target actions or conversions',planTargetRegistrations:'Target registrations or leads',planTargetRevenue:'Target revenue or sales value (SAR)',planTargetCtr:'Target CTR %',planTargetConversion:'Target conversion rate %',planTargetFollowers:'Target new followers',planTargetDownloads:'Target app downloads',planTargetEngagement:'Target engagement rate %',planTargetViewRate:'Target view rate %',measurementNotes:'Measurement notes',
    metricImpressions:'Actual impressions',metricReach:'Actual reach',metricViews:'Actual views',metricLikes:'Actual likes',metricComments:'Actual comments',metricShares:'Actual shares',metricSaves:'Actual saves',metricClicks:'Actual clicks',metricConversions:'Actual completed actions',metricFollowers:'Actual new followers',metricDownloads:'Actual app downloads',metricRegistrations:'Actual registrations or leads',metricRevenue:'Actual revenue (SAR)',metricSpend:'Actual spend (SAR)',
    targetEngagement:'Target engagement %',targetViewRate:'Target view rate %',targetCtr:'Target CTR %',targetConversion:'Target conversion %',
    surveyTitle:'Survey title',surveyDescription:'Short description',surveyCampaign:'Linked campaign',researchGoal:'Research objective',surveyLanguage:'Survey language',targetResponses:'Minimum target responses'
  };

  const valueAliases = {
    food:'Restaurants and cafés',fashion:'Fashion and beauty',education:'Education and training',technology:'Technology and apps',tourism:'Tourism and events',health:'Health and fitness',government:'Government or public service',culture:'Culture, arts, and media',environment:'Environment and sustainability',social:'Social or behavioral issue',nonprofit:'Nonprofit or initiative',personal:'Personal brand or creator',retail:'E-commerce and retail',finance:'Banking, finance, and insurance',realestate:'Real estate and housing',automotive:'Automotive and transport',entertainment:'Entertainment and gaming',sports:'Sports and clubs',hospitality:'Hotels and hospitality',professionalServices:'Professional services and consulting',research:'Research, studies, and surveys',other:'Other',
    company:'Company or brand',startup:'Startup',eventOrg:'Event organizer',agency:'Agency or marketing team',product:'Product',service:'Service',app:'App or digital platform',event:'Event or occasion',initiative:'Initiative or program',awarenessIssue:'Awareness or behavioral issue',policy:'Policy, system, or classification',content:'Media content or program',brand:'Brand or identity',fundraising:'Fundraising or community support',recruitment:'Job or volunteer opportunity',
    launch:'New launch',season:'Season or occasion',problem:'A problem or behavior that needs change',growth:'Growth or expansion opportunity',competition:'Competition or declining market share',reputation:'Improve image or address perception',deadline:'Fixed deadline or registration period',alwaysOn:'Always-on campaign',new:'New from scratch',relaunch:'Relaunch',continuation:'Continuation of an existing campaign',optimization:'Optimize an underperforming campaign',scale:'Scale a successful campaign',crisis:'Rapid crisis response',
    sales:'Promote and increase sales',awareness:'Increase awareness',educationGoal:'Educate and simplify information',behaviorChange:'Change a behavior or habit',engagement:'Increase engagement and build community',leads:'Generate registrations or leads',traffic:'Increase website or platform traffic',adoption:'Encourage service or app adoption',socialImpact:'Support a cause or create social impact',retention:'Retain the audience and increase loyalty',appDownloads:'Increase app downloads',storeVisits:'Increase store or location visits',researchParticipation:'Increase research or survey participation',policyCompliance:'Increase compliance with a policy or guideline',customerService:'Reduce inquiries and improve customer service',communityGrowth:'Grow followers and community',
    general:'General public',students:'Students',parents:'Parents and families',employees:'Employees and job seekers',professionals:'Professionals and practitioners',businesses:'Businesses and decision-makers',creators:'Creators and influencers',volunteers:'Volunteers and supporters',beneficiaries:'Service or initiative beneficiaries',customers:'Current customers',prospects:'Potential customers',childrenAudience:'Children',teensAudience:'Teenagers',families:'Families',seniorsAudience:'Older adults',media:'Media and journalists',investors:'Investors and partners',governmentAudience:'Government entities and policymakers',tourists:'Tourists and visitors',patients:'Patients and visitors',
    children:'Under 13',teens:'13–17',young:'18–24',adults:'25–34',mature:'35–44',older:'45–54',senior:'55+',multi:'Multiple age groups',all:'All genders',women:'Women',men:'Men',jeddah:'Jeddah',riyadh:'Riyadh',city:'A specific city or governorate',region:'A specific Saudi region',saudi:'All Saudi regions',gulf:'GCC countries',arab:'Arab region',global:'Global audience',online:'Digital audience with no geographic limit',
    organic:'Organic only — no ads',small:'Low',medium:'Medium',large:'High',enterprise:'Enterprise',custom:'Custom',unknown:'Not decided yet',solo:'One person',mixed:'Internal team + vendors',none:'None',website:'Website or landing page',store:'Online store',appStore:'App store',form:'Registration form',whatsapp:'WhatsApp',dm:'Direct messages',phone:'Phone call',branch:'Branch or physical location',eventPage:'Event or ticket page',platform:'Platform analytics only',utm:'UTM links',ga4:'Google Analytics 4',pixel:'Meta / TikTok Pixel',crm:'CRM or sales system',promoCode:'Promo code',survey:'Post-campaign survey',one:'One person',team:'Marketing team',management:'Management or executive approval',legal:'Legal or regulatory review',multiple:'Multiple stages',privacy:'Privacy and personal data',copyright:'Image and music rights',influencer:'Influencer disclosure',
    friendly:'Friendly and approachable',bold:'Bold and energetic',professional:'Professional and credible',inspiring:'Inspiring and emotional',luxury:'Premium and refined',fun:'Fun and fast-paced',educational:'Educational and simple',empathetic:'Human and empathetic',urgent:'Urgent and action-oriented',youthful:'Youthful and casual',formal:'Formal and institutional',light:'Light — 3 pieces per week',balanced:'Balanced — 5 pieces per week',intensive:'Intensive — daily',campaignBursts:'Focused bursts around key dates',weekdays:'Weekdays only',weekends:'Weekends only',
    ar:'Arabic',en:'English',draft:'Draft',active:'Active',completed:'Completed',archived:'Archived'
  };

  const originalText = new WeakMap();
  const originalAttrs = new WeakMap();
  let applying = false;

  const humanize = value => String(value || '')
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());

  function nearestControl(node) {
    const label = node.parentElement?.closest('label');
    return label?.querySelector('input[id],select[id],textarea[id]') || null;
  }

  function contextEnglish(node, source) {
    const parent = node.parentElement;
    if (!parent) return 'Campaign information';

    if (parent.tagName === 'OPTION') {
      return valueAliases[parent.value] || humanize(parent.value) || 'Other option';
    }

    const control = nearestControl(node);
    const trimmed = source.trim();
    if (control) {
      const label = idLabels[control.id] || humanize(control.id);
      if (parent.tagName === 'SMALL' || parent.classList.contains('field-help')) {
        return control.tagName === 'SELECT'
          ? `Choose the option that best fits your campaign.`
          : `Enter the details that best describe ${label.toLowerCase()}.`;
      }
      if (parent.tagName === 'LABEL' || parent.closest('label') === parent) return label;
    }

    if (parent.classList.contains('required-mark')) return 'Required';
    if (parent.classList.contains('selection-note')) return 'Your selected options will appear here.';
    if (parent.classList.contains('card-kicker') || /^[A-Z\s&/.-]+$/.test(trimmed)) return trimmed;
    if (parent.tagName === 'H1') return 'CampaignCraft';
    if (parent.tagName === 'H2' || parent.tagName === 'H3' || parent.tagName === 'H4' || parent.tagName === 'H5') return 'Campaign planning';
    if (parent.tagName === 'BUTTON' || parent.tagName === 'A') return 'Continue';
    if (parent.tagName === 'P' || parent.tagName === 'SMALL' || parent.tagName === 'SPAN') return 'Campaign guidance based on your selected inputs.';
    return 'Campaign information';
  }

  function translateText(node, lang) {
    if (!originalText.has(node)) originalText.set(node, node.nodeValue);
    const source = originalText.get(node);
    if (lang === 'ar') { node.nodeValue = source; return; }
    const trimmed = source.trim();
    if (!AR_RE.test(trimmed)) { node.nodeValue = source; return; }
    const translated = exact[trimmed] || contextEnglish(node, source);
    node.nodeValue = source.replace(trimmed, translated);
  }

  function translateAttributes(root, lang) {
    root.querySelectorAll?.('[placeholder],[title],[aria-label]').forEach(el => {
      if (!originalAttrs.has(el)) originalAttrs.set(el, {});
      const cache = originalAttrs.get(el);
      ['placeholder','title','aria-label'].forEach(attr => {
        if (!el.hasAttribute(attr)) return;
        if (!(attr in cache)) cache[attr] = el.getAttribute(attr);
        const original = cache[attr];
        if (lang === 'ar') { el.setAttribute(attr, original); return; }
        if (!AR_RE.test(original)) return;
        const label = idLabels[el.id] || exact[original.trim()] || humanize(el.id) || 'your answer';
        el.setAttribute(attr, attr === 'placeholder' ? `Enter ${String(label).toLowerCase()}` : label);
      });
    });
  }

  function applyDataI18n(root, lang) {
    root.querySelectorAll?.('[data-i18n]').forEach(el => {
      if (!el.dataset.originalText) el.dataset.originalText = el.textContent;
      const custom = {
        auth_secure_workspace:'Private and secure workspace',auth_signin:'Sign in',auth_signup:'Create account',
        auth_name_label:'Name',auth_email:'Email',auth_password:'Password',auth_forgot:'Forgot password?',
        auth_logout:'Sign out',auth_note:'Each user sees only their own campaigns and surveys. Public survey links remain available to participants without signing in.',
        auth_google:'Continue with Google',auth_or:'or',auth_remember:'Keep me signed in on this device'
      };
      el.textContent = lang === 'ar' ? el.dataset.originalText : (custom[el.dataset.i18n] || exact[el.dataset.originalText.trim()] || 'CampaignCraft');
    });
  }

  function applyKnownControls(lang, root) {
    if (!root?.querySelectorAll) return;
    const english = lang === 'en';
    const sectionMap = {
      '01':'Project basics','02':'Target audience','03':'Market, message, and differentiation','04':'Channels, resources, and execution','05':'Campaign goals and success criteria'
    };
    root.querySelectorAll('.wizard-step, .form-section-title').forEach(block => {
      const number = block.querySelector('span, .step-number')?.textContent?.trim();
      const heading = block.querySelector('h3, strong, b');
      if (!heading || !number || !sectionMap[number]) return;
      if (!heading.dataset.arText) heading.dataset.arText = heading.textContent.trim();
      heading.textContent = english ? sectionMap[number] : heading.dataset.arText;
    });
    root.querySelectorAll('label').forEach(label => {
      const control = label.querySelector('input[id],select[id],textarea[id]');
      if (!control) return;
      const known = idLabels[control.id];
      if (!known) return;
      const textNodes = [...label.childNodes].filter(n => n.nodeType === Node.TEXT_NODE && n.nodeValue.trim());
      const first = textNodes[0];
      if (!first) return;
      if (!first.__arOriginal) first.__arOriginal = first.nodeValue;
      first.nodeValue = english ? first.nodeValue.replace(first.nodeValue.trim(), known) : first.__arOriginal;
    });
    root.querySelectorAll('select option').forEach(option => {
      if (!option.dataset.arText) option.dataset.arText = option.textContent;
      if (english) option.textContent = valueAliases[option.value] || exact[option.dataset.arText.trim()] || humanize(option.value);
      else option.textContent = option.dataset.arText;
    });
  }

  function apply(lang = 'ar', root = document.body) {
    if (!root || applying) return;
    applying = true;
    const normalized = lang === 'en' ? 'en' : 'ar';
    document.documentElement.lang = normalized;
    document.documentElement.dir = normalized === 'ar' ? 'rtl' : 'ltr';
    document.body?.classList.toggle('lang-en', normalized === 'en');
    applyKnownControls(normalized, root);

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        if (['SCRIPT','STYLE'].includes(node.parentElement?.tagName)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => translateText(node, normalized));

    translateAttributes(root, normalized);
    applyDataI18n(root, normalized);

    document.title = normalized === 'en'
      ? (location.pathname.endsWith('surveys.html') ? 'CampaignCraft | Surveys' : location.pathname.endsWith('survey.html') ? 'CampaignCraft | Survey' : 'CampaignCraft | Campaign Planner')
      : (location.pathname.endsWith('surveys.html') ? 'CampaignCraft | مركز الاستبيانات' : location.pathname.endsWith('survey.html') ? 'استبيان | CampaignCraft' : 'CampaignCraft | مخطط الحملات الرقمية');
    applying = false;
  }

  const observer = new MutationObserver(mutations => {
    const lang = localStorage.getItem('campaigncraft_language_v1') || 'ar';
    if (applying) return;
    mutations.forEach(mutation => mutation.addedNodes.forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE) apply(lang, node);
      else if (node.nodeType === Node.TEXT_NODE && node.parentElement) apply(lang, node.parentElement);
    }));
  });

  document.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('campaigncraft_language_v1') || 'ar';
    apply(saved);
    setTimeout(() => apply(saved), 80);
    setTimeout(() => apply(saved), 450);
    observer.observe(document.body, {childList:true, subtree:true});
    document.addEventListener('change', event => {
      if (event.target && event.target.id === 'siteLanguage') {
        const lang = event.target.value === 'en' ? 'en' : 'ar';
        localStorage.setItem('campaigncraft_language_v1', lang);
        requestAnimationFrame(() => apply(lang));
        setTimeout(() => apply(lang), 120);
      }
    });
  });

  window.CampaignCraftI18n = {apply};
})();
