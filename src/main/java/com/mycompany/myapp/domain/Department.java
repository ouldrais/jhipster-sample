package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Department.
 */
@Entity
@Table(name = "department")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Department implements Serializable {

    private static final long serialVersionUID = 1L;

    @Column(name = "key")
    private Long key;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "team")
    private String team;

    @JsonIgnoreProperties(value = { "positionRequirement", "resourcePlan", "department" }, allowSetters = true)
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(unique = true)
    private Position position;

    @JsonIgnoreProperties(value = { "department", "shift" }, allowSetters = true)
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(unique = true)
    private ShiftDemand shiftDemand;

    @JsonIgnoreProperties(value = { "job", "department", "employee" }, allowSetters = true)
    @OneToOne(fetch = FetchType.LAZY, mappedBy = "department")
    private JobHistory jobHistory;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getKey() {
        return this.key;
    }

    public Department key(Long key) {
        this.setKey(key);
        return this;
    }

    public void setKey(Long key) {
        this.key = key;
    }

    public Long getId() {
        return this.id;
    }

    public Department id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTeam() {
        return this.team;
    }

    public Department team(String team) {
        this.setTeam(team);
        return this;
    }

    public void setTeam(String team) {
        this.team = team;
    }

    public Position getPosition() {
        return this.position;
    }

    public void setPosition(Position position) {
        this.position = position;
    }

    public Department position(Position position) {
        this.setPosition(position);
        return this;
    }

    public ShiftDemand getShiftDemand() {
        return this.shiftDemand;
    }

    public void setShiftDemand(ShiftDemand shiftDemand) {
        this.shiftDemand = shiftDemand;
    }

    public Department shiftDemand(ShiftDemand shiftDemand) {
        this.setShiftDemand(shiftDemand);
        return this;
    }

    public JobHistory getJobHistory() {
        return this.jobHistory;
    }

    public void setJobHistory(JobHistory jobHistory) {
        if (this.jobHistory != null) {
            this.jobHistory.setDepartment(null);
        }
        if (jobHistory != null) {
            jobHistory.setDepartment(this);
        }
        this.jobHistory = jobHistory;
    }

    public Department jobHistory(JobHistory jobHistory) {
        this.setJobHistory(jobHistory);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Department)) {
            return false;
        }
        return getId() != null && getId().equals(((Department) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Department{" +
            "id=" + getId() +
            ", key=" + getKey() +
            ", team='" + getTeam() + "'" +
            "}";
    }
}
