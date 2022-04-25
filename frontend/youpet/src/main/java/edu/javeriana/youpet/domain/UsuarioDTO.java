package edu.javeriana.youpet.domain;

public class UsuarioDTO {
	
	private Long id;
	private String username;
	private String contraseña;
	
	public UsuarioDTO() {
		super();
	}

	public UsuarioDTO(String username, String contraseña) {
		super();
		this.username = username;
		this.contraseña = contraseña;
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
	
}
