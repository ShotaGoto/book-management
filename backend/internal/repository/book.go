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
	rows, err := r.db.QueryContext(ctx, `SELECT id, title FROM books ORDER BY id`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var books []domain.Book
	for rows.Next() {
		var b domain.Book
		if err := rows.Scan(&b.ID, &b.Title); err != nil {
			return nil, err
		}
		books = append(books, b)
	}
	return books, rows.Err()
}

func (r *BookRepository) Create(ctx context.Context, title string) (domain.Book, error) {
	var b domain.Book
	err := r.db.QueryRowContext(ctx,
		`INSERT INTO books (title) VALUES ($1) RETURNING id, title`, title,
	).Scan(&b.ID, &b.Title)
	return b, err
}

func (r *BookRepository) Delete(ctx context.Context, id int64) error {
	_, err := r.db.ExecContext(ctx, `DELETE FROM books WHERE id = $1`, id)
	return err
}
