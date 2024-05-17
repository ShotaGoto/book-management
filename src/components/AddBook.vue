<template>
    <div>
        <h1>Add New Book</h1>
        <from @submit.prevent="addBook">
            <input v-model="newBookTitle" type="text" placeholder="Book Title">
            <button type="submit">Add Book</button>
        </from>
    </div>
</template>

<script>
export default {
    data() {
        return {
            newBookTitle: ''
        }
    },
    methods: {
        addBook() {
            this.$emit('addBook', this.newBookTitle)
            this.newBookTitle = ''
        }
    }
}
</script>