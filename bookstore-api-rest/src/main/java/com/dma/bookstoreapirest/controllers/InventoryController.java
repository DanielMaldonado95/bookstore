package com.dma.bookstoreapirest.controllers;

import java.io.ByteArrayInputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dma.bookstoreapirest.entities.InventoryEntity;
import com.dma.bookstoreapirest.services.InventoryService;

@RestController
@RequestMapping(path = "/api/v1/book-store")
public class InventoryController {
	@Autowired
	private InventoryService inventoryService;

	@GetMapping(path = "/inventories")
	public Map<String, Object> getInventories() {
		return inventoryService.findAll();
	}

	@GetMapping(path = "/inventory/{id}")
	public Map<String, Object> getInventory(@PathVariable long id) {
		return inventoryService.findById(id);
	}

	@PostMapping(path = "/inventory")
	public Map<String, Object> saveInventory(@RequestBody InventoryEntity inventory) {
		return inventoryService.save(inventory);
	}

	@GetMapping(path = "/inventory-download/{type}")
	public ResponseEntity<Object> download(@PathVariable int type) {
		final List<InventoryEntity> inventories = (ArrayList<InventoryEntity>) inventoryService.findAll().get("data");
		ByteArrayInputStream file = inventoryService.download(inventories, type);
		return ResponseEntity.ok().body(new InputStreamResource(file));
	}
}
