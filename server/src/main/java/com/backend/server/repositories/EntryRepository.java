package com.backend.server.repositories;

import com.backend.server.entities.EntryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface EntryRepository extends JpaRepository<EntryEntity, UUID> {
    @Query(nativeQuery = true, value = "SELECT * FROM entry e WHERE e.account_id = :accountId")
    List<EntryEntity> findAllByAccountId(UUID accountId);
}
