package com.anaboru.springREST.controllers;

import com.anaboru.springREST.models.Role;
import com.anaboru.springREST.models.User;
import com.anaboru.springREST.services.RoleService;
import com.anaboru.springREST.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RequestMapping("/admin")
@RestController
public class AdminRESTController {

    private final UserService userService;
    private final RoleService roleService;

    @Autowired
    public AdminRESTController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping("/all-users")
    public ResponseEntity<List<User>> adminPage() {
        List<User> allUsers = userService.findAll();

        return new ResponseEntity<>(allUsers, HttpStatus.OK);
    }

    @PostMapping("/create-user")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        userService.save(user);

        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PutMapping("/update-user/{id}")
    public ResponseEntity<HttpStatus> updateUser(@RequestBody User user, @PathVariable Long id) {
        userService.update(id, user);

        return ResponseEntity.ok(HttpStatus.OK);
    }

    @DeleteMapping("/delete-user/{id}")
    public ResponseEntity<HttpStatus> deleteUser(@PathVariable Long id) {
        userService.remove(id);

        return ResponseEntity.ok(HttpStatus.OK);
    }

    @GetMapping(value = "/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User userById = userService.findById(id);
        return new ResponseEntity<>(userById, HttpStatus.OK);
    }

    @GetMapping(value = "/get-roles")
    public ResponseEntity<List<Role>> getRoles() {
        List<Role> roles = roleService.getRoles();
        return new ResponseEntity<>(roles, HttpStatus.OK);
    }
}
