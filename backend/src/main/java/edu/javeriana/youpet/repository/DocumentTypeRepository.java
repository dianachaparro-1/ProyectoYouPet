package edu.javeriana.youpet.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import edu.javeriana.youpet.entity.DocumentType;

public interface DocumentTypeRepository extends JpaRepository<DocumentType, Long> {
    Optional<DocumentType> findById(Integer id);
}
