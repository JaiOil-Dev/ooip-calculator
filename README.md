# OOIP & Reserves Calculator

A professional browser-based tool for calculating Original Oil In Place (OOIP) 
and recoverable reserves using the standard petroleum engineering volumetric 
equation. Designed as a portfolio tool demonstrating volumetric estimation 
skills, with specific application to Venezuelan extra-heavy oil (Orinoco Belt).

## Volumetric Equation

OOIP (STB) = ( 7758 × A × h × φ × (1 - Sw) ) / Bo

| Symbol | Parameter | Unit |
|--------|-----------|------|
| A | Reservoir area | acres |
| h | Net pay thickness | feet |
| φ | Porosity | fraction |
| Sw | Water saturation | fraction |
| Bo | Oil formation volume factor | res bbl/STB |

The constant 7758 converts acre-feet to barrels.

## Features

- Real-time OOIP and reserves calculation
- 1P / 2P / 3P Reserves with SPE-classified badges
- Simplified NPV with royalty, OPEX, CAPEX, and discount rate
- Economic limit check — flags uneconomic conditions automatically
- Dynamic RF slider for boardroom scenario demonstrations
- Sensitivity analysis with Key Uncertainty identification
- Contextual [?] tooltips on every parameter
- Orinoco Mode — loads Venezuelan extra-heavy oil parameters instantly

## Orinoco Mode

Loads typical Faja del Orinoco parameters:

| Parameter | Value |
|-----------|-------|
| Area | 50,000 acres |
| Net Pay | 80 ft |
| Porosity | 32% |
| Water Saturation | 15% |
| Bo | 1.05 |
| RF Low (P90) | 8% |
| RF Best (P50) | 35% |
| RF High (P10) | 55% |
| Oil Price | $65/bbl |

*Orinoco Belt, Venezuela — Extra-Heavy Oil (8-10° API, ~50,000 cP viscosity)*

## Validation Test

- Area: 100 ac | Net Pay: 50 ft | Porosity: 30% | Sw: 20% | Bo: 1.05
- OOIP = (7758 × 100 × 50 × 0.30 × 0.80) / 1.05 = **8,866,286 STB = 8.87 MMSTB**
- 2P Reserves at 35% RF = **3.10 MMSTB**

## Tech Stack

React · Vite · Tailwind CSS · Recharts · GitHub Actions · GitHub Pages

## Live Application

🔗 https://JaiOil-Dev.github.io/ooip-calculator/

## About

Built by Jainer M. · Petroleum Engineer  
Specialization: Venezuelan extra-heavy oil, Orinoco Belt reservoir 
characterization, decline curve analysis

## Portfolio

- Tool #1: [DCA Pro — Decline Curve Analysis](https://JaiOil-Dev.github.io/dca-app/)
- Tool #2: OOIP & Reserves Calculator ← you are here
