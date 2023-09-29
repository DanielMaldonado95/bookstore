package com.dma.bookstoreapirest.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dma.bookstoreapirest.entities.BookEntity;
import com.dma.bookstoreapirest.interfaces.IBook;
import com.dma.bookstoreapirest.repositories.BookRepository;

@Service
public class BookService implements IBook {
	@Autowired
	private BookRepository bookRepository;

	@Override
	public Map<String, Object> findAll() {
		Map<String, Object> resp = new HashMap<String, Object>();
		try {
			List<BookEntity> books = bookRepository.findAll();
			if (!books.isEmpty())
				resp.put("data", books);
			else
				resp.put("error", "No registered books were found.");
		} catch (Exception e) {
			e.printStackTrace();
		}
		return resp;
	}

	@Override
	public Map<String, Object> findById(long id) {
		Map<String, Object> resp = new HashMap<String, Object>();
		try {
			Optional<BookEntity> book = bookRepository.findById(id);
			if (book.isPresent())
				resp.put("data", book.get());
			else
				resp.put("error", "Requested author not found");
		} catch (Exception e) {
			e.printStackTrace();
		}
		return resp;
	}

	@Override
	public Map<String, Object> save(BookEntity book) {
		Map<String, Object> resp = new HashMap<String, Object>();
		try {
			BookEntity bookTemp = bookRepository.save(book);
			if (bookTemp != null)
				resp.put("data", bookTemp);
			else
				resp.put("error", "An unexpected error occurred at the time of entering the author");
		} catch (Exception e) {
			e.printStackTrace();
		}
		return resp;
	}
}
