package com.dma.bookstoreapirest.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dma.bookstoreapirest.entities.BookEntity;

@Repository
public interface BookRepository extends JpaRepository<BookEntity, Long> {

}
