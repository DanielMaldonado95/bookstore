package com.dma.bookstoreapirest.interfaces;

import java.util.Map;

import com.dma.bookstoreapirest.entities.GenreEntity;

public interface IGenre {

	Map<String, Object> findAll();

	Map<String, Object> findById(long id);

	Map<String, Object> save(GenreEntity genre);

}
