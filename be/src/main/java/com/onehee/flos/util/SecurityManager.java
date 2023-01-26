package com.onehee.flos.util;

import com.onehee.flos.auth.model.dto.MemberDetails;
import com.onehee.flos.model.entity.Member;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class SecurityManager {

    public Member getCurrentMember() {
        MemberDetails memberDetails = (MemberDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return memberDetails.getMember();
    }

}
