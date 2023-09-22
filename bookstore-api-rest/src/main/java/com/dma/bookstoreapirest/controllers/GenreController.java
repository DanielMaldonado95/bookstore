package com.dma.bookstoreapirest.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dma.bookstoreapirest.entities.GenreEntity;
import com.dma.bookstoreapirest.services.GenreService;

@RestController
@RequestMapping(path = "/api/v1/book-store")
public class GenreController {
	@Autowired
	private GenreService genreService;

	@GetMapping(path = "/genres")
	public Map<String, Object> getGenres() {
		return genreService.findAll();
	}

	@GetMapping(path = "/genre/{id}")
	public Map<String, Object> getGenre(@PathVariable long id) {
		return genreService.findById(id);
	}

	@PostMapping(path = "/genre")
	public Map<String, Object> saveGenre(@RequestBody GenreEntity genre) {
		return genreService.save(genre);
	}
}
