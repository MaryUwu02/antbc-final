import { supabase } from './supabase.js'

export async function getTasksByMember(memberId) {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('member_id', memberId)

  if (error) {
    console.error('Error al obtener tareas:', error.message)
    throw error
  }

  return data
}

export async function toggleTaskComplete(taskId, completed) {
  const { data, error } = await supabase
    .from('tasks')
    .update({ completed })
    .eq('id', taskId)
    .select()

  if (error) {
    console.error('Error al actualizar tarea:', error.message)
    throw error
  }

  return data[0]
}
