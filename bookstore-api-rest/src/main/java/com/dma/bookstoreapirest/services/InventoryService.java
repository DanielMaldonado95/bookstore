package com.dma.bookstoreapirest.services;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dma.bookstoreapirest.entities.InventoryEntity;
import com.dma.bookstoreapirest.interfaces.IInventary;
import com.dma.bookstoreapirest.repositories.InventoryRepository;
import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.properties.UnitValue;

@Service
public class InventoryService implements IInventary {
	@Autowired
	private InventoryRepository inventaryRepository;

	@Override
	public Map<String, Object> findAll() {
		Map<String, Object> resp = new HashMap<String, Object>();
		try {
			List<InventoryEntity> inventories = inventaryRepository.findAll();
			if (!inventories.isEmpty())
				resp.put("data", inventories);
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
			Optional<InventoryEntity> inventory = inventaryRepository.findById(id);
			if (inventory.isPresent())
				resp.put("data", inventory.get());
			else
				resp.put("error", "Requested author not found");
		} catch (Exception e) {
			e.printStackTrace();
		}
		return resp;
	}

	@Override
	public Map<String, Object> save(InventoryEntity inventory) {
		Map<String, Object> resp = new HashMap<String, Object>();
		try {
			InventoryEntity inventoryTemp = inventaryRepository.save(inventory);
			if (inventoryTemp != null)
				resp.put("data", inventoryTemp);
			else
				resp.put("error", "An unexpected error occurred at the time of entering the author");
		} catch (Exception e) {
			e.printStackTrace();
		}
		return resp;
	}

	@Override
	public ByteArrayInputStream download(List<InventoryEntity> inventories, int fileType) {
		final ByteArrayOutputStream outStream = new ByteArrayOutputStream();
		try {
			final String[] headers = { "#", "Book", "Gnere", "Author", "Price", "Quantity" };
			// The document type is defined
			switch (fileType) {
			// If the value is 1 it is an excel document
			case 1: {
				final Workbook workbook = new XSSFWorkbook();
				final Sheet sheet = workbook.createSheet("Inventory");
				org.apache.poi.ss.usermodel.Row row = sheet.createRow(0);
				org.apache.poi.ss.usermodel.Cell cell = null;

				for (int i = 0; i < headers.length; i++) {
					cell = row.createCell(i);
					cell.setCellValue(headers[i]);
				}

				for (int i = 0; i < inventories.size(); i++) {
					row = sheet.createRow(i + 1);

					cell = row.createCell(0);
					cell.setCellValue(i + 1);
					sheet.autoSizeColumn(0);

					cell = row.createCell(1);
					cell.setCellValue(inventories.get(i).getBook().getName());
					sheet.autoSizeColumn(1);

					cell = row.createCell(2);
					cell.setCellValue(inventories.get(i).getBook().getGenre().getName());
					sheet.autoSizeColumn(2);

					cell = row.createCell(3);
					cell.setCellValue(inventories.get(i).getBook().getAuthor().getName());
					sheet.autoSizeColumn(3);

					cell = row.createCell(4);
					cell.setCellValue(inventories.get(i).getPrice());
					sheet.autoSizeColumn(4);

					cell = row.createCell(5);
					cell.setCellValue(inventories.get(i).getQuantity());
					sheet.autoSizeColumn(5);
				}

				workbook.write(outStream);
				workbook.close();
				break;
			}
			// If the value is 2 it is a pdf document
			case 2: {
				PdfWriter writer = new PdfWriter(outStream);
				PdfDocument pdf = new PdfDocument(writer);
				Document document = new Document(pdf, PageSize.A4, false);

				Table table = new Table(headers.length);
				table.setWidth(UnitValue.createPercentValue(100));

				com.itextpdf.layout.element.Cell indexCell = new com.itextpdf.layout.element.Cell()
						.add(new Paragraph(headers[0]).setBold());
				table.addCell(indexCell);

				com.itextpdf.layout.element.Cell bookCell = new com.itextpdf.layout.element.Cell()
						.add(new Paragraph(headers[1]).setBold());
				table.addCell(bookCell);

				com.itextpdf.layout.element.Cell genreCell = new com.itextpdf.layout.element.Cell()
						.add(new Paragraph(headers[2]).setBold());
				table.addCell(genreCell);

				com.itextpdf.layout.element.Cell authorCell = new com.itextpdf.layout.element.Cell()
						.add(new Paragraph(headers[3]).setBold());
				table.addCell(authorCell);

				com.itextpdf.layout.element.Cell priceCell = new com.itextpdf.layout.element.Cell()
						.add(new Paragraph(headers[4]).setBold());
				table.addCell(priceCell);

				com.itextpdf.layout.element.Cell quantityCell = new com.itextpdf.layout.element.Cell()
						.add(new Paragraph(headers[5]).setBold());
				table.addCell(quantityCell);

				for (int i = 0; i < inventories.size(); i++) {
					indexCell = new com.itextpdf.layout.element.Cell().add(new Paragraph(String.valueOf(i + 1)));
					table.addCell(indexCell);

					bookCell = new com.itextpdf.layout.element.Cell()
							.add(new Paragraph(inventories.get(i).getBook().getName()));
					table.addCell(bookCell);

					genreCell = new com.itextpdf.layout.element.Cell()
							.add(new Paragraph(inventories.get(i).getBook().getGenre().getName()));
					table.addCell(genreCell);

					authorCell = new com.itextpdf.layout.element.Cell()
							.add(new Paragraph(inventories.get(i).getBook().getAuthor().getName()));
					table.addCell(authorCell);

					priceCell = new com.itextpdf.layout.element.Cell()
							.add(new Paragraph(String.valueOf(inventories.get(i).getPrice())));
					table.addCell(priceCell);

					quantityCell = new com.itextpdf.layout.element.Cell()
							.add(new Paragraph(String.valueOf(inventories.get(i).getQuantity())));
					table.addCell(quantityCell);
				}

				document.add(table);
				document.close();
				break;
			}
			}
			outStream.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ByteArrayInputStream(outStream.toByteArray());
	}
}
