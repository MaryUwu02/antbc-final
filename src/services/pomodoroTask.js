import { supabase } from "./supabase.js";

export async function getPomodoroTasks(groupId) {
    const { data, error } = await supabase
        .from("pomodoro_tasks")
        .select("*")
        .eq("group_id", groupId)
        .order("created_at", { ascending: true });

    if (error) throw error;

    return data;
}

export async function createPomodoroTask(groupId, title = "", description = "") {
    const {
        data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("Usuario no autenticado");
    }

    const { data, error } = await supabase
        .from("pomodoro_tasks")
        .insert({
            user_id: user.id,
            group_id: groupId,
            title,
            description,
            completed: false
        })
        .select()
        .single();

    if (error) throw error;

    return data;
}

export async function updatePomodoroTask(id, changes) {
    const { data, error } = await supabase
        .from("pomodoro_tasks")
        .update(changes)
        .eq("id", id)
        .select()
        .single();

    if (error) throw error;

    return data;
}

export async function deletePomodoroTask(id) {
    const { error } = await supabase
        .from("pomodoro_tasks")
        .delete()
        .eq("id", id);

    if (error) throw error;
}