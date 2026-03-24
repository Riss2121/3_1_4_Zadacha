package ru.kata.spring.boot_security.demo.configs;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.repository.RoleRepository;
import ru.kata.spring.boot_security.demo.repository.UserRepository;

import java.util.HashSet;
import java.util.Set;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository,
                           RoleRepository roleRepository,
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        Role adminRole = roleRepository.findByRole("ROLE_ADMIN")
                .orElseGet(() -> roleRepository.save(new Role("ROLE_ADMIN")));

        Role userRole = roleRepository.findByRole("ROLE_USER")
                .orElseGet(() -> roleRepository.save(new Role("ROLE_USER")));

        if (userRepository.findByUsername("admin").isEmpty()) {
            Set<Role> roles = new HashSet<>();
            roles.add(adminRole);
            roles.add(userRole);

            User admin = new User();
            admin.setFirstName("Admin");
            admin.setLastName("Admin");
            admin.setAge(30);
            admin.setUsername("admin");
            admin.setPassword("admin");
            admin.setRoles(roles);

            userRepository.save(admin);
        }

        if (userRepository.findByUsername("user").isEmpty()) {
            Set<Role> roles = new HashSet<>();
            roles.add(userRole);

            User user = new User();
            user.setFirstName("User");
            user.setLastName("User");
            user.setAge(25);
            user.setUsername("user");
            user.setPassword("user");
            user.setRoles(roles);

            userRepository.save(user);
        }
    }
}