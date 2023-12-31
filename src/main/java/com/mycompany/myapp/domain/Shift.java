package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import java.time.Instant;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Shift.
 */
@Entity
@Table(name = "shift")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Shift implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "key")
    private Long key;

    @Column(name = "shift_start")
    private Instant shiftStart;

    @Column(name = "shift_end")
    private Instant shiftEnd;

    @Column(name = "type")
    private String type;

    @JsonIgnoreProperties(value = { "team", "shift" }, allowSetters = true)
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(unique = true)
    private TeamPlan teamPlan;

    @JsonIgnoreProperties(value = { "department", "shift" }, allowSetters = true)
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(unique = true)
    private ShiftDemand shiftDemand;

    @JsonIgnoreProperties(value = { "resource", "position", "shift" }, allowSetters = true)
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(unique = true)
    private ResourcePlan resourcePlan;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Shift id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getKey() {
        return this.key;
    }

    public Shift key(Long key) {
        this.setKey(key);
        return this;
    }

    public void setKey(Long key) {
        this.key = key;
    }

    public Instant getShiftStart() {
        return this.shiftStart;
    }

    public Shift shiftStart(Instant shiftStart) {
        this.setShiftStart(shiftStart);
        return this;
    }

    public void setShiftStart(Instant shiftStart) {
        this.shiftStart = shiftStart;
    }

    public Instant getShiftEnd() {
        return this.shiftEnd;
    }

    public Shift shiftEnd(Instant shiftEnd) {
        this.setShiftEnd(shiftEnd);
        return this;
    }

    public void setShiftEnd(Instant shiftEnd) {
        this.shiftEnd = shiftEnd;
    }

    public String getType() {
        return this.type;
    }

    public Shift type(String type) {
        this.setType(type);
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public TeamPlan getTeamPlan() {
        return this.teamPlan;
    }

    public void setTeamPlan(TeamPlan teamPlan) {
        this.teamPlan = teamPlan;
    }

    public Shift teamPlan(TeamPlan teamPlan) {
        this.setTeamPlan(teamPlan);
        return this;
    }

    public ShiftDemand getShiftDemand() {
        return this.shiftDemand;
    }

    public void setShiftDemand(ShiftDemand shiftDemand) {
        this.shiftDemand = shiftDemand;
    }

    public Shift shiftDemand(ShiftDemand shiftDemand) {
        this.setShiftDemand(shiftDemand);
        return this;
    }

    public ResourcePlan getResourcePlan() {
        return this.resourcePlan;
    }

    public void setResourcePlan(ResourcePlan resourcePlan) {
        this.resourcePlan = resourcePlan;
    }

    public Shift resourcePlan(ResourcePlan resourcePlan) {
        this.setResourcePlan(resourcePlan);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Shift)) {
            return false;
        }
        return getId() != null && getId().equals(((Shift) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Shift{" +
            "id=" + getId() +
            ", key=" + getKey() +
            ", shiftStart='" + getShiftStart() + "'" +
            ", shiftEnd='" + getShiftEnd() + "'" +
            ", type='" + getType() + "'" +
            "}";
    }
}
