package ru.kata.spring.boot_security.demo.repository;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    @Override
    @EntityGraph(attributePaths = {"roles"})
    List<User> findAll();

    Optional<User> findByUsername(String username);

    @EntityGraph(attributePaths = {"roles"})
    Optional<User> findWithRolesByUsername(String username);

    @EntityGraph(attributePaths = {"roles"})
    Optional<User> findWithRolesById(Long id);
}