package com.anyarusova.lab04_back.model;

import lombok.Data;

@Data
public class AttemptDTO {
    private Attempt attempt;
    private String jwtToken;
}