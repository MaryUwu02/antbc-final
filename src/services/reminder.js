import { supabase } from "./supabase"

export async function getReminders(userId) {
    const { data: memberships, error: memberError } = await supabase
        .from("group_members")
        .select("group_id")
        .eq("user_id", userId)

    if (memberError) {
        console.error("Error obteniendo grupos del usuario:", memberError)
        throw memberError
    }

    const groupIds = memberships.map(member => member.group_id)

    let query = supabase
        .from("reminders")
        .select(`
        *,
        groups:group_id (
            group_id,
            name
        )
        `)
        .order("date", { ascending: true })

    if (groupIds.length > 0) {
        query = query.or(
        `user_id.eq.${userId},group_id.in.(${groupIds.join(",")})`
        )
    } else {
        query = query.eq("user_id", userId)
    }

    const { data, error } = await query

    if (error) {
        console.error("Error obteniendo recordatorios:", error)
        throw error
    }

    return data
}

export async function createReminder(reminder) {
    const { data, error } = await supabase
        .from("reminders")
        .insert([reminder])
        .select()
        .single()
    if (error) throw error
    return data
}

export async function updateReminder(id, updates) {
    const { data, error } = await supabase
        .from("reminders")
        .update(updates)
        .eq("id", id)
        .select()
        .single()
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