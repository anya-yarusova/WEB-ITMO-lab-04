package com.anyarusova.lab04_back.repo;

import com.anyarusova.lab04_back.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByLogin(String login);
    User findByJwtToken(String jwtToken);
}
