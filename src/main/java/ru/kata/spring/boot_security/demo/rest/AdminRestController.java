package ru.kata.spring.boot_security.demo.rest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.repository.RoleRepository;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.security.Principal;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
public class AdminRestController {

    private final UserService userService;
    private final RoleRepository roleRepository;

    public AdminRestController(UserService userService, RoleRepository roleRepository) {
        this.userService = userService;
        this.roleRepository = roleRepository;
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.findAll());
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.findById(id));
    }

    @GetMapping("/user")
    public ResponseEntity<User> getCurrentAdmin(Principal principal) {
        return ResponseEntity.ok(userService.findByUsername(principal.getName()));
    }

    @PostMapping("/users")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        user.setRoles(resolveRoles(user.getRoles()));
        userService.save(user);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(userService.findByUsername(user.getUsername()));
    }

    @PostMapping("/users/{id}/edit")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) {
        user.setRoles(resolveRoles(user.getRoles()));
        userService.update(id, user);
        return ResponseEntity.ok(userService.findById(id));
    }

    @PostMapping("/users/{id}/delete")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.delete(id);
        return ResponseEntity.ok().build();
    }

    private Set<Role> resolveRoles(Set<Role> roles) {
        return roles.stream()
                .map(role -> roleRepository.findByName(role.getName())
                        .orElseThrow(() -> new RuntimeException("Role not found: " + role.getName())))
                .collect(Collectors.toSet());
    }
}