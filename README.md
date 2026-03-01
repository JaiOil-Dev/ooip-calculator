# OOIP & Reserves Calculator

**Tool #2 - Petroleum Engineering Portfolio by Jainer Campo**

[![Live App](https://img.shields.io/badge/Live%20App-GitHub%20Pages-2E75B6?style=for-the-badge&logo=github)](https://JaiOil-Dev.github.io/ooip-calculator/)
[![Portfolio](https://img.shields.io/badge/Portfolio%20Tool%20%231-DCA%20Pro-1B3A5C?style=for-the-badge)](https://JaiOil-Dev.github.io/dca-app/)

---

## Overview

A professional browser-based tool for calculating **Original Oil In Place (OOIP)** and **recoverable reserves** using the standard petroleum engineering volumetric equation. Designed as a portfolio tool demonstrating volumetric estimation skills, with specific application to Venezuelan extra-heavy oil (Orinoco Belt).

---

## Volumetric Equation

```
OOIP (STB) = ( 7758 x A x h x phi x (1 - Sw) ) / Bo
```

| Symbol | Parameter                     | Unit           |
|--------|-------------------------------|----------------|
| A      | Reservoir area                | acres          |
| h      | Net pay thickness             | feet           |
| phi    | Porosity                      | fraction       |
| Sw     | Water saturation              | fraction       |
| Bo     | Oil formation volume factor   | res bbl / STB  |

The constant **7758** is the unit conversion factor (bbl/acre-ft).

Results are displayed in both **STB** and **MMSTB** (millions of stock tank barrels).

---

## Features

- Real-time OOIP and reserves calculation (updates as you type)
- 1P / 2P / 3P Reserves with SPE-classified badges (Proved / Proved+Probable / Proved+Probable+Possible)
- Gross revenue commercial summary at user-defined oil price
- Sensitivity analysis with Recharts bar chart and Key Uncertainty highlight
- Contextual [?] tooltips on every input parameter
- **Orinoco Mode** - loads Venezuelan extra-heavy oil parameters instantly

---

## Orinoco Mode

Click **Orinoco Mode** to auto-fill all inputs with typical Faja del Orinoco parameters:

| Parameter        | Value      |
|-----------------|------------|
| Area             | 50,000 ac  |
| Net Pay          | 80 ft      |
| Porosity         | 32%        |
| Water Saturation | 15%        |
| Bo               | 1.05       |
| RF Low (P90)     | 8%         |
| RF Best (P50)    | 35%        |
| RF High (P10)    | 55%        |
| Oil Price        | $65/bbl    |

Label: Orinoco Belt, Venezuela - Extra-Heavy Oil (8-10 deg API, ~50,000 cP viscosity)

This feature demonstrates Jainer Campo's expertise in Venezuelan heavy oil reservoir characterization.

---

## How to Use

1. Enter reservoir parameters in the **left panel**
2. View OOIP and reserves in the **center panel** - results update as you type
3. Review the **sensitivity analysis** in the right panel
4. Click **Orinoco Mode** to instantly load Venezuelan extra-heavy oil parameters
5. Hover the **[?]** icons for engineering explanations

---

## Tech Stack

- **React + Vite** - fast build tooling
- **Tailwind CSS** - utility-first styling
- **Recharts** - responsive bar chart for sensitivity analysis
- **GitHub Actions** - automated CI/CD to GitHub Pages

---

## Validation Test

- Area: 100 ac | Net Pay: 50 ft | Porosity: 30% | Water Sat: 20% | Bo: 1.05 | RF P50: 35%
- **OOIP** = (7758 x 100 x 50 x 0.30 x 0.80) / 1.05 = **8,866,286 STB = 8.87 MMSTB**
- **2P Reserves** = 8.87 x 0.35 = **3.10 MMSTB**

---

## About the Author

**Jainer Campo** - Petroleum Engineer
BSc, IUP Santiago Marino
Specialization: Venezuelan extra-heavy oil, Orinoco Belt reservoir characterization, decline curve analysis

### Portfolio Tools
- **Tool #1:** [DCA Pro - Decline Curve Analysis](https://JaiOil-Dev.github.io/dca-app/)
- **Tool #2:** [OOIP & Reserves Calculator](https://JaiOil-Dev.github.io/ooip-calculator/) <- you are here

---

*Built with love for the petroleum engineering community.*
