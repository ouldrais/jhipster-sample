package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.ResourcePlanTestSamples.*;
import static com.mycompany.myapp.domain.ShiftDemandTestSamples.*;
import static com.mycompany.myapp.domain.ShiftTestSamples.*;
import static com.mycompany.myapp.domain.TeamPlanTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ShiftTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Shift.class);
        Shift shift1 = getShiftSample1();
        Shift shift2 = new Shift();
        assertThat(shift1).isNotEqualTo(shift2);

        shift2.setId(shift1.getId());
        assertThat(shift1).isEqualTo(shift2);

        shift2 = getShiftSample2();
        assertThat(shift1).isNotEqualTo(shift2);
    }

    @Test
    void teamPlanTest() throws Exception {
        Shift shift = getShiftRandomSampleGenerator();
        TeamPlan teamPlanBack = getTeamPlanRandomSampleGenerator();

        shift.setTeamPlan(teamPlanBack);
        assertThat(shift.getTeamPlan()).isEqualTo(teamPlanBack);

        shift.teamPlan(null);
        assertThat(shift.getTeamPlan()).isNull();
    }

    @Test
    void shiftDemandTest() throws Exception {
        Shift shift = getShiftRandomSampleGenerator();
        ShiftDemand shiftDemandBack = getShiftDemandRandomSampleGenerator();

        shift.setShiftDemand(shiftDemandBack);
        assertThat(shift.getShiftDemand()).isEqualTo(shiftDemandBack);

        shift.shiftDemand(null);
        assertThat(shift.getShiftDemand()).isNull();
    }

    @Test
    void resourcePlanTest() throws Exception {
        Shift shift = getShiftRandomSampleGenerator();
        ResourcePlan resourcePlanBack = getResourcePlanRandomSampleGenerator();

        shift.setResourcePlan(resourcePlanBack);
        assertThat(shift.getResourcePlan()).isEqualTo(resourcePlanBack);

        shift.resourcePlan(null);
        assertThat(shift.getResourcePlan()).isNull();
    }
}
