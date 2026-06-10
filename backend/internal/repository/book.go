package repository

import (
	"context"
	"database/sql"

	"github.com/ShotaGoto/book-management/backend/internal/domain"
)

type BookRepository struct {
	db *sql.DB
}

func NewBookRepository(db *sql.DB) *BookRepository {
	return &BookRepository{db: db}
}

func (r *BookRepository) List(ctx context.Context) ([]domain.Book, error) {
	rows, err := r.db.QueryContext(ctx,
		`SELECT id, title, author, status, memo FROM books ORDER BY id`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	return scanBooks(rows)
}

func (r *BookRepository) Create(ctx context.Context, req domain.CreateBookRequest) (domain.Book, error) {
	var b domain.Book
	err := r.db.QueryRowContext(ctx,
		`INSERT INTO books (title, author) VALUES ($1, $2) RETURNING id, title, author, status, memo`,
		req.Title, req.Author,
	).Scan(&b.ID, &b.Title, &b.Author, &b.Status, &b.Memo)
	return b, err
}

func (r *BookRepository) Update(ctx context.Context, id int64, req domain.UpdateBookRequest) (domain.Book, error) {
	var b domain.Book
	err := r.db.QueryRowContext(ctx,
		`UPDATE books SET status = $2, memo = $3 WHERE id = $1 RETURNING id, title, author, status, memo`,
		id, req.Status, req.Memo,
	).Scan(&b.ID, &b.Title, &b.Author, &b.Status, &b.Memo)
	return b, err
}

func (r *BookRepository) Delete(ctx context.Context, id int64) error {
	_, err := r.db.ExecContext(ctx, `DELETE FROM books WHERE id = $1`, id)
	return err
}

func scanBooks(rows *sql.Rows) ([]domain.Book, error) {
	var books []domain.Book
	for rows.Next() {
		var b domain.Book
		if err := rows.Scan(&b.ID, &b.Title, &b.Author, &b.Status, &b.Memo); err != nil {
			return nil, err
		}
		books = append(books, b)
	}
	return books, rows.Err()
}
