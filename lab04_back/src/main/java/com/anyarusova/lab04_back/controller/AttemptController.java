package com.anyarusova.lab04_back.controller;

import com.anyarusova.lab04_back.model.Attempt;
import com.anyarusova.lab04_back.model.AttemptDTO;
import com.anyarusova.lab04_back.model.ResponseDTO;
import com.anyarusova.lab04_back.services.AttemptService;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.List;

@RestController
@CrossOrigin
public class AttemptController {

    @Autowired
    private AttemptService service;

    private Gson gson = new Gson();

    @PostMapping(path="/attempt", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin
    public String createAttempt(@RequestBody AttemptDTO attemptDTO) {
        Attempt attempt = service.createAttempt(attemptDTO);
        ResponseDTO resp;
        if (attempt != null) {
            attempt.setUser(null);
            resp = new ResponseDTO(200, "Attempt was added", attempt);
        } else {
            resp = new ResponseDTO(400, "Attempt not created. Incorrect user", null);
        }
        return gson.toJson(resp);
    }

    @GetMapping("/attempts")
    @CrossOrigin
    public String getAllAttempts(@RequestHeader(HttpHeaders.AUTHORIZATION) String jwtToken, @PageableDefault(value=5, page=0) Pageable pageable) {
        // List<Attempt> attempt = service.getAllAttempts(jwtToken);
        Page<Attempt> page = service.findAll(jwtToken, pageable);
        List<Attempt> attempt = page.getContent();
        ResponseDTO resp;
        if (attempt != null) {
            for(Attempt a : attempt) {
                a.setUser(null);
            }
            resp = new ResponseDTO(200, "", attempt);
        } else {
            resp = new ResponseDTO(400, "Incorrect user", null);

        }
        return gson.toJson(resp);
    }

    @DeleteMapping("/attempts")
    @CrossOrigin
    public String deleteAllAttempts(@RequestHeader(HttpHeaders.AUTHORIZATION) String jwtToken) {
        boolean result = service.deleteAllAttempts(jwtToken);
        ResponseDTO resp;
        if (result) {
            resp = new ResponseDTO(200, "All attempts were deleted", null);
        } else {
            resp = new ResponseDTO(400, "Incorrect user", null);
        }
        return gson.toJson(resp);
    }

    @GetMapping("/attempts/number")
    @CrossOrigin
    public String getNumberOfAllAttempts(@RequestHeader(HttpHeaders.AUTHORIZATION) String jwtToken) {
        Integer number = service.getNumberOfAllAttempts(jwtToken);
        ResponseDTO resp;
        if (number != null) {
            resp = new ResponseDTO(200, "", number);
        } else {
            resp = new ResponseDTO(400, "Incorrect user", null);
        }
        return gson.toJson(resp);
    }

}
