package com.onehee.flos.auth.model.dto;

import com.onehee.flos.model.entity.Member;
import com.onehee.flos.model.entity.type.ProviderType;
import com.onehee.flos.model.entity.type.RoleType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.List;

@Getter
public class MemberDetails extends User {

    private final Long id;

    private final String email;

    private final String nickname;

    private final String password;

    private final RoleType roleType;

    private final ProviderType providerType;

    private final String picture;

    public MemberDetails(Member member) {
        super(member.getId().toString(), member.getPassword(), member.getRoleType() == RoleType.ADMIN ? List.of(new SimpleGrantedAuthority("USER"), new SimpleGrantedAuthority("ADMIN")) : List.of(new SimpleGrantedAuthority("USER")));
        this.id = member.getId();
        this.email = member.getEmail();
        this.nickname = member.getNickname();
        this.password = member.getPassword();
        this.roleType = member.getRoleType();
        this.providerType = member.getProviderType();
        this.picture = member.getPicture();
    }

}
