-- name: ListBooks :many
SELECT id, title, author, status, memo FROM books ORDER BY id;

-- name: ListBooksByStatus :many
SELECT id, title, author, status, memo FROM books WHERE status = $1 ORDER BY id;

-- name: CreateBook :one
INSERT INTO books (title, author)
VALUES ($1, $2)
RETURNING id, title, author, status, memo;

-- name: UpdateBook :one
UPDATE books SET status = $2, memo = $3
WHERE id = $1
RETURNING id, title, author, status, memo;

-- name: DeleteBook :exec
DELETE FROM books WHERE id = $1;
