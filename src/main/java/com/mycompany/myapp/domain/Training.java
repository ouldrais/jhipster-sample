package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Training.
 */
@Entity
@Table(name = "training")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Training implements Serializable {

    private static final long serialVersionUID = 1L;

    @Column(name = "key")
    private Long key;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "description")
    private String description;

    @JsonIgnoreProperties(value = { "training", "position" }, allowSetters = true)
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(unique = true)
    private PositionRequirement positionRequirement;

    @JsonIgnoreProperties(value = { "resource", "training" }, allowSetters = true)
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(unique = true)
    private ResourceTraining resourceTraining;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getKey() {
        return this.key;
    }

    public Training key(Long key) {
        this.setKey(key);
        return this;
    }

    public void setKey(Long key) {
        this.key = key;
    }

    public Long getId() {
        return this.id;
    }

    public Training id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return this.description;
    }

    public Training description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public PositionRequirement getPositionRequirement() {
        return this.positionRequirement;
    }

    public void setPositionRequirement(PositionRequirement positionRequirement) {
        this.positionRequirement = positionRequirement;
    }

    public Training positionRequirement(PositionRequirement positionRequirement) {
        this.setPositionRequirement(positionRequirement);
        return this;
    }

    public ResourceTraining getResourceTraining() {
        return this.resourceTraining;
    }

    public void setResourceTraining(ResourceTraining resourceTraining) {
        this.resourceTraining = resourceTraining;
    }

    public Training resourceTraining(ResourceTraining resourceTraining) {
        this.setResourceTraining(resourceTraining);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Training)) {
            return false;
        }
        return getId() != null && getId().equals(((Training) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Training{" +
            "id=" + getId() +
            ", key=" + getKey() +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
