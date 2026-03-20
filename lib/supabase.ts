import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to fetch user portfolio securely
export async function fetchUserPortfolio(userId: string) {
  const { data, error } = await supabase
    .from('portfolio')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching portfolio:', error);
    return [];
  }
  return data;
}

// Helper function to fetch summary metrics
export async function fetchUserSummary(userId: string) {
  const { data, error } = await supabase
    .from('summary')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error('Error fetching user summary:', error);
    return null;
  }
  return data;
}

// Helper function to push new user requests
export async function submitRequest(userId: string, userName: string, message: string, type: string) {
  const { data, error } = await supabase
    .from('requests')
    .insert([
      { user_id: userId, user_name: userName, message, type, status: 'pending' }
    ]);

  if (error) {
    console.error('Error submitting request:', error);
    return null;
  }
  return data;
}
