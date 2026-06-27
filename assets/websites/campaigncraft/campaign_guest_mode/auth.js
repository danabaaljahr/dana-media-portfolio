(() => {
  const db = window.campaignCraftSupabase;
  const REMEMBER_KEY = 'campaigncraft_remember_login_v1';
  const SESSION_TAB_KEY = 'campaigncraft_session_active_v1';
  const state = {
    ready: false,
    user: null,
    session: null,
    language: localStorage.getItem('campaigncraft_language_v1') || 'ar',
    guest: false
  };

  const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const guestSessionId = sessionStorage.getItem('campaigncraft_guest_session_v1') || (crypto.randomUUID?.() || `${Date.now()}-${Math.random()}`);
  sessionStorage.setItem('campaigncraft_guest_session_v1', guestSessionId);
  const userKey = base => state.user?.id ? `${base}__${state.user.id}` : `${base}__guest_${guestSessionId}`;

  window.CampaignCraftAuth = {
    ...state,
    storageKey: userKey,
    getUser: () => state.user,
    getLanguage: () => state.language,
    isGuest: () => !state.user,
    requireAuth: (message = '') => showGate(message),
    openLogin: (message = '') => showGate(message),
    setLanguage: lang => {
      state.language = lang === 'en' ? 'en' : 'ar';
      localStorage.setItem('campaigncraft_language_v1', state.language);
      window.CampaignCraftI18n?.apply?.(state.language);
      window.dispatchEvent(new CustomEvent('campaigncraft:language-changed', {detail:{language:state.language}}));
    }
  };

  function syncPublicState() {
    Object.assign(window.CampaignCraftAuth, {
      ready: state.ready,
      user: state.user,
      session: state.session,
      language: state.language,
      guest: !state.user
    });
  }

  function authMarkup() {
    return `
      <div class="auth-gate" id="authGate" aria-live="polite">
        <div class="auth-card">
          <button class="auth-close" id="authClose" type="button" aria-label="إغلاق">×</button>
          <div class="auth-brand"><span>CC</span><div><b>CampaignCraft</b><small data-i18n="auth_secure_workspace">مساحة عمل خاصة وآمنة</small></div></div>
          <div class="auth-tabs" role="tablist">
            <button type="button" class="active" data-auth-tab="signin" data-i18n="auth_signin">تسجيل الدخول</button>
            <button type="button" data-auth-tab="signup" data-i18n="auth_signup">إنشاء حساب</button>
          </div>
          <button id="googleSignIn" class="google-auth-button" type="button">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M21.6 12.23c0-.71-.06-1.4-.18-2.07H12v3.92h5.38a4.6 4.6 0 0 1-2 3.01v2.51h3.24c1.9-1.75 2.98-4.33 2.98-7.37Z"/><path fill="#34A853" d="M12 22c2.7 0 4.97-.9 6.62-2.4l-3.24-2.51c-.9.6-2.05.96-3.38.96-2.6 0-4.8-1.76-5.59-4.12H3.06v2.59A10 10 0 0 0 12 22Z"/><path fill="#FBBC05" d="M6.41 13.93A6.02 6.02 0 0 1 6.1 12c0-.67.11-1.32.31-1.93V7.48H3.06A10 10 0 0 0 2 12c0 1.61.39 3.14 1.06 4.52l3.35-2.59Z"/><path fill="#EA4335" d="M12 5.95c1.47 0 2.79.51 3.82 1.5l2.87-2.87A9.64 9.64 0 0 0 12 2a10 10 0 0 0-8.94 5.48l3.35 2.59C7.2 7.71 9.4 5.95 12 5.95Z"/></svg>
            <span data-i18n="auth_google">المتابعة باستخدام Google</span>
          </button>
          <div class="auth-divider"><span data-i18n="auth_or">أو</span></div>
          <form id="authForm" class="auth-form">
            <label data-i18n="auth_name_label" class="signup-only hidden">الاسم<input id="authName" type="text" autocomplete="name" placeholder="Dana"></label>
            <label><span data-i18n="auth_email">البريد الإلكتروني</span><input id="authEmail" type="email" autocomplete="email" required placeholder="name@example.com"></label>
            <label><span data-i18n="auth_password">كلمة المرور</span><input id="authPassword" type="password" minlength="6" autocomplete="current-password" required placeholder="••••••••"></label>
            <label class="remember-login"><input id="rememberLogin" type="checkbox" checked><span data-i18n="auth_remember">حفظ تسجيل الدخول على هذا الجهاز</span></label>
            <button id="authSubmit" class="auth-submit" type="submit" data-i18n="auth_signin">تسجيل الدخول</button>
            <button id="forgotPassword" class="auth-link" type="button" data-i18n="auth_forgot">نسيت كلمة المرور؟</button>
            <p id="authMessage" class="auth-message"></p>
          </form>
          <button id="continueAsGuest" class="guest-auth-button" type="button">استكشف الموقع كضيف</button>
          <p class="auth-note" data-i18n="auth_note">يمكن استكشاف الصفحة الرئيسية دون حساب، لكن حفظ الحملات ونشر الاستبيانات يتطلب تسجيل الدخول. كل مستخدم يرى بياناته فقط.</p>
        </div>
      </div>`;
  }

  function accountControlsMarkup() {
    return `
      <div class="account-controls" id="accountControls">
        <select id="siteLanguage" aria-label="Language">
          <option value="ar">العربية</option>
          <option value="en">English</option>
        </select>
        <button type="button" id="guestLoginButton" class="guest-login-button hidden">تسجيل الدخول</button>
        <button type="button" id="accountButton" class="account-button hidden" title="Account"><span class="account-avatar">U</span><span class="account-name"></span></button>
        <div class="account-menu hidden" id="accountMenu">
          <strong id="accountEmail"></strong>
          <button type="button" id="signOutButton" data-i18n="auth_logout">تسجيل الخروج</button>
        </div>
      </div>`;
  }

  function setAuthMode(mode) {
    document.querySelectorAll('[data-auth-tab]').forEach(btn => btn.classList.toggle('active', btn.dataset.authTab === mode));
    document.querySelectorAll('.signup-only').forEach(el => el.classList.toggle('hidden', mode !== 'signup'));
    const submit = document.getElementById('authSubmit');
    if (submit) submit.textContent = mode === 'signup' ? (state.language === 'en' ? 'Create account' : 'إنشاء الحساب') : (state.language === 'en' ? 'Sign in' : 'تسجيل الدخول');
    const password = document.getElementById('authPassword');
    if (password) password.autocomplete = mode === 'signup' ? 'new-password' : 'current-password';
    const form = document.getElementById('authForm');
    if (form) form.dataset.mode = mode;
  }

  function showGate(message = '') {
    const gate = document.getElementById('authGate');
    if (gate) gate.classList.remove('hidden');
    const msg = document.getElementById('authMessage');
    if (msg) msg.textContent = message;
  }

  function hideGate() {
    document.getElementById('authGate')?.classList.add('hidden');
  }

  function updateAccountControls() {
    const controls = document.getElementById('accountControls');
    if (!controls) return;
    const loginButton = document.getElementById('guestLoginButton');
    const accountButton = document.getElementById('accountButton');
    document.getElementById('siteLanguage').value = state.language;
    if (!state.user) {
      loginButton?.classList.remove('hidden');
      accountButton?.classList.add('hidden');
      document.getElementById('accountMenu')?.classList.add('hidden');
      return;
    }
    loginButton?.classList.add('hidden');
    accountButton?.classList.remove('hidden');
    const name = state.user.user_metadata?.full_name || state.user.email?.split('@')[0] || 'User';
    controls.querySelector('.account-avatar').textContent = name.trim().charAt(0).toUpperCase() || 'U';
    controls.querySelector('.account-name').textContent = name;
    document.getElementById('accountEmail').textContent = state.user.email || '';
  }

  function dispatchReady() {
    state.ready = true;
    syncPublicState();
    window.dispatchEvent(new CustomEvent('campaigncraft:auth-ready', {detail:{user:state.user, session:state.session}}));
  }

  function rememberChoice() {
    return document.getElementById('rememberLogin')?.checked !== false;
  }

  function storeRememberChoice(value) {
    localStorage.setItem(REMEMBER_KEY, value ? 'true' : 'false');
    if (value) sessionStorage.removeItem(SESSION_TAB_KEY);
    else sessionStorage.setItem(SESSION_TAB_KEY, '1');
  }

  async function handleGoogleSignIn() {
    if (!db) return showGate(state.language === 'en' ? 'Database connection is unavailable.' : 'الاتصال بقاعدة البيانات غير متاح.');
    const remember = rememberChoice();
    storeRememberChoice(remember);
    const msg = document.getElementById('authMessage');
    if (msg) msg.textContent = state.language === 'en' ? 'Redirecting to Google…' : 'جارٍ تحويلك إلى Google…';
    const redirectTo = `${location.origin}${location.pathname}`;
    const {error} = await db.auth.signInWithOAuth({provider:'google', options:{redirectTo}});
    if (error && msg) msg.textContent = error.message;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!db) return showGate(state.language === 'en' ? 'Database connection is unavailable.' : 'الاتصال بقاعدة البيانات غير متاح.');
    const mode = event.currentTarget.dataset.mode || 'signin';
    const email = document.getElementById('authEmail').value.trim();
    const password = document.getElementById('authPassword').value;
    const name = document.getElementById('authName').value.trim();
    const submit = document.getElementById('authSubmit');
    submit.disabled = true;
    const msg = document.getElementById('authMessage');
    msg.textContent = state.language === 'en' ? 'Please wait…' : 'جارٍ التنفيذ…';

    const remember = rememberChoice();
    storeRememberChoice(remember);

    let result;
    if (mode === 'signup') {
      result = await db.auth.signUp({email, password, options:{data:{full_name:name}}});
    } else {
      result = await db.auth.signInWithPassword({email, password});
    }

    submit.disabled = false;
    if (result.error) {
      msg.textContent = result.error.message;
      return;
    }
    if (mode === 'signup' && !result.data.session) {
      msg.textContent = state.language === 'en' ? 'Account created. Check your email to confirm, then sign in.' : 'تم إنشاء الحساب. افتحي رسالة التأكيد في بريدك ثم سجّلي الدخول.';
      setAuthMode('signin');
      return;
    }
  }

  function isProtectedPage() { return document.body.dataset.authMode === 'protected'; }

  function continueAsGuest() {
    state.guest = true;
    hideGate();
    updateAccountControls();
    if (isProtectedPage()) {
      location.href = 'index.html?guest=1#howToUse';
      return;
    }
    document.getElementById('howToUse')?.scrollIntoView({behavior:'smooth', block:'start'});
  }

  function installGuestGuards() {
    if (state.user || isProtectedPage()) return;
    const prompt = () => showGate(state.language === 'en' ? 'Sign in to save campaigns or publish surveys.' : 'سجّل الدخول لحفظ الحملات أو نشر الاستبيانات.');
    document.addEventListener('click', event => {
      const target = event.target.closest('[data-requires-auth], a[href="#planner"], a[href="#campaigns"], a[href="surveys.html"], #newCampaign, #saveCampaign, .generate-btn');
      if (!target || state.user) return;
      event.preventDefault();
      event.stopPropagation();
      prompt();
    }, true);
    document.getElementById('campaignForm')?.addEventListener('submit', event => {
      if (state.user) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      prompt();
    }, true);
  }

  async function init() {
    document.body.insertAdjacentHTML('beforeend', authMarkup());
    const topbar = document.querySelector('.topbar');
    if (topbar) topbar.insertAdjacentHTML('beforeend', accountControlsMarkup());

    document.querySelectorAll('[data-auth-tab]').forEach(btn => btn.addEventListener('click', () => setAuthMode(btn.dataset.authTab)));
    document.getElementById('authForm').addEventListener('submit', handleSubmit);
    document.getElementById('googleSignIn')?.addEventListener('click', handleGoogleSignIn);
    document.getElementById('continueAsGuest')?.addEventListener('click', continueAsGuest);
    document.getElementById('authClose')?.addEventListener('click', () => { if (!isProtectedPage()) hideGate(); });
    document.getElementById('guestLoginButton')?.addEventListener('click', () => showGate());
    const rememberInput = document.getElementById('rememberLogin');
    if (rememberInput) rememberInput.checked = localStorage.getItem(REMEMBER_KEY) !== 'false';
    document.getElementById('forgotPassword').addEventListener('click', async () => {
      const email = document.getElementById('authEmail').value.trim();
      const msg = document.getElementById('authMessage');
      if (!email) return msg.textContent = state.language === 'en' ? 'Enter your email first.' : 'اكتبي بريدك الإلكتروني أولًا.';
      const {error} = await db.auth.resetPasswordForEmail(email, {redirectTo: location.href});
      msg.textContent = error ? error.message : (state.language === 'en' ? 'Password reset email sent.' : 'تم إرسال رابط إعادة تعيين كلمة المرور.');
    });

    document.getElementById('siteLanguage')?.addEventListener('change', e => window.CampaignCraftAuth.setLanguage(e.target.value));
    document.getElementById('accountButton')?.addEventListener('click', () => document.getElementById('accountMenu')?.classList.toggle('hidden'));
    document.getElementById('signOutButton')?.addEventListener('click', async () => {
      await db.auth.signOut();
      location.reload();
    });

    setAuthMode('signin');
    window.CampaignCraftI18n?.apply?.(state.language);

    if (!db) {
      if (isProtectedPage()) showGate(state.language === 'en' ? 'Supabase is not configured.' : 'Supabase غير مهيأ.');
      else { updateAccountControls(); dispatchReady(); installGuestGuards(); }
      return;
    }

    const rememberStored = localStorage.getItem(REMEMBER_KEY) !== 'false';
    if (!rememberStored && !sessionStorage.getItem(SESSION_TAB_KEY)) {
      await db.auth.signOut({scope:'local'});
    }
    if (!rememberStored) sessionStorage.setItem(SESSION_TAB_KEY, '1');

    const {data:{session}} = await db.auth.getSession();
    state.session = session;
    state.user = session?.user || null;
    syncPublicState();
    if (state.user) {
      hideGate();
      updateAccountControls();
      dispatchReady();
    } else if (isProtectedPage()) {
      updateAccountControls();
      showGate(state.language === 'en' ? 'Sign in to access your private workspace.' : 'سجّل الدخول للوصول إلى مساحة عملك الخاصة.');
    } else {
      state.guest = true;
      hideGate();
      updateAccountControls();
      dispatchReady();
      installGuestGuards();
    }

    db.auth.onAuthStateChange((_event, sessionValue) => {
      state.session = sessionValue;
      state.user = sessionValue?.user || null;
      syncPublicState();
      if (state.user) {
        state.guest = false;
        hideGate();
        updateAccountControls();
        if (!state.ready) dispatchReady();
      } else if (isProtectedPage()) {
        state.ready = false;
        updateAccountControls();
        syncPublicState();
        showGate(state.language === 'en' ? 'Sign in to access your private workspace.' : 'سجّل الدخول للوصول إلى مساحة عملك الخاصة.');
      } else {
        state.guest = true;
        updateAccountControls();
        hideGate();
        if (!state.ready) dispatchReady();
        installGuestGuards();
      }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
