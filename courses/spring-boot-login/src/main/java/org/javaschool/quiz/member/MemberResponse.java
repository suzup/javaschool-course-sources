package org.javaschool.quiz.member;

import java.time.LocalDate;

// 화면에 공개할 회원 정보입니다. 비밀번호 해시는 넣지 않습니다.
public record MemberResponse(long id, String name, LocalDate joinedAt) {

    public static MemberResponse from(StudyMember member) {
        return new MemberResponse(member.getId(), member.getName(), member.getJoinedAt());
    }
}
