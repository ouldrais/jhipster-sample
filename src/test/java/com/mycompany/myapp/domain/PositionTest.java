package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.DepartmentTestSamples.*;
import static com.mycompany.myapp.domain.PositionRequirementTestSamples.*;
import static com.mycompany.myapp.domain.PositionTestSamples.*;
import static com.mycompany.myapp.domain.ResourcePlanTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class PositionTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Position.class);
        Position position1 = getPositionSample1();
        Position position2 = new Position();
        assertThat(position1).isNotEqualTo(position2);

        position2.setId(position1.getId());
        assertThat(position1).isEqualTo(position2);

        position2 = getPositionSample2();
        assertThat(position1).isNotEqualTo(position2);
    }

    @Test
    void positionRequirementTest() throws Exception {
        Position position = getPositionRandomSampleGenerator();
        PositionRequirement positionRequirementBack = getPositionRequirementRandomSampleGenerator();

        position.setPositionRequirement(positionRequirementBack);
        assertThat(position.getPositionRequirement()).isEqualTo(positionRequirementBack);

        position.positionRequirement(null);
        assertThat(position.getPositionRequirement()).isNull();
    }

    @Test
    void resourcePlanTest() throws Exception {
        Position position = getPositionRandomSampleGenerator();
        ResourcePlan resourcePlanBack = getResourcePlanRandomSampleGenerator();

        position.setResourcePlan(resourcePlanBack);
        assertThat(position.getResourcePlan()).isEqualTo(resourcePlanBack);

        position.resourcePlan(null);
        assertThat(position.getResourcePlan()).isNull();
    }

    @Test
    void departmentTest() throws Exception {
        Position position = getPositionRandomSampleGenerator();
        Department departmentBack = getDepartmentRandomSampleGenerator();

        position.setDepartment(departmentBack);
        assertThat(position.getDepartment()).isEqualTo(departmentBack);
        assertThat(departmentBack.getPosition()).isEqualTo(position);

        position.department(null);
        assertThat(position.getDepartment()).isNull();
        assertThat(departmentBack.getPosition()).isNull();
    }
}
