package com.dma.bookstoreapirest.interfaces;

import java.io.ByteArrayInputStream;
import java.util.List;
import java.util.Map;

import com.dma.bookstoreapirest.entities.InventoryEntity;

public interface IInventary {

	Map<String, Object> findAll();

	Map<String, Object> findById(long id);

	Map<String, Object> save(InventoryEntity inventory);

	ByteArrayInputStream download(List<InventoryEntity> inventories, int fileType);

}
