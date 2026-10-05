import { supabase } from "./supabase.js";

export async function getFlashcards(groupId) {
    const { data, error } = await supabase
        .from("flashcards")
        .select(`
            flashcard_id,
            group_id,
            title,
            description,
            created_at,
            flashcard_items (
                item_id,
                term,
                definition,
                created_at
            )
        `)
        .eq("group_id", groupId)
        .order("created_at", { ascending: false });

    if (error) throw error;

    return data.map(flashcard => ({
        ...flashcard,
        items: flashcard.flashcard_items || []
    }));
}

export async function createFlashcard(groupId, title, description, items) {
    const { data: flashcard, error: flashcardError } = await supabase
        .from("flashcards")
        .insert({
            group_id: groupId,
            title,
            description
        })
        .select()
        .single();

    if (flashcardError) throw flashcardError;

    const flashcardItems = items.map(item => ({
        flashcard_id: flashcard.flashcard_id,
        term: item.term,
        definition: item.definition
    }));

    const { data: createdItems, error: itemsError } = await supabase
        .from("flashcard_items")
        .insert(flashcardItems)
        .select();

    if (itemsError) throw itemsError;

    return {
        ...flashcard,
        items: createdItems
    };
}
export async function deleteFlashcard(flashcardId) {
    const { error } = await supabase
        .from("flashcards")
        .delete()
        .eq("flashcard_id", flashcardId);

    if (error) throw error;
}