package com.onehee.flos.model.repository;

import com.onehee.flos.model.entity.Member;
import com.onehee.flos.model.entity.type.ProviderType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    boolean existsByEmailAndProviderType(String email, ProviderType providerType);

    boolean existsByNicknameIgnoreCase(String nickName);

    Optional<Member> findByEmailAndProviderType(String email, ProviderType providerType);

    List<Member> findAllByNicknameLikeIgnoreCase(String nickname);

}
