package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Position.
 */
@Entity
@Table(name = "position")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Position implements Serializable {

    private static final long serialVersionUID = 1L;

    @Column(name = "key")
    private Long key;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "leadership")
    private String leadership;

    @JsonIgnoreProperties(value = { "training", "position" }, allowSetters = true)
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(unique = true)
    private PositionRequirement positionRequirement;

    @JsonIgnoreProperties(value = { "resource", "position", "shift" }, allowSetters = true)
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(unique = true)
    private ResourcePlan resourcePlan;

    @JsonIgnoreProperties(value = { "position", "shiftDemand", "jobHistory" }, allowSetters = true)
    @OneToOne(fetch = FetchType.LAZY, mappedBy = "position")
    private Department department;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getKey() {
        return this.key;
    }

    public Position key(Long key) {
        this.setKey(key);
        return this;
    }

    public void setKey(Long key) {
        this.key = key;
    }

    public Long getId() {
        return this.id;
    }

    public Position id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLeadership() {
        return this.leadership;
    }

    public Position leadership(String leadership) {
        this.setLeadership(leadership);
        return this;
    }

    public void setLeadership(String leadership) {
        this.leadership = leadership;
    }

    public PositionRequirement getPositionRequirement() {
        return this.positionRequirement;
    }

    public void setPositionRequirement(PositionRequirement positionRequirement) {
        this.positionRequirement = positionRequirement;
    }

    public Position positionRequirement(PositionRequirement positionRequirement) {
        this.setPositionRequirement(positionRequirement);
        return this;
    }

    public ResourcePlan getResourcePlan() {
        return this.resourcePlan;
    }

    public void setResourcePlan(ResourcePlan resourcePlan) {
        this.resourcePlan = resourcePlan;
    }

    public Position resourcePlan(ResourcePlan resourcePlan) {
        this.setResourcePlan(resourcePlan);
        return this;
    }

    public Department getDepartment() {
        return this.department;
    }

    public void setDepartment(Department department) {
        if (this.department != null) {
            this.department.setPosition(null);
        }
        if (department != null) {
            department.setPosition(this);
        }
        this.department = department;
    }

    public Position department(Department department) {
        this.setDepartment(department);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Position)) {
            return false;
        }
        return getId() != null && getId().equals(((Position) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Position{" +
            "id=" + getId() +
            ", key=" + getKey() +
            ", leadership='" + getLeadership() + "'" +
            "}";
    }
}
