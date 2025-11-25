    <template>
    <section class="flex items-center gap-3 w-full md:w-auto">
        <div>
            <h1 class="font-bold text-gray-900 text-3xl">
                {{ loading ? 'Cargando...' : (error || groupName) }}
            </h1>
            <p v-if="error" class="text-sm text-red-500">{{ error }}</p>
        </div>
    </section>
</template>

<script>
import { fetchGroupById } from "../../services/groups.js";

export default {
    data() {
        return {
        groupName: '',
        loading: false,
        error: null,
        }
    },

    methods: {
        async loadGroup() {
        this.loading = true
        this.error = null
        try {
            const id = this.$route.params.id
            if (!id) throw new Error('ID de grupo faltante')
            const group = await fetchGroupById(id)
            this.groupName = group?.name || 'Nombre no disponible'
        } catch (err) {
            console.error(err)
            this.error = 'No se pudo cargar el grupo'
        } finally {
            this.loading = false
        }
        },
    },

    mounted() {
        this.loadGroup()
    },
}
</script>
