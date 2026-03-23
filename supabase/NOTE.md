## Security Notes

- **NEVER** commit `.env.local` to git
- **NEVER** expose `SUPABASE_SERVICE_ROLE_KEY` to the client
- The service role key bypasses Row Level Security - use only in server-side code
- The anon key is safe for client-side use (respects RLS policies)
