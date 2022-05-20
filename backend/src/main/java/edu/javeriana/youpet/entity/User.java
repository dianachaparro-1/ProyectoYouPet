package edu.javeriana.youpet.entity;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;

@Entity
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@NotNull
	private String username;

	@NotNull
	private String password;

	@NotNull
	private String firstName;

	@NotNull
	private String lastName;

	@NotNull
	private String email;

	@NotNull
	private String document;

	@ManyToOne(fetch = FetchType.LAZY)
	private Role role;

	@ManyToOne(fetch = FetchType.EAGER)
	private DocumentType documentType;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "user")
	private List<Sale> orders;

	public Integer getId() {
		return id;
	}
	
	public void setId(Integer id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public DocumentType getDocumentType() {
		return documentType;
	}

	public void setDocumentType(DocumentType documentType) {
		this.documentType = documentType;
	}

	public String getDocument () {
		return document;
	}

	public void setDocument(String document) {
		this.document = document;
	}

	public Role getRole() {
		return role;
	}
	public void setRole(Role role) {
		this.role = role;
	}
}