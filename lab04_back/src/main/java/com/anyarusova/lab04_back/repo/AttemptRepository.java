package com.anyarusova.lab04_back.repo;

import com.anyarusova.lab04_back.model.Attempt;
import com.anyarusova.lab04_back.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;


public interface AttemptRepository  extends PagingAndSortingRepository<Attempt, Long> {
    void deleteAllByUser(User user);
    Page<Attempt> findAllByUser(User user, Pageable pageable);

    void save(Attempt attempt);

}
