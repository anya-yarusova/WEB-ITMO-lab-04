package com.anyarusova.lab04_back.services;

import com.anyarusova.lab04_back.model.Attempt;
import com.anyarusova.lab04_back.model.AttemptDTO;
import com.anyarusova.lab04_back.model.User;
import com.anyarusova.lab04_back.repo.AttemptRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;


@Service
public class AttemptService {

    private final AttemptRepository repository;
    private UserService userService;

    @Autowired
    public AttemptService(AttemptRepository repository, UserService userService) {
        this.repository = repository;
        this.userService = userService;
    }

    public Attempt createAttempt(AttemptDTO attemptDTO) {
        long startTime = System.nanoTime();
        User user = userService.getUserByToken(attemptDTO.getJwtToken());
        if (user == null) {
            return null;
        } else {
            Attempt attempt = attemptDTO.getAttempt();
            attempt.setUser(user);
            attempt.setTime(new Date());
            attempt.setResult(checkArea(attempt));
            attempt.setScript_time((System.nanoTime() - startTime) / 1000);
            repository.save(attempt);
            return attempt;
        }
    }

    public List<Attempt> getAllAttempts(String jwtToken) {
        User user = userService.getUserByToken(jwtToken.substring(8, jwtToken.length() - 1));
        if (user == null) {
            return null;
        } else {
            return user.getAttempts();
        }
    }

    @Transactional
    public boolean deleteAllAttempts(String jwtToken) {
        User user = userService.getUserByToken(jwtToken.substring(8, jwtToken.length() - 1));
        if (user == null) {
            return false;
        } else {
            for (Attempt attempt : user.getAttempts()) {
                repository.deleteAllByUser(attempt.getUser());
            }
            user.getAttempts().clear();
            userService.updateUser(user);
            return true;
        }
    }

    public Page<Attempt> findAll(String jwtToken, Pageable pageable) {
        User user = userService.getUserByToken(jwtToken.substring(8, jwtToken.length() - 1));
        if (user == null) {
            return null;
        } else {
            return repository.findAllByUser(user, pageable);
        }
    }

    public Integer getNumberOfAllAttempts(String jwtToken) {
        User user = userService.getUserByToken(jwtToken.substring(8, jwtToken.length() - 1));
        if (user == null) {
            return null;
        } else {
            return user.getAttempts().size();
        }
    }

    private static String checkArea(Attempt attempt) {
        boolean res =  (attempt.getX() >= 0 && attempt.getY() >= 0 && attempt.getX() * attempt.getX() + attempt.getY() * attempt.getY() <= attempt.getR() * attempt.getR() / 4) ||
                (attempt.getX() <= 0 && attempt.getY() <= 0 && attempt.getX() >= -attempt.getR()  && attempt.getY() >= -attempt.getR() / 2) ||
                (attempt.getX() >= 0 && attempt.getY() <= 0 && attempt.getY() >= attempt.getX() / 2 - attempt.getR() / 2);
        if (res) {
            return  "HIT";
        } else {
            return "MISS";
        }
    }

}







