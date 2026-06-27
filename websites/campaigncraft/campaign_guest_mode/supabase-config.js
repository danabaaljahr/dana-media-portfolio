(() => {
  const SUPABASE_URL = 'https://smiwlknedwrcxykohqsj.supabase.co';
  const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_iPCzfC0fcJf65QcSm_ZOng_TU9Db7tn';

  window.CAMPAIGNCRAFT_SUPABASE_URL = SUPABASE_URL;
  window.CAMPAIGNCRAFT_SUPABASE_KEY = SUPABASE_PUBLISHABLE_KEY;

  if (window.supabase?.createClient) {
    window.campaignCraftSupabase = window.supabase.createClient(
      SUPABASE_URL,
      SUPABASE_PUBLISHABLE_KEY,
      {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true
        }
      }
    );
  }
})();
