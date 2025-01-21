<template>
    <q-card>
        <q-card-section>
            <div class="text-h6">Filter Employees</div>
        </q-card-section>
        <q-card-section>
            <q-input filled v-model="filters.name" label="Name" debounce="300" @input="emitFilters" class="q-mb-md" />
            <q-input filled v-model="filters.department" label="Department" debounce="300" @input="emitFilters"
                class="q-mb-md" />
            <q-input filled v-model.number="filters.salary" label="Minimum Salary" type="number" debounce="300"
                @input="emitFilters" class="q-mb-md" />
            <q-select filled v-model="filters.gender" :options="genderOptions" label="Gender"
                @update:model-value="emitFilters" dropdown-icon="arrow_drop_down" />
        </q-card-section>
    </q-card>
</template>

<script>
import { reactive, watch } from "vue";

export default {
    emits: ["filter"],
    setup(_, { emit }) {
        const filters = reactive({
            name: "",
            department: "",
            salary: null,
            gender: null, // Gender value from dropdown
        });

        watch(
            filters,
            (newFilters) => {
                emit("filter", { ...newFilters });
            },
            { deep: true } // Ensure deep changes are detected
        );

        const genderOptions = [
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
            { label: "Other", value: "other" },
        ];

        return {
            filters,
            genderOptions,
        };
    },
};
</script>

<style scoped>
.q-mb-md {
    margin-bottom: 1rem;
}
</style>
