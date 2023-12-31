package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.PositionRequirementTestSamples.*;
import static com.mycompany.myapp.domain.ResourceTrainingTestSamples.*;
import static com.mycompany.myapp.domain.TrainingTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class TrainingTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Training.class);
        Training training1 = getTrainingSample1();
        Training training2 = new Training();
        assertThat(training1).isNotEqualTo(training2);

        training2.setId(training1.getId());
        assertThat(training1).isEqualTo(training2);

        training2 = getTrainingSample2();
        assertThat(training1).isNotEqualTo(training2);
    }

    @Test
    void positionRequirementTest() throws Exception {
        Training training = getTrainingRandomSampleGenerator();
        PositionRequirement positionRequirementBack = getPositionRequirementRandomSampleGenerator();

        training.setPositionRequirement(positionRequirementBack);
        assertThat(training.getPositionRequirement()).isEqualTo(positionRequirementBack);

        training.positionRequirement(null);
        assertThat(training.getPositionRequirement()).isNull();
    }

    @Test
    void resourceTrainingTest() throws Exception {
        Training training = getTrainingRandomSampleGenerator();
        ResourceTraining resourceTrainingBack = getResourceTrainingRandomSampleGenerator();

        training.setResourceTraining(resourceTrainingBack);
        assertThat(training.getResourceTraining()).isEqualTo(resourceTrainingBack);

        training.resourceTraining(null);
        assertThat(training.getResourceTraining()).isNull();
    }
}
