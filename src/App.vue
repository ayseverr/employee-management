<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>Employee Management</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page>
        <div class="q-pa-md">
          <!-- Feedback Message -->
          <q-banner v-if="message" :color="messageType" class="q-mb-md">
            {{ message }}
          </q-banner>

          <!-- Employee Filter -->
          <EmployeeFilter @filter="applyFilters" />

          <!-- Add Employee Button -->
          <q-btn label="Add Employee" color="primary" icon="add" @click="openForm" class="q-mb-md" />

          <!-- Employee List -->
          <EmployeeList :employees="filteredEmployees" @edit="editEmployee" @delete="deleteEmployee" />

          <!-- Employee Form -->
          <q-dialog v-model="showForm">
            <EmployeeForm :employee="selectedEmployee" @save="saveEmployee" />
          </q-dialog>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import EmployeeFilter from "./EmployeeFilter.vue";
import EmployeeList from "./EmployeeList.vue";
import EmployeeForm from "./EmployeeForm.vue";

export default {
  components: {
    EmployeeFilter,
    EmployeeList,
    EmployeeForm,
  },
  setup() {
    const store = useStore();
    const message = ref(""); // Feedback message
    const messageType = ref(""); // Feedback message type (positive or negative)

    onMounted(() => {
      store.dispatch("fetchEmployees");
    });

    const filters = ref({
      name: "",
      department: "",
      salary: null,
      gender: null,
    });

    const filteredEmployees = computed(() => {
      return store.getters.employees.filter((employee) => {
        const matchesName = !filters.value.name || employee.name.toLowerCase().includes(filters.value.name.toLowerCase());
        const matchesDepartment = !filters.value.department || employee.department.toLowerCase().includes(filters.value.department.toLowerCase());
        const matchesSalary = !filters.value.salary || employee.salary >= filters.value.salary;
        const matchesGender = !filters.value.gender || employee.gender.toLowerCase() === filters.value.gender.toLowerCase();

        return matchesName && matchesDepartment && matchesSalary && matchesGender;
      });
    });

    const showForm = ref(false);
    const selectedEmployee = ref(null);

    const openForm = () => {
      selectedEmployee.value = null;
      showForm.value = true;
    };

    const saveEmployee = async (employee) => {
      try {
        await store.dispatch("addEmployee", employee);
        message.value = "Employee saved successfully!";
        messageType.value = "positive";
      } catch (error) {
        message.value = "Failed to save employee.";
        messageType.value = "negative";
      } finally {
        showForm.value = false;
        setTimeout(() => (message.value = ""), 5000); // Clear message after 5 seconds
      }
    };

    const editEmployee = (employee) => {
      selectedEmployee.value = { ...employee };
      showForm.value = true;
    };

    const deleteEmployee = async (id) => {
      try {
        await store.dispatch("deleteEmployee", id);
        message.value = "Employee deleted successfully!";
        messageType.value = "positive";
      } catch (error) {
        message.value = "Failed to delete employee.";
        messageType.value = "negative";
      } finally {
        setTimeout(() => (message.value = ""), 5000); // Clear message after 5 seconds
      }
    };

    const applyFilters = (newFilters) => {
      filters.value = newFilters;
    };

    return {
      filters,
      filteredEmployees,
      showForm,
      selectedEmployee,
      openForm,
      saveEmployee,
      editEmployee,
      deleteEmployee,
      applyFilters,
      message,
      messageType,
    };
  },
};
</script>
