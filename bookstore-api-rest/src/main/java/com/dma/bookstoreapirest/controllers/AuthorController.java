package com.dma.bookstoreapirest.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dma.bookstoreapirest.entities.AuthorEntity;
import com.dma.bookstoreapirest.services.AuthorService;

@RestController
@RequestMapping(path = "/api/v1/book-store")
public class AuthorController {
	@Autowired
	private AuthorService authorService;

	@GetMapping(path = "/authors")
	public Map<String, Object> getAuthors() {
		return authorService.findAll();
	}

	@GetMapping(path = "/author/{id}")
	public Map<String, Object> getAuthor(@PathVariable long id) {
		return authorService.findById(id);
	}

	@PostMapping(path = "/author")
	public Map<String, Object> saveAuthor(@RequestBody AuthorEntity author) {
		return authorService.save(author);
	}
}
