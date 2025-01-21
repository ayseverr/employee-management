<template>
    <div v-if="message" class="message-box">{{ message }}</div>
</template>

<script>
export default {
    props: {
        message: {
            type: String,
            required: true,
        },
    },
};
</script>

<style scoped>
.message-box {
    background-color: #e0f7fa;
    color: #00796b;
    padding: 10px;
    margin-bottom: 15px;
    border-radius: 4px;
    text-align: center;
}
</style>
