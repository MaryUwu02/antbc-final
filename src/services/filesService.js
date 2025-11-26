import { supabase } from './supabase.js'

export async function getGroupFiles(groupId) {
  const { data, error } = await supabase
    .from('files')
    .select('*')
    .eq('group_id', groupId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function createFile(groupId, title, content) {
  const { data, error } = await supabase
    .from('files')
    .insert([{ group_id: groupId, title, content }])
    .select()

  if (error) throw error
  return data[0]
}

export async function getFileById(fileId) {
  const { data, error } = await supabase
    .from('files')
    .select('*')
    .eq('id', fileId)
    .single()

  if (error) throw error
  return data
}

export async function updateFile(fileId, fields) {
  const { data, error } = await supabase
    .from('files')
    .update(fields)
    .eq('id', fileId)
    .select()

  if (error) throw error
  return data[0]
}

export async function deleteFile(fileId) {
  const { error } = await supabase
    .from('files')
    .delete()
    .eq('id', fileId)

  if (error) throw error
  return true
}