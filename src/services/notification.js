import { supabase } from './supabase'

export async function fetchNotifications() {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("Usuario no autenticado");
    }

    const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", {
            ascending: false
        });

    if (error) throw error;

    return data;
}

export async function deleteNotification(notificationId) {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("Usuario no autenticado");
    }

    const { error } = await supabase
        .from("notifications")
        .delete()
        .eq("notification_id", notificationId)
        .eq("user_id", user.id);

    if (error) throw error;

    return true;
}

export async function createNotification({
    user_id,
    group_id = null,
    type,
    message,
    created_by = null,
}) {
    const { error } = await supabase
        .from("notifications")
        .insert({
            user_id,
            group_id,
            type,
            message,
            created_by,
        });

    if (error) throw error;

    return true;
}