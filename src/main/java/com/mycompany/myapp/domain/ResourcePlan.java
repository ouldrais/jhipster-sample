package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A ResourcePlan.
 */
@Entity
@Table(name = "resource_plan")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ResourcePlan implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "availability")
    private Boolean availability;

    @JsonIgnoreProperties(value = { "resourceTraining", "resourcePlan", "team" }, allowSetters = true)
    @OneToOne(fetch = FetchType.LAZY, mappedBy = "resourcePlan")
    private Resource resource;

    @JsonIgnoreProperties(value = { "positionRequirement", "resourcePlan", "department" }, allowSetters = true)
    @OneToOne(fetch = FetchType.LAZY, mappedBy = "resourcePlan")
    private Position position;

    @JsonIgnoreProperties(value = { "teamPlan", "shiftDemand", "resourcePlan" }, allowSetters = true)
    @OneToOne(fetch = FetchType.LAZY, mappedBy = "resourcePlan")
    private Shift shift;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public ResourcePlan id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean getAvailability() {
        return this.availability;
    }

    public ResourcePlan availability(Boolean availability) {
        this.setAvailability(availability);
        return this;
    }

    public void setAvailability(Boolean availability) {
        this.availability = availability;
    }

    public Resource getResource() {
        return this.resource;
    }

    public void setResource(Resource resource) {
        if (this.resource != null) {
            this.resource.setResourcePlan(null);
        }
        if (resource != null) {
            resource.setResourcePlan(this);
        }
        this.resource = resource;
    }

    public ResourcePlan resource(Resource resource) {
        this.setResource(resource);
        return this;
    }

    public Position getPosition() {
        return this.position;
    }

    public void setPosition(Position position) {
        if (this.position != null) {
            this.position.setResourcePlan(null);
        }
        if (position != null) {
            position.setResourcePlan(this);
        }
        this.position = position;
    }

    public ResourcePlan position(Position position) {
        this.setPosition(position);
        return this;
    }

    public Shift getShift() {
        return this.shift;
    }

    public void setShift(Shift shift) {
        if (this.shift != null) {
            this.shift.setResourcePlan(null);
        }
        if (shift != null) {
            shift.setResourcePlan(this);
        }
        this.shift = shift;
    }

    public ResourcePlan shift(Shift shift) {
        this.setShift(shift);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ResourcePlan)) {
            return false;
        }
        return getId() != null && getId().equals(((ResourcePlan) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ResourcePlan{" +
            "id=" + getId() +
            ", availability='" + getAvailability() + "'" +
            "}";
    }
}
