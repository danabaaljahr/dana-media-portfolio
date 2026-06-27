function startCampaignCraftAuthenticatedApp(){
const $ = id => document.getElementById(id);

const data = {
  goals: {
    sales:{label:'الترويج وزيادة المبيعات',sub:[['conversion','زيادة الطلبات أو المشتريات'],['offer','الترويج لعرض محدود'],['upsell','زيادة متوسط قيمة الطلب']],promise:'تحويل الاهتمام إلى قرار واضح',cta:['اطلب الآن','استفد من العرض','ابدأ تجربتك'],kpis:['معدل التحويل','تكلفة الاكتساب','العائد على الإنفاق الإعلاني','عدد الطلبات','متوسط قيمة الطلب'],mode:'conversion'},
    launch:{label:'إطلاق منتج أو خدمة أو مبادرة',sub:[['buzz','صناعة ترقّب قبل الإطلاق'],['trial','تشجيع التجربة الأولى'],['preorder','جمع تسجيلات أو طلبات مبكرة']],promise:'إطلاق يلفت الانتباه ويحفّز التجربة',cta:['اكتشف الجديد','كن من أوائل المشاركين','سجّل اهتمامك'],kpis:['الوصول الفريد','مشاهدات محتوى الإطلاق','التسجيلات المبكرة','زيارات الصفحة','نسبة إكمال الفيديو'],mode:'launch'},
    awareness:{label:'رفع الوعي والتعريف',sub:[['recognition','زيادة معرفة الجمهور بالموضوع'],['positioning','ترسيخ صورة ذهنية محددة'],['reach','الوصول إلى شريحة جديدة']],promise:'رسالة أوضح وأسهل للتذكّر',cta:['اعرف أكثر','اكتشف التفاصيل','شارك الرسالة'],kpis:['الوصول','مرات الظهور','نسبة مشاهدة الفيديو','تذكّر الرسالة','نمو البحث عن الموضوع'],mode:'awareness'},
    educationGoal:{label:'التثقيف وتبسيط المعلومات',sub:[['explain','شرح مفهوم أو نظام'],['myths','تصحيح معلومات شائعة'],['guidance','توجيه الجمهور لاتخاذ قرار صحيح']],promise:'معلومة واضحة تساعد الجمهور على الفهم والتصرف',cta:['تعرّف على التفاصيل','احفظ المعلومة','تحقق قبل الاختيار'],kpis:['نسبة إكمال المحتوى','الحفظ','المشاركات','النقر للمعلومات','نتائج اختبار المعرفة'],mode:'education'},
    behaviorChange:{label:'تغيير سلوك أو عادة',sub:[['adopt','تشجيع سلوك إيجابي'],['stop','الحد من سلوك خاطئ'],['compliance','رفع الالتزام بإرشاد أو تصنيف']],promise:'نقل الجمهور من المعرفة إلى التطبيق',cta:['طبّق الخطوة','اختر بشكل صحيح','ابدأ من اليوم'],kpis:['نسبة اتخاذ الإجراء','التفاعل مع الإرشادات','المشاركات','الزيارات للمصدر','تغير المعرفة أو السلوك'],mode:'education'},
    engagement:{label:'زيادة التفاعل وبناء مجتمع',sub:[['comments','رفع التعليقات والمحادثات'],['ugc','تشجيع محتوى الجمهور'],['loyalty','تعزيز الانتماء والولاء']],promise:'جمهور يشارك ولا يكتفي بالمشاهدة',cta:['شاركنا رأيك','صوّت الآن','انضم للنقاش'],kpis:['معدل التفاعل','التعليقات','المشاركات','الحفظ','محتوى المستخدمين'],mode:'engagement'},
    event:{label:'الترويج لفعالية أو مناسبة',sub:[['attendance','زيادة التسجيل والحضور'],['tickets','بيع التذاكر'],['coverage','رفع التفاعل مع التغطية']],promise:'من أول إعلان حتى لحظة الحضور',cta:['سجّل الآن','احجز مقعدك','أضف الموعد لتقويمك'],kpis:['التسجيلات','الحضور الفعلي','تكلفة التسجيل','مشاهدات التغطية','ذكر وسم الفعالية'],mode:'event'},
    leads:{label:'جمع تسجيلات أو طلبات اهتمام',sub:[['form','تعبئة نموذج'],['consultation','حجز استشارة أو موعد'],['download','تحميل دليل أو مادة']],promise:'تحويل الاهتمام إلى خطوة قابلة للمتابعة',cta:['سجّل بياناتك','احجز موعدك','حمّل الدليل'],kpis:['عدد التسجيلات','تكلفة التسجيل','معدل تعبئة النموذج','جودة الطلبات','نسبة المتابعة'],mode:'conversion'},
    traffic:{label:'زيادة الزيارات لمنصة أو موقع',sub:[['website','رفع زيارات الموقع'],['profile','زيادة زيارات الحساب'],['content','توجيه الجمهور لمحتوى محدد']],promise:'جذب الجمهور إلى الوجهة الصحيحة',cta:['زر الموقع','شاهد التفاصيل','انتقل للمصدر'],kpis:['النقرات','معدل النقر','الجلسات','مدة الزيارة','تكلفة النقرة'],mode:'conversion'},
    adoption:{label:'تشجيع استخدام خدمة أو تطبيق',sub:[['signup','زيادة التسجيل'],['activation','رفع التفعيل والاستخدام الأول'],['feature','التعريف بميزة محددة']],promise:'تسهيل الانتقال من المعرفة إلى الاستخدام',cta:['جرّب الخدمة','ابدأ الآن','فعّل حسابك'],kpis:['التسجيلات','معدل التفعيل','الاستخدام الأول','الاحتفاظ','تكلفة المستخدم'],mode:'conversion'},
    reputation:{label:'تحسين السمعة والصورة الذهنية',sub:[['trust','بناء الثقة'],['clarify','توضيح دور الجهة'],['proof','إبراز الإنجازات والأثر']],promise:'صورة ذهنية مبنية على دليل وقصة واضحة',cta:['اكتشف أثرنا','تعرّف علينا','شاهد القصة'],kpis:['تحليل المشاعر','ذكر الجهة','التفاعل الإيجابي','الوصول','نتائج استطلاع الثقة'],mode:'awareness'},
    socialImpact:{label:'دعم قضية أو صناعة أثر اجتماعي',sub:[['support','حشد التأييد'],['participation','تشجيع المشاركة'],['awareness','رفع الوعي بالقضية']],promise:'رسالة تحرّك الاهتمام نحو أثر ملموس',cta:['كن جزءًا من الأثر','انشر الرسالة','شارك بالمبادرة'],kpis:['المشاركات','التسجيلات','الوصول','ذكر القضية','الإجراءات المكتملة'],mode:'education'},
    fundraising:{label:'جمع تبرعات أو دعم',sub:[['donations','زيادة التبرعات'],['sponsors','جذب داعمين ورعاة'],['inKind','جمع دعم عيني']],promise:'ربط المساهمة بأثر واضح وموثوق',cta:['ساهم الآن','ادعم المبادرة','كن شريكًا في الأثر'],kpis:['قيمة التبرعات','عدد المتبرعين','معدل التحويل','تكلفة التبرع','المتبرعون المتكررون'],mode:'conversion'},
    recruitment:{label:'استقطاب متطوعين أو موظفين',sub:[['volunteers','استقطاب متطوعين'],['talent','استقطاب كفاءات'],['applications','زيادة طلبات التقديم']],promise:'جذب الأشخاص الأنسب للفرصة',cta:['قدّم الآن','انضم للفريق','سجّل اهتمامك'],kpis:['طلبات التقديم','جودة المرشحين','تكلفة الطلب','إكمال النموذج','التحويل للمقابلة'],mode:'conversion'},
    retention:{label:'الحفاظ على الجمهور ورفع الولاء',sub:[['repeat','تشجيع التكرار'],['community','تعزيز الانتماء'],['referral','رفع الإحالات والتوصيات']],promise:'علاقة مستمرة تتجاوز التفاعل الأول',cta:['ارجع للتجربة','شارك تجربتك','ادعُ شخصًا تعرفه'],kpis:['الاحتفاظ','التكرار','الإحالات','التفاعل المتكرر','رضا الجمهور'],mode:'engagement'},
    crisis:{label:'إدارة أزمة وتصحيح معلومات',sub:[['clarify','توضيح الحقائق'],['response','الرد على مخاوف الجمهور'],['updates','نشر تحديثات موثوقة']],promise:'معلومة دقيقة في الوقت المناسب',cta:['تحقق من المصدر','اطلع على التحديث','شارك المعلومة الصحيحة'],kpis:['سرعة الاستجابة','الوصول للمعلومة الصحيحة','انخفاض الشائعات','تحليل المشاعر','الأسئلة المجابة'],mode:'education'},
    appDownloads:{label:'زيادة تحميل تطبيق',sub:[['installs','زيادة مرات التثبيت'],['qualifiedInstalls','جذب مستخدمين مناسبين'],['activationAfterInstall','رفع التفعيل بعد التحميل']],promise:'تحويل الاهتمام إلى تثبيت واستخدام فعلي',cta:['حمّل التطبيق','ابدأ الآن','جرّب التطبيق'],kpis:['مرات التثبيت','تكلفة التثبيت','معدل التفعيل','الاحتفاظ','الاستخدام الأول'],mode:'conversion'},
    storeVisits:{label:'زيادة زيارة فرع أو موقع',sub:[['footfall','زيادة عدد الزوار'],['appointments','زيادة الحجوزات والزيارات'],['localAwareness','رفع الوعي المحلي بالموقع']],promise:'تحويل الجمهور الرقمي إلى زيارة فعلية',cta:['زرنا الآن','اعرف موقعنا','احجز زيارتك'],kpis:['الزيارات الفعلية','طلبات الاتجاهات','الحجوزات','تكلفة الزيارة','المبيعات داخل الفرع'],mode:'conversion'},
    researchParticipation:{label:'زيادة المشاركة في بحث أو استبيان',sub:[['responses','جمع عدد أكبر من الردود'],['representativeSample','الوصول إلى عينة متنوعة'],['completion','رفع نسبة إكمال الاستبيان']],promise:'مشاركة سهلة يشعر الجمهور بقيمتها',cta:['شارك رأيك','ابدأ الاستبيان','ساهم في الدراسة'],kpis:['عدد الردود','نسبة الإكمال','تنوع العينة','تكلفة الرد','جودة البيانات'],mode:'conversion'},
    policyCompliance:{label:'رفع الالتزام بسياسة أو تصنيف أو إرشاد',sub:[['understanding','رفع فهم السياسة'],['correctAction','زيادة السلوك الصحيح'],['reduceViolations','تقليل المخالفات أو الأخطاء']],promise:'تعليمات واضحة تتحول إلى التزام عملي',cta:['تحقق قبل الاختيار','التزم بالإرشاد','اعرف التصنيف'],kpis:['فهم الرسالة','اتخاذ السلوك الصحيح','انخفاض الأخطاء','الوصول للمصدر','الحفظ والمشاركة'],mode:'education'},
    customerService:{label:'تقليل الاستفسارات وتحسين خدمة الجمهور',sub:[['selfService','زيادة استخدام الخدمة الذاتية'],['faq','توضيح الأسئلة المتكررة'],['satisfaction','رفع رضا الجمهور']],promise:'إجابة أسرع وتجربة أوضح للجمهور',cta:['اعرف الخطوات','استخدم الخدمة','تواصل معنا'],kpis:['انخفاض الاستفسارات المتكررة','استخدام الخدمة الذاتية','زمن الاستجابة','الرضا','حل المشكلة'],mode:'education'},
    communityGrowth:{label:'تنمية قاعدة المتابعين والمجتمع',sub:[['followers','زيادة المتابعين المناسبين'],['members','زيادة أعضاء المجتمع'],['activeCommunity','رفع نشاط الأعضاء']],promise:'مجتمع ينمو حول قيمة مشتركة',cta:['تابعنا','انضم للمجتمع','شارك معنا'],kpis:['نمو المتابعين','الأعضاء الجدد','معدل التفاعل','المشاركات المتكررة','الاحتفاظ بالأعضاء'],mode:'engagement'},
    other:{label:'هدف مخصص',sub:[['custom','هدف تفصيلي مخصص']],promise:'خطة مبنية على الهدف الذي تحدده',cta:['اعرف أكثر','اتخذ الخطوة','شارك الرسالة'],kpis:['الوصول','التفاعل','النقرات','اتخاذ الإجراء','جودة الاستجابة'],mode:'education'}
  },
  industries: {
    food:{label:'المطاعم والمقاهي',offer:'تجربة مذاق تستحق المشاركة',visuals:'لقطات قريبة، حركة تحضير، وألوان دافئة',tags:['#مطاعم','#كافيهات','#تجربة_جديدة']},
    fashion:{label:'الأزياء والجمال',offer:'أسلوب يعكس شخصية الجمهور ويمنحه ثقة أكبر',visuals:'تفاصيل خامات، لقطات أسلوب حياة، وإضاءة ناعمة',tags:['#ستايل','#جمال','#إطلالة']},
    education:{label:'التعليم والتدريب',offer:'معرفة عملية تقرّب الجمهور من هدفه',visuals:'مخططات بسيطة، أمثلة، ولقطات تعلم واقعية',tags:['#تعلم','#تطوير_المهارات','#معرفة']},
    technology:{label:'التقنية والتطبيقات',offer:'حل أسهل لمشكلة يومية حقيقية',visuals:'واجهات، تسجيل شاشة، وموشن جرافيك حديث',tags:['#تقنية','#تطبيقات','#ابتكار']},
    tourism:{label:'السياحة والفعاليات',offer:'تجربة تُعاش وتُحفظ',visuals:'لقطات واسعة، تفاصيل حسية، ومحتوى POV',tags:['#سياحة','#فعاليات','#اكتشف']},
    health:{label:'الصحة واللياقة',offer:'خطوات موثوقة نحو نمط حياة أفضل',visuals:'إضاءة طبيعية، إنفوجرافيك موثوق، وألوان مريحة',tags:['#صحة','#وعي','#نمط_حياة']},
    government:{label:'الخدمات العامة والجهات الحكومية',offer:'معلومة أو خدمة أوضح وأسهل وصولًا',visuals:'إنفوجرافيك منظم، أيقونات واضحة، وتسلسل بسيط',tags:['#خدمة_عامة','#وعي','#معلومة']},
    culture:{label:'الثقافة والفنون والإعلام',offer:'محتوى يثري التجربة ويقرب الفكرة من الجمهور',visuals:'هوية سردية، صور معبرة، وتفاصيل بصرية قوية',tags:['#ثقافة','#إعلام','#فنون']},
    environment:{label:'البيئة والاستدامة',offer:'خطوة بسيطة يمكن أن تصنع أثرًا متراكمًا',visuals:'صور واقعية، أرقام مبسطة، وألوان طبيعية',tags:['#استدامة','#بيئة','#أثر']},
    social:{label:'القضايا الاجتماعية والسلوكية',offer:'وعي يساعد الجمهور على اتخاذ قرار أكثر أمانًا ومسؤولية',visuals:'قصص واقعية، أمثلة مبسطة، ورموز واضحة',tags:['#وعي','#مجتمع','#اختيار_صحيح']},
    nonprofit:{label:'المبادرات والجهات غير الربحية',offer:'أثر واضح يستطيع الجمهور أن يكون جزءًا منه',visuals:'قصص إنسانية، أرقام أثر، وصور واقعية',tags:['#أثر','#مبادرة','#مجتمع']},
    personal:{label:'العلامات الشخصية وصناع المحتوى',offer:'صوت أصيل يقدم معرفة أو إلهامًا',visuals:'حضور شخصي، خلف الكواليس، وهوية ثابتة',tags:['#صناعة_المحتوى','#علامة_شخصية','#إبداع']},
    retail:{label:'التجارة الإلكترونية والمتاجر',offer:'تجربة شراء سهلة وقيمة واضحة',visuals:'صور منتج نظيفة، استخدام واقعي، وإثبات اجتماعي',tags:['#متجر','#تسوق','#تجارة_إلكترونية']},
    finance:{label:'البنوك والتمويل والتأمين',offer:'قرار مالي أوضح وأكثر ثقة',visuals:'أرقام مبسطة، سيناريوهات واقعية، وهوية موثوقة',tags:['#وعي_مالي','#تمويل','#تأمين']},
    realestate:{label:'العقار والإسكان',offer:'اختيار عقاري مبني على معلومات واضحة',visuals:'جولات، خرائط، تفاصيل المساحات، ومقارنات',tags:['#عقار','#إسكان','#استثمار']},
    automotive:{label:'السيارات والنقل',offer:'تجربة تنقل تلائم احتياج الجمهور',visuals:'حركة، تفاصيل، مقارنة مزايا، وتجارب قيادة',tags:['#سيارات','#نقل','#تجربة']},
    entertainment:{label:'الترفيه والألعاب',offer:'تجربة ممتعة تستحق المشاركة',visuals:'إيقاع سريع، ألوان جريئة، ومقاطع لعب أو تجربة',tags:['#ترفيه','#ألعاب','#متعة']},
    sports:{label:'الرياضة والأندية',offer:'حماس وانتماء يدفعان الجمهور للمشاركة',visuals:'حركة، لحظات حاسمة، وأجواء جماهيرية',tags:['#رياضة','#نادي','#جمهور']},
    hospitality:{label:'الفنادق والضيافة',offer:'تجربة ضيافة مريحة ولا تُنسى',visuals:'تفاصيل المكان، الرحلة، والخدمة',tags:['#ضيافة','#فنادق','#تجربة']},
    professionalServices:{label:'الخدمات المهنية والاستشارات',offer:'خبرة موثوقة تحل مشكلة حقيقية',visuals:'دراسات حالة، نتائج، وخبراء',tags:['#استشارات','#خدمات','#خبرة']},
    research:{label:'البحث والدراسات والاستبيانات',offer:'معرفة مبنية على مشاركة وبيانات موثوقة',visuals:'أرقام، رسوم، أسئلة، ونتائج مبسطة',tags:['#بحث','#استبيان','#بيانات']},
    other:{label:'مجال مخصص',offer:'قيمة أو معلومة تلائم احتياج الجمهور',visuals:'اتجاه بصري واضح يخدم الرسالة ويبسّط الفكرة',tags:['#حملة_رقمية','#وعي','#محتوى']}
  },
  platforms:{
    instagram:{label:'Instagram',formats:['Reel','Carousel','Stories','Static Post'],times:['8:30 م','1:30 م','9:00 م'],advice:'استخدمي Reels للوصول وCarousel للشرح وStories للتذكير والتفاعل.'},
    tiktok:{label:'TikTok',formats:['فيديو قصير','سلسلة فيديو','رد بفيديو','تجربة ترند'],times:['9:00 م','6:30 م','10:00 م'],advice:'ابدئي بالنتيجة أو السؤال، واجعلي النص واضحًا وسريعًا على الشاشة.'},
    x:{label:'X',formats:['منشور قصير','سلسلة Thread','استطلاع','مساحة صوتية'],times:['12:30 م','7:00 م','10:30 م'],advice:'قدّمي معلومة أو رأيًا واضحًا ثم تابعي الردود لبناء النقاش.'},
    youtube:{label:'YouTube',formats:['Shorts','فيديو رئيسي','مقارنة','شرح عملي'],times:['7:00 م','4:00 م','9:00 م'],advice:'استخدمي عنوانًا بوعد واحد، واربطِي الفيديوهات القصيرة بالمصدر الكامل.'},
    linkedin:{label:'LinkedIn',formats:['منشور معرفي','Document Post','دراسة حالة','فيديو مهني'],times:['10:00 ص','1:00 م','6:00 م'],advice:'قدّمي قيمة مهنية أو نتيجة قابلة للقياس بأسلوب قصصي مختصر.'},
    snapchat:{label:'Snapchat',formats:['Story عمودية','لقطة يومية','شرح سريع','خلف الكواليس'],times:['8:00 م','3:30 م','11:00 م'],advice:'حافظي على الإيقاع اليومي واللقطات الطبيعية وكرري الرسالة بصيغ قصيرة.'},
    facebook:{label:'Facebook',formats:['فيديو','منشور مجتمع','صورة','حدث'],times:['1:00 م','7:30 م','9:00 م'],advice:'استخدمي المجموعات والاستهداف الدقيق والمحتوى القابل للمشاركة.'},
    threads:{label:'Threads',formats:['منشور حواري','سلسلة قصيرة','سؤال','رأي سريع'],times:['11:00 ص','7:00 م','10:00 م'],advice:'اكتبي بأسلوب حواري طبيعي وشاركي في الردود بسرعة.'},
    whatsapp:{label:'WhatsApp',formats:['رسالة مختصرة','حالة','بطاقة قابلة للمشاركة','تحديث قناة'],times:['11:00 ص','5:00 م','8:00 م'],advice:'اجعلي الرسالة شخصية ومباشرة وسهلة إعادة الإرسال مع رابط واحد واضح.'},
    telegram:{label:'Telegram',formats:['منشور قناة','ملف مختصر','تصويت','تنبيه'],times:['10:00 ص','4:00 م','9:00 م'],advice:'نظمي المحتوى كسلسلة واضحة واستفيدي من الملفات والتصويتات.'},
    pinterest:{label:'Pinterest',formats:['Pin بصري','Infographic','دليل مرئي','Idea Pin'],times:['2:00 م','8:00 م','10:00 م'],advice:'ركزي على البحث البصري، العناوين الواضحة، وروابط المحتوى الدائم.'},
    reddit:{label:'Reddit',formats:['منشور نقاش','دليل','AMA','قصة تجربة'],times:['12:00 م','6:00 م','10:00 م'],advice:'قدمي قيمة حقيقية واحترمي قواعد المجتمع وتجنبي الإعلان المباشر.'},
    twitch:{label:'Twitch',formats:['بث مباشر','مقابلة','تجربة','جلسة أسئلة'],times:['7:00 م','9:00 م','11:00 م'],advice:'خططي لفقرات البث والتفاعل الحي وإعادة استخدام المقاطع القصيرة.'},
    discord:{label:'Discord',formats:['إعلان مجتمع','نقاش','فعالية صوتية','تحدي'],times:['4:00 م','8:00 م','10:00 م'],advice:'قسمي المجتمع إلى قنوات واضحة وامنحي الأعضاء أدوارًا ومهامًا.'},
    podcast:{label:'Podcast',formats:['حلقة كاملة','مقطع صوتي','مقابلة','رعاية'],times:['7:00 ص','1:00 م','7:00 م'],advice:'ابني الحلقة حول سؤال واحد واستخدمي المقاطع القصيرة للترويج.'},
    email:{label:'Email',formats:['نشرة','رسالة ترحيب','سلسلة آلية','رسالة عرض'],times:['9:00 ص','12:00 م','6:00 م'],advice:'استخدمي عنوانًا واضحًا، محتوى قابل للمسح، وCTA واحدًا أساسيًا.'},
    website:{label:'Website / Blog',formats:['مقال','صفحة هبوط','دليل','قصة نجاح'],times:['10:00 ص','2:00 م','7:00 م'],advice:'اربطي كل المحتوى بصفحة هبوط سريعة وواضحة ومحسنة للجوال.'},
    googleSearch:{label:'Google Search',formats:['إعلان بحث','صفحة هبوط','امتداد رابط','إعادة استهداف'],times:['طوال اليوم','وقت الذروة','حسب البحث'],advice:'قسمي الكلمات حسب نية البحث وطابقي الإعلان مع صفحة الهبوط.'},
    display:{label:'Display Ads',formats:['بانر','فيديو قصير','إعلان متجاوب','إعادة استهداف'],times:['طوال اليوم','وقت الذروة','حسب الجمهور'],advice:'استخدمي رسالة بصرية واحدة واختبري أكثر من تصميم وحجم.'},
    sms:{label:'SMS',formats:['تنبيه','عرض','تذكير','رابط مختصر'],times:['10:00 ص','4:00 م','8:00 م'],advice:'اجعلي الرسالة شديدة الاختصار مع فائدة ورابط وخيار إلغاء واضح.'},
    other:{label:'قناة مخصصة',formats:['محتوى مخصص','رسالة','تجربة','تحديث'],times:['حسب نشاط الجمهور'],advice:'حددي طبيعة القناة وسلوك مستخدميها قبل اختيار الصيغة والتوقيت.'}
  },
  audience:{
    type:{general:'الجمهور العام مع تقسيم الرسائل حسب الاهتمام',students:'طلاب وطالبات؛ يحتاجون لغة مباشرة وأمثلة قريبة',parents:'أولياء أمور وأسر؛ يهتمون بالوضوح والأمان والنتائج',employees:'موظفون وباحثون عن عمل؛ يقدّرون الفائدة العملية والوقت',professionals:'متخصصون؛ يحتاجون دقة ومصادر وأدلة',businesses:'شركات وصناع قرار؛ يركزون على الأثر والموثوقية',creators:'صناع محتوى؛ يستجيبون للأفكار القابلة للمشاركة والتطبيق',volunteers:'متطوعون وداعمون؛ تحركهم القصة والأثر ودورهم الواضح',beneficiaries:'مستفيدون؛ يحتاجون خطوات سهلة ومعلومة مباشرة',customers:'عملاء حاليون؛ نركز على الاستمرار والولاء',prospects:'عملاء محتملون؛ يحتاجون قيمة ودليلًا يزيل التردد',childrenAudience:'أطفال؛ نستخدم لغة آمنة وبسيطة ومحتوى بصريًا',teensAudience:'مراهقون؛ نستخدم أسلوبًا سريعًا وأمثلة قريبة',families:'عائلات؛ نهتم بالفائدة المشتركة والوضوح',seniorsAudience:'كبار السن؛ نستخدم خطًا واضحًا وخطوات مباشرة',media:'إعلاميون؛ يحتاجون حقائق ومصادر وقصة قابلة للنشر',investors:'مستثمرون وشركاء؛ يركزون على الأثر والفرصة والأرقام',governmentAudience:'جهات حكومية؛ تحتاج لغة رسمية وموثوقة',tourists:'سياح وزوار؛ يحتاجون معلومات سهلة وتجربة بصرية',patients:'مرضى ومراجعون؛ يحتاجون تعاطفًا ووضوحًا ومعلومات موثوقة'},
    age:{children:'أطفال أقل من 13 سنة؛ محتوى بسيط وآمن يعتمد على الصورة والشرح',teens:'مراهقون 13–17؛ ينجذبون للسرعة والأمثلة البصرية',young:'شباب 18–24؛ يقدّرون الأصالة والتجربة والوضوح',adults:'بالغون 25–34؛ يبحثون عن قيمة واضحة وتوفير وقت',mature:'بالغون 35–44؛ يهتمون بالثقة والنتائج',older:'بالغون 45–54؛ يفضّلون الوضوح والمصداقية',senior:'55 سنة فأكثر؛ يحتاجون لغة مباشرة وتصميمًا سهل القراءة',multi:'أكثر من فئة عمرية؛ يجب تقسيم الرسالة أو الأمثلة بحسب العمر'},
    gender:{all:'خطاب شامل غير مقيّد بجنس',women:'رسائل مرتبطة باحتياجات النساء دون صور نمطية',men:'رسائل مرتبطة باحتياجات الرجال دون مبالغة'},
    location:{jeddah:'جمهور جدة مع أمثلة وتجارب محلية',riyadh:'جمهور الرياض مع سياق محلي مناسب',city:'مدينة أو محافظة محددة؛ خصصي اللهجة والأمثلة والمواقع',region:'منطقة محددة؛ اربطي الرسالة بالسياق المحلي',saudi:'جمهور سعودي متنوع بلغة عربية بسيطة ولمسات محلية',gulf:'جمهور خليجي بسياق ثقافي مشترك',arab:'جمهور عربي مع تجنب التفاصيل المحلية الضيقة',global:'جمهور عالمي يحتاج لغة وسياقًا قابلين للفهم عبر الثقافات',online:'جمهور رقمي دون نطاق مكاني؛ الاستهداف يعتمد على الاهتمام والسلوك'},
    interest:{offers:'حساس للقيمة ويحتاج عرضًا أو فائدة محددة',trends:'يستجيب للجِدة والإثبات الاجتماعي',quality:'يحتاج تفاصيل ونتائج ومصادر ثقة',learning:'يستجيب للشرح والخطوات والمحتوى القابل للحفظ',safety:'يبحث عن الحماية وتقليل المخاطر واتخاذ قرار صحيح',awarenessNeed:'يحتاج فهم نظام أو معلومة مهمة قبل اتخاذ القرار',lifestyle:'يرتبط بالقصص والمشاهد القريبة من حياته',community:'يريد أن يُسمع صوته ويشعر بالانتماء',convenience:'يبحث عن السهولة وتوفير الوقت والجهد',status:'يهتم بالصورة الاجتماعية والمكانة',entertainmentNeed:'يتفاعل مع المتعة والمفاجأة',belonging:'يريد الشعور بالانتماء والهوية',healthNeed:'يهتم بالصحة والراحة والرفاه',career:'يركز على الوظيفة والنمو المهني',familyNeed:'يهتم بالأسرة والأطفال',trust:'يحتاج شفافية ومصداقية قبل التفاعل',impact:'يتحمس للأثر الاجتماعي أو البيئي'},
    funnel:{unaware:'غير مدرك للموضوع: نبدأ بموقف مألوف أو سؤال يكشف المشكلة',cold:'معرفته محدودة: نشرح الأساسيات دون افتراض معرفة مسبقة',warm:'يبحث عن معلومات: نقدم شرحًا ودليلًا ومصادر',considering:'يقارن: نوضح الفروق والمعايير والنتائج',hot:'مستعد للإجراء: نجعل الخطوة واضحة وسهلة',customers:'سبق أن تفاعل: نركز على التذكير والتكرار',advocates:'مؤيد: نعطيه مادة قابلة للمشاركة والدفاع عن الرسالة'},
    behavior:{watch:'يفضّل الفيديو القصير؛ الأولوية لخطاف بصري ونص سريع',search:'يبحث ويتحقق؛ يحتاج معلومات ومصادر وأسئلة شائعة',reviews:'يتأثر بآراء الآخرين؛ نستخدم شهادات وتجارب',share:'يشارك المفيد؛ نصنع محتوى قابلًا للإرسال',save:'يحفظ المحتوى؛ نستخدم قوائم وخطوات وملخصات',discuss:'يناقش ويسأل؛ نستخدم أسئلة وأمثلة وردودًا واضحة',avoid:'يتجاهل الخطاب المباشر؛ نستخدم قصة أو موقف بدل الوعظ',fast:'يتخذ قرارًا سريعًا؛ نستخدم رسالة قصيرة وخطوة واحدة',offline:'يتأثر بالأسرة والمحيط؛ ننتج محتوى سهل المشاركة والنقاش خارج المنصة',click:'ينقر عندما تكون الفائدة والرابط واضحين',compare:'يقارن البدائل؛ يحتاج جدول فروق ومعايير',ask:'يسأل قبل القرار؛ يحتاج ردودًا سريعة وأسئلة شائعة',buy:'يشتري سريعًا عند وجود عرض وقيمة واضحة',register:'يسجل عند سهولة النموذج ووضوح الفائدة',follow:'يتابع أولًا؛ يحتاج سلسلة محتوى تبني الثقة',listen:'يفضل الصوت؛ نستخدم مقاطع وحلقات',longform:'يفضل التعمق؛ نستخدم أدلة ومقالات وفيديو طويل'}
  },
  tones:{friendly:'لغة قريبة وبسيطة تشبه حديث الجمهور',bold:'جمل قصيرة وحاسمة وطاقة عالية',professional:'لغة دقيقة وموثوقة مبنية على قيمة ودليل',inspiring:'قصص وأمل وصور ذهنية عاطفية',luxury:'لغة هادئة وانتقائية تبرز التفاصيل',fun:'لغة مرحة وخفيفة بإيقاع سريع',educational:'لغة تعليمية مبسطة بخطوات وأمثلة',empathetic:'لغة إنسانية تراعي مشاعر الجمهور',urgent:'لغة عاجلة توضح الوقت والخطوة التالية',youthful:'لغة شبابية طبيعية وغير متكلفة',formal:'لغة رسمية مؤسسية واضحة'}
};


const GOAL_MODE_TARGETS={
  awareness:['reach','impressions','views','viewRate'],
  education:['reach','views','shares','saves','clicks'],
  conversion:['clicks','conversions','registrations','downloads','revenue','ctr','conversionRate'],
  launch:['reach','impressions','views','clicks','conversions'],
  engagement:['reach','likes','comments','shares','saves','followers','engagementRate'],
  event:['reach','views','clicks','registrations','conversions'],
  default:['reach','clicks','conversions']
};
const GENERAL_METRIC_FIELDS={
  impressions:'planTargetImpressions',reach:'planTargetReach',views:'planTargetViews',clicks:'planTargetClicks',conversions:'planTargetConversions',registrations:'planTargetRegistrations',revenue:'planTargetRevenue',ctr:'planTargetCtr',conversionRate:'planTargetConversion',followers:'planTargetFollowers',downloads:'planTargetDownloads',engagementRate:'planTargetEngagement',viewRate:'planTargetViewRate'
};
const GENERAL_METRIC_LABELS={
  impressions:'مرات ظهور',reach:'وصول',views:'مشاهدة',clicks:'نقرة',conversions:'إجراء مكتمل',registrations:'تسجيل/عميل محتمل',revenue:'ر.س إيراد',ctr:'% CTR',conversionRate:'% تحويل',followers:'متابع جديد',downloads:'تحميل',engagementRate:'% تفاعل',viewRate:'% مشاهدة'
};
const PLATFORM_METRIC_META={
  impressions:{label:'مرات الظهور',help:'مناسب لمعرفة حجم عرض المحتوى أو الإعلان.',placeholder:'مثال: 120000',step:'1'},
  reach:{label:'الوصول',help:'عدد الأشخاص الفريدين المتوقع الوصول إليهم.',placeholder:'مثال: 50000',step:'1'},
  views:{label:'المشاهدات',help:'مهم للمحتوى المرئي والفيديو.',placeholder:'مثال: 30000',step:'1'},
  likes:{label:'الإعجابات',help:'مؤشر سريع على التفاعل الأولي.',placeholder:'مثال: 2500',step:'1'},
  comments:{label:'التعليقات',help:'تقيس عمق النقاش والاهتمام.',placeholder:'مثال: 200',step:'1'},
  shares:{label:'المشاركات / إعادة النشر',help:'تقيس قابلية الرسالة للانتشار.',placeholder:'مثال: 500',step:'1'},
  saves:{label:'الحفظ',help:'مفيد للمحتوى المرجعي أو التعليمي.',placeholder:'مثال: 700',step:'1'},
  clicks:{label:'النقرات',help:'عدد الزيارات إلى الرابط أو الوجهة المطلوبة.',placeholder:'مثال: 1800',step:'1'},
  conversions:{label:'الإجراءات المكتملة',help:'شراء، تسجيل، حجز، تعبئة نموذج أو أي خطوة نهائية.',placeholder:'مثال: 120',step:'1'},
  followers:{label:'متابعون / مشتركون جدد',help:'مهم إذا كان هدفك بناء مجتمع أو نمو الحساب.',placeholder:'مثال: 1000',step:'1'},
  registrations:{label:'تسجيلات / عملاء محتملون',help:'مناسب للاستمارات، الحجوزات وطلبات التواصل.',placeholder:'مثال: 300',step:'1'},
  downloads:{label:'تحميلات',help:'مهم للتطبيقات، الملفات أو الأدلة القابلة للتنزيل.',placeholder:'مثال: 500',step:'1'},
  revenue:{label:'الإيراد / قيمة المبيعات (ر.س)',help:'استخدميه عندما يكون الهدف ماليًا مباشرًا.',placeholder:'مثال: 50000',step:'0.01'},
  engagementRate:{label:'معدل التفاعل %',help:'يفيد عند مقارنة جودة التفاعل بين المنصات.',placeholder:'مثال: 5',step:'0.01'},
  viewRate:{label:'معدل المشاهدة %',help:'مناسب للفيديوهات والبث.',placeholder:'مثال: 35',step:'0.01'},
  ctr:{label:'CTR %',help:'نسبة من ضغطوا على الرابط أو زر الإجراء.',placeholder:'مثال: 1.5',step:'0.01'},
  conversionRate:{label:'معدل التحويل %',help:'نسبة من أكملوا الإجراء النهائي.',placeholder:'مثال: 4',step:'0.01'},
  profileVisits:{label:'زيارات الملف أو الصفحة',help:'مفيد لحسابات المنصات وصفحات العرض.',placeholder:'مثال: 1500',step:'1'},
  opens:{label:'مرات الفتح / القراءة',help:'مناسب للإيميل، الرسائل والقنوات المباشرة.',placeholder:'مثال: 4000',step:'1'},
  replies:{label:'الردود المباشرة',help:'تقيس استجابة الجمهور في الرسائل والقنوات الحوارية.',placeholder:'مثال: 150',step:'1'},
  watchHours:{label:'ساعات المشاهدة',help:'مناسب خصوصًا لـ YouTube والبث الطويل.',placeholder:'مثال: 250',step:'0.1'}
};
const PLATFORM_METRIC_CONFIG={
  instagram:['reach','impressions','views','likes','comments','shares','saves','profileVisits','clicks','followers','conversions'],
  tiktok:['reach','views','likes','comments','shares','saves','profileVisits','followers','clicks','conversions'],
  x:['impressions','reach','likes','comments','shares','clicks','followers','conversions'],
  youtube:['impressions','views','watchHours','likes','comments','shares','clicks','followers','conversions'],
  linkedin:['impressions','reach','clicks','likes','comments','shares','followers','registrations','conversions'],
  snapchat:['impressions','reach','views','clicks','conversions'],
  facebook:['impressions','reach','clicks','likes','comments','shares','followers','conversions'],
  threads:['impressions','reach','likes','comments','shares','followers'],
  whatsapp:['opens','clicks','replies','shares','conversions'],
  telegram:['opens','clicks','replies','shares','followers','conversions'],
  pinterest:['impressions','reach','clicks','saves','followers','conversions'],
  reddit:['impressions','reach','comments','shares','clicks','conversions'],
  twitch:['views','watchHours','comments','followers','clicks'],
  discord:['opens','replies','clicks','followers','conversions'],
  podcast:['views','watchHours','clicks','followers','conversions'],
  email:['opens','clicks','registrations','conversions','revenue'],
  website:['reach','views','clicks','registrations','downloads','conversions','revenue'],
  googleSearch:['impressions','clicks','ctr','conversions','conversionRate','revenue'],
  display:['impressions','reach','clicks','ctr','conversions','conversionRate'],
  sms:['opens','clicks','replies','conversions'],
  other:['reach','views','clicks','conversions']
};
const PLATFORM_ANALYTICS_MAP={
  targetReachCount:'reach',targetViewsCount:'views',targetLikesCount:'likes',targetCommentsCount:'comments',targetSharesCount:'shares',targetSavesCount:'saves',targetClicksCount:'clicks',targetConversionsCount:'conversions',targetFollowersCount:'followers',targetDownloadsCount:'downloads',targetRegistrationsCount:'registrations',targetRevenueCount:'revenue'
};

const customMap={organizationType:'organizationTypeCustom',campaignSubject:'campaignSubjectCustom',campaignTrigger:'campaignTriggerCustom',campaignStage:'campaignStageCustom',audienceMotivation:'audienceMotivationCustom',audienceObjection:'audienceObjectionCustom',decisionMaker:'decisionMakerCustom',competitionType:'competitionTypeCustom',desiredPerception:'desiredPerceptionCustom',previousData:'previousDataCustom',totalBudget:'totalBudgetCustom',teamSize:'teamSizeCustom',availableAssets:'availableAssetsCustom',destination:'destinationCustom',trackingSetup:'trackingSetupCustom',approvalFlow:'approvalFlowCustom',compliance:'complianceCustom',industry:'industryCustom',goal:'goalCustom',subGoal:'subGoalCustom',duration:'durationCustom',audienceType:'audienceTypeCustom',age:'ageCustom',location:'locationCustom',interest:'interestCustom',funnel:'funnelCustom',behavior:'behaviorCustom',tone:'toneCustom',frequency:'frequencyCustom',budget:'budgetCustom'};
function syncCustom(id){const input=$(customMap[id]); if(!input)return; const show=['other','custom'].includes($(id).value); input.classList.toggle('hidden',!show); input.required=show; if(show)setTimeout(()=>input.focus(),0)}
Object.keys(customMap).forEach(id=>$(id)?.addEventListener('change',()=>syncCustom(id)));
function customText(id,fallback=''){const select=$(id);const input=$(customMap[id]);if(['other','custom'].includes(select.value)&&input?.value.trim())return input.value.trim();return fallback||select.selectedOptions[0]?.text||''}

function updateBriefProgress(){
  const essentials=['campaignName','industry','organizationType','campaignSubject','offerDescription','goal','subGoal','audienceType','age','gender','location','interest','funnel','behavior','audiencePain','uniqueValue'];
  const done=essentials.filter(id=>String($(id)?.value||'').trim()).length + (selectedPlatformKeys().length?1:0);
  const total=essentials.length+1;
  const pct=Math.round(done/total*100);
  if($('briefProgressText')) $('briefProgressText').textContent=`${pct}%`;
  if($('briefProgressBar')) $('briefProgressBar').style.width=`${pct}%`;
}
function updateSubGoals(){
  const goal=data.goals[$('goal').value]||data.goals.other;
  const opts=[...goal.sub,['other','غير ذلك — اكتبي الهدف التفصيلي']];
  $('subGoal').innerHTML=opts.map(([v,l])=>`<option value="${v}">${l}</option>`).join('');
  $('subGoalCustom').classList.add('hidden'); $('subGoalCustom').required=false;
  syncCustom('goal');
  updateTargetExperience();
}

function selected(id){return $(id).value}
function selectedPlatformKeys(){return ($('platform').value||'').split(',').filter(Boolean)}
function getPlatformDisplayName(key){return key==='other'&&$('platformCustom')?.value.trim()?$('platformCustom').value.trim():(data.platforms[key]?.label||key)}
function selectedPlatforms(){return selectedPlatformKeys().map(key=>{const p={...(data.platforms[key]||data.platforms.other)};if(key==='other'&&$('platformCustom')?.value.trim())p.label=$('platformCustom').value.trim();return p})}
function parsePlatformMetricsData(){try{return JSON.parse($('platformMetricsData')?.value||'{}')||{}}catch{return {}}}
function storePlatformMetricsData(payload){if($('platformMetricsData'))$('platformMetricsData').value=JSON.stringify(payload||{})}
function escapeHtml(text=''){return String(text).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]))}
function metricsForPlatform(key,mode){
  const fromPlatform=PLATFORM_METRIC_CONFIG[key]||PLATFORM_METRIC_CONFIG.other;
  const recommended=GOAL_MODE_TARGETS[mode]||GOAL_MODE_TARGETS.default;
  return [...new Set([...recommended.filter(metric=>fromPlatform.includes(metric)),...fromPlatform])];
}
function platformMetricInput(platformKey,metricKey,value=''){
  const meta=PLATFORM_METRIC_META[metricKey];
  if(!meta) return '';
  return `<label><span>${meta.label}</span><small>${meta.help}</small><input data-platform-metric="${platformKey}::${metricKey}" type="number" min="0" step="${meta.step||'1'}" placeholder="${meta.placeholder||''}" value="${escapeHtml(value)}"></label>`;
}
function renderPlatformMetricGroups(){
  const holder=$('selectedPlatformsMetrics');
  if(!holder) return;
  const selectedKeys=selectedPlatformKeys();
  const stored=parsePlatformMetricsData();
  const mode=resolvedGoal().mode;
  const pruned={};
  selectedKeys.forEach(key=>{if(stored[key]) pruned[key]=stored[key]});
  if(JSON.stringify(pruned)!==JSON.stringify(stored)) storePlatformMetricsData(pruned);
  if(!selectedKeys.length){
    holder.innerHTML='<div class="platform-metrics-empty">اختاري منصة أو أكثر من قسم القنوات، ثم عيّني أرقام النجاح المناسبة لكل منصة بشكل منفصل.</div>';
    return;
  }
  holder.innerHTML=selectedKeys.map(key=>{
    const metrics=metricsForPlatform(key,mode);
    const title=getPlatformDisplayName(key);
    const advice=data.platforms[key]?.advice||'حددي المؤشرات الأقرب لطبيعة هذه القناة.';
    return `<article class="platform-metric-card"><div class="platform-metric-head"><div><h5>${escapeHtml(title)}</h5><p>${escapeHtml(advice)}</p></div><span>${metrics.length} مؤشرات</span></div><div class="platform-metric-grid">${metrics.map(metric=>platformMetricInput(key,metric,pruned[key]?.[metric]||'')).join('')}</div></article>`;
  }).join('');
  holder.querySelectorAll('[data-platform-metric]').forEach(input=>input.addEventListener('input',event=>{
    const [platformKey,metricKey]=event.target.dataset.platformMetric.split('::');
    const payload=parsePlatformMetricsData();
    payload[platformKey]=payload[platformKey]||{};
    payload[platformKey][metricKey]=event.target.value;
    storePlatformMetricsData(payload);
  }));
}
function updateGoalTargetHint(){
  const hint=$('goalTargetHint');
  if(!hint) return;
  const goal=resolvedGoal();
  const recommended=(GOAL_MODE_TARGETS[goal.mode]||GOAL_MODE_TARGETS.default).map(key=>GENERAL_METRIC_LABELS[key]||PLATFORM_METRIC_META[key]?.label||key);
  hint.innerHTML=`<strong>مؤشرات مقترحة لهذا النوع من الحملات:</strong><span>${recommended.join(' • ')}</span>`;
  document.querySelectorAll('[data-general-metric]').forEach(card=>card.classList.toggle('is-recommended', recommended.includes(GENERAL_METRIC_LABELS[card.dataset.generalMetric]||card.dataset.generalMetric)));
}
function updateTargetExperience(){
  updateGoalTargetHint();
  renderPlatformMetricGroups();
}
function aggregatePlatformMetricTotals(){
  const payload=parsePlatformMetricsData();
  const totals={};
  Object.values(payload).forEach(platformMetrics=>{
    Object.entries(platformMetrics||{}).forEach(([metric,value])=>{
      const number=Number(value)||0;
      if(!number) return;
      totals[metric]=(totals[metric]||0)+number;
    });
  });
  return totals;
}
function syncPlatforms(){
  const boxes=[...document.querySelectorAll('#platformOptions input[type=checkbox]')];
  let checked=boxes.filter(x=>x.checked);
  if(!checked.length){boxes[0].checked=true;checked=[boxes[0]]}
  $('platform').value=checked.map(x=>x.value).join(',');
  const other=checked.some(x=>x.value==='other');
  $('platformCustom').classList.toggle('hidden',!other);
  $('platformCustom').required=other;
  $('platformSelectionNote').textContent=`تم اختيار ${checked.length} ${checked.length===1?'منصة':'منصات'}: ${checked.map(x=>getPlatformDisplayName(x.value)).join('، ')}`;
  updateBriefProgress();
  renderPlatformMetricGroups();
}
document.querySelectorAll('#platformOptions input[type=checkbox]').forEach(x=>x.addEventListener('change',syncPlatforms));
$('platformCustom')?.addEventListener('input',syncPlatforms);
$('goal').addEventListener('change',updateSubGoals);
updateSubGoals();syncPlatforms();updateBriefProgress();

function list(el,items){el.innerHTML=items.map(x=>`<p><span>✓</span>${x}</p>`).join('')}
function cleanName(){return $('campaignName').value.trim()||'حملتك الجديدة'}
function mapped(group,id,prefix=''){const key=selected(id);if(key==='other')return `${prefix}${customText(id,'تحديد مخصص')}`;return data.audience[group][key]||customText(id)}
function resolvedGoal(){const base={...(data.goals[selected('goal')]||data.goals.other)};if(selected('goal')==='other')base.label=customText('goal','هدف مخصص');return base}
function resolvedIndustry(){const base={...(data.industries[selected('industry')]||data.industries.other)};if(selected('industry')==='other'){base.label=customText('industry','مجال مخصص');base.offer=`قيمة أو معلومة مرتبطة بـ${base.label} وتلائم احتياج الجمهور`;base.tags=['#حملة_رقمية','#وعي','#محتوى'];}return base}

function createSchedule(mode,industry,platform,tone,cta,count,topic){
  const bank={
    conversion:{hooks:['ما الذي يمنعك من اتخاذ الخطوة الآن؟','القرار أسهل عندما تكون القيمة واضحة.','هذه الخطوة تختصر عليك الكثير.'],ideas:['فيديو مشكلة وحل ينتهي بالخطوة المطلوبة','كاروسيل يوضح الفوائد والمعايير','تجربة أو دليل اجتماعي','أسئلة شائعة تعالج التردد','منشور مباشر يشرح الإجراء']},
    launch:{hooks:['شيء جديد يقترب.','بدأ العد التنازلي.','هذا ما كنا نعمل عليه.'],ideas:['فيديو تشويقي','خلف الكواليس','كشف الفكرة أو الميزة','تجربة أول مشارك','الإعلان الرسمي']},
    awareness:{hooks:['قد تمر هذه الفكرة أمامنا دون أن نلاحظها.','معلومة واحدة قد تغيّر نظرتك.','القصة أكبر مما تبدو.'],ideas:['فيديو حقيقة لافتة','كاروسيل تعريفي','قصة واقعية','اختبار معلومات','ملخص بصري قابل للمشاركة']},
    education:{hooks:['هل تعرف لماذا يحدث هذا؟','قبل أن تختار، انتبه لهذه النقطة.','المعلومة الصحيحة تبدأ من هنا.'],ideas:['شرح مبسط للمفهوم','صح أم خطأ','موقف واقعي وقرار صحيح','قائمة خطوات أو معايير','سؤال تفاعلي مع الإجابة']},
    engagement:{hooks:['اختيارك سيحدد النقاش القادم.','ما رأيك؟','أكمل الجملة بطريقتك.'],ideas:['تصويت بين خيارين','سؤال نقاشي','تحدي من الجمهور','إعادة نشر مشاركة','جلسة أسئلة']},
    event:{hooks:['الموعد أصبح قريبًا.','تخيّل أن تعيش التجربة بنفسك.','هذه أبرز التفاصيل التي تحتاجها.'],ideas:['فيديو أجواء متوقعة','كشف الفقرات','عد تنازلي','خلف الكواليس','تغطية وملخص']}
  };
  const pack=bank[mode]||bank.education,days=['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
  return Array.from({length:count},(_,i)=>{const format=platform.formats[i%platform.formats.length],idea=pack.ideas[i%pack.ideas.length],hook=pack.hooks[i%pack.hooks.length];return{day:`${days[i%7]} — ${platform.times[i%platform.times.length]}`,format,idea:`${idea} حول ${topic}`,caption:`${hook} ${industry.offer}. ${tone} ${cta}.`,cta}})
}

function generate(){
  const goalKey=selected('goal'),goal=resolvedGoal(),ind=resolvedIndustry(),plats=selectedPlatforms(),plat=plats[0]||data.platforms.instagram;
  const name=cleanName(),tone=selected('tone')==='other'?customText('tone','نبرة مخصصة'):data.tones[selected('tone')],duration=selected('duration')==='other'?(Number($('durationCustom').value)||30):(Number(selected('duration'))||30),frequency=selected('frequency'),budget=selected('budget');
  const subGoal=customText('subGoal'),cta=goal.cta[duration%goal.cta.length],posts=frequency==='light'?3:frequency==='balanced'?5:frequency==='intensive'?7:frequency==='weekends'?2:frequency==='weekdays'?5:frequency==='campaignBursts'?4:5;
  const audienceType=mapped('type','audienceType','نوع الجمهور: ');
  const target=[audienceType,mapped('age','age'),mapped('gender','gender'),mapped('location','location')].join('. ')+'.';

  $('coverTitle').textContent=name;$('coverMeta').textContent=`${goal.label} • ${ind.label}`;$('coverPromise').textContent=goal.promise;$('coverPlatform').textContent=plats.map(x=>x.label).join(' + ');
  const coverClass=['sales','launch','awareness','engagement','event','leads'].includes(goalKey)?goalKey:(goal.mode==='conversion'?'leads':goal.mode==='engagement'?'engagement':'awareness');
  $('campaignCover').className=`campaign-cover cover-${coverClass}`;
  const audienceNeed=mapped('interest','interest');
  const audienceStage=mapped('funnel','funnel');
  const desiredBehavior=mapped('behavior','behavior');
  $('smartObjective').textContent=`خلال ${duration} يومًا، تستهدف حملة «${name}» تحقيق «${subGoal}» عبر ${plats.map(x=>x.label).join('، ')}، ومتابعة التقدم باستخدام ${goal.kpis.slice(0,2).join(' و')}.`;
  $('coreMessage').textContent=`«${name}» تساعد الجمهور على فهم الفكرة واتخاذ الخطوة الأنسب بثقة؛ لأن القرار الصحيح يبدأ بمعلومة واضحة وموثوقة.`;
  $('valueProposition').textContent=`يحصل الجمهور على ${ind.offer} بما يلائم احتياجه المرتبط بـ${audienceNeed}، ويحوّل المعرفة إلى فائدة عملية تناسب مرحلته الحالية: ${audienceStage}.`;
  $('primaryCta').textContent=`الدعوة الأساسية: «${cta}» لتوجيه الجمهور نحو السلوك المطلوب: ${desiredBehavior}.`;
  const platformMetricTotals=aggregatePlatformMetricTotals();
  const generalEntries=Object.entries(GENERAL_METRIC_FIELDS)
    .map(([metric,id])=>({metric,label:GENERAL_METRIC_LABELS[metric]||metric,value:Number($(id)?.value)||0}))
    .filter(item=>item.value>0);
  const platformMetricEntries=[];
  const platformMetricPayload=parsePlatformMetricsData();
  selectedPlatformKeys().forEach(platformKey=>{
    const metrics=platformMetricPayload[platformKey]||{};
    Object.entries(metrics).forEach(([metricKey,rawValue])=>{
      const value=Number(rawValue)||0;
      if(!value) return;
      const label=PLATFORM_METRIC_META[metricKey]?.label||metricKey;
      platformMetricEntries.push({label:`${label} — ${getPlatformDisplayName(platformKey)}`,value});
    });
  });
  const renderSummaryCards=items=>items.map(x=>`<div><strong>${new Intl.NumberFormat('ar-SA').format(x.value)}</strong><span>${x.label}</span></div>`).join('');
  $('targetSummary').innerHTML=(generalEntries.length||platformMetricEntries.length)?[
    generalEntries.length?`<section class="target-summary-section"><h4>أهداف عامة للحملة</h4><div class="target-summary-grid">${renderSummaryCards(generalEntries)}</div></section>`:'',
    platformMetricEntries.length?`<section class="target-summary-section"><h4>أهداف تفصيلية حسب المنصة</h4><div class="target-summary-grid">${renderSummaryCards(platformMetricEntries)}</div></section>`:''
  ].join(''):'<p class="empty-targets">لم تُحدد أهداف رقمية بعد. أضيفيها قبل الإطلاق حتى يمكن قياس النجاح بدقة.</p>';
  if($('targetEngagement')) $('targetEngagement').value=$('planTargetEngagement')?.value||'';
  if($('targetViewRate')) $('targetViewRate').value=$('planTargetViewRate')?.value||'';
  if($('targetCtr')) $('targetCtr').value=$('planTargetCtr')?.value||'';
  if($('targetConversion')) $('targetConversion').value=$('planTargetConversion')?.value||'';
  const analyticsTargets={
    targetReachCount:Number($('planTargetReach')?.value)||platformMetricTotals.reach||'',
    targetViewsCount:Number($('planTargetViews')?.value)||platformMetricTotals.views||'',
    targetLikesCount:platformMetricTotals.likes||'',
    targetCommentsCount:platformMetricTotals.comments||'',
    targetSharesCount:platformMetricTotals.shares||'',
    targetSavesCount:platformMetricTotals.saves||'',
    targetClicksCount:Number($('planTargetClicks')?.value)||platformMetricTotals.clicks||'',
    targetConversionsCount:Number($('planTargetConversions')?.value)||platformMetricTotals.conversions||'',
    targetFollowersCount:Number($('planTargetFollowers')?.value)||platformMetricTotals.followers||'',
    targetDownloadsCount:Number($('planTargetDownloads')?.value)||platformMetricTotals.downloads||'',
    targetRegistrationsCount:Number($('planTargetRegistrations')?.value)||platformMetricTotals.registrations||'',
    targetRevenueCount:Number($('planTargetRevenue')?.value)||platformMetricTotals.revenue||''
  };
  Object.entries(analyticsTargets).forEach(([target,value])=>{if($(target))$(target).value=value||''});


  list($('audienceAnalysis'),[target,mapped('interest','interest'),mapped('funnel','funnel'),mapped('behavior','behavior'),`المشكلة الأساسية: ${$('audiencePain')?.value||'غير محددة'}.`,`الدافع: ${customText('audienceMotivation')}.`,`الاعتراض المتوقع: ${customText('audienceObjection')}.`,`صاحب القرار: ${customText('decisionMaker')}.`,'يجب اختبار الرسالة مع عينة صغيرة من الجمهور للتأكد من وضوحها وعدم اعتمادها على افتراضات فقط.']);
  list($('platformStrategy'),[...plats.map(p=>`${p.label}: ${p.advice}`),`وجهة الإجراء: ${customText('destination')}.`,`التتبع: ${customText('trackingSetup')}.`,`الفريق: ${customText('teamSize')}.`,`النبرة: ${tone}.`,`مزيج الصيغ المقترح: ${[...new Set(plats.flatMap(p=>p.formats))].slice(0,8).join('، ')}.`,`لا تنشري النسخة نفسها حرفيًا في كل منصة؛ عدّلي البداية والطول وCTA حسب سلوك مستخدمي كل قناة.`]);

  const conversionTitle=goal.mode==='conversion'?'اتخاذ الإجراء':'ترسيخ الرسالة';
  const pillars=[['جذب الانتباه','موقف أو سؤال يكشف أهمية الموضوع.'],['الفهم','شرح مبسط دون افتراض معرفة مسبقة.'],['الثقة','دليل أو مصدر أو مثال واقعي يثبت الرسالة.'],[conversionTitle,goal.mode==='conversion'?'خطوة واحدة واضحة وسهلة.':'تكرار المعنى بصيغ تساعد على التذكر والمشاركة.']];
  $('contentPillars').innerHTML=pillars.map((p,i)=>`<div><b>0${i+1}</b><h4>${p[0]}</h4><p>${p[1]}</p></div>`).join('');

  const schedule=createSchedule(goal.mode,ind,plat,tone,cta,posts,subGoal).map((item,i)=>{const p=plats[i%plats.length];return {...item,platform:p.label,format:p.formats[i%p.formats.length],day:`${item.day.split(' — ')[0]} — ${p.times[i%p.times.length]}`}});
  $('scheduleNote').textContent=`نموذج أسبوع واحد يُكرر مع تغيير الزوايا طوال ${duration} يومًا.`;
  $('scheduleBody').innerHTML=schedule.map(r=>`<tr><td><b>${r.day}</b></td><td><b>${r.platform}</b><br><span class="format-tag">${r.format}</span></td><td>${r.idea}</td><td>${r.caption}</td><td><b>${r.cta}</b></td></tr>`).join('');

  const customTag='#'+name.replace(/\s+/g,'_').replace(/[^\u0600-\u06FF\w_]/g,'');
  const goalTag='#'+goal.label.replace(/\s+/g,'_').replace(/[^\u0600-\u06FF\w_]/g,'');
  $('hashtagsOutput').innerHTML=[customTag,...ind.tags,goalTag,...plats.map(p=>`#${p.label.replace(/\s+/g,'_')}`)].map(t=>`<span>${t}</span>`).join('');
  list($('visualDirection'),[ind.visuals,'استخدمي رموزًا وأمثلة تخدم الفكرة بدل الاعتماد على صور منتج فقط.','حافظي على لون أساسي ولون إبراز وخطين كحد أقصى.','في الفيديو، أظهري الفكرة أو السؤال الرئيسي خلال أول 3 ثوانٍ.']);
  $('kpiOutput').innerHTML=goal.kpis.map((k,i)=>`<div><span>0${i+1}</span><p>${k}</p><b>${i===0?'Primary':'Supporting'}</b></div>`).join('');
  list($('optimizationOutput'),['راجعي الاحتفاظ بالمشاهدة والنقرات والحفظ، وليس الإعجابات فقط.','اختبري خطافين مختلفين لنفس الفكرة.','كرري الصيغة الأعلى أداءً مع زاوية جديدة.','عدّلي عنصرًا واحدًا في كل اختبار حتى تعرفي سبب التحسن.']);

  if(budget==='organic')list($('paidStrategy'),['الحملة عضوية: اعتمدي على التعاون، المشاركة المجتمعية، إعادة تدوير أفضل محتوى، والرد السريع.','يمكن لاحقًا ترويج أفضل محتوى أثبت نجاحه عضويًا.']);
  else{const split=budget==='small'?'70% وصول و30% إعادة استهداف':budget==='medium'?'50% جذب، 30% إعادة استهداف، 20% اختبارات':budget==='large'||budget==='enterprise'?'40% جذب، 35% إجراء، 15% إعادة استهداف، 10% اختبارات':'حددي 60–70% للتنفيذ الأساسي، 20–30% لأفضل جمهور، و10% للاختبارات';list($('paidStrategy'),[`توزيع مبدئي: ${split}.`,budget==='custom'||budget==='other'?`الميزانية المحددة: ${customText('budget','ميزانية مخصصة')}.`:'اختبري جمهور الاهتمامات مقابل جمهور إعادة الاستهداف.','استخدمي نسختين من الرسالة وCTA ثم وجهي الميزانية للأفضل.','تأكدي أن صفحة الوصول تكرر نفس الرسالة الموجودة في الإعلان.']);}
  const checklist=['اعتماد أهداف النجاح الرقمية وخط أساس للمقارنة','تأكيد مسؤول كل مهمة ومسار الموافقات','تجهيز روابط UTM أو أدوات التتبع','مراجعة الخصوصية والحقوق والإفصاحات المطلوبة','تثبيت الهدف ومؤشر النجاح','مراجعة دقة المعلومات والمصادر','تجهيز الهوية والقوالب','إنتاج دفعة المحتوى الأولى','تجربة الرسالة مع عينة من الجمهور','جدولة المحتوى','تحديد آلية الرد على الأسئلة','مراجعة النتائج كل 3–4 أيام'];
  $('checklistOutput').innerHTML=checklist.map(x=>`<label><input type="checkbox"><span>${x}</span></label>`).join('');
  $('results').classList.remove('hidden');$('backToForm').classList.add('show');if(window.resetResultsAccordion) window.resetResultsAccordion();setTimeout(()=>$('results').scrollIntoView({behavior:'smooth',block:'start'}),100);
}

$('campaignForm').addEventListener('submit',e=>{e.preventDefault();generate()});
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
$('printPlan').addEventListener('click',()=>window.print());
const returnToForm=()=>document.querySelector('.builder').scrollIntoView({behavior:'smooth',block:'start'});
$('editPlan').addEventListener('click',returnToForm);
$('backToForm').addEventListener('click',returnToForm);
$('copyPlan').addEventListener('click',async()=>{const text=$('results').innerText.replace('نسخ الخطة\nحفظ PDF / طباعة','');try{await navigator.clipboard.writeText(text);$('copyPlan').textContent='تم النسخ ✓';setTimeout(()=>$('copyPlan').textContent='نسخ الخطة',1800)}catch{$('copyPlan').textContent='تعذر النسخ'}});
const observer=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add('visible')),{threshold:0.02,rootMargin:'0px 0px -40px 0px'});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

/* Campaign persistence, project workspace, and recovery */
(() => {
  const STORAGE_KEY = window.CampaignCraftAuth.storageKey('campaigncraft_campaigns_v2');
  const SESSION_KEY = window.CampaignCraftAuth.storageKey('campaigncraft_current_campaign_v2');
  const form = $('campaignForm');
  const db = window.campaignCraftSupabase || null;
  const currentUser = window.CampaignCraftAuth.getUser();
  const fieldIds = [...form.querySelectorAll('input[id], select[id], textarea[id]')]
    .map(el => el.id)
    .filter(id => !['importCampaigns'].includes(id));
  let currentCampaignId = localStorage.getItem(SESSION_KEY) || '';
  let activeFilter = 'all';
  let autosaveTimer;

  const statusLabels = {draft:'مسودة', active:'قيد التنفيذ', completed:'مكتملة', archived:'مؤرشفة'};
  const readCampaigns = () => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    catch { return []; }
  };
  const writeCampaigns = campaigns => localStorage.setItem(STORAGE_KEY, JSON.stringify(campaigns));
  async function syncCampaignToDatabase(record){
    if(!db||!currentUser||!record) return;
    const payload={
      id:record.id,
      owner_id:currentUser.id,
      name:record.name,
      status:record.status,
      data:record,
      created_at:record.createdAt,
      updated_at:record.updatedAt
    };
    const {error}=await db.from('campaigns').upsert(payload,{onConflict:'id'});
    if(error) console.warn('Campaign cloud sync failed:',error.message);
  }
  async function deleteCampaignFromDatabase(id){
    if(!db||!currentUser) return;
    const {error}=await db.from('campaigns').delete().eq('id',id).eq('owner_id',currentUser.id);
    if(error) console.warn('Campaign cloud delete failed:',error.message);
  }
  async function loadCampaignsFromDatabase(){
    if(!db||!currentUser) return readCampaigns();
    const {data,error}=await db.from('campaigns').select('id,data,updated_at').eq('owner_id',currentUser.id).order('updated_at',{ascending:false});
    if(error){console.warn('Campaign cloud load failed:',error.message);return readCampaigns();}
    const cloud=(data||[]).map(row=>({...row.data,id:row.id}));
    const local=readCampaigns();
    const merged=new Map(local.map(item=>[item.id,item]));
    cloud.forEach(item=>{
      const existing=merged.get(item.id);
      if(!existing||new Date(item.updatedAt||0)>=new Date(existing.updatedAt||0)) merged.set(item.id,item);
    });
    const list=[...merged.values()].sort((a,b)=>new Date(b.updatedAt||0)-new Date(a.updatedAt||0));
    writeCampaigns(list);
    return list;
  }
  const uid = () => `cc-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const safe = text => String(text ?? '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const toast = message => {
    const el = $('saveToast');
    el.textContent = message;
    el.classList.add('show');
    clearTimeout(el._timer);
    el._timer = setTimeout(() => el.classList.remove('show'), 1900);
  };
  const getFormData = () => ({...Object.fromEntries(fieldIds.map(id => [id, $(id)?.value ?? ''])),platform:$('platform').value,platformCustom:$('platformCustom')?.value||''});
  const checklistState = () => [...document.querySelectorAll('#checklistOutput input')].map(x => x.checked);
  const campaignNameFrom = data => (data.campaignName || '').trim() || 'حملة بدون اسم';

  function campaignSnapshot({generated=false, silent=false}={}) {
    const formData = getFormData();
    const campaigns = readCampaigns();
    const index = campaigns.findIndex(c => c.id === currentCampaignId);
    const previous = index >= 0 ? campaigns[index] : null;
    const id = previous?.id || currentCampaignId || uid();
    currentCampaignId = id;
    localStorage.setItem(SESSION_KEY, id);
    const record = {
      id,
      name: campaignNameFrom(formData),
      status: $('campaignStatus')?.value || previous?.status || 'draft',
      formData,
      generated: generated || previous?.generated || !$('results').classList.contains('hidden'),
      checklist: checklistState().length ? checklistState() : (previous?.checklist || []),
      analytics: previous?.analytics || {},
      createdAt: previous?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    if (index >= 0) campaigns[index] = record; else campaigns.unshift(record);
    writeCampaigns(campaigns);
    syncCampaignToDatabase(record);
    renderLibrary();
    if (!silent) toast('تم حفظ الحملة ✓');
    return record;
  }

  function updateChecklistProgress(save=true) {
    const boxes = [...document.querySelectorAll('#checklistOutput input')];
    if (!boxes.length) return;
    const done = boxes.filter(x => x.checked).length;
    const pct = Math.round((done / boxes.length) * 100);
    $('checklistProgress').textContent = `${pct}% مكتمل — ${done} من ${boxes.length}`;
    if (pct === 100 && $('campaignStatus').value !== 'completed') {
      $('campaignStatus').value = 'completed';
      toast('اكتملت قائمة التنفيذ، تم تحديث حالة الحملة');
    }
    if (save) campaignSnapshot({generated:true, silent:true});
  }

  function restoreChecklist(state=[]) {
    [...document.querySelectorAll('#checklistOutput input')].forEach((box, i) => box.checked = Boolean(state[i]));
    updateChecklistProgress(false);
  }

  function setFormData(data={}) {
    // Parent choices first because they control conditional fields.
    ['industry','goal','audienceType','age','gender','location','interest','funnel','behavior'].forEach(id => {
      if ($(id) && data[id] != null) $(id).value = data[id];
    });
    updateSubGoals();
    fieldIds.forEach(id => { if ($(id) && data[id] != null) $(id).value = data[id]; });
    const platformValues=String(data.platform||'instagram').split(',');
    document.querySelectorAll('#platformOptions input[type=checkbox]').forEach(x=>x.checked=platformValues.includes(x.value));
    if($('platformCustom')) $('platformCustom').value=data.platformCustom||'';
    syncPlatforms();
    Object.keys(customMap).forEach(syncCustom);
  }

  function openCampaign(id) {
    const campaign = readCampaigns().find(c => c.id === id);
    if (!campaign) return;
    currentCampaignId = campaign.id;
    localStorage.setItem(SESSION_KEY, campaign.id);
    setFormData(campaign.formData);
    $('campaignStatus').value = campaign.status || 'draft';
    if (campaign.generated) {
      generate();
      setTimeout(() => restoreChecklist(campaign.checklist), 0);
    } else {
      $('results').classList.add('hidden');
      $('backToForm').classList.remove('show');
      document.querySelector('.builder').scrollIntoView({behavior:'smooth', block:'start'});
    }
    renderLibrary();
    toast(`تم فتح «${campaign.name}»`);
  }

  function removeCampaign(id) {
    const campaign = readCampaigns().find(c => c.id === id);
    if (!campaign || !confirm(`حذف حملة «${campaign.name}»؟`)) return;
    const campaigns = readCampaigns().filter(c => c.id !== id);
    writeCampaigns(campaigns);
    deleteCampaignFromDatabase(id);
    if (currentCampaignId === id) {
      currentCampaignId = '';
      localStorage.removeItem(SESSION_KEY);
    }
    renderLibrary();
    toast('تم حذف الحملة');
  }

  function duplicateCampaign(id) {
    const source = readCampaigns().find(c => c.id === id);
    if (!source) return;
    const copy = {...source, id:uid(), name:`نسخة من ${source.name}`, status:'draft', createdAt:new Date().toISOString(), updatedAt:new Date().toISOString()};
    const campaigns = readCampaigns();
    campaigns.unshift(copy);
    writeCampaigns(campaigns);
    syncCampaignToDatabase(copy);
    renderLibrary();
    toast('تم إنشاء نسخة من الحملة');
  }

  function renderLibrary() {
    const campaigns = readCampaigns().sort((a,b) => new Date(b.updatedAt)-new Date(a.updatedAt));
    const visible = activeFilter === 'all' ? campaigns : campaigns.filter(c => c.status === activeFilter);
    $('allCount').textContent = campaigns.length;
    $('activeCount').textContent = campaigns.filter(c => c.status === 'active').length;
    $('completedCount').textContent = campaigns.filter(c => c.status === 'completed').length;
    $('archivedCount').textContent = campaigns.filter(c => c.status === 'archived').length;
    window.dispatchEvent(new CustomEvent('campaigncraft:library-updated'));
    $('emptyLibrary').classList.toggle('hidden', visible.length > 0);
    $('campaignLibrary').innerHTML = visible.map(c => {
      const platformNames=String(c.formData?.platform||'').split(',').filter(Boolean).map(k=>data.platforms[k]?.label||k).join('، ');
      const goalEl = document.querySelector(`#goal option[value="${CSS.escape(c.formData?.goal || '')}"]`);
      const date = new Intl.DateTimeFormat('ar-SA',{day:'numeric',month:'short',hour:'numeric',minute:'2-digit'}).format(new Date(c.updatedAt));
      return `<article class="saved-campaign">
        <div class="saved-campaign-head"><div><h3>${safe(c.name)}</h3><small>آخر تعديل: ${safe(date)}</small></div><span class="status-badge status-${safe(c.status)}">${statusLabels[c.status] || 'مسودة'}</span></div>
        <div class="saved-campaign-meta">${safe(goalEl?.textContent || 'هدف مخصص')}<br>${safe(platformNames || 'منصة غير محددة')} · ${safe(c.formData?.duration || '30')} يومًا</div>
        <div class="saved-campaign-actions"><button class="open-saved" data-open="${c.id}">فتح وتعديل</button><button title="إنشاء نسخة" data-duplicate="${c.id}">نسخ</button><button class="delete-saved" title="حذف" data-delete="${c.id}">حذف</button></div>
      </article>`;
    }).join('');
  }


  function initFormSequentialSections() {
    const sections = [...form.querySelectorAll(':scope > .form-section')];
    const generateButton = form.querySelector('.generate-btn');
    if (!sections.length) return;

    let currentIndex = 0;
    let animating = false;

    const wizard = document.createElement('div');
    wizard.className = 'form-wizard';

    const steps = document.createElement('div');
    steps.className = 'form-wizard-steps';
    steps.setAttribute('aria-label', 'خطوات نموذج الحملة');

    const stage = document.createElement('div');
    stage.className = 'form-wizard-stage';

    const footer = document.createElement('div');
    footer.className = 'form-wizard-footer';

    const prevBtn = document.createElement('button');
    prevBtn.type = 'button';
    prevBtn.className = 'wizard-arrow wizard-prev';
    prevBtn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 18l-6-6 6-6"></path></svg><span>السابق</span>';

    const pageLabel = document.createElement('div');
    pageLabel.className = 'wizard-page-label';

    const nextBtn = document.createElement('button');
    nextBtn.type = 'button';
    nextBtn.className = 'wizard-arrow wizard-next';
    nextBtn.innerHTML = '<span>حفظ ومتابعة</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18l6-6-6-6"></path></svg>';

    footer.append(prevBtn, pageLabel, nextBtn);
    wizard.append(steps, stage, footer);

    form.insertBefore(wizard, sections[0]);
    sections.forEach((section, index) => {
      section.classList.add('wizard-page');
      section.dataset.pageIndex = index;
      section.hidden = index !== 0;
      stage.appendChild(section);

      const title = section.querySelector('.form-section-title');
      const stepButton = document.createElement('button');
      stepButton.type = 'button';
      stepButton.className = 'wizard-step';
      stepButton.dataset.stepIndex = index;
      stepButton.innerHTML = `<span>${String(index + 1).padStart(2, '0')}</span><small>${title?.querySelector('h3')?.textContent || `القسم ${index + 1}`}</small>`;
      stepButton.addEventListener('click', () => goToPage(index));
      steps.appendChild(stepButton);
    });

    if (generateButton) generateButton.classList.add('wizard-original-generate');

    const isFieldFilled = field => {
      if (!field) return true;
      if (field.type === 'checkbox' || field.type === 'radio') return field.checked;
      return String(field.value || '').trim() !== '';
    };

    const isSectionComplete = section => {
      const requiredFields = [...section.querySelectorAll('[required]')];
      if (!requiredFields.length) return false;
      return requiredFields.every(isFieldFilled);
    };

    const updateUI = () => {
      const stepButtons = [...steps.querySelectorAll('.wizard-step')];
      stepButtons.forEach((button, index) => {
        button.classList.toggle('active', index === currentIndex);
        button.classList.toggle('complete', isSectionComplete(sections[index]));
        button.setAttribute('aria-current', index === currentIndex ? 'step' : 'false');
      });
      prevBtn.disabled = currentIndex === 0;
      nextBtn.querySelector('span').textContent = currentIndex === sections.length - 1 ? 'إنشاء الخطة' : 'حفظ ومتابعة';
      pageLabel.innerHTML = `<strong>${currentIndex + 1}</strong><span>من ${sections.length}</span>`;
    };

    const animatePage = (fromSection, toSection, direction) => {
      if (!toSection || animating) return;
      animating = true;
      const outClass = direction > 0 ? 'page-exit-forward' : 'page-exit-back';
      const inClass = direction > 0 ? 'page-enter-forward' : 'page-enter-back';

      fromSection?.classList.add(outClass);
      setTimeout(() => {
        if (fromSection) {
          fromSection.hidden = true;
          fromSection.classList.remove(outClass);
        }
        toSection.hidden = false;
        toSection.classList.add(inClass);
        stage.scrollTop = 0;
        requestAnimationFrame(() => {
          toSection.classList.add('page-enter-active');
        });
        setTimeout(() => {
          toSection.classList.remove(inClass, 'page-enter-active');
          animating = false;
          const firstField = toSection.querySelector('input:not([type="hidden"]), select, textarea');
          firstField?.focus({ preventScroll: true });
        }, 340);
      }, 190);
    };

    const goToPage = targetIndex => {
      if (targetIndex < 0 || targetIndex >= sections.length || targetIndex === currentIndex || animating) return;
      const oldIndex = currentIndex;
      const oldSection = sections[oldIndex];
      const newSection = sections[targetIndex];
      currentIndex = targetIndex;
      animatePage(oldSection, newSection, targetIndex > oldIndex ? 1 : -1);
      updateUI();
    };

    prevBtn.addEventListener('click', () => goToPage(currentIndex - 1));
    const findFirstInvalidPage = () => sections.findIndex(section => {
      const requiredFields = [...section.querySelectorAll('[required]')];
      return requiredFields.some(field => !isFieldFilled(field));
    });

    nextBtn.addEventListener('click', () => {
      campaignSnapshot({ silent: true });
      if (currentIndex === sections.length - 1) {
        const invalidPage = findFirstInvalidPage();
        if (invalidPage !== -1) {
          goToPage(invalidPage);
          setTimeout(() => {
            const invalidField = sections[invalidPage].querySelector('[required]:invalid');
            invalidField?.focus({ preventScroll: true });
            invalidField?.reportValidity();
          }, 380);
          return;
        }
        if (typeof form.requestSubmit === 'function') form.requestSubmit(generateButton || undefined);
        else generateButton?.click();
        setTimeout(() => {
          const results = $('results');
          if (results && !results.classList.contains('hidden')) {
            results.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 220);
        return;
      }
      goToPage(currentIndex + 1);
    });

    form.addEventListener('input', updateUI);
    form.addEventListener('change', updateUI);

    updateUI();
    stage.scrollTop = 0;

    window.resetFormSections = () => {
      sections.forEach((section, index) => {
        section.hidden = index !== 0;
        section.classList.remove('page-exit-forward','page-exit-back','page-enter-forward','page-enter-back','page-enter-active');
      });
      currentIndex = 0;
      stage.scrollTop = 0;
      updateUI();
    };
  }

  function initResultsAccordion() {
    const items = [...document.querySelectorAll('.results-accordion[data-accordion-item]')];
    const expandAllBtn = $('expandAllSections');
    const collapseAllBtn = $('collapseAllSections');
    if (!items.length) return;

    const syncPanel = (panel, expanded, immediate = false) => {
      if (!panel) return;
      panel.style.overflow = 'hidden';
      panel.style.transition = immediate ? 'none' : '';
      if (expanded) {
        panel.hidden = false;
        if (immediate) {
          panel.style.maxHeight = 'none';
          panel.style.opacity = '1';
          requestAnimationFrame(() => {
            panel.style.transition = '';
          });
          return;
        }
        panel.style.maxHeight = '0px';
        panel.style.opacity = '0';
        requestAnimationFrame(() => {
          panel.style.maxHeight = `${panel.scrollHeight}px`;
          panel.style.opacity = '1';
        });
        const onExpandEnd = event => {
          if (event.propertyName !== 'max-height') return;
          panel.style.maxHeight = 'none';
          panel.removeEventListener('transitionend', onExpandEnd);
        };
        panel.addEventListener('transitionend', onExpandEnd);
      } else {
        if (immediate) {
          panel.style.maxHeight = '0px';
          panel.style.opacity = '0';
          panel.hidden = true;
          requestAnimationFrame(() => {
            panel.style.transition = '';
          });
          return;
        }
        panel.hidden = false;
        panel.style.maxHeight = `${panel.scrollHeight}px`;
        panel.style.opacity = '1';
        requestAnimationFrame(() => {
          panel.style.maxHeight = '0px';
          panel.style.opacity = '0';
        });
        const onCollapseEnd = event => {
          if (event.propertyName !== 'max-height') return;
          panel.hidden = true;
          panel.removeEventListener('transitionend', onCollapseEnd);
        };
        panel.addEventListener('transitionend', onCollapseEnd);
      }
    };

    const setState = (item, expanded, immediate = false) => {
      const panel = item.querySelector('.accordion-panel');
      const btn = item.querySelector('.accordion-toggle');
      item.classList.toggle('active', expanded);
      if (btn) btn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      syncPanel(panel, expanded, immediate);
    };

    const updateControls = () => {
      const openCount = items.filter(item => item.classList.contains('active')).length;
      if (expandAllBtn) expandAllBtn.disabled = openCount === items.length;
      if (collapseAllBtn) collapseAllBtn.disabled = openCount === 0;
    };

    const activateExclusive = (item, immediate = false) => {
      items.forEach(other => setState(other, other === item, immediate));
      updateControls();
    };

    const expandAll = () => {
      items.forEach(item => setState(item, true));
      updateControls();
    };

    const collapseAll = () => {
      items.forEach(item => setState(item, false));
      updateControls();
    };

    items.forEach(item => {
      const btn = item.querySelector('.accordion-toggle');
      if (!btn) return;
      btn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        const openCount = items.filter(card => card.classList.contains('active')).length;
        if (isActive) {
          setState(item, false);
          updateControls();
          return;
        }
        if (openCount > 1) {
          activateExclusive(item);
        } else {
          setState(item, true);
          updateControls();
        }
      });
    });

    if (expandAllBtn) expandAllBtn.addEventListener('click', expandAll);
    if (collapseAllBtn) collapseAllBtn.addEventListener('click', collapseAll);

    const defaultItem = items.find(item => item.classList.contains('active')) || items[0];
    activateExclusive(defaultItem, true);

    window.openResultsAccordion = targetId => {
      const target = document.getElementById(targetId);
      const host = target ? target.closest('.results-accordion[data-accordion-item]') : null;
      if (host) activateExclusive(host);
    };

    window.expandAllResultsAccordion = expandAll;
    window.collapseAllResultsAccordion = collapseAll;
    window.resetResultsAccordion = () => activateExclusive(items[0]);
  }

  function newCampaign() {
    currentCampaignId = '';
    localStorage.removeItem(SESSION_KEY);
    form.reset();
    updateSubGoals();
    Object.keys(customMap).forEach(syncCustom);
    syncPlatforms();
    updateBriefProgress();
    $('campaignStatus').value = 'draft';
    $('results').classList.add('hidden');
    $('backToForm').classList.remove('show');
    if (window.resetFormSections) window.resetFormSections();
    document.querySelector('.builder').scrollIntoView({behavior:'smooth', block:'start'});
    $('campaignName').focus({preventScroll:true});
    toast('تم فتح حملة جديدة');
  }

  // Visible autosave indicator.
  const autosaveNote = document.createElement('p');
  autosaveNote.className = 'autosave-note';
  autosaveNote.textContent = 'يتم حفظ المسودة تلقائيًا على هذا الجهاز أثناء إدخال البيانات.';
  form.insertBefore(autosaveNote, form.querySelector('.generate-btn'));
  initFormSequentialSections();

  form.addEventListener('input', () => {
    updateBriefProgress();
    clearTimeout(autosaveTimer);
    autosaveTimer = setTimeout(() => campaignSnapshot({silent:true}), 500);
  });
  form.addEventListener('change', () => {
    updateBriefProgress();
    clearTimeout(autosaveTimer);
    autosaveTimer = setTimeout(() => campaignSnapshot({silent:true}), 150);
  });
  form.addEventListener('submit', () => {
    setTimeout(() => {
      const record = campaignSnapshot({generated:true, silent:true});
      restoreChecklist(record.checklist);
      toast('تم إنشاء الخطة وحفظها تلقائيًا ✓');
    }, 0);
  });

  $('saveCampaign').addEventListener('click', () => campaignSnapshot({generated:true}));
  $('campaignStatus').addEventListener('change', () => campaignSnapshot({generated:!$('results').classList.contains('hidden')}));
  $('checklistOutput').addEventListener('change', e => { if (e.target.matches('input[type="checkbox"]')) updateChecklistProgress(); });
  $('newCampaign').addEventListener('click', newCampaign);
  $('campaignLibrary').addEventListener('click', e => {
    const open = e.target.closest('[data-open]');
    const duplicate = e.target.closest('[data-duplicate]');
    const del = e.target.closest('[data-delete]');
    if (open) openCampaign(open.dataset.open);
    if (duplicate) duplicateCampaign(duplicate.dataset.duplicate);
    if (del) removeCampaign(del.dataset.delete);
  });
  document.querySelectorAll('.library-filters button').forEach(btn => btn.addEventListener('click', () => {
    activeFilter = btn.dataset.filter;
    document.querySelectorAll('.library-filters button').forEach(x => x.classList.toggle('active', x === btn));
    renderLibrary();
  }));

  $('exportCampaigns').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify({app:'CampaignCraft',version:2,exportedAt:new Date().toISOString(),campaigns:readCampaigns()}, null, 2)], {type:'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `campaigncraft-backup-${new Date().toISOString().slice(0,10)}.json`; a.click();
    URL.revokeObjectURL(url);
    toast('تم تصدير النسخة الاحتياطية');
  });
  $('importCampaigns').addEventListener('change', async e => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const parsed = JSON.parse(await file.text());
      const imported = Array.isArray(parsed) ? parsed : parsed.campaigns;
      if (!Array.isArray(imported)) throw new Error('invalid');
      const byId = new Map(readCampaigns().map(c => [c.id,c]));
      imported.forEach(c => byId.set(c.id || uid(), {...c, id:c.id || uid()}));
      writeCampaigns([...byId.values()]);
      renderLibrary();
      toast(`تم استيراد ${imported.length} حملة`);
    } catch { toast('الملف غير صالح للاستيراد'); }
    e.target.value = '';
  });

  initResultsAccordion();

  // Load only this signed-in user's cloud campaigns, then restore their latest open campaign.
  renderLibrary();
  loadCampaignsFromDatabase().then(() => {
    renderLibrary();
    const saved = readCampaigns().find(c => c.id === currentCampaignId);
    if (saved) {
      setFormData(saved.formData);
      $('campaignStatus').value = saved.status || 'draft';
      if (saved.generated) {
        generate();
        setTimeout(() => restoreChecklist(saved.checklist), 0);
      }
      toast('تمت استعادة آخر حملة محفوظة في حسابك');
    }
  });
})();

}
if(window.CampaignCraftAuth?.ready){startCampaignCraftAuthenticatedApp();}else{window.addEventListener('campaigncraft:auth-ready',startCampaignCraftAuthenticatedApp,{once:true});}
