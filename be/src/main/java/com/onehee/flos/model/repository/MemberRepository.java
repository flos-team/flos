package com.onehee.flos.model.repository;

import com.onehee.flos.model.entity.Member;
import com.onehee.flos.model.entity.type.ProviderType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    boolean existsByEmailAndProviderType(String email, ProviderType providerType);

    Member findByEmailAndProviderType(String email, ProviderType providerType);

    Optional<Member> findByEmailAndPassword(String email, String password);

}
