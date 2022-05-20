package edu.javeriana.youpet.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.javeriana.youpet.entity.DocumentType;
import edu.javeriana.youpet.repository.DocumentTypeRepository;
import edu.javeriana.youpet.util.ObjectNotFoundException;

@Service
public class DocumentTypeServiceImpl implements DocumentTypeService {

	@Autowired
	private DocumentTypeRepository documentTypeRepository;

	@Override
	public DocumentType putDocumentType(DocumentType documentType) {
		documentTypeRepository.save(documentType);
		return documentType;
	}

	@Override
	public List<DocumentType> getAllDocumentTypes() {
		return documentTypeRepository.findAll();
	}	

	@Override
	public void deleteDocumentType(Integer id) {
		Optional<DocumentType> documentType = documentTypeRepository.findById(id);
		if(documentType.isPresent()) {
			documentTypeRepository.delete(documentType.get());
		} else {
			throw new ObjectNotFoundException(id);
		}
	}
}
