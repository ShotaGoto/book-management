<template>
    <div>
        <h1>Add New Book</h1>
        <form @submit.prevent="addBook">
            <input v-model="newBookTitle" type="text" placeholder="Book Title">
            <button type="submit">Add Book</button>
        </form>
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
            if (this.newBookTitle.trim() === '') return;
            this.$emit('add-book', { title: this.newBookTitle });
            this.newBookTitle = '';
        }
    }
}
</script>