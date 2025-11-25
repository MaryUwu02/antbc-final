import { supabase } from './supabase.js'

export async function getGroups() {
  const { data, error } = await supabase
    .from('groups')
    .select('*')
  if (error) throw error
  return data
}

export async function getMessages(groupId) {
  const { data, error } = await supabase
    .from('messages')
    .select('id, group_id, user_id, user_name, text, created_at')
    .eq('group_id', groupId)
    .order('created_at', { ascending: true })
  if (error) throw error
  return data
}

export async function sendMessage(groupId, user, text) {
  const { data, error } = await supabase
    .from('messages')
    .insert([{
      group_id: groupId,
      user_id: user.id,
      user_name: user.name,
      text: text
    }])
    .select()
  if (error) throw error
  return data[0]
}

export function subscribeMessages(groupId, callback) {
  return supabase
    .channel(`realtime-group-${groupId}`)
    .on(
      'postgres_changes', 
      { event: 'INSERT', schema: 'public', table: 'messages', filter: `group_id=eq.${groupId}` },
      payload => callback(payload.new)
    )
    .subscribe()
}