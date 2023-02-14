package com.anaboru.springREST.services;

import com.anaboru.springREST.models.Role;

import java.util.List;

public interface RoleService {

    List<Role> getRoles();


    Role findByRole(String name);

    void save(Role role);
}
