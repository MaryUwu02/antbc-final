import { supabase } from './supabase.js';

export async function createGroup(name, due_date) {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Usuario no autenticado");
  }

  const { data, error } = await supabase
    .from('groups')
    .insert({
      name,
      due_date: due_date || null,
      owner_id: user.id
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
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Usuario no autenticado");
  }

  const { data, error } = await supabase
    .from('groups')
    .select('*')
    .eq('owner_id', user.id)
    .is('deleted_at', null)
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

export async function fetchGroupById(groupId) {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Usuario no autenticado");
  }

  const { data, error } = await supabase
    .from('groups')
    .select('*')
    .eq('group_id', groupId)
    .eq('owner_id', user.id)
    .single();

  if (error) throw error;
  return data;
}

export async function updateGroup(groupId, updates) {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Usuario no autenticado");
  }

  const { data, error } = await supabase
    .from('groups')
    .update({ ...updates, updated_at: new Date() })
    .eq('group_id', groupId)
    .eq('owner_id', user.id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteGroup(groupId) {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Usuario no autenticado");
  }

  const { error } = await supabase
    .from('groups')
    .update({ deleted_at: new Date().toISOString() })
    .eq('group_id', groupId)
    .eq('owner_id', user.id);

  if (error) throw error;
  return true;
}

export async function fetchTrashedGroups() {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Usuario no autenticado");
  }

  const { data, error } = await supabase
    .from('groups')
    .select('*')
    .eq('owner_id', user.id)
    .not('deleted_at', 'is', null)
    .order('deleted_at', { ascending: false });

  if (error) throw error;

  return data.map(g => ({
    ...g,
    id: g.group_id,
    members_count: g.members_count || 0,
    progress: g.progress || 0,
  }));
}

export async function restoreGroup(groupId) {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Usuario no autenticado");
  }

  const { data, error } = await supabase
    .from('groups')
    .update({ deleted_at: null })
    .eq('group_id', groupId)
    .eq('owner_id', user.id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteGroupPermanent(groupId) {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Usuario no autenticado");
  }

  const { error } = await supabase
    .from('groups')
    .delete()
    .eq('group_id', groupId)
    .eq('owner_id', user.id);

  if (error) throw error;
  return true;
}

export async function archiveGroup(groupId) {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Usuario no autenticado");
  }

  const { data, error } = await supabase
    .from('groups')
    .update({ archived_at: new Date().toISOString() })
    .eq('group_id', groupId)
    .eq('owner_id', user.id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function unarchiveGroup(groupId) {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Usuario no autenticado");
  }

  const { data, error } = await supabase
    .from('groups')
    .update({ archived_at: null })
    .eq('group_id', groupId)
    .eq('owner_id', user.id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function fetchArchivedGroups() {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Usuario no autenticado");
  }

  const { data, error } = await supabase
    .from('groups')
    .select('*')
    .eq('owner_id', user.id)
    .not('archived_at', 'is', null)
    .is('deleted_at', null)
    .order('archived_at', { ascending: false });

  if (error) throw error;

  return data.map(g => ({
    ...g,
    id: g.group_id,
    members_count: g.members_count || 0,
    progress: g.progress || 0,
  }));
}