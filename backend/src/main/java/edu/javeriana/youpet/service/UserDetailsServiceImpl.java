package edu.javeriana.youpet.service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import edu.javeriana.youpet.entity.User;
import edu.javeriana.youpet.repository.UserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
	private UserRepository userRepository;

	public UserDetailsServiceImpl(UserRepository usuarioRepository) {
		this.userRepository = usuarioRepository;
	}
	
	@Transactional
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User usuario = userRepository.findByUsername(username);

		if (usuario == null) {
			throw new UsernameNotFoundException(username);
		}
		
		List<SimpleGrantedAuthority> roles = getRoles(usuario);

		return new org.springframework.security.core.userdetails.User
				(usuario.getUsername(), usuario.getPassword(), roles);
	}

	private List<SimpleGrantedAuthority> getRoles(User user) {
		List<SimpleGrantedAuthority> roles = new ArrayList<>();
		roles.add(new SimpleGrantedAuthority("ROLE_"+user.getRole().getName()));
		
		return roles;
	}
}
