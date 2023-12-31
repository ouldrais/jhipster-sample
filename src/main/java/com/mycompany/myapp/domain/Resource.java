package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Resource.
 */
@Entity
@Table(name = "resource")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Resource implements Serializable {

    private static final long serialVersionUID = 1L;

    @Column(name = "key")
    private Long key;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "team_role")
    private String teamRole;

    @Column(name = "exchange_allowed")
    private Boolean exchangeAllowed;

    @JsonIgnoreProperties(value = { "resource", "training" }, allowSetters = true)
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(unique = true)
    private ResourceTraining resourceTraining;

    @JsonIgnoreProperties(value = { "resource", "position", "shift" }, allowSetters = true)
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(unique = true)
    private ResourcePlan resourcePlan;

    @JsonIgnoreProperties(value = { "resource", "teamPlan" }, allowSetters = true)
    @OneToOne(fetch = FetchType.LAZY, mappedBy = "resource")
    private Team team;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getKey() {
        return this.key;
    }

    public Resource key(Long key) {
        this.setKey(key);
        return this;
    }

    public void setKey(Long key) {
        this.key = key;
    }

    public Long getId() {
        return this.id;
    }

    public Resource id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return this.firstName;
    }

    public Resource firstName(String firstName) {
        this.setFirstName(firstName);
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return this.lastName;
    }

    public Resource lastName(String lastName) {
        this.setLastName(lastName);
        return this;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getTeamRole() {
        return this.teamRole;
    }

    public Resource teamRole(String teamRole) {
        this.setTeamRole(teamRole);
        return this;
    }

    public void setTeamRole(String teamRole) {
        this.teamRole = teamRole;
    }

    public Boolean getExchangeAllowed() {
        return this.exchangeAllowed;
    }

    public Resource exchangeAllowed(Boolean exchangeAllowed) {
        this.setExchangeAllowed(exchangeAllowed);
        return this;
    }

    public void setExchangeAllowed(Boolean exchangeAllowed) {
        this.exchangeAllowed = exchangeAllowed;
    }

    public ResourceTraining getResourceTraining() {
        return this.resourceTraining;
    }

    public void setResourceTraining(ResourceTraining resourceTraining) {
        this.resourceTraining = resourceTraining;
    }

    public Resource resourceTraining(ResourceTraining resourceTraining) {
        this.setResourceTraining(resourceTraining);
        return this;
    }

    public ResourcePlan getResourcePlan() {
        return this.resourcePlan;
    }

    public void setResourcePlan(ResourcePlan resourcePlan) {
        this.resourcePlan = resourcePlan;
    }

    public Resource resourcePlan(ResourcePlan resourcePlan) {
        this.setResourcePlan(resourcePlan);
        return this;
    }

    public Team getTeam() {
        return this.team;
    }

    public void setTeam(Team team) {
        if (this.team != null) {
            this.team.setResource(null);
        }
        if (team != null) {
            team.setResource(this);
        }
        this.team = team;
    }

    public Resource team(Team team) {
        this.setTeam(team);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Resource)) {
            return false;
        }
        return getId() != null && getId().equals(((Resource) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Resource{" +
            "id=" + getId() +
            ", key=" + getKey() +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", teamRole='" + getTeamRole() + "'" +
            ", exchangeAllowed='" + getExchangeAllowed() + "'" +
            "}";
    }
}
