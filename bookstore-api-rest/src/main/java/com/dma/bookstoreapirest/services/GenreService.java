package com.dma.bookstoreapirest.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dma.bookstoreapirest.entities.GenreEntity;
import com.dma.bookstoreapirest.interfaces.IGenre;
import com.dma.bookstoreapirest.repositories.GenreRepository;

@Service
public class GenreService implements IGenre {
	@Autowired
	private GenreRepository genreRepository;

	@Override
	public Map<String, Object> findAll() {
		Map<String, Object> resp = new HashMap<String, Object>();
		try {
			List<GenreEntity> genres = genreRepository.findAll();
			if (!genres.isEmpty())
				resp.put("data", genres);
			else
				resp.put("error", "No registered genres were found.");
		} catch (Exception e) {
			e.printStackTrace();
		}
		return resp;
	}

	@Override
	public Map<String, Object> findById(long id) {
		Map<String, Object> resp = new HashMap<String, Object>();
		try {
			Optional<GenreEntity> genre = genreRepository.findById(id);
			if (genre.isPresent())
				resp.put("data", genre.get());
			else
				resp.put("error", "Requested author not found");
		} catch (Exception e) {
			e.printStackTrace();
		}
		return resp;
	}

	@Override
	public Map<String, Object> save(GenreEntity genre) {
		Map<String, Object> resp = new HashMap<String, Object>();
		try {
			GenreEntity genreTemp = genreRepository.save(genre);
			if (genreTemp != null)
				resp.put("data", genreTemp);
			else
				resp.put("error", "An unexpected error occurred at the time of entering the author");
		} catch (Exception e) {
			e.printStackTrace();
		}
		return resp;
	}
}
