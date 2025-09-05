import React, { useState, useEffect } from 'react';
import { Download, Upload, Edit3, BarChart3, FileText, Mic, Settings, Eye, Save, ChevronRight, ChevronDown, AlertTriangle, CheckCircle, Clock, DollarSign, TrendingUp } from 'lucide-react';

const AIAuditGenerator = () => {
  const [activeTab, setActiveTab] = useState('discovery');
  const [selectedTier, setSelectedTier] = useState(3);
  const [clientData, setClientData] = useState({
    company: '',
    industry: '',
    employees: '',
    revenue: '',
    techMaturity: 1,
    painPoints: [],
    currentTools: [],
    budget: '',
    timeline: '',
    jurisdiction: 'US'
  });
  
  const [voiceFiles, setVoiceFiles] = useState([]);
  const [mcdaAnalysis, setMcdaAnalysis] = useState(null);
  const [reportPreview, setReportPreview] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [complianceScores, setComplianceScores] = useState(null);

  const tierConfigs = {
    1: {
      name: "Solopreneur Automation Sprint",
      price: "$1,497",
      target: "Solopreneurs & Freelancers",
      turnaround: "48-72 hours",
      features: ["Quick Process Audit", "3-5 No-Code Solutions", "n8n/Zapier Workflows", "ROI Calculator", "12-Page Action Plan"],
      sections: ['discovery', 'voice', 'solutions', 'report']
    },
    2: {
      name: "Small Business Growth Pack", 
      price: "$2,997",
      target: "Small Businesses (5-25 employees)",
      turnaround: "5-7 days",
      features: ["Full Process Mapping", "8-12 Automation Solutions", "MCDA Scoring", "Integration Roadmap", "20-Page Strategic Report"],
      sections: ['discovery', 'voice', 'solutions', 'mcda', 'compliance', 'report']
    },
    3: {
      name: "SMB Transformation Suite",
      price: "$4,997", 
      target: "Medium Businesses (25-100 employees)",
      turnaround: "10-14 days",
      features: ["Complete MCDA Analysis", "Advanced AI Solutions", "Compliance Assessment", "Custom Implementation Plan", "35-Page Executive Report"],
      sections: ['discovery', 'voice', 'solutions', 'mcda', 'compliance', 'editing', 'report']
    }
  };

  // Sample MCDA Solutions Database - Updated for Solopreneurs & SMBs
  const solutionsDatabase = [
    // Quick No-Code Solutions for Solopreneurs
    {
      name: "n8n Workflow Automation",
      category: "No-Code Automation",
      technicalFit: 4.5,
      budgetAlignment: 4.8,
      riskLevel: 4.2,
      strategicImpact: 4.3,
      vendorStability: 4.0,
      implementationMonths: 1,
      estimatedROI: 320,
      description: "Self-hosted workflow automation that connects apps and automates repetitive tasks",
      smbSuitable: true,
      enterpriseSuitable: true,
      quickWin: true,
      budget: "under-5k"
    },
    {
      name: "Zapier Business Automation",
      category: "No-Code Automation", 
      technicalFit: 4.7,
      budgetAlignment: 4.2,
      riskLevel: 4.5,
      strategicImpact: 4.0,
      vendorStability: 4.8,
      implementationMonths: 0.5,
      estimatedROI: 280,
      description: "Connect 5000+ apps to automate workflows without coding",
      smbSuitable: true,
      enterpriseSuitable: true,
      quickWin: true,
      budget: "under-5k"
    },
    {
      name: "Make.com (Integromat) Scenarios",
      category: "No-Code Automation",
      technicalFit: 4.4,
      budgetAlignment: 4.6,
      riskLevel: 4.1,
      strategicImpact: 4.2,
      vendorStability: 4.3,
      implementationMonths: 1,
      estimatedROI: 290,
      description: "Visual platform for designing, building and automating workflows",
      smbSuitable: true,
      enterpriseSuitable: true,
      quickWin: true,
      budget: "under-5k"
    },
    {
      name: "Airtable + Automation",
      category: "Database & Workflow",
      technicalFit: 4.3,
      budgetAlignment: 4.5,
      riskLevel: 4.3,
      strategicImpact: 3.9,
      vendorStability: 4.4,
      implementationMonths: 1,
      estimatedROI: 190,
      description: "Smart database with built-in automations for project and customer management",
      smbSuitable: true,
      enterpriseSuitable: true,
      quickWin: true,
      budget: "under-5k"
    },
    {
      name: "Notion AI Workspace",
      category: "Productivity & AI",
      technicalFit: 4.1,
      budgetAlignment: 4.7,
      riskLevel: 4.4,
      strategicImpact: 3.8,
      vendorStability: 4.2,
      implementationMonths: 0.5,
      estimatedROI: 160,
      description: "All-in-one workspace with AI writing, databases, and automation features",
      smbSuitable: true,
      enterpriseSuitable: false,
      quickWin: true,
      budget: "under-5k"
    },
    {
      name: "Customer Service Chatbot (Intercom/Zendesk)",
      category: "Customer Service",
      technicalFit: 4.0,
      budgetAlignment: 3.8,
      riskLevel: 4.1,
      strategicImpact: 4.2,
      vendorStability: 4.5,
      implementationMonths: 2,
      estimatedROI: 210,
      description: "AI-powered customer support to handle common inquiries automatically",
      smbSuitable: true,
      enterpriseSuitable: true,
      quickWin: false,
      budget: "5k-15k"
    }
  ];

  // MCDA Calculation Function - Updated for Budget-Conscious Solutions
  const calculateMCDA = () => {
    const weights = {
      technicalFit: 0.30,
      budgetAlignment: 0.25,
      riskLevel: 0.20,
      strategicImpact: 0.15,
      vendorStability: 0.10
    };

    const isEnterprise = parseInt(clientData.employees) > 100;
    const budget = clientData.budget;
    
    // Filter solutions based on tier and budget
    let filteredSolutions = solutionsDatabase.filter(solution => {
      if (selectedTier === 1) {
        // Solopreneurs need quick wins under $5k
        return solution.quickWin && solution.budget === "under-5k";
      } else if (selectedTier === 2) {
        // Small businesses can handle up to $15k solutions
        return solution.smbSuitable && (solution.budget === "under-5k" || solution.budget === "5k-15k");
      } else {
        // Medium businesses can handle any solution
        return isEnterprise ? solution.enterpriseSuitable : solution.smbSuitable;
      }
    });

    const scoredSolutions = filteredSolutions.map(solution => {
      const compositeScore = (
        solution.technicalFit * weights.technicalFit +
        solution.budgetAlignment * weights.budgetAlignment +
        solution.riskLevel * weights.riskLevel +
        solution.strategicImpact * weights.strategicImpact +
        solution.vendorStability * weights.vendorStability
      );

      return {
        ...solution,
        compositeScore: parseFloat(compositeScore.toFixed(2)),
        confidence: compositeScore >= 4.0 ? 'High' : compositeScore >= 3.5 ? 'Moderate' : 'Low'
      };
    });

    const maxSolutions = selectedTier === 1 ? 3 : selectedTier === 2 ? 6 : 8;
    const highQualitySolutions = scoredSolutions
      .filter(s => s.compositeScore >= 3.5)
      .sort((a, b) => b.compositeScore - a.compositeScore)
      .slice(0, maxSolutions);

    setMcdaAnalysis({
      solutions: highQualitySolutions,
      portfolioScore: parseFloat((highQualitySolutions.reduce((sum, s) => sum + s.compositeScore, 0) / highQualitySolutions.length).toFixed(2)),
      totalImplementationMonths: Math.max(...highQualitySolutions.map(s => s.implementationMonths)),
      expectedROI: Math.round(highQualitySolutions.reduce((sum, s) => sum + s.estimatedROI, 0) / highQualitySolutions.length),
      riskLevel: highQualitySolutions.every(s => s.confidence === 'High') ? 'Low' : 
                 highQualitySolutions.some(s => s.confidence === 'Low') ? 'High' : 'Moderate'
    });
  };

  // ROI Calculator
  const calculateROI = (solution) => {
    const employees = parseInt(clientData.employees) || 1;
    const avgSalary = 50000; // Adjusted for solopreneurs/SMBs
    const hoursPerWeek = 40;
    const timeSavedPct = 0.20; // Conservative 20%
    
    const hoursSavedWeek = employees * hoursPerWeek * timeSavedPct;
    const hourlyRate = avgSalary / 2080; // 2080 work hours per year
    const weeklySavings = hoursSavedWeek * hourlyRate;
    const annualSavings = weeklySavings * 52;
    
    const implementationCost = selectedTier === 1 ? 3000 : selectedTier === 2 ? 8000 : 25000;
    const roiPercentage = (annualSavings / implementationCost) * 100;

    return {
      hoursSavedWeek: Math.round(hoursSavedWeek),
      annualSavings: Math.round(annualSavings),
      roiPercentage: Math.round(roiPercentage),
      implementationCost
    };
  };

  // Voice File Processing
  const handleVoiceUpload = async (event) => {
    const files = Array.from(event.target.files);
    
    for (const file of files) {
      const processedFile = {
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'processing',
        extractedData: null
      };
      
      setVoiceFiles(prev => [...prev, processedFile]);
      
      try {
        let extractedData = null;
        
        if (file.type.startsWith('audio/') || file.name.match(/\.(mp3|wav|m4a|ogg)$/i)) {
          extractedData = await processAudioFile(file);
        } else if (file.type === 'application/json' || file.name.endsWith('.json')) {
          extractedData = await processJSONFile(file);
        } else if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
          extractedData = await processTextFile(file);
        }
        
        setVoiceFiles(prev => prev.map(f => 
          f.name === file.name ? { ...f, status: 'completed', extractedData } : f
        ));
        
      } catch (error) {
        console.error('Error processing file:', error);
        setVoiceFiles(prev => prev.map(f => 
          f.name === file.name ? { ...f, status: 'error', error: error.message } : f
        ));
      }
    }
  };

  const processAudioFile = async (file) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          painPoints: [
            'Manual data entry taking 3-4 hours daily',
            'Customer service response times too slow',
            'Inventory management is reactive, not predictive',
            'Pricing decisions require too much manual analysis'
          ],
          metrics: { 
            employees: Math.floor(Math.random() * 10) + 1,
            timeSpent: `${Math.floor(Math.random() * 15) + 5} hours/week on manual tasks`,
            currentTools: ['Excel', 'Email', 'Manual processes']
          },
          budget: ['$1,000 - $3,000', '$3,000 - $8,000', '$8,000 - $15,000'][Math.floor(Math.random() * 3)],
          timeline: ['2-4 weeks', '1-2 months', '2-3 months'][Math.floor(Math.random() * 3)],
          source: 'Audio transcription'
        });
      }, 2000 + Math.random() * 3000);
    });
  };

  const processJSONFile = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const jsonData = JSON.parse(e.target.result);
          resolve({
            painPoints: ['Data extracted from meeting notes', 'Process inefficiencies identified'],
            metrics: { employees: 'Not specified', timeSpent: 'Not specified' },
            budget: 'Discussed in meeting',
            timeline: 'To be determined',
            source: 'JSON meeting export'
          });
        } catch (error) {
          reject(new Error('Invalid JSON format'));
        }
      };
      reader.readAsText(file);
    });
  };

  const processTextFile = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const text = e.target.result;
          resolve({
            painPoints: ['Manual processes identified in notes'],
            metrics: { employees: 'See notes', timeSpent: 'See notes' },
            budget: 'Discussed in notes',
            timeline: 'To be determined',
            source: 'Text notes'
          });
        } catch (error) {
          reject(new Error('Error reading text file'));
        }
      };
      reader.readAsText(file);
    });
  };

  const applyVoiceData = (extractedData) => {
    setClientData(prev => ({
      ...prev,
      painPoints: extractedData.painPoints,
      employees: extractedData.metrics.employees,
      budget: extractedData.budget,
      timeline: extractedData.timeline
    }));
  };

  const generateComplianceScores = () => {
    const isEU = clientData.jurisdiction === 'EU';
    const isUS = clientData.jurisdiction === 'US';
    
    if (isEU) {
      setComplianceScores({
        type: 'EU',
        gdprScore: 73,
        aiActScore: 45,
        overallRisk: 58,
        riskTier: 'Moderate',
        recommendations: [
          'Implement GDPR-compliant consent management',
          'Establish AI Act compliance documentation',
          'Create data subject rights response procedures'
        ]
      });
    } else if (isUS) {
      setComplianceScores({
        type: 'US',
        piiScore: 42,
        hipaaScore: clientData.industry?.includes('health') ? 68 : 0,
        overallRisk: clientData.industry?.includes('health') ? 55 : 42,
        riskTier: 'Moderate',
        recommendations: [
          'Enhance PII protection protocols',
          'Implement data breach response procedures',
          'Establish third-party vendor assessments'
        ]
      });
    }
  };

  // Report Generation Function
  const generateReport = () => {
    if (!clientData.company && (!mcdaAnalysis || mcdaAnalysis.solutions.length === 0)) {
      alert('Please complete client discovery and run analysis before generating report.');
      return;
    }

    try {
      const reportData = {
        client: clientData,
        tier: selectedTier,
        tierConfig: tierConfigs[selectedTier],
        analysis: mcdaAnalysis,
        compliance: complianceScores,
        voiceFiles: voiceFiles.filter(f => f.status === 'completed'),
        generatedDate: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })
      };

      const reportHTML = generateReportHTML(reportData);
      
      const blob = new Blob([reportHTML], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `${clientData.company || 'AI-Strategy-Report'}-${tierConfigs[selectedTier].name.replace(/\s+/g, '-')}-${new Date().toISOString().slice(0, 10)}.html`;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(url);
      
      const reportWindow = window.open('', '_blank', 'width=1200,height=800');
      if (reportWindow) {
        reportWindow.document.write(reportHTML);
        reportWindow.document.close();
        reportWindow.focus();
        
        setTimeout(() => {
          if (confirm('Report generated! Would you like to print it now?')) {
            reportWindow.print();
          }
        }, 1000);
      }

    } catch (error) {
      console.error('Report generation error:', error);
      alert('Report generation failed. Please try again or check your browser settings.');
    }
  };

  // HTML Report Generation
  const generateReportHTML = (data) => {
    const { client, tier, tierConfig, analysis, compliance, voiceFiles, generatedDate } = data;
    
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <title>${tierConfig.name} - ${client.company || 'AI Strategy Report'}</title>
        <meta charset="utf-8">
        <style>
            * { box-sizing: border-box; }
            body { 
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
                margin: 0; 
                padding: 30px; 
                color: #333; 
                line-height: 1.6; 
                background: white;
            }
            .header { 
                display: flex; 
                align-items: center; 
                border-bottom: 4px solid #B8860B; 
                padding-bottom: 20px; 
                margin-bottom: 30px; 
            }
            .logo { 
                width: 60px; 
                height: 60px; 
                background: #000; 
                border-radius: 8px; 
                margin-right: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #B8860B;
                font-weight: bold;
                font-size: 24px;
            }
            .company-info h1 { 
                font-size: 28px; 
                font-weight: bold; 
                margin: 0; 
                color: #333;
            }
            .company-info p { 
                color: #B8860B; 
                font-weight: 600; 
                margin: 5px 0 0 0; 
                font-size: 14px;
            }
            .report-title { 
                font-size: 32px; 
                font-weight: bold; 
                margin: 30px 0 10px 0; 
                color: #333;
            }
            .tier-badge {
                background: linear-gradient(135deg, #B8860B, #DAA520);
                color: white;
                padding: 8px 16px;
                border-radius: 20px;
                font-weight: bold;
                display: inline-block;
                margin-bottom: 20px;
            }
            .executive-summary { 
                background: linear-gradient(135deg, #FFF8DC, #F5F5DC); 
                border-left: 5px solid #B8860B; 
                padding: 25px; 
                margin-bottom: 30px; 
                border-radius: 8px; 
            }
            .key-insight { 
                background: #B8860B; 
                color: white; 
                padding: 20px; 
                border-radius: 8px; 
                margin: 20px 0; 
                font-weight: 600; 
            }
            .section { margin: 30px 0; }
            .section h2 { 
                color: #333; 
                border-bottom: 2px solid #B8860B; 
                padding-bottom: 10px; 
                font-size: 24px;
            }
            .solution-grid { 
                display: grid; 
                grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); 
                gap: 20px; 
                margin: 20px 0; 
            }
            .solution-card { 
                border: 2px solid #ddd; 
                border-radius: 12px; 
                padding: 20px; 
                background: #fafafa;
            }
            .solution-name { 
                font-size: 18px; 
                font-weight: bold; 
                color: #333;
            }
            .metrics-grid { 
                display: grid; 
                grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); 
                gap: 15px; 
                margin: 15px 0; 
            }
            .metric { 
                text-align: center; 
                padding: 15px 10px; 
                background: #f9f9f9; 
                border-radius: 8px; 
                border: 1px solid #eee;
            }
            .metric-value { 
                font-size: 20px; 
                font-weight: bold; 
                color: #B8860B; 
            }
            .metric-label { 
                font-size: 12px; 
                color: #666; 
                margin-top: 5px;
            }
            .footer { 
                text-align: center; 
                margin-top: 50px; 
                padding-top: 20px; 
                border-top: 2px solid #ddd; 
                color: #666; 
            }
            @media print { 
                body { margin: 0; padding: 20px; font-size: 12px; }
            }
        </style>
    </head>
    <body>
        <div class="header">
            <div class="logo">SA</div>
            <div class="company-info">
                <h1>SAVVY ANALYTICS</h1>
                <p>Get Savvy with Your Data</p>
            </div>
        </div>

        <div class="tier-badge">${tierConfig.name} - ${tierConfig.price}</div>
        <h1 class="report-title">${tierConfig.name} for ${client.company || 'Your Organization'}</h1>
        <p>Generated: ${generatedDate} | Delivery: ${tierConfig.turnaround}</p>

        <div class="executive-summary">
            <h2>Executive Summary</h2>
            <p>This ${tierConfig.name} provides ${client.company || 'your organization'} with ${tier === 1 ? 'rapid automation solutions' : 'strategic AI implementation guidance'} tailored for ${tierConfig.target.toLowerCase()}.</p>
            
            ${analysis ? `
            <div class="key-insight">
                <strong>KEY INSIGHT:</strong> ${tier === 1 ? 'Quick automation wins can be deployed in ' + analysis.totalImplementationMonths + ' month(s) with ' + analysis.expectedROI + '% ROI.' : 'Portfolio implementation will deliver ' + analysis.expectedROI + '% ROI while maintaining ' + analysis.riskLevel.toLowerCase() + ' risk.'}
            </div>
            ` : ''}
        </div>

        ${analysis ? `
        <div class="section">
            <h2>${tier === 1 ? 'Quick Automation Solutions' : 'AI Solution Recommendations'}</h2>
            <div class="solution-grid">
                ${analysis.solutions.map((solution, index) => `
                <div class="solution-card">
                    <div class="solution-name">${index + 1}. ${solution.name}</div>
                    <p>${solution.description}</p>
                    <div class="metrics-grid">
                        <div class="metric">
                            <div class="metric-value">${solution.implementationMonths < 1 ? Math.round(solution.implementationMonths * 4) + ' weeks' : solution.implementationMonths + ' month' + (solution.implementationMonths > 1 ? 's' : '')}</div>
                            <div class="metric-label">Timeline</div>
                        </div>
                        <div class="metric">
                            <div class="metric-value">${solution.estimatedROI}%</div>
                            <div class="metric-label">Est. ROI</div>
                        </div>
                    </div>
                </div>
                `).join('')}
            </div>
        </div>
        ` : ''}

        <div class="footer">
            <p><strong>© 2024 Savvy Analytics LLC. All rights reserved.</strong></p>
            <p>Report delivered within ${tierConfig.turnaround} as promised.</p>
        </div>
    </body>
    </html>
    `;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b-4 border-yellow-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-14 h-14 bg-black rounded-lg flex items-center justify-center mr-4 p-2">
                <div className="text-yellow-600 font-bold text-xl">SA</div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">SAVVY ANALYTICS</h1>
                <p className="text-yellow-700 text-sm font-semibold">Get Savvy with Your Data</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <select 
                value={selectedTier} 
                onChange={(e) => setSelectedTier(parseInt(e.target.value))}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600"
              >
                <option value={1}>Tier 1 - {tierConfigs[1].price}</option>
                <option value={2}>Tier 2 - {tierConfigs[2].price}</option>
                <option value={3}>Tier 3 - {tierConfigs[3].price}</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Tier Info Banner */}
          <div className="bg-gradient-to-r from-yellow-700 to-yellow-800 text-white p-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">{tierConfigs[selectedTier].name}</h2>
                <p className="text-yellow-100">{tierConfigs[selectedTier].target} | {tierConfigs[selectedTier].turnaround} delivery</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{tierConfigs[selectedTier].price}</div>
                <div className="text-sm text-yellow-100">per engagement</div>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {tierConfigs[selectedTier].features.map((feature, i) => (
                <span key={i} className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
                  {feature}
                </span>
              ))}
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex space-x-1">
              {tierConfigs[selectedTier].sections.map((section) => {
                const sectionNames = {
                  discovery: 'Client Discovery',
                  voice: 'Voice Processing', 
                  solutions: 'AI Solutions',
                  mcda: 'MCDA Analysis',
                  compliance: 'Compliance',
                  editing: 'Live Editing',
                  report: 'Generate Report'
                };
                
                const icons = {
                  discovery: <FileText className="w-4 h-4" />,
                  voice: <Mic className="w-4 h-4" />,
                  solutions: <BarChart3 className="w-4 h-4" />,
                  mcda: <TrendingUp className="w-4 h-4" />,
                  compliance: <AlertTriangle className="w-4 h-4" />,
                  editing: <Edit3 className="w-4 h-4" />,
                  report: <Download className="w-4 h-4" />
                };

                return (
                  <button
                    key={section}
                    onClick={() => setActiveTab(section)}
                    className={`flex items-center space-x-2 px-4 py-3 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === section
                        ? 'border-yellow-600 text-yellow-700 bg-yellow-50'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {icons[section]}
                    <span>{sectionNames[section]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Client Discovery */}
            {activeTab === 'discovery' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Client Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                      <input
                        type="text"
                        value={clientData.company}
                        onChange={(e) => setClientData(prev => ({ ...prev, company: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600"
                        placeholder="Enter company name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                      <select
                        value={clientData.industry}
                        onChange={(e) => setClientData(prev => ({ ...prev, industry: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600"
                      >
                        <option value="">Select industry</option>
                        <option value="ecommerce">E-commerce</option>
                        <option value="saas">SaaS</option>
                        <option value="consulting">Consulting</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="finance">Finance</option>
                        <option value="education">Education</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Team Size</label>
                      <select
                        value={clientData.employees}
                        onChange={(e) => setClientData(prev => ({ ...prev, employees: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600"
                      >
                        <option value="">Select team size</option>
                        <option value="1">Solopreneur (Just me)</option>
                        <option value="2-5">2-5 people</option>
                        <option value="6-15">6-15 people</option>
                        <option value="16-50">16-50 people</option>
                        <option value="51-100">51-100 people</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Budget Range</label>
                      <select
                        value={clientData.budget}
                        onChange={(e) => setClientData(prev => ({ ...prev, budget: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600"
                      >
                        <option value="">Select budget</option>
                        <option value="under-1k">Under $1K</option>
                        <option value="1k-3k">$1K - $3K</option>
                        <option value="3k-5k">$3K - $5K</option>
                        <option value="5k-10k">$5K - $10K</option>
                        <option value="over-10k">Over $10K</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Key Pain Points</label>
                  <textarea
                    value={clientData.painPoints.join('\n')}
                    onChange={(e) => setClientData(prev => ({ 
                      ...prev, 
                      painPoints: e.target.value.split('\n').filter(p => p.trim()) 
                    }))}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600"
                    placeholder="Enter each pain point on a new line..."
                  />
                </div>
              </div>
            )}

            {/* Voice Processing */}
            {activeTab === 'voice' && tierConfigs[selectedTier].sections.includes('voice') && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Voice Notes & Meeting Files</h3>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Mic className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-900 mb-2">Upload Voice Notes & Meeting Files</h4>
                    <p className="text-gray-500 mb-4">
                      Supports: Audio files (MP3, WAV, M4A), Meeting transcripts (JSON), Text notes (TXT), Fireflies/Read.ai exports
                    </p>
                    <input
                      type="file"
                      multiple
                      accept=".mp3,.wav,.m4a,.ogg,.json,.txt"
                      onChange={handleVoiceUpload}
                      className="hidden"
                      id="voice-upload"
                    />
                    <label
                      htmlFor="voice-upload"
                      className="inline-flex items-center px-4 py-2 bg-yellow-700 text-white rounded-lg hover:bg-yellow-800 cursor-pointer"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Choose Files
                    </label>
                    <p className="text-xs text-gray-400 mt-2">Maximum 10MB per file</p>
                  </div>

                  {voiceFiles.length > 0 && (
                    <div className="mt-6">
                      <h4 className="font-medium text-gray-900 mb-3">Uploaded Files</h4>
                      <div className="space-y-3">
                        {voiceFiles.map((file, i) => (
                          <div key={i} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium text-gray-900">{file.name}</span>
                              <div className="flex items-center">
                                {file.status === 'processing' && (
                                  <>
                                    <Clock className="w-4 h-4 text-yellow-500 mr-1" />
                                    <span className="text-yellow-600 text-sm">Processing...</span>
                                  </>
                                )}
                                {file.status === 'completed' && (
                                  <>
                                    <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                                    <span className="text-green-600 text-sm">Completed</span>
                                  </>
                                )}
                                {file.status === 'error' && (
                                  <>
                                    <AlertTriangle className="w-4 h-4 text-red-500 mr-1" />
                                    <span className="text-red-600 text-sm">Error</span>
                                  </>
                                )}
                              </div>
                            </div>
                            
                            {file.extractedData && (
                              <div className="bg-gray-50 rounded p-3 mt-2">
                                <h5 className="font-medium text-gray-700 mb-2">Extracted Information:</h5>
                                <div className="text-sm text-gray-600 space-y-2">
                                  <div><strong>Source:</strong> {file.extractedData.source || 'Voice/Note Analysis'}</div>
                                  {file.extractedData.painPoints && (
                                    <div>
                                      <strong>Key Issues:</strong>
                                      <ul className="list-disc list-inside ml-2 mt-1">
                                        {file.extractedData.painPoints.slice(0, 3).map((point, idx) => (
                                          <li key={idx} className="text-xs">{point}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                  {file.extractedData.budget && (
                                    <div><strong>Budget:</strong> {file.extractedData.budget}</div>
                                  )}
                                </div>
                                <button
                                  onClick={() => applyVoiceData(file.extractedData)}
                                  className="mt-3 px-3 py-1 bg-yellow-700 text-white text-sm rounded hover:bg-yellow-800"
                                >
                                  Apply to Client Profile
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* AI Solutions */}
            {activeTab === 'solutions' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {selectedTier === 1 ? 'Quick Automation Solutions' : 'AI Solution Recommendations'}
                  </h3>
                  <button
                    onClick={calculateMCDA}
                    className="px-4 py-2 bg-yellow-700 text-white rounded-lg hover:bg-yellow-800 flex items-center"
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    {selectedTier === 3 ? 'Run MCDA Analysis' : 'Generate Solutions'}
                  </button>
                </div>

                {mcdaAnalysis && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {mcdaAnalysis.solutions.map((solution, i) => {
                      const roi = calculateROI(solution);
                      return (
                        <div key={i} className="border border-gray-200 rounded-lg p-6 hover:border-yellow-600 transition-colors">
                          <div className="flex justify-between items-start mb-4">
                            <h4 className="font-semibold text-gray-900">{solution.name}</h4>
                            {selectedTier >= 2 && (
                              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                                solution.compositeScore >= 4.0 ? 'bg-green-100 text-green-800' :
                                solution.compositeScore >= 3.5 ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {solution.compositeScore}/5.0
                              </div>
                            )}
                          </div>
                          
                          <p className="text-gray-600 mb-4">{solution.description}</p>
                          
                          <div className="bg-gray-50 rounded p-3">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-gray-500">Implementation:</span>
                                <div className="font-medium">
                                  {solution.implementationMonths < 1 ? 
                                    `${Math.round(solution.implementationMonths * 4)} weeks` : 
                                    `${solution.implementationMonths} month${solution.implementationMonths > 1 ? 's' : ''}`
                                  }
                                </div>
                              </div>
                              <div>
                                <span className="text-gray-500">Expected ROI:</span>
                                <div className="font-medium text-green-600">{solution.estimatedROI}%</div>
                              </div>
                              <div>
                                <span className="text-gray-500">Confidence:</span>
                                <div className="font-medium">{solution.confidence}</div>
                              </div>
                              {selectedTier === 1 && (
                                <div>
                                  <span className="text-gray-500">Budget:</span>
                                  <div className="font-medium">Under $5K</div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {!mcdaAnalysis && (
                  <div className="text-center text-gray-500 py-12">
                    <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p>Click "Generate Solutions" to analyze opportunities for your client</p>
                  </div>
                )}
              </div>
            )}

            {/* MCDA Analysis (Tier 2+ Only) */}
            {activeTab === 'mcda' && selectedTier >= 2 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Multi-Criteria Decision Analysis</h3>
                
                {mcdaAnalysis && (
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-yellow-700 to-yellow-800 text-white p-4">
                      <h4 className="font-semibold">Portfolio Analysis Summary</h4>
                    </div>
                    
                    <div className="p-6">
                      <div className="grid grid-cols-4 gap-6 mb-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-yellow-700">{mcdaAnalysis.portfolioScore}</div>
                          <div className="text-sm text-gray-500">Portfolio Score</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-yellow-700">{mcdaAnalysis.totalImplementationMonths}</div>
                          <div className="text-sm text-gray-500">Months Timeline</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-yellow-700">{mcdaAnalysis.expectedROI}%</div>
                          <div className="text-sm text-gray-500">Expected ROI</div>
                        </div>
                        <div className="text-center">
                          <div className={`text-2xl font-bold ${
                            mcdaAnalysis.riskLevel === 'Low' ? 'text-green-600' :
                            mcdaAnalysis.riskLevel === 'Moderate' ? 'text-yellow-600' :
                            'text-red-600'
                          }`}>
                            {mcdaAnalysis.riskLevel}
                          </div>
                          <div className="text-sm text-gray-500">Risk Level</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Compliance Analysis */}
            {activeTab === 'compliance' && tierConfigs[selectedTier].sections.includes('compliance') && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">Compliance Risk Assessment</h3>
                  <button
                    onClick={generateComplianceScores}
                    className="px-4 py-2 bg-yellow-700 text-white rounded-lg hover:bg-yellow-800"
                  >
                    Generate Assessment
                  </button>
                </div>

                {complianceScores && (
                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <AlertTriangle className={`w-6 h-6 mr-2 ${
                        complianceScores.riskTier === 'Low' ? 'text-green-500' :
                        complianceScores.riskTier === 'Moderate' ? 'text-yellow-500' :
                        'text-red-500'
                      }`} />
                      <h4 className="font-semibold text-gray-900">
                        {complianceScores.type} Compliance Risk: {complianceScores.riskTier}
                      </h4>
                    </div>
                    
                    <div className="bg-gray-50 rounded p-4">
                      <h5 className="font-medium text-gray-900 mb-2">Priority Recommendations</h5>
                      <ul className="space-y-1">
                        {complianceScores.recommendations.map((rec, i) => (
                          <li key={i} className="text-sm text-gray-700 flex items-center">
                            <ChevronRight className="w-4 h-4 text-yellow-700 mr-2" />
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Live Editing (Tier 3 Only) */}
            {activeTab === 'editing' && selectedTier === 3 && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">Report Customization</h3>
                  <button
                    onClick={() => setEditMode(!editMode)}
                    className={`px-4 py-2 rounded-lg flex items-center ${
                      editMode 
                        ? 'bg-green-500 text-white hover:bg-green-600' 
                        : 'bg-yellow-700 text-white hover:bg-yellow-800'
                    }`}
                  >
                    {editMode ? <Save className="w-4 h-4 mr-2" /> : <Edit3 className="w-4 h-4 mr-2" />}
                    {editMode ? 'Save Changes' : 'Enable Editing'}
                  </button>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <h4 className="font-medium text-gray-900 mb-4">Content Customization</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Report Title</label>
                      <input
                        type="text"
                        defaultValue="Strategic AI Implementation Plan"
                        disabled={!editMode}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 disabled:bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Executive Summary</label>
                      <textarea
                        rows={4}
                        disabled={!editMode}
                        defaultValue="This strategic analysis provides your organization with actionable AI implementation guidance tailored to your specific business needs and constraints."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 disabled:bg-gray-50"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Generate Report */}
            {activeTab === 'report' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">Generate Professional Report</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setReportPreview(!reportPreview)}
                      className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 flex items-center"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      {reportPreview ? 'Hide Preview' : 'Preview'}
                    </button>
                    <button
                      className="px-4 py-2 bg-yellow-700 text-white rounded-lg hover:bg-yellow-800 flex items-center"
                      onClick={generateReport}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Generate Report
                    </button>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <h4 className="font-medium text-gray-900 mb-4">Report Summary</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Service Level:</span>
                      <div className="font-medium">{tierConfigs[selectedTier].name}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Delivery Time:</span>
                      <div className="font-medium">{tierConfigs[selectedTier].turnaround}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Solutions Analyzed:</span>
                      <div className="font-medium">{mcdaAnalysis ? mcdaAnalysis.solutions.length : 'Run analysis first'}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Report Pages:</span>
                      <div className="font-medium">{selectedTier === 1 ? '12' : selectedTier === 2 ? '20' : '35'} pages</div>
                    </div>
                  </div>
                </div>

                {reportPreview && (
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 border-b border-gray-200 p-4">
                      <h4 className="font-medium text-gray-900">Report Preview</h4>
                    </div>
                    <div className="p-6 bg-white">
                      <div className="flex items-center mb-6 border-b border-yellow-600 pb-4">
                        <div className="w-14 h-14 bg-black rounded-lg flex items-center justify-center mr-4">
                          <div className="text-yellow-600 font-bold text-xl">SA</div>
                        </div>
                        <div>
                          <h1 className="text-xl font-bold text-gray-900">SAVVY ANALYTICS</h1>
                          <p className="text-yellow-700 text-sm font-semibold">Get Savvy with Your Data</p>
                        </div>
                      </div>

                      <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        {tierConfigs[selectedTier].name} for {clientData.company || 'Your Organization'}
                      </h1>
                      <p className="text-gray-600 mb-6">
                        Delivery: {tierConfigs[selectedTier].turnaround} | Target: {tierConfigs[selectedTier].target}
                      </p>

                      {mcdaAnalysis && (
                        <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 mb-6">
                          <h2 className="font-semibold text-gray-900 mb-2">Executive Summary</h2>
                          <p className="text-gray-700 text-sm">
                            Analysis of {mcdaAnalysis.solutions.length} solutions with portfolio score of {mcdaAnalysis.portfolioScore}/5.0. 
                            Expected {mcdaAnalysis.expectedROI}% ROI over {mcdaAnalysis.totalImplementationMonths} months implementation.
                          </p>
                        </div>
                      )}

                      <div className="text-sm text-gray-500 text-center border-t border-gray-200 pt-4">
                        <p>© 2024 Savvy Analytics LLC. All rights reserved.</p>
                        <p className="mt-1">This is a preview. The full report will contain detailed analysis and recommendations.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAuditGenerator;