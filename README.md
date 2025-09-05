# AI Audit Generator App

A comprehensive React-based AI audit generator for Savvy Analytics that helps businesses identify and implement automation solutions through tiered service offerings.

![Savvy Analytics](https://img.shields.io/badge/Savvy%20Analytics-AI%20Audit%20Generator-yellow)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.3.0-38B2AC)
![License](https://img.shields.io/badge/License-Proprietary-red)

## Overview

The AI Audit Generator is a professional tool designed to streamline the process of conducting AI readiness assessments and generating automation recommendations for businesses of all sizes. From solopreneurs to medium-sized businesses, this tool provides tailored solutions based on specific business needs and constraints.

## Features

### 🎯 Three Service Tiers
- **Tier 1 - Solopreneur Automation Sprint** ($1,497)
  - Quick Process Audit
  - 3-5 No-Code Solutions
  - n8n/Zapier Workflows
  - ROI Calculator
  - 12-Page Action Plan
  - 48-72 hours turnaround

- **Tier 2 - Small Business Growth Pack** ($2,997)
  - Full Process Mapping
  - 8-12 Automation Solutions
  - MCDA Scoring
  - Integration Roadmap
  - 20-Page Strategic Report
  - 5-7 days turnaround

- **Tier 3 - SMB Transformation Suite** ($4,997)
  - Complete MCDA Analysis
  - Advanced AI Solutions
  - Compliance Assessment
  - Custom Implementation Plan
  - 35-Page Executive Report
  - 10-14 days turnaround

### 💼 Core Functionality
- **Client Discovery**: Comprehensive intake form for capturing business details
- **Voice Processing**: Support for audio files, JSON exports, and text notes
- **AI Solutions Engine**: Automated recommendation system with ROI calculations
- **MCDA Analysis**: Multi-criteria decision analysis with weighted scoring
- **Compliance Module**: Risk assessment for GDPR, AI Act, and US regulations
- **Report Generation**: Professional HTML reports with dynamic content
- **Live Editing**: Real-time customization of reports (Tier 3)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/marvinmckinneyii0/ai_audit_app.git
cd ai_audit_app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## File Structure

```
ai_audit_app/
├── public/
│   └── index.html          # HTML template
├── src/
│   ├── AIAuditGenerator.jsx # Main React component
│   ├── index.js            # App entry point
│   └── index.css           # Tailwind CSS imports (optional)
├── package.json            # Project dependencies
└── README.md              # This file
```

## Usage

1. **Select Service Tier**: Choose between Tier 1 ($1,497), Tier 2 ($2,997), or Tier 3 ($4,997)
2. **Client Discovery**: Fill in client information including company name, industry, team size, and budget
3. **Voice Processing**: Upload audio files, JSON exports, or text notes
4. **Generate Solutions**: Click to analyze and generate AI automation recommendations
5. **Run Analysis**: For Tier 2+, run MCDA analysis for detailed scoring
6. **Generate Report**: Create and download a professional HTML report

## Technologies Used

- **React 18**: Frontend framework
- **Tailwind CSS**: Styling (via CDN)
- **Lucide React**: Icon library

## Building for Production

To create a production build:

```bash
npm run build
```

This creates an optimized build in the `build` folder ready for deployment.

## Deployment to GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to package.json:
```json
"homepage": "https://marvinmckinneyii0.github.io/ai_audit_app",
"scripts": {
  ...
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

3. Deploy:
```bash
npm run deploy
```

## License

© 2025 Savvy Analytics LLC. All rights reserved.

## Contact

For questions or support, contact Savvy Analytics.
