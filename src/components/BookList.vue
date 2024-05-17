<template>
    <div>
        <h1>Book List</h1>
        <ul>
            <li v-for="book in books" :key="book.id">
                {{ book.title }}
                <button @click="$emit('remove-book', book.id)">Remove</button>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: ['books']
}
</script>

<style scoped>
h1 {
    color: blue;
}
</style>