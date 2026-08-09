# Urimai Kaavalan — Government UX

> **Phase:** 2 — UI/UX Design System and User Experience
> **Target Role:** Authorized Government User (Pilot Monitors, State Officials)

---

## 1. UX Goals
- **High-Level Insight:** Government users need aggregate performance data, not individual case management.
- **Data Export & Reporting:** Easy generation of reports suitable for official meetings (e.g., URC meetings).
- **Strict Privacy:** Zero access to unanonymized family PII or case specifics.

## 2. Key Interfaces (Desktop / Tablet)

### 2.1 Pilot Metrics Dashboard (ADM-01)
- **Visualizations:** Bar charts, line graphs, and heatmaps showing:
  - Total cases registered vs. resolved.
  - Average time to lawyer assignment (SLA performance).
  - Legal aid utilization by district.
- **Filters:** View by district, date range, or case category.

### 2.2 AI Governance View
- **Metrics:** Display of AI performance metrics (Override rate, Abstention rate, Citation validation success rate).
- **Purpose:** Demonstrates to government stakeholders that the AI is being safely monitored and controlled by humans.

### 2.3 URC Export Generator
- **Wizard Interface:** Step 1: Select Date Range. Step 2: Select District. Step 3: Download.
- **Format:** Generates standardized CSV/PDF reports compliant with Under Trial Review Committee (URC) formats.

## 3. Integration Status Indicators
- A dedicated panel showing the health of (future) integrations.
- Example: 
  - `ICJS Connector:` [Status: PENDING AUTHORIZATION]
  - `e-Courts API:` [Status: OFFLINE - MANUAL ENTRY ACTIVE]
- This visually reinforces the adapter architecture and sets correct expectations about data sources.
