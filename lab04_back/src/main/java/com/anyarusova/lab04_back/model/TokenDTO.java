package com.anyarusova.lab04_back.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TokenDTO {
    private int status;
    private String message;
    private String token;
}