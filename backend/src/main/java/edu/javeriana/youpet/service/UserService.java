package edu.javeriana.youpet.service;

import java.util.List;

import edu.javeriana.youpet.entity.User;

public interface UserService {
	public User putUser(User user);

	public List<User> getAllUsers();

	public void deleteUser(Integer id);

	public List<User> findByUsernameOrEmail(String username, String email);

	public User findByUsername(String username);

	public User assignDefaultRole(User user);
}
