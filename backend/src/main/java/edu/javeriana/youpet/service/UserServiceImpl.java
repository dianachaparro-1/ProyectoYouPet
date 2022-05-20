package edu.javeriana.youpet.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import edu.javeriana.youpet.entity.Role;
import edu.javeriana.youpet.entity.User;
import edu.javeriana.youpet.repository.RoleRepository;
import edu.javeriana.youpet.repository.UserRepository;
import edu.javeriana.youpet.util.ObjectNotFoundException;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	BCryptPasswordEncoder bCryptPasswordEncoder;

	@Override
	public User putUser(User user) {
		user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
		userRepository.save(user);
		return user;
	}

	@Override
	public List<User> getAllUsers() {
		return userRepository.findAll();
	}	

	@Override
	public void deleteUser(Integer id) {
		Optional<User> user = userRepository.findById(id);
		if(user.isPresent()) {
			userRepository.delete(user.get());
		} else {
			throw new ObjectNotFoundException(id);
		}
	}

	@Override
	public List<User> findByUsernameOrEmail(String username, String email) {
		return userRepository.findByUsernameOrEmail(username, email);
	}

	@Override
	public User findByUsername(String username) {
		return userRepository.findByUsername(username);
	}

	@Override
	public User assignDefaultRole(User user) {
		Role defaultRole = roleRepository.findById(2);
		user.setRole(defaultRole);
		return user;
	}
}
