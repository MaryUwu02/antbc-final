<template>
  <section class="flex items-center gap-3 w-full md:w-auto">
    <div class="w-12 h-12 rounded-full bg-[#140E0C] text-white flex items-center justify-center text-xl font-semibold">
      {{ userInitial }}
    </div>
    <div>
      <h2 class="font-['Outfit'] font-bold text-[#332926] text-3xl">
        ¡Bienvenido, {{ userName }}!
      </h2>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "../../services/supabase.js";

const userName = ref("Usuario");
const userInitial = ref("U");

onMounted(async () => {
  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData.user) return;

  if (typeof userEmail !== 'undefined') {
    userEmail.value = authData.user.email;
  }

  let metaName = authData.user.user_metadata?.full_name || 
                 authData.user.user_metadata?.name || 
                 authData.user.user_metadata?.username;

  const { data: profile } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", authData.user.id)
    .single();

  let dbName = profile?.username;

  if (typeof dbName === 'object' && dbName !== null) {
      dbName = dbName.full_name || dbName.name || dbName.username;
  }
  if (typeof dbName === 'string' && dbName.startsWith('{')) {
      try {
          const parsed = JSON.parse(dbName);
          dbName = parsed.full_name || parsed.name || parsed.username;
      } catch(e) {
          console.error("Error al parsear el nombre de usuario", e);
      }
  }

  let finalName = dbName || metaName || authData.user.email?.split("@")[0] || "Usuario";

  userName.value = finalName;
  userInitial.value = finalName.charAt(0).toUpperCase();
});
</script>