import { supabase } from "./supabase"

export async function getReminders(userId) {
    const { data, error } = await supabase
        .from("reminders")
        .select("*")
        .eq("user_id", userId)
        .order("date", { ascending: false })
    if (error) throw error
    return data
}

export async function createReminder(reminder) {
    const { data, error } = await supabase
        .from("reminders")
        .insert([reminder])
    if (error) throw error
    return data
}

export async function updateReminder(id, updates) {
    const { data, error } = await supabase
        .from("reminders")
        .update(updates)
        .eq("id", id)
    if (error) throw error
    return data
}

export async function deleteReminder(id) {
    const { data, error } = await supabase
        .from("reminders")
        .delete()
        .eq("id", id)
    if (error) throw error
    return data
}