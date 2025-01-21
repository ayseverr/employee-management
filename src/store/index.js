import { createStore } from "vuex";
import axios from "axios";

const mockApi = {
  baseURL: "https://jsonplaceholder.typicode.com/users", // Mock API

  async fetchEmployees() {
    // GET request
    const response = await axios.get(this.baseURL);
    return response.data.map((user) => ({
      id: user.id,
      name: user.name,
      department: user.company.bs, // Simulate department
      salary: Math.floor(Math.random() * 5000 + 3000), // Random salary
      gender: user.gender || (user.id % 2 === 0 ? "male" : "female"), // Mock gender
    }));
  },

  async addEmployee(employee) {
    // Simulate POST request
    const response = await axios.post(this.baseURL, employee);
    return { ...employee, id: response.data.id || Date.now() };
  },

  async deleteEmployee(id) {
    // Simulate DELETE request
    await axios.delete(`${this.baseURL}/${id}`);
    return id;
  },
};

export default createStore({
  state: {
    employees: [], // Employee data
  },
  mutations: {
    SET_EMPLOYEES(state, employees) {
      state.employees = employees;
    },
    ADD_EMPLOYEE(state, employee) {
      state.employees.push(employee);
    },
    DELETE_EMPLOYEE(state, id) {
      state.employees = state.employees.filter((e) => e.id !== id);
    },
  },
  actions: {
    async fetchEmployees({ commit }) {
      try {
        const employees = await mockApi.fetchEmployees();
        commit("SET_EMPLOYEES", employees);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    },
    async addEmployee({ commit }, employee) {
      try {
        const newEmployee = await mockApi.addEmployee(employee);
        commit("ADD_EMPLOYEE", newEmployee);
      } catch (error) {
        console.error("Error adding employee:", error);
      }
    },
    async deleteEmployee({ commit }, id) {
      try {
        await mockApi.deleteEmployee(id);
        commit("DELETE_EMPLOYEE", id);
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    },
  },
  getters: {
    employees: (state) => state.employees,
  },
});
