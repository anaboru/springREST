package com.anaboru.springREST.services;

import com.anaboru.springREST.models.Role;
import com.anaboru.springREST.repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleServiceImp implements RoleService {

    private RoleRepository roleRepository;

    @Autowired
    public void setRoleRepository(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public List<Role> getRoles() {
        return roleRepository.findAll();
    }

    public Role findByRole(String role) {
        return roleRepository.findByRole(role);
    }

    public void save(Role role) {
        roleRepository.save(role);
    }


}
