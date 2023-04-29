package com.backend.server.graphql;

import com.backend.server.entities.AccountEntity;
import com.backend.server.entities.EntryEntity;
import com.backend.server.graphql.types.*;
import com.backend.server.repositories.AccountRepository;
import com.backend.server.repositories.EntryRepository;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;
import com.netflix.graphql.dgs.DgsComponent;
import com.netflix.graphql.dgs.DgsMutation;
import com.netflix.graphql.dgs.DgsQuery;
import com.netflix.graphql.dgs.InputArgument;
import org.modelmapper.ModelMapper;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;
import java.util.stream.Collectors;

@DgsComponent
public class DataFetcher {
    ModelMapper modelMapper;
    FirebaseAuth firebaseAuth;
    AccountRepository accountRepository;
    EntryRepository entryRepository;

    public DataFetcher(FirebaseAuth firebaseAuth, ModelMapper modelMapper, AccountRepository accountRepository, EntryRepository entryRepository) {
        this.modelMapper = modelMapper;
        this.firebaseAuth = firebaseAuth;
        this.accountRepository = accountRepository;
        this.entryRepository = entryRepository;
    }

    @DgsQuery
    public List<Account> allAccounts() {
        return accountRepository.findAll().stream().map(
                accountEntity -> modelMapper.map(accountEntity, Account.class))
        .collect(Collectors.toList());
    }

    @DgsQuery
    public Account account(String accountId) {
        return modelMapper.map(
                accountRepository.findById(UUID.fromString(accountId))
                        .orElseThrow(() -> new NoSuchElementException("Account with id " + accountId + " not found.")),
                Account.class);
    }

    @DgsMutation
    public Account createAccount(@InputArgument CreateAccountInput input) {
        AccountEntity accountEntity = accountRepository.save(modelMapper.map(input, AccountEntity.class));
        createAccount(accountEntity.getId(), accountEntity.getEmail(), input.getPassword());
        return modelMapper.map(accountEntity, Account.class);
    }

    @DgsQuery
    public List<Entry> allEntries() {
        return entryRepository.findAll().stream().map(
                entryEntity -> modelMapper.map(entryEntity, Entry.class)
        ).collect(Collectors.toList());
    }

    @DgsQuery
    public Entry entry(@InputArgument String entryId) {
        return modelMapper.map(entryRepository.findById(UUID.fromString(entryId)), Entry.class);
    }

    @DgsQuery
    public List<Entry> entriesByAccount(@InputArgument String accountId) {
        return entryRepository.findAllByAccountId(UUID.fromString(accountId)).stream().map(
                entryEntity -> modelMapper.map(entryEntity, Entry.class)
        ).collect(Collectors.toList());
    }

    @DgsMutation
    public Entry createEntry(@InputArgument CreateEntryInput input) {
        EntryEntity entryEntity = new EntryEntity();
        entryEntity.setAccount(accountRepository.findById(UUID.fromString(input.getAccountId())).orElseThrow(
                    () -> new NoSuchElementException("Account with id " + input.getAccountId() + " not found."))
        );
        entryEntity.setContent(input.getContent());
        entryEntity.setSentient(input.getSentient());
        entryRepository.save(entryEntity);
        return modelMapper.map(entryEntity, Entry.class);
    }

    @DgsMutation
    @Transactional
    public Entry editEntry(@InputArgument EditEntryInput input) {
        EntryEntity entryEntity = entryRepository.findById(UUID.fromString(input.getEntryId())).orElseThrow(
                () -> new NoSuchElementException("Entry with id " + input.getEntryId() + " not found.")
        );
        entryEntity.setContent(input.getContent());
        entryEntity.setSentient(input.getSentient());
        return modelMapper.map(entryEntity, Entry.class);
    }

    public UserRecord createAccount(UUID id, String email, String password) {
        try {
            UserRecord.CreateRequest createRequest = new UserRecord.CreateRequest();
            createRequest.setUid(id.toString());
            createRequest.setEmail(email);
            createRequest.setPassword(password);
            UserRecord userRecord = firebaseAuth.createUser(createRequest);
            return userRecord;
        } catch (FirebaseAuthException e) {
            throw new IllegalArgumentException(e);
        }
    }
}
