# Urimai Kaavalan — Existing Systems Map

> **Source:** 03-PRD/01_URIMAI_KAAVALAN_GOVERNMENT_PRD.pdf (Sections 2, 18, 35)
> **Phase:** 0 — Governance & Research

---

## Important Disclaimer

Urimai Kaavalan is **not** officially integrated with any government system.
No unofficial scrapers are built or planned.
The adapter architecture requires **formally authorized access** before any integration is implemented.

---

## A. Government Infrastructure

*(Source: PRD Section 2 — research basis; Section 35 — Research Basis & Source Notes)*

### ICJS — Interoperable Criminal Justice System

| Attribute | Detail |
|---|---|
| Owner | Ministry of Home Affairs, Government of India |
| Nature | Internal government infrastructure |
| Reference | https://www.mha.gov.in/en/commoncontent/inter-operable-criminal-justice-system-icjs |
| Access | Internal government; not public |
| Urimai Kaavalan relation | Architecture placeholder only; official access required before integration |
| PRD requirement | Adapter architecture; no unofficial scraping; ICJS-native contracts for future interoperability |

### e-Prisons

| Attribute | Detail |
|---|---|
| Owner | Ministry of Home Affairs / State Prison Departments |
| Nature | Internal government infrastructure (prison management) |
| Access | Internal government; not public |
| Urimai Kaavalan relation | Architecture placeholder; prison-side channel will use formal mechanisms only |

### NALSA — National Legal Services Authority

| Attribute | Detail |
|---|---|
| Owner | Government of India (Supreme Court-mandated) |
| Nature | Statutory legal-aid authority |
| Reference | https://nalsa.gov.in/faqs/ |
| Urimai Kaavalan relation | Legal-aid routing aligns with NALSA/SLSA/DLSA processes; no claim of official integration |

### SLSA — State Legal Services Authorities

| Attribute | Detail |
|---|---|
| Owner | State Governments |
| Nature | State-level legal-aid coordination under NALSA |
| Reference (example) | https://chandigarh.nalsa.gov.in/ |
| Urimai Kaavalan relation | DLSA is the routing target for legal-aid assignment |

### DLSA — District Legal Services Authorities

| Attribute | Detail |
|---|---|
| Owner | District Courts / State Governments |
| Nature | District-level legal-aid delivery |
| Urimai Kaavalan relation | Primary legal-aid routing destination; DLSA/SLSA officers are platform users |

---

## B. Public Information Systems

*(Source: PRD Section 2 — research basis)*

### e-Courts / NJDG — National Judicial Data Grid

| Attribute | Detail |
|---|---|
| Nature | Public case-status portal |
| Access | Publicly accessible |
| Urimai Kaavalan relation | Possible data source for public case information; official API/mechanism required |

---

## C. Research Systems Identified

*(Source: PRD Section 2 — research basis; Section 35)*

| System | Type | Relation to Urimai Kaavalan |
|---|---|---|
| IBPS | Research system | Identified in landscape analysis; not integrated |
| NyayaRAG | Legal AI research | Identified in landscape analysis; not integrated |
| NyayaAI | Legal AI research | Identified in landscape analysis; not integrated |
| Nyaya-Sahaya | Student-built analogue | Closest identified comparable; architecture reference only |

---

## D. Urimai Kaavalan

| Attribute | Detail |
|---|---|
| Type | AI-assisted access layer (not government infrastructure) |
| Relationship to A | Eventual formal integration via adapter architecture |
| Relationship to B | May surface publicly accessible information |
| Relationship to C | Independent build; no code reuse assumed |
| Government claim | None — no endorsement or integration claimed until formally obtained |

---

## Integration Architecture Principle

*(Source: PRD Section 18)*

```
Core Case Service
      ↓
Integration Interface (Adapter Layer)
      ↓
ICJS / e-Courts / Prison / Legal-Aid Connectors
(Only when official access is authorized)
```

- **No unofficial scrapers**
- **Documented APIs or approved data-sharing mechanisms only**
- **Manual verified entry where official integration is unavailable**
- **Stable contracts:** CaseRecord, CustodyRecord, CourtRecord, LegalAidRequest, CaseEvent
- **Integration failures must be visible and auditable**
