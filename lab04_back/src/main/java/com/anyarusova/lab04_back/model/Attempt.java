package com.anyarusova.lab04_back.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Date;

@Data
@Entity
public class Attempt {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private float x;
    private float y;
    private float r;
    private String result;
    private Date time;
    private Long script_time;

    @ManyToOne
    private User user;

    @Override
    public String toString() {
        return "Attempt [id=" + id + ", x=" + x + ", y=" + y + ", r=" + r + ", result=" + result + ", date=" + time + ", script_time=" + script_time + "]";
    }

}
