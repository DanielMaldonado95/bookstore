package com.dma.bookstoreapirest.entities;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "books")
public class BookEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long bookId;
	private String name;
	private LocalDate datePremiered;
	@ManyToOne
	@JoinColumn(name = "authorId", nullable = false)
	private AuthorEntity author;
	@ManyToOne
	@JoinColumn(name = "genreId", nullable = false)
	private GenreEntity genre;
}
