package com.onehee.flos.util;

import com.onehee.flos.auth.model.dto.MemberDetails;
import com.onehee.flos.model.entity.Member;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;

public class SecurityManager {
    public static Member getCurrentMember() {
        MemberDetails memberDetails = (MemberDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return memberDetails.getMember();
    }

    public static void main(String[] args) {
        PasswordEncoder passwordEncoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
        System.out.println(passwordEncoder.encode("tjdxo1234"));
        System.out.println(passwordEncoder.encode("dnsckd1234"));
        System.out.println(passwordEncoder.encode("dnjsgml1234"));
        System.out.println(passwordEncoder.encode("wngk1234"));
        System.out.println(passwordEncoder.encode("wlghks1234"));
        System.out.println(passwordEncoder.encode("qjarb1234"));
    }
}
