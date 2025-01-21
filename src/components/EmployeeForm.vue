<template>
    <q-card>
        <q-card-section>
            <div class="text-h6">
                {{ employee?.id ? "Edit Employee" : "Add Employee" }}
            </div>
        </q-card-section>
        <q-card-section>
            <q-input filled v-model="form.name" label="Name" required class="q-mb-md" />
            <q-input filled v-model="form.department" label="Department" required class="q-mb-md" />
            <q-input filled v-model.number="form.salary" label="Salary" type="number" required />
        </q-card-section>
        <q-card-actions align="right">
            <q-btn flat label="Cancel" @click="$emit('cancel')" />
            <q-btn flat label="Save" color="primary" @click="handleSave" />
        </q-card-actions>
    </q-card>
</template>

<script>
import { ref, watch } from "vue";

export default {
    props: {
        employee: {
            type: Object,
            default: null,
        },
    },
    setup(props, { emit }) {
        const form = ref({
            name: "",
            department: "",
            salary: 0,
        });

        // Watch for changes in the employee prop
        watch(
            () => props.employee,
            (newEmployee) => {
                if (newEmployee) {
                    form.value = { ...newEmployee }; // Pre-fill form for editing
                } else {
                    form.value = { name: "", department: "", salary: 0 }; // Reset form for new entry
                }
            },
            { immediate: true }
        );

        const handleSave = () => {
            emit("save", { ...form.value });
        };

        return {
            form,
            handleSave,
        };
    },
};
</script>

<style scoped>
.q-mb-md {
    margin-bottom: 1rem;
}
</style>
