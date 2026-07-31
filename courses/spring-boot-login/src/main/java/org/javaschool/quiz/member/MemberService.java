package org.javaschool.quiz.member;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
// 가입과 로그인 확인을 맡습니다.
public class MemberService {

    private final StudyMemberRepository studyMemberRepository;
    private final PasswordEncoder passwordEncoder;

    public MemberService(StudyMemberRepository studyMemberRepository, PasswordEncoder passwordEncoder) {
        this.studyMemberRepository = studyMemberRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public MemberResponse signup(SignupRequest request) {
        if (studyMemberRepository.existsByName(request.name())) {
            throw new MemberNameTakenException(request.name());
        }
        // 원문을 저장하지 않고 해시로 바꿔 넣습니다.
        String passwordHash = passwordEncoder.encode(request.password());
        StudyMember saved = studyMemberRepository.save(StudyMember.join(request.name(), passwordHash));
        return MemberResponse.from(saved);
    }

    @Transactional(readOnly = true)
    public StudyMember login(LoginRequest request) {
        StudyMember member = studyMemberRepository.findByName(request.name())
                .orElseThrow(LoginFailedException::new);
        // 저장된 해시와 방금 받은 비밀번호가 같은 값에서 나왔는지 확인합니다.
        if (!passwordEncoder.matches(request.password(), member.getPasswordHash())) {
            throw new LoginFailedException();
        }
        return member;
    }

    @Transactional(readOnly = true)
    public StudyMember findById(long id) {
        return studyMemberRepository.findById(id).orElseThrow(LoginFailedException::new);
    }
}
