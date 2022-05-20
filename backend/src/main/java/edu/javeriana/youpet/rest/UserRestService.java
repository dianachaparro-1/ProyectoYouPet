package edu.javeriana.youpet.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.javeriana.youpet.entity.User;
import edu.javeriana.youpet.service.UserService;

@RestController
@RequestMapping("/user")
public class UserRestService {

	@Autowired
	private UserService userService;

	@PostMapping(value = "/signup")
	public User signup(@RequestBody User user) {
		List<User> similarUsers = userService.findByUsernameOrEmail(user.getUsername(), user.getEmail());
		if (similarUsers.size() > 0) {
			throw new RuntimeException("Usuario ya existe");
		} else {
			user = userService.assignDefaultRole(user);
			return userService.putUser(user);
		}
	}

	@PatchMapping(value = "/update")
	public void update(@RequestBody User user) {
		List<User> similarUsers = userService.findByUsernameOrEmail(user.getUsername(), user.getEmail());
		if (similarUsers.size() > 1) {
			throw new RuntimeException("Usuario ya existe");
		} else {
			userService.putUser(user);
		}
	}

	@GetMapping(value = "/getAll", produces = { MediaType.APPLICATION_JSON_VALUE })
	public List<User> getAllUsers() {
		return userService.getAllUsers();
	}

	@GetMapping(value = "/getUsername/{username}", produces = { MediaType.APPLICATION_JSON_VALUE })
	public User getUserByUsername(@PathVariable String username) {
		return userService.findByUsername(username);
	}

	@DeleteMapping(value = "/delete/{id}")
	public void deleteUser(@PathVariable Integer id) {
		userService.deleteUser(id);
	}
}
