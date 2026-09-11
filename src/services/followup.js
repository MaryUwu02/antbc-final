import { supabase } from "./supabase";

export async function fetchGroupMembers(groupId) {

    const { data: members, error: membersError } = await supabase
        .from("group_members")
        .select("user_id")
        .eq("group_id", groupId);

    if (membersError) throw membersError;

    if (!members.length) return [];

    const ids = members.map(member => member.user_id);

    const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("*")
        .in("id", ids);

    if (profilesError) throw profilesError;

    return profiles;
}