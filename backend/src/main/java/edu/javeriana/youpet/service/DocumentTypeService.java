package edu.javeriana.youpet.service;

import java.util.List;

import edu.javeriana.youpet.entity.DocumentType;


public interface DocumentTypeService {
	public DocumentType putDocumentType(DocumentType documentType);

	public List<DocumentType> getAllDocumentTypes();

	public void deleteDocumentType(Integer id);
}
