<template>
    <q-list bordered>
        <!-- Render Each Employee -->
        <q-item v-for="employee in employees" :key="employee.id" clickable>
            <q-item-section>
                <!-- Employee Details -->
                <div>
                    <strong>{{ employee.name }}</strong> - {{ employee.department }}
                </div>
                <div>Salary: {{ employee.salary }}</div>
                <div>Gender: {{ employee.gender }}</div>
            </q-item-section>

            <!-- Action Buttons -->
            <q-item-section side>
                <q-btn flat icon="edit" color="primary" @click="$emit('edit', employee)" />
                <q-btn flat icon="delete" color="negative" @click="$emit('delete', employee.id)" />
            </q-item-section>
        </q-item>
    </q-list>
</template>

<script>
export default {
    props: {
        employees: {
            type: Array,
            required: true,
        },
    },
};
</script>

<style scoped>
/* Optional styling for list */
</style>
