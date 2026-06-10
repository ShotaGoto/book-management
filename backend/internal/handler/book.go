package handler

import (
	"context"
	"net/http"
	"strconv"

	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"

	"github.com/ShotaGoto/book-management/backend/internal/domain"
)

type bookRepo interface {
	List(ctx context.Context) ([]domain.Book, error)
	Create(ctx context.Context, title string) (domain.Book, error)
	Delete(ctx context.Context, id int64) error
}

type BookHandler struct {
	repo     bookRepo
	validate *validator.Validate
}

func NewBookHandler(repo bookRepo) *BookHandler {
	return &BookHandler{repo: repo, validate: validator.New()}
}

func (h *BookHandler) List(c echo.Context) error {
	books, err := h.repo.List(c.Request().Context())
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError)
	}
	if books == nil {
		books = []domain.Book{}
	}
	return c.JSON(http.StatusOK, books)
}

func (h *BookHandler) Create(c echo.Context) error {
	var req domain.CreateBookRequest
	if err := c.Bind(&req); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	if err := h.validate.Struct(req); err != nil {
		return echo.NewHTTPError(http.StatusUnprocessableEntity, err.Error())
	}
	book, err := h.repo.Create(c.Request().Context(), req.Title)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError)
	}
	return c.JSON(http.StatusCreated, book)
}

func (h *BookHandler) Delete(c echo.Context) error {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "invalid id")
	}
	if err := h.repo.Delete(c.Request().Context(), id); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError)
	}
	return c.NoContent(http.StatusNoContent)
}
