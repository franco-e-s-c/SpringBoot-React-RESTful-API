package com.crud.crud.domain;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "client")
public class Client {
    @Id
    @GeneratedValue
    private Long id;

    private String name;
    private String email;
}
