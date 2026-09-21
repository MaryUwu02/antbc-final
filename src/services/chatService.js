import { supabase } from './supabase.js';

export async function fetchGroupMessages(groupId) {
    const { data, error } = await supabase
        .from('messages')
        .select(`
            id,
            group_id,
            user_id,
            text,
            created_at,
            profiles(
                username
            )
        `)
        .eq('group_id', groupId)
        .order('created_at', { ascending: true });

    if (error) {
        console.error('Error al cargar mensajes:', error);
        throw new Error(error.message);
    }

    return data;
}

export async function sendMessage(groupId, text) {
    const {
        data: { user },
        error: userError
    } = await supabase.auth.getUser();

    if (userError) {
        throw new Error(userError.message);
    }

    if (!user) {
        throw new Error('Usuario no autenticado.');
    }

    const { data, error } = await supabase
        .from('messages')
        .insert({
            group_id: groupId,
            user_id: user.id,
            text,
        })
        .select()
        .single();

    if (error) {
        console.error('Error al enviar mensaje:', error);
        throw new Error(error.message);
    }

    return data;
}

export function subscribeToNewMessage(groupId, callback) {
    const chatChannel = supabase
        .channel(`chat-group-${groupId}`)
        .on(
            'postgres_changes',
            {
                event: 'INSERT',
                schema: 'public',
                table: 'messages',
            },
            payload => {
                callback(payload.new);
            }
        )
        .subscribe();

    return chatChannel;
}