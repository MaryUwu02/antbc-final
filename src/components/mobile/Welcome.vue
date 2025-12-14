<template>
<section class="flex items-center gap-3 w-full md:w-auto">
    <div class="w-12 h-12 rounded-full bg-[#140E0C] text-white flex items-center justify-center font-semibold">
        {{ userInitial }}
    </div>
    <div>
        <h2 class="font-bold text-[#332926] text-3xl">
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
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) return;
  const name =
    data.user.user_metadata?.full_name ||
    data.user.user_metadata?.name ||
    data.user.email?.split("@")[0] ||
    "Usuario";

  userName.value = name;
  userInitial.value = name.charAt(0).toUpperCase();
});
</script>
