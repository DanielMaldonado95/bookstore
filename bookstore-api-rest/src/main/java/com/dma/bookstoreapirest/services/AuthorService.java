package com.dma.bookstoreapirest.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dma.bookstoreapirest.entities.AuthorEntity;
import com.dma.bookstoreapirest.interfaces.IAuthor;
import com.dma.bookstoreapirest.repositories.AuthorRepository;

@Service
public class AuthorService implements IAuthor {
	@Autowired
	private AuthorRepository authorRepository;

	@Override
	public Map<String, Object> findAll() {
		Map<String, Object> resp = new HashMap<String, Object>();
		try {
			List<AuthorEntity> authors = authorRepository.findAll();
			if (!authors.isEmpty())
				resp.put("data", authors);
			else
				resp.put("error", "No registered authors were found.");
		} catch (Exception e) {
			e.printStackTrace();
		}
		return resp;
	}

	@Override
	public Map<String, Object> findById(long id) {
		Map<String, Object> resp = new HashMap<String, Object>();
		try {
			Optional<AuthorEntity> author = authorRepository.findById(id);
			if (author.isPresent())
				resp.put("data", author.get());
			else
				resp.put("error", "Requested author not found");
		} catch (Exception e) {
			e.printStackTrace();
		}
		return resp;
	}

	@Override
	public Map<String, Object> save(AuthorEntity author) {
		Map<String, Object> resp = new HashMap<String, Object>();
		try {
			AuthorEntity authorTemp = authorRepository.save(author);
			if (authorTemp != null)
				resp.put("data", authorTemp);
			else
				resp.put("error", "An unexpected error occurred at the time of entering the author");
		} catch (Exception e) {
			e.printStackTrace();
		}
		return resp;
	}
}
