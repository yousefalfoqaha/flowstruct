package com.yousefalfoqaha.flowsheet.service;

import com.yousefalfoqaha.flowsheet.model.Semester;
import com.yousefalfoqaha.flowsheet.repository.SemesterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SemesterService {

    private final SemesterRepository semesterRepository;

    @Autowired
    public SemesterService(SemesterRepository semesterRepository) {
        this.semesterRepository = semesterRepository;
    }

    public Semester getSemesterById(long semesterId) {
        return semesterRepository
                .findById(semesterId)
                .orElseThrow(() ->
                new RuntimeException("No semester found"));
    }
}
