package com.anaboru.springREST.services;

import com.anaboru.springREST.models.User;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService extends UserDetailsService {

    List<User> findAll();

    User findById(Long id);

    void remove(Long id);

    void save(User user);

    void update(Long id, User user);

    User findByUsername(String username);


}
