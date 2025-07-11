// supabase.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Ganti dengan informasi dari Supabase project milikmu:
const SUPABASE_URL = 'https://cqjvxbymnopzbiibamqp.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxanZ4Ynltbm9wemJpaWJhbXFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxOTk5MzQsImV4cCI6MjA2Nzc3NTkzNH0.zSpDzeAN53jvHCCwdV1xDa1_Kp2zLD-R2JyVWmDe1rQ'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)