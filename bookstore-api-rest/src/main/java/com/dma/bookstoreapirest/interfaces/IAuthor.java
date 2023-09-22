package com.dma.bookstoreapirest.interfaces;

import java.util.Map;

import com.dma.bookstoreapirest.entities.AuthorEntity;

public interface IAuthor {
	Map<String, Object> findAll();

	Map<String, Object> findById(long id);

	Map<String, Object> save(AuthorEntity author);
}
