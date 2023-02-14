package com.anaboru.springREST.controllers;

import com.anaboru.springREST.models.User;
import com.anaboru.springREST.services.RoleService;
import com.anaboru.springREST.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/user")
public class UserRESTController {

    private final UserService userService;

    @Autowired
    public UserRESTController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/get-user")
    public ResponseEntity<List<User>> userPage(Principal principal) {

        Long id = userService.findByUsername(principal.getName()).getId();
        return new ResponseEntity<>(Collections.singletonList(userService.findById(id)), HttpStatus.OK);
    }
}


