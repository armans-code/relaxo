package com.backend.server.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "journal")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EntryEntity extends BaseEntity {
    @Column(name = "content")
    private String content;

    @Column(name = "sentient")
    private double sentient;

    @ManyToOne
    @JoinColumn(name = "account_id", nullable = false)
    private AccountEntity account;
}
