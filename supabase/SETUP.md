# Supabase Setup Guide for Adwait Artha CMS

This guide walks you through setting up Supabase for the CMS.

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: `adwait-artha-cms` (or your preferred name)
   - **Database Password**: Generate a strong password and save it
   - **Region**: Choose the closest to your users (e.g., Mumbai for India)
5. Click "Create new project" and wait for setup to complete

## Step 2: Get Your API Keys

1. Go to **Settings** > **API** in your Supabase dashboard
2. Copy these values:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## Step 3: Run the Database Schema

1. Go to **SQL Editor** in your Supabase dashboard
2. Click "New query"
3. Copy the entire contents of `supabase/schema.sql`
4. Paste it into the SQL editor
5. Click "Run" to execute the schema
6. You should see "Success. No rows returned" for each statement

## Step 4: Add Environment Variables

Add these to your `.env.local` file:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# NextAuth
AUTH_SECRET=your-random-secret-at-least-32-characters
AUTH_URL=http://localhost:3000
```

### Generating AUTH_SECRET

Run this command to generate a secure secret:

```bash
# On Windows (PowerShell)
[Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))

# On Mac/Linux
openssl rand -base64 32
```

## Step 5: Create Your First Admin User

After setting up the environment variables, run:

```bash
npx tsx supabase/seed-admin.ts
```

Follow the prompts to create your admin account.

## Step 6: Verify Setup

1. Start your development server: `npm run dev`
2. Go to `http://localhost:3000/admin/login`
3. Log in with the credentials you just created

## Troubleshooting

### "Missing environment variable" error
Make sure all Supabase variables are in `.env.local` and restart the dev server.

### "No rows returned" for queries
This is normal! It means the SQL ran successfully but didn't return data.

### RLS policy errors
Make sure you ran the complete `schema.sql` file, including the RLS policies at the bottom.

### Can't create admin user
1. Verify the `admin_users` table exists in Supabase
2. Check that `SUPABASE_SERVICE_ROLE_KEY` is correct (not the anon key)

## Database Tables Overview

| Table | Purpose |
|-------|---------|
| `admin_users` | CMS admin accounts (employees) |
| `posts` | Blog posts and dynamic pages |
| `announcements` | Homepage announcements |
| `banners` | Homepage banners |
| `site_settings` | Editable site content (replaces constants.ts) |

## Security Notes

- **NEVER** commit `.env.local` to git
- **NEVER** expose `SUPABASE_SERVICE_ROLE_KEY` to the client
- The service role key bypasses Row Level Security - use only in server-side code
- The anon key is safe for client-side use (respects RLS policies)
