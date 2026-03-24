package ru.kata.spring.boot_security.demo.dto;

import java.util.Set;

public class UserResponseDto {

    private Long id;
    private String firstName;
    private String lastName;
    private int age;
    private String username;
    private Set<RoleDto> roles;

    public UserResponseDto() {
    }

    public UserResponseDto(Long id, String firstName, String lastName, int age, String username, Set<RoleDto> roles) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.username = username;
        this.roles = roles;
    }

    public Long getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public int getAge() {
        return age;
    }

    public String getUsername() {
        return username;
    }

    public Set<RoleDto> getRoles() {
        return roles;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setRoles(Set<RoleDto> roles) {
        this.roles = roles;
    }
}