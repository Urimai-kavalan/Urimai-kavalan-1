# Urimai Kaavalan — KPIs and Success Metrics

> **Source:** 03-PRD/01_URIMAI_KAAVALAN_GOVERNMENT_PRD.pdf (Sections 30, 31)
> **Phase:** 0 — Governance & Research

---

## Acceptance Criteria

*(Source: PRD Section 30)*

The platform is considered ready for pilot when all of the following are met:

| # | Acceptance Criterion |
|---|---|
| AC-01 | Every major user journey works end-to-end using synthetic data |
| AC-02 | Family can create/find a case and understand its current status |
| AC-03 | Documents can be uploaded, extracted and verified |
| AC-04 | Legal explanations cite approved, versioned sources or abstain |
| AC-05 | Eligibility screening produces explainable advisory signals |
| AC-06 | Human review and override are auditable |
| AC-07 | Legal-aid matching and SLA workflow works |
| AC-08 | Admin dashboards show operational metrics |
| AC-09 | Voice architecture has a tested demo/fallback |
| AC-10 | Security and authorization tests pass |
| AC-11 | Mobile and accessibility tests pass |
| AC-12 | Pilot plan defines stakeholders, training, governance, support and KPIs |

---

## KPIs / Success Metrics

*(Source: PRD Section 31)*

| KPI | Description |
|---|---|
| KPI-01 | Median time from legal-aid request to verified assignment |
| KPI-02 | Percentage of cases successfully routed |
| KPI-03 | Percentage of substantive legal responses with valid citations |
| KPI-04 | Document extraction accuracy on a labelled test set |
| KPI-05 | AI-human disagreement / override rate |
| KPI-06 | False-positive and false-negative rates for any evaluated ML component |
| KPI-07 | SLA breach rate |
| KPI-08 | Notification delivery success rate |
| KPI-09 | Family comprehension / task-completion rate |
| KPI-10 | Voice interaction completion rate |
| KPI-11 | System availability and incident response metrics |

---

## Notes on Measurement

- KPI targets are **not specified in the PRD** — specific thresholds must be defined during Phase 15 (Pilot) in consultation with DLSA stakeholders
- KPI-04 (document extraction accuracy) requires a labelled test set — must be created with synthetic data in Phase 14 (Testing)
- KPI-05 (AI-human disagreement) is a governance metric — high override rates require legal/ethics review
- KPI-06 applies only to ML components — does not apply to Phase 7 rule-based screening
- All KPIs must be measured on synthetic data during development; real pilot KPIs require formal pilot approval

---

## Implementation Phases for KPI Collection

| KPI | First Measurable Phase |
|---|---|
| KPI-01, KPI-02 | Phase 9 (Legal-aid routing) |
| KPI-03 | Phase 8 (Legal RAG) |
| KPI-04 | Phase 14 (Testing) |
| KPI-05, KPI-06 | Phase 8 (Legal RAG) |
| KPI-07 | Phase 9 (Legal-aid routing) |
| KPI-08 | Phase 4 (Case engine) |
| KPI-09 | Phase 2 (UI/UX prototype testing) |
| KPI-10 | Phase 10 (Voice) |
| KPI-11 | Phase 16 (Scale readiness) |
