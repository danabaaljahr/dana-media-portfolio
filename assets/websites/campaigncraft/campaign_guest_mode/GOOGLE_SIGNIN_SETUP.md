# Enable Google Sign-In for CampaignCraft

The website code is ready for Google OAuth. Complete these dashboard steps once:

1. In Supabase, open **Authentication → Providers → Google**.
2. Enable Google and copy the callback URL shown by Supabase. For this project it should be:
   `https://smiwlknedwrcxykohqsj.supabase.co/auth/v1/callback`
3. In Google Cloud Console, create an **OAuth 2.0 Client ID** for a Web application.
4. Add this Authorized JavaScript origin:
   `https://danabaaljahr.github.io`
5. Add the Supabase callback URL above as an Authorized redirect URI.
6. Copy the Google Client ID and Client Secret into the Supabase Google provider settings, then save.
7. In Supabase **Authentication → URL Configuration**, keep the Site URL and Redirect URL as:
   `https://danabaaljahr.github.io/campaigncraft-studio/`

The “Keep me signed in” box is checked by default. When unchecked, the session lasts only for the current browser tab/session.
