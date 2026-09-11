import { supabase } from './supabase.js';
import { createNotification } from './notification';
import { capitalize } from '../utils/format.js';

function generateCode(length = 6) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

export async function createGroup(name, due_date) {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error("Usuario no autenticado");
  }

  const invitation_code = generateCode(6);
  
  const { data, error } = await supabase
    .from('groups')
    .insert({
      name: capitalize(name),
      due_date: due_date || null,
      owner_id: user.id,
      invitation_code
    })
    .select()
    .single();

  if (error) throw error;

  const { error: memberError } = await supabase
    .from("group_members")
    .insert({
      group_id: data.group_id,
      user_id: user.id,
    });

  if (memberError) throw memberError;

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

  const { data: owned, error: ownedError } = await supabase
    .from('groups')
    .select(`
      *,
      group_members(count)
    `)
    .eq('owner_id', user.id)
    .is('deleted_at', null)
    .is('archived_at', null);

  if (ownedError) throw ownedError;

  const { data: memberships, error: memberError } = await supabase
    .from('group_members')
    .select('group_id')
    .eq('user_id', user.id);

  if (memberError) throw memberError;

  const groupIds = memberships.map(m => m.group_id);

  let joined = [];

  if (groupIds.length > 0) {
    const { data: joinedGroups, error: joinedError } = await supabase
      .from('groups')
      .select(`
        *,
        group_members(count)
      `)
      .in('group_id', groupIds)
      .is('deleted_at', null)
        .is('archived_at', null);

    if (joinedError) throw joinedError;

    joined = joinedGroups;
  }

  const map = new Map();

  [...owned, ...joined].forEach(g => {
    map.set(g.group_id, g);
  });

  const allGroups = Array.from(map.values());

  return allGroups.map(g => ({
    ...g,
    id: g.group_id,
    members_count: g.group_members?.[0]?.count || 0,
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
    // .eq('owner_id', user.id)
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

  const { data: group, error: groupError } = await supabase
    .from("groups")
    .select("*")
    .eq("group_id", groupId)
    .single();

  if (groupError) throw groupError;

  const { data: members, error: membersError } = await supabase
    .from("group_members")
    .select("user_id")
    .eq("group_id", groupId);

  if (membersError) throw membersError;

  const { error } = await supabase
    .from('groups')
    .update({
      deleted_at: new Date().toISOString()
    })
    .eq('group_id', groupId)
    .eq('owner_id', user.id);

  if (error) throw error;

  for (const member of members) {

    if (member.user_id === user.id) continue;

    await createNotification({
      user_id: member.user_id,
      group_id: groupId,
      type: "group_deleted",
      message: `El grupo "${group.name}" fue eliminado.`,
      created_by: user.id,
    });
  }

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

export async function joinGroupByCode(code) {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Usuario no autenticado");
  }

  const { data: group, error } = await supabase
    .from("groups")
    .select("*")
    .eq("invitation_code", code.toUpperCase().trim())
    .single();

  if (error || !group) {
    throw new Error("Código inválido");
  }

  const { error: joinError } = await supabase
    .from("group_members")
    .insert({
      group_id: group.group_id,
      user_id: user.id,
    });

    if (joinError?.code === "23505") {
      throw new Error("Ya estás en este grupo");
    }
  
    if (joinError) throw joinError;

  const { data: profile } = await supabase
    .from("profiles")
    .select("username ")
    .eq("id", user.id)
    .single();

  await createNotification({
    user_id: group.owner_id,
    group_id: group.group_id,
    type: "member_joined",
    message: `${profile?.username || "Usuario"} se ha unido al grupo "${group.name}"`,
    created_by: user.id,
  });


  return group;
}

export async function fetchOwnedGroups() {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Usuario no autenticado");
  }

  const { data, error } = await supabase
    .from('groups')
    .select('*')
    .eq('owner_id', user.id)
    .is('deleted_at', null)
    .is('archived_at', null)
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

export async function leaveGroup(groupId) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Usuario no autenticado");
  }

  const { data: group, error: groupError } = await supabase
    .from("groups")
    .select("*")
    .eq("group_id", groupId)
    .single();

  if (groupError) throw groupError;

  const { data: profile } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", user.id)
    .single();

  const { error } = await supabase
    .from("group_members")
    .delete()
    .eq("group_id", groupId)
    .eq("user_id", user.id);

  if (error) throw error;

  await createNotification({
    user_id: group.owner_id,
    group_id: groupId,
    type: "member_left",
    message: `${profile?.username || "Un usuario"} abandonó el grupo "${group.name}"`,
    created_by: user.id,
  });

  return true;
}