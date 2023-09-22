package com.dma.bookstoreapirest.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dma.bookstoreapirest.entities.BookEntity;
import com.dma.bookstoreapirest.services.BookService;

@RestController
@RequestMapping(path = "/api/v1/book-store")
public class BookController {
	@Autowired
	private BookService bookService;

	@GetMapping(path = "/books")
	public Map<String, Object> getBooks() {
		return bookService.findAll();
	}

	@GetMapping(path = "/book/{id}")
	public Map<String, Object> getBook(@PathVariable long id) {
		return bookService.findById(id);
	}

	@PostMapping(path = "/book")
	public Map<String, Object> saveBook(@RequestBody BookEntity book) {
		return bookService.save(book);
	}
}
