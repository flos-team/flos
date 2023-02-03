package com.onehee.flos.auth.model.dto;

import com.onehee.flos.model.entity.Member;
import com.onehee.flos.model.entity.type.RoleType;
import lombok.Getter;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.List;

@Getter
public class MemberDetails extends User {

    private final Member member;
    public MemberDetails(Member member) {
        super(member.getId().toString(), member.getPassword(), member.getRoleType() == RoleType.ADMIN ? List.of(new SimpleGrantedAuthority("USER"), new SimpleGrantedAuthority("ADMIN")) : List.of(new SimpleGrantedAuthority("USER")));
        this.member = member;
    }

}
