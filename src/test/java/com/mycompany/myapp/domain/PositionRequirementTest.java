package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.PositionRequirementTestSamples.*;
import static com.mycompany.myapp.domain.PositionTestSamples.*;
import static com.mycompany.myapp.domain.TrainingTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class PositionRequirementTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PositionRequirement.class);
        PositionRequirement positionRequirement1 = getPositionRequirementSample1();
        PositionRequirement positionRequirement2 = new PositionRequirement();
        assertThat(positionRequirement1).isNotEqualTo(positionRequirement2);

        positionRequirement2.setId(positionRequirement1.getId());
        assertThat(positionRequirement1).isEqualTo(positionRequirement2);

        positionRequirement2 = getPositionRequirementSample2();
        assertThat(positionRequirement1).isNotEqualTo(positionRequirement2);
    }

    @Test
    void trainingTest() throws Exception {
        PositionRequirement positionRequirement = getPositionRequirementRandomSampleGenerator();
        Training trainingBack = getTrainingRandomSampleGenerator();

        positionRequirement.setTraining(trainingBack);
        assertThat(positionRequirement.getTraining()).isEqualTo(trainingBack);
        assertThat(trainingBack.getPositionRequirement()).isEqualTo(positionRequirement);

        positionRequirement.training(null);
        assertThat(positionRequirement.getTraining()).isNull();
        assertThat(trainingBack.getPositionRequirement()).isNull();
    }

    @Test
    void positionTest() throws Exception {
        PositionRequirement positionRequirement = getPositionRequirementRandomSampleGenerator();
        Position positionBack = getPositionRandomSampleGenerator();

        positionRequirement.setPosition(positionBack);
        assertThat(positionRequirement.getPosition()).isEqualTo(positionBack);
        assertThat(positionBack.getPositionRequirement()).isEqualTo(positionRequirement);

        positionRequirement.position(null);
        assertThat(positionRequirement.getPosition()).isNull();
        assertThat(positionBack.getPositionRequirement()).isNull();
    }
}
