package edu.javeriana.youpet.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.javeriana.youpet.entity.DocumentType;
import edu.javeriana.youpet.service.DocumentTypeService;

@RestController
@RequestMapping("/documentType")
public class DocumentTypeRestService {

	@Autowired
	private DocumentTypeService documentTypeService;

	@PutMapping(value = "/put")
	public DocumentType putDocumentType(@RequestBody DocumentType documentType) {
		return documentTypeService.putDocumentType(documentType);
	}

	@GetMapping(value = "/getAll", produces = { MediaType.APPLICATION_JSON_VALUE })
	public List<DocumentType> getAllDocumentTypes() {
		return documentTypeService.getAllDocumentTypes();
	}

	@DeleteMapping(value = "/delete/{id}")
	public void deleteDocumentType(@PathVariable Integer id) {
		documentTypeService.deleteDocumentType(id);
	}
}
