package edu.javeriana.youpet.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class UsuarioEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String username;
	private String contraseña;
	private Boolean esAdmin;

	public UsuarioEntity() {
	}
	
	public UsuarioEntity(String username, String contraseña) {
		super();
		this.username = username;
		this.contraseña = contraseña;
	}

	public UsuarioEntity(String username, String contraseña, Boolean esAdmin) {
		super();
		this.username = username;
		this.contraseña = contraseña;
		this.esAdmin = esAdmin;
	}

	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getContraseña() {
		return contraseña;
	}

	public void setContraseña(String contraseña) {
		this.contraseña = contraseña;
	}

	public Boolean getEsAdmin() {
		return esAdmin;
	}

	public void setEsAdmin(Boolean esAdmin) {
		this.esAdmin = esAdmin;
	}

}
