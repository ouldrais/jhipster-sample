package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.DepartmentTestSamples.*;
import static com.mycompany.myapp.domain.JobHistoryTestSamples.*;
import static com.mycompany.myapp.domain.PositionTestSamples.*;
import static com.mycompany.myapp.domain.ShiftDemandTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class DepartmentTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Department.class);
        Department department1 = getDepartmentSample1();
        Department department2 = new Department();
        assertThat(department1).isNotEqualTo(department2);

        department2.setId(department1.getId());
        assertThat(department1).isEqualTo(department2);

        department2 = getDepartmentSample2();
        assertThat(department1).isNotEqualTo(department2);
    }

    @Test
    void positionTest() throws Exception {
        Department department = getDepartmentRandomSampleGenerator();
        Position positionBack = getPositionRandomSampleGenerator();

        department.setPosition(positionBack);
        assertThat(department.getPosition()).isEqualTo(positionBack);

        department.position(null);
        assertThat(department.getPosition()).isNull();
    }

    @Test
    void shiftDemandTest() throws Exception {
        Department department = getDepartmentRandomSampleGenerator();
        ShiftDemand shiftDemandBack = getShiftDemandRandomSampleGenerator();

        department.setShiftDemand(shiftDemandBack);
        assertThat(department.getShiftDemand()).isEqualTo(shiftDemandBack);

        department.shiftDemand(null);
        assertThat(department.getShiftDemand()).isNull();
    }

    @Test
    void jobHistoryTest() throws Exception {
        Department department = getDepartmentRandomSampleGenerator();
        JobHistory jobHistoryBack = getJobHistoryRandomSampleGenerator();

        department.setJobHistory(jobHistoryBack);
        assertThat(department.getJobHistory()).isEqualTo(jobHistoryBack);
        assertThat(jobHistoryBack.getDepartment()).isEqualTo(department);

        department.jobHistory(null);
        assertThat(department.getJobHistory()).isNull();
        assertThat(jobHistoryBack.getDepartment()).isNull();
    }
}
