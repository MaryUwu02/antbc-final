import { supabase } from './supabase'

let user = {
    id: null,
    email: null
}

let observers = []

fetchCurrentAuthUserData()

async function fetchCurrentAuthUserData() {
    const { data, error } = await supabase.auth.getUser()
    if(error || !data) return

    user = {
        id: data.user.id,
        email: data.user.email
    }
    notifyAll()
}

export async function register(email, password) {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if(error) throw new Error(error.message)

    user = {
        id: data.user.id,
        email: data.user.email
    }
    notifyAll()
}

export async function login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if(error) throw new Error(error.message)

    user = {
        id: data.user.id,
        email: data.user.email
    }
    notifyAll()
}

export async function logout() {
    await supabase.auth.signOut()
    user = { id: null, email: null }
    notifyAll()
}

export function subscribeToAuthStateChanges(callback) {
    observers.push(callback)
    notify(callback)
    return () => observers = observers.filter(obs => obs !== callback)
}

function notify(callback) {
    callback({ ...user })
}

function notifyAll() {
    observers.forEach(callback => notify(callback))
}