package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A ShiftDemand.
 */
@Entity
@Table(name = "shift_demand")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ShiftDemand implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "count")
    private Long count;

    @JsonIgnoreProperties(value = { "position", "shiftDemand", "jobHistory" }, allowSetters = true)
    @OneToOne(fetch = FetchType.LAZY, mappedBy = "shiftDemand")
    private Department department;

    @JsonIgnoreProperties(value = { "teamPlan", "shiftDemand", "resourcePlan" }, allowSetters = true)
    @OneToOne(fetch = FetchType.LAZY, mappedBy = "shiftDemand")
    private Shift shift;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public ShiftDemand id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCount() {
        return this.count;
    }

    public ShiftDemand count(Long count) {
        this.setCount(count);
        return this;
    }

    public void setCount(Long count) {
        this.count = count;
    }

    public Department getDepartment() {
        return this.department;
    }

    public void setDepartment(Department department) {
        if (this.department != null) {
            this.department.setShiftDemand(null);
        }
        if (department != null) {
            department.setShiftDemand(this);
        }
        this.department = department;
    }

    public ShiftDemand department(Department department) {
        this.setDepartment(department);
        return this;
    }

    public Shift getShift() {
        return this.shift;
    }

    public void setShift(Shift shift) {
        if (this.shift != null) {
            this.shift.setShiftDemand(null);
        }
        if (shift != null) {
            shift.setShiftDemand(this);
        }
        this.shift = shift;
    }

    public ShiftDemand shift(Shift shift) {
        this.setShift(shift);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ShiftDemand)) {
            return false;
        }
        return getId() != null && getId().equals(((ShiftDemand) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ShiftDemand{" +
            "id=" + getId() +
            ", count=" + getCount() +
            "}";
    }
}
