// CorpSec Mail Scanner - Interactive Demo Script

document.addEventListener('DOMContentLoaded', function() {
    initializeDemo();
    setupEventListeners();
    startAutoAnimations();
});

function initializeDemo() {
    // Initialize scenario data
    window.demoData = {
        scenarios: {
            exact: {
                status: 'exact-match',
                company: {
                    name: 'ABC Corporation Ltd.',
                    registration: '201234567X',
                    contact: 'John Doe (Director)',
                    email: 'john.doe@abccorp.com',
                    address: '123 Business Street, Singapore 123456',
                    lastMail: '10/10/2025',
                    tags: ['Active Client', 'Premium', 'High Priority'],
                    priority: 'high'
                },
                confidence: 100,
                icon: 'fas fa-check-circle',
                title: 'Exact Match Found',
                description: '100% database match'
            },
            partial: {
                status: 'partial-match',
                companies: [
                    {
                        name: 'ABC Corporation Ltd.',
                        match: 95,
                        registration: '201234567X'
                    },
                    {
                        name: 'ABC Holdings Pte Ltd.',
                        match: 87,
                        registration: '201234568Y'
                    },
                    {
                        name: 'ABC Investments Co.',
                        match: 82,
                        registration: '201234569Z'
                    }
                ],
                confidence: 87,
                icon: 'fas fa-search',
                title: 'Partial Matches Found',
                description: 'Multiple similar companies detected'
            },
            none: {
                status: 'no-match',
                confidence: 0,
                icon: 'fas fa-times-circle',
                title: 'No Match Found',
                description: 'Manual company selection required'
            }
        },
        currentScenario: 'exact'
    };

    // Set initial scenario
    updateResultsScreen(window.demoData.scenarios.exact);
}

function setupEventListeners() {
    // Scenario tabs
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const scenario = this.dataset.scenario;
            if (scenario && window.demoData.scenarios[scenario]) {
                switchScenario(scenario);
            }
        });
    });

    // Demo control buttons
    document.querySelectorAll('.control-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.onclick;
            if (!action) {
                // Handle based on button content
                const text = this.textContent.toLowerCase();
                if (text.includes('exact')) {
                    showScenario('exact');
                } else if (text.includes('partial')) {
                    showScenario('partial');
                } else if (text.includes('no match')) {
                    showScenario('none');
                } else if (text.includes('animate')) {
                    animateFlow();
                }
            }
        });
    });

    // Interactive elements
    setupDashboardInteractions();
    setupScanScreenInteractions();
    setupProcessingScreenInteractions();
    setupResultsScreenInteractions();
    setupActionScreenInteractions();
}

function setupDashboardInteractions() {
    // Filter tabs
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.textContent.toLowerCase();
            filterScans(filter);
        });
    });

    // Scan items click
    document.querySelectorAll('.scan-item').forEach(item => {
        item.addEventListener('click', function() {
            // Highlight selected
            document.querySelectorAll('.scan-item').forEach(i => {
                i.style.backgroundColor = 'white';
            });
            this.style.backgroundColor = '#f8f9ff';
            
            // Show details animation
            this.style.transform = 'scale(1.02)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });

    // FAB button
    const fab = document.querySelector('.fab');
    if (fab) {
        fab.addEventListener('click', function() {
            // Simulate navigation to scan screen
            const scanPhone = document.querySelector('[data-step="1"]');
            if (scanPhone) {
                scanPhone.scrollIntoView({ behavior: 'smooth', block: 'center' });
                scanPhone.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    scanPhone.style.transform = 'scale(1)';
                }, 300);
            }
            
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background: rgba(255,255,255,0.6);
                transform: scale(0);
                animation: rippleEffect 0.6s ease-out;
            `;
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    }

    // Stats cards hover effect
    document.querySelectorAll('.stat-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) rotate(2deg)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0deg)';
        });
    });
}

function filterScans(filter) {
    const scanItems = document.querySelectorAll('.scan-item');
    
    scanItems.forEach(item => {
        if (filter === 'all') {
            item.style.display = 'flex';
        } else if (filter === 'pending') {
            const isPending = item.querySelector('.scan-status.pending');
            item.style.display = isPending ? 'flex' : 'none';
        } else if (filter === 'completed') {
            const isCompleted = item.querySelector('.scan-status.completed, .scan-status.sent');
            item.style.display = isCompleted ? 'flex' : 'none';
        }
    });

    // Animate filtered items
    const visibleItems = Array.from(scanItems).filter(item => item.style.display !== 'none');
    visibleItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        setTimeout(() => {
            item.style.transition = 'all 0.3s ease-out';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 50);
    });
}

function setupScanScreenInteractions() {
    const captureBtn = document.querySelector('.capture-btn');
    if (captureBtn) {
        captureBtn.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                // Simulate camera capture effect
                simulateCaptureEffect();
            }, 150);
        });
    }

    // Tool item interactions
    document.querySelectorAll('.tool-item').forEach(item => {
        item.addEventListener('click', function() {
            document.querySelectorAll('.tool-item').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function setupProcessingScreenInteractions() {
    // Add processing progress animation
    const progressSteps = document.querySelectorAll('.step');
    let currentStep = 0;

    function advanceProgress() {
        if (currentStep < progressSteps.length) {
            progressSteps[currentStep].classList.remove('active');
            progressSteps[currentStep].classList.add('completed');
            currentStep++;
            if (currentStep < progressSteps.length) {
                progressSteps[currentStep].classList.add('active');
            }
        }
    }

    // Auto-advance progress every 2 seconds
    setInterval(advanceProgress, 2000);
}

function setupResultsScreenInteractions() {
    // Action buttons
    document.querySelectorAll('.btn-confirm, .btn-manual').forEach(btn => {
        btn.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                if (this.classList.contains('btn-confirm')) {
                    showConfirmationEffect();
                }
            }, 150);
        });
    });
}

function setupActionScreenInteractions() {
    // Toggle switches
    document.querySelectorAll('.option-toggle input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const card = this.closest('.option-card');
            if (this.checked) {
                card.style.borderColor = '#007bff';
                card.style.backgroundColor = '#f8f9ff';
            } else {
                card.style.borderColor = '#e9ecef';
                card.style.backgroundColor = 'white';
            }
        });
    });

    // Template buttons
    document.querySelectorAll('.template-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.template-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            updateEmailTemplate(this.textContent);
        });
    });
}

function simulateCaptureEffect() {
    const cameraContainer = document.querySelector('.camera-container');
    if (cameraContainer) {
        const flash = document.createElement('div');
        flash.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: white;
            opacity: 0;
            pointer-events: none;
            z-index: 100;
        `;
        cameraContainer.appendChild(flash);

        // Flash effect
        flash.style.transition = 'opacity 0.1s';
        flash.style.opacity = '0.8';
        
        setTimeout(() => {
            flash.style.transition = 'opacity 0.3s';
            flash.style.opacity = '0';
            setTimeout(() => {
                if (flash.parentNode) {
                    flash.parentNode.removeChild(flash);
                }
            }, 300);
        }, 100);

        // Add scan completion effect
        setTimeout(() => {
            showScanSuccess();
        }, 500);
    }
}

function showScanSuccess() {
    const tips = document.querySelector('.tips');
    if (tips) {
        const originalContent = tips.innerHTML;
        tips.innerHTML = `
            <i class="fas fa-check-circle" style="color: #28a745;"></i>
            <span style="color: #28a745;">Scan completed successfully!</span>
        `;
        setTimeout(() => {
            tips.innerHTML = originalContent;
        }, 2000);
    }
}

function showConfirmationEffect() {
    const button = document.querySelector('.btn-confirm');
    if (button) {
        const originalContent = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i> Confirmed!';
        button.style.backgroundColor = '#28a745';
        
        setTimeout(() => {
            button.innerHTML = originalContent;
            button.style.backgroundColor = '#28a745';
        }, 2000);
    }
}

function switchScenario(scenarioType) {
    const scenario = window.demoData.scenarios[scenarioType];
    if (scenario) {
        window.demoData.currentScenario = scenarioType;
        updateResultsScreen(scenario);
        updateTabStates(scenarioType);
    }
}

function updateResultsScreen(scenario) {
    const resultsScreen = document.querySelector('.results-screen');
    if (!resultsScreen) return;

    // Update match status
    const matchStatus = resultsScreen.querySelector('.match-status');
    if (matchStatus) {
        matchStatus.className = `match-status ${scenario.status}`;
        
        const statusIcon = matchStatus.querySelector('.status-icon i');
        const statusTitle = matchStatus.querySelector('.status-text h3');
        const statusDesc = matchStatus.querySelector('.status-text p');
        const confidenceBadge = matchStatus.querySelector('.confidence-badge');
        
        if (statusIcon) statusIcon.className = scenario.icon;
        if (statusTitle) statusTitle.textContent = scenario.title;
        if (statusDesc) statusDesc.textContent = scenario.description;
        if (confidenceBadge) confidenceBadge.textContent = scenario.confidence + '%';
    }

    // Update company card based on scenario
    updateCompanyCard(scenario);
}

function updateCompanyCard(scenario) {
    const companyCard = document.querySelector('.company-card');
    if (!companyCard) return;

    if (scenario.status === 'exact-match') {
        // Show single company
        companyCard.style.display = 'block';
        updateSingleCompanyCard(scenario.company);
    } else if (scenario.status === 'partial-match') {
        // Show multiple companies
        companyCard.style.display = 'block';
        updateMultipleCompaniesCard(scenario.companies);
    } else if (scenario.status === 'no-match') {
        // Show manual selection interface
        companyCard.style.display = 'none';
        showManualSelectionInterface();
    }
}

function updateSingleCompanyCard(company) {
    const companyCard = document.querySelector('.company-card');
    if (!companyCard) return;

    companyCard.innerHTML = `
        <div class="company-header">
            <div class="company-logo">
                <i class="fas fa-building"></i>
            </div>
            <div class="company-info">
                <h3>${company.name}</h3>
                <p>Registration: ${company.registration}</p>
            </div>
            <div class="priority-flag ${company.priority}">
                <i class="fas fa-flag"></i>
            </div>
        </div>
        
        <div class="company-details">
            <div class="detail-row">
                <i class="fas fa-map-marker-alt"></i>
                <span>${company.address}</span>
            </div>
            <div class="detail-row">
                <i class="fas fa-user"></i>
                <span>Contact: ${company.contact}</span>
            </div>
            <div class="detail-row">
                <i class="fas fa-envelope"></i>
                <span>${company.email}</span>
            </div>
            <div class="detail-row">
                <i class="fas fa-calendar"></i>
                <span>Last mail: ${company.lastMail}</span>
            </div>
        </div>

        <div class="tags">
            ${company.tags.map(tag => {
                const className = tag.toLowerCase().replace(/\s+/g, '-');
                return `<span class="tag ${className}">${tag}</span>`;
            }).join('')}
        </div>
    `;
}

function updateMultipleCompaniesCard(companies) {
    const companyCard = document.querySelector('.company-card');
    if (!companyCard) return;

    companyCard.innerHTML = `
        <div class="multiple-matches">
            <h3 style="margin-bottom: 15px; color: #2c3e50;">Select Company:</h3>
            ${companies.map((company, index) => `
                <div class="company-option" data-index="${index}" style="
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 12px;
                    margin-bottom: 8px;
                    border: 1px solid #e9ecef;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.3s;
                " onclick="selectCompany(${index})">
                    <div>
                        <strong>${company.name}</strong><br>
                        <small style="color: #6c757d;">Reg: ${company.registration}</small>
                    </div>
                    <div style="
                        background: ${company.match >= 90 ? '#28a745' : company.match >= 80 ? '#ffc107' : '#dc3545'};
                        color: white;
                        padding: 4px 8px;
                        border-radius: 12px;
                        font-size: 12px;
                        font-weight: 600;
                    ">
                        ${company.match}%
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function showManualSelectionInterface() {
    const resultsScreen = document.querySelector('.results-screen');
    if (!resultsScreen) return;

    // Create manual selection interface
    const manualInterface = document.createElement('div');
    manualInterface.className = 'manual-selection';
    manualInterface.innerHTML = `
        <div style="
            background: white;
            border-radius: 15px;
            padding: 20px;
            margin-bottom: 20px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.05);
            text-align: center;
        ">
            <i class="fas fa-search" style="font-size: 48px; color: #6c757d; margin-bottom: 15px;"></i>
            <h3 style="margin-bottom: 10px; color: #2c3e50;">No Automatic Match Found</h3>
            <p style="color: #6c757d; margin-bottom: 20px;">
                Please manually search and select the company from the database.
            </p>
            <div class="search-box" style="
                display: flex;
                gap: 10px;
                margin-bottom: 15px;
            ">
                <input type="text" placeholder="Search company name..." style="
                    flex: 1;
                    padding: 12px;
                    border: 1px solid #e9ecef;
                    border-radius: 8px;
                    font-size: 14px;
                ">
                <button style="
                    padding: 12px 20px;
                    background: #007bff;
                    color: white;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                ">Search</button>
            </div>
            <button class="btn btn-secondary" style="width: 100%;">
                Browse All Companies
            </button>
        </div>
    `;

    // Replace company card with manual interface
    const companyCard = document.querySelector('.company-card');
    if (companyCard) {
        companyCard.style.display = 'none';
        companyCard.parentNode.insertBefore(manualInterface, companyCard.nextSibling);
    }
}

function updateTabStates(activeScenario) {
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.scenario === activeScenario) {
            tab.classList.add('active');
        }
    });
}

function updateEmailTemplate(templateType) {
    const emailBody = document.querySelector('.email-body');
    if (!emailBody) return;

    const templates = {
        'Standard': {
            subject: 'Mail Received - Ministry of Finance',
            body: `
                <p>Dear Mr. John Doe,</p>
                <p>We have received a mail for ABC Corporation Ltd. from Ministry of Finance dated 15/10/2025.</p>
                <p>Would you like us to forward this mail to you?</p>
            `
        },
        'Urgent': {
            subject: '🚨 URGENT: Mail Received - Ministry of Finance',
            body: `
                <p>Dear Mr. John Doe,</p>
                <p><strong>URGENT MAIL RECEIVED</strong></p>
                <p>We have received an urgent mail for ABC Corporation Ltd. from Ministry of Finance dated 15/10/2025.</p>
                <p>This mail requires immediate attention. Please confirm forwarding instructions ASAP.</p>
            `
        },
        'Legal': {
            subject: 'Legal Document Received - Ministry of Finance',
            body: `
                <p>Dear Mr. John Doe,</p>
                <p>We have received a legal document for ABC Corporation Ltd. from Ministry of Finance dated 15/10/2025.</p>
                <p>This document may contain important legal information. Would you like us to forward this mail to you immediately?</p>
                <p>Please note that time-sensitive legal documents may require prompt action.</p>
            `
        }
    };

    const template = templates[templateType];
    if (template) {
        // Update subject
        const subjectSpan = document.querySelector('.email-field span');
        if (subjectSpan && subjectSpan.parentElement.querySelector('label').textContent === 'Subject:') {
            subjectSpan.textContent = template.subject;
        }

        // Update body
        emailBody.innerHTML = template.body + emailBody.querySelector('.forwarding-fee').outerHTML;
    }
}

function selectCompany(index) {
    const companyOptions = document.querySelectorAll('.company-option');
    companyOptions.forEach((option, i) => {
        if (i === index) {
            option.style.borderColor = '#007bff';
            option.style.backgroundColor = '#f8f9ff';
        } else {
            option.style.borderColor = '#e9ecef';
            option.style.backgroundColor = 'white';
        }
    });

    // Show confirmation button
    setTimeout(() => {
        showConfirmationEffect();
    }, 500);
}

function startAutoAnimations() {
    // Auto-rotate scan line
    setInterval(() => {
        const scanLine = document.querySelector('.scan-line');
        if (scanLine) {
            scanLine.style.animationDuration = '2s';
        }
    }, 2000);

    // Auto-pulse scan frame
    setInterval(() => {
        const scanFrame = document.querySelector('.scan-frame');
        if (scanFrame) {
            scanFrame.style.transform = 'scale(1.02)';
            setTimeout(() => {
                scanFrame.style.transform = 'scale(1)';
            }, 200);
        }
    }, 4000);

    // Auto-update processing stats
    let accuracy = 98;
    let time = 2.3;
    setInterval(() => {
        const accuracyStat = document.querySelector('.stat-item span');
        const timeStat = document.querySelectorAll('.stat-item span')[1];
        
        if (accuracyStat && timeStat) {
            accuracy = Math.max(95, Math.min(99, accuracy + (Math.random() - 0.5) * 2));
            time = Math.max(1.8, Math.min(3.2, time + (Math.random() - 0.5) * 0.4));
            
            accuracyStat.textContent = Math.round(accuracy) + '% Accuracy';
            timeStat.textContent = time.toFixed(1) + 's';
        }
    }, 3000);

    // Auto-update dashboard stats
    setInterval(() => {
        updateDashboardStats();
    }, 5000);
}

function updateDashboardStats() {
    const statCards = document.querySelectorAll('.stat-card .stat-info h4');
    if (statCards.length >= 3) {
        const currentMails = parseInt(statCards[0].textContent);
        const newMails = Math.max(0, currentMails + Math.floor(Math.random() * 3 - 1));
        
        if (newMails !== currentMails) {
            statCards[0].style.transform = 'scale(1.2)';
            statCards[0].textContent = newMails;
            setTimeout(() => {
                statCards[0].style.transform = 'scale(1)';
            }, 300);
        }
    }
}

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes rippleEffect {
        0% { transform: scale(0); opacity: 1; }
        100% { transform: scale(2.5); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Global functions for demo controls
function showScenario(scenarioType) {
    switchScenario(scenarioType);
    
    // Add visual feedback
    const resultsPhone = document.querySelector('[data-step="3"]');
    if (resultsPhone) {
        resultsPhone.style.transform = 'scale(1.02)';
        setTimeout(() => {
            resultsPhone.style.transform = 'scale(1)';
        }, 300);
    }
}

function animateFlow() {
    const phones = document.querySelectorAll('.phone-mockup');
    
    phones.forEach((phone, index) => {
        phone.style.opacity = '0.3';
        phone.style.transform = 'translateY(20px) scale(0.98)';
        
        setTimeout(() => {
            phone.style.transition = 'all 0.6s ease-out';
            phone.style.opacity = '1';
            phone.style.transform = 'translateY(0) scale(1)';
            
            // Add glow effect
            phone.style.boxShadow = '0 0 30px rgba(0, 123, 255, 0.3)';
            setTimeout(() => {
                phone.style.boxShadow = 'none';
            }, 1000);
            
        }, index * 200);
    });

    // Reset after animation
    setTimeout(() => {
        phones.forEach(phone => {
            phone.style.transition = '';
        });
    }, 2000);
}

// Utility function to add loading states
function addLoadingState(element, duration = 2000) {
    element.classList.add('loading');
    setTimeout(() => {
        element.classList.remove('loading');
    }, duration);
}

// Initialize touch interactions for mobile
if ('ontouchstart' in window) {
    document.addEventListener('touchstart', function() {
        // Enable touch interactions
    });
}