import { supabase } from './supabase.js'

export async function getAllMembers() {
  const { data, error } = await supabase
    .from('group_members')
    .select('*')
    .order('name', { ascending: true })

  if (error) {
    console.error('Error al obtener miembros:', error.message)
    throw error
  }

  return data
}

export async function getMemberById(id) {
  const { data, error } = await supabase
    .from('group_members')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error al obtener miembro:', error.message)
    throw error
  }

  return data
}

export async function addMember(member) {
  const { data, error } = await supabase
    .from('group_members')
    .insert([member])
    .select()

  if (error) {
    console.error('Error al agregar miembro:', error.message)
    throw error
  }

  return data[0]
}

export async function updateMember(id, updates) {
  const { data, error } = await supabase
    .from('group_members')
    .update(updates)
    .eq('id', id)
    .select()

  if (error) {
    console.error('Error al actualizar miembro:', error.message)
    throw error
  }

  return data[0]
}

export async function deleteMember(id) {
  const { error } = await supabase
    .from('group_members')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error al eliminar miembro:', error.message)
    throw error
  }
}
