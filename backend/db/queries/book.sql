-- name: ListBooks :many
SELECT id, title FROM books ORDER BY id;

-- name: CreateBook :one
INSERT INTO books (title) VALUES ($1) RETURNING id, title;

-- name: DeleteBook :exec
DELETE FROM books WHERE id = $1;
