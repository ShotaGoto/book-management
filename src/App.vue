<template>
  <div id="app">
    <BookList :books="books" @remove-book="removeBook" />
    <AddBook @add-book="addBook" />
  </div>
</template>

<script>
import BookList from './components/BookList.vue'
import AddBook from './components/AddBook.vue'

export default {
  data() {
    return {
      books: [
        { id: 1, title: 'Book 1' },
        { id: 2, title: 'Book 2' },
        { id: 3, title: 'Book 3' }
      ]
    }
  },
  components: {
    BookList,
    AddBook
  },
  methods: {
    addBook(newBookTitle) {
      const newId = this.books.length ? this.books[this.books.length - 1].id + 1 : 1;
      this.books.push({ id: newId, title: newBookTitle });
  },
  removeBook(bookId) {
    this.books = this.books.filter(book => book.id !== bookId);
  }
}
</script>
