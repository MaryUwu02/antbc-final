import { supabase } from './supabase.js'; 

export async function createGroup(name, due_date) {
  const ownerId = '00000000-0000-0000-0000-000000000001'; // temporal

  const { data, error } = await supabase
    .from('groups')
    .insert({ 
      name,
      due_date: due_date || null,
      owner_id: ownerId
    })
    .select()
    .single();

  if (error) throw error;
  return {
    ...data,
    id: data.group_id,
    members_count: 0,
    progress: 0,
    updated_at: data.created_at,
  };
}

export async function fetchGroups() {
  const { data, error } = await supabase
    .from('groups')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;

  return data.map(g => ({
    ...g,
    id: g.group_id,
    members_count: g.members_count || 0,
    progress: g.progress || 0,
    updated_at: g.updated_at || g.created_at,
  }));
}

export async function updateGroup(groupId, updates) {
  const { data, error } = await supabase
    .from('groups')
    .update({
      ...updates,
      updated_at: new Date(),
    })
    .eq('group_id', groupId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteGroup(groupId) {
  const { error } = await supabase
    .from('groups')
    .delete()
    .eq('group_id', groupId);

  if (error) throw error;
  return true;
}

export async function fetchGroupById(groupId) {
  const { data, error } = await supabase
    .from('groups')
    .select('*')
    .eq('group_id', groupId)
    .single();

  if (error) throw error;
  return data;
}