package com.dma.bookstoreapirest.interfaces;

import java.util.Map;

import com.dma.bookstoreapirest.entities.BookEntity;

public interface IBook {

	Map<String, Object> findAll();

	Map<String, Object> findById(long id);

	Map<String, Object> save(BookEntity book);

}
