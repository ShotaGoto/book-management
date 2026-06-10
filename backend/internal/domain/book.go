package domain

type Book struct {
	ID     int64  `json:"id"`
	Title  string `json:"title"`
	Author string `json:"author"`
	Status string `json:"status"` // unread | reading | done
	Memo   string `json:"memo"`
}

type CreateBookRequest struct {
	Title  string `json:"title"  validate:"required"`
	Author string `json:"author"`
}

type UpdateBookRequest struct {
	Status string `json:"status" validate:"required,oneof=unread reading done"`
	Memo   string `json:"memo"`
}
