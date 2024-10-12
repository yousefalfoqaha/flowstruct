package com.yousefalfoqaha.flowsheet.service;

import com.yousefalfoqaha.flowsheet.dto.StudentMappingDTO;
import com.yousefalfoqaha.flowsheet.repository.StudentMappingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StudentMappingService {

    private final StudentMappingRepository studentMappingRepository;

    @Autowired
    public StudentMappingService(StudentMappingRepository studentMappingRepository) {
        this.studentMappingRepository = studentMappingRepository;
    }

    public List<StudentMappingDTO> getStudentMappingsByStudentId(long studentId) {
        return studentMappingRepository
                .findAll()
                .stream()
                .filter(m -> m.getStudentId() == studentId)
                .map(m -> new StudentMappingDTO(
                        m.getCourseId(),
                        m.getSemester().getId()
                ))
                .collect(Collectors.toList());
    }
}
