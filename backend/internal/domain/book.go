package domain

type Book struct {
	ID    int64  `json:"id"`
	Title string `json:"title"`
}

type CreateBookRequest struct {
	Title string `json:"title" validate:"required"`
}
