package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.ResourcePlanTestSamples.*;
import static com.mycompany.myapp.domain.ResourceTestSamples.*;
import static com.mycompany.myapp.domain.ResourceTrainingTestSamples.*;
import static com.mycompany.myapp.domain.TeamTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ResourceTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Resource.class);
        Resource resource1 = getResourceSample1();
        Resource resource2 = new Resource();
        assertThat(resource1).isNotEqualTo(resource2);

        resource2.setId(resource1.getId());
        assertThat(resource1).isEqualTo(resource2);

        resource2 = getResourceSample2();
        assertThat(resource1).isNotEqualTo(resource2);
    }

    @Test
    void resourceTrainingTest() throws Exception {
        Resource resource = getResourceRandomSampleGenerator();
        ResourceTraining resourceTrainingBack = getResourceTrainingRandomSampleGenerator();

        resource.setResourceTraining(resourceTrainingBack);
        assertThat(resource.getResourceTraining()).isEqualTo(resourceTrainingBack);

        resource.resourceTraining(null);
        assertThat(resource.getResourceTraining()).isNull();
    }

    @Test
    void resourcePlanTest() throws Exception {
        Resource resource = getResourceRandomSampleGenerator();
        ResourcePlan resourcePlanBack = getResourcePlanRandomSampleGenerator();

        resource.setResourcePlan(resourcePlanBack);
        assertThat(resource.getResourcePlan()).isEqualTo(resourcePlanBack);

        resource.resourcePlan(null);
        assertThat(resource.getResourcePlan()).isNull();
    }

    @Test
    void teamTest() throws Exception {
        Resource resource = getResourceRandomSampleGenerator();
        Team teamBack = getTeamRandomSampleGenerator();

        resource.setTeam(teamBack);
        assertThat(resource.getTeam()).isEqualTo(teamBack);
        assertThat(teamBack.getResource()).isEqualTo(resource);

        resource.team(null);
        assertThat(resource.getTeam()).isNull();
        assertThat(teamBack.getResource()).isNull();
    }
}
