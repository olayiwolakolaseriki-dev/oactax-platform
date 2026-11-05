// OAC Tax & Accounting — Executive JavaScript Engine (3D Standard & Interactions)

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Navigation Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('active');
    });

    // Close when clicking nav link
    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('active');
      });
    });
  }

  // 2. Consultation Modal Handlers
  const modalTriggers = document.querySelectorAll('[data-open-consultation]');
  const consultationModal = document.getElementById('consultationModal');
  const modalClose = document.getElementById('modalClose');

  function openConsultation() {
    if (consultationModal) {
      consultationModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeConsultation() {
    if (consultationModal) {
      consultationModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  modalTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openConsultation();
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeConsultation);
  }

  if (consultationModal) {
    consultationModal.addEventListener('click', (e) => {
      if (e.target === consultationModal) {
        closeConsultation();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && consultationModal.classList.contains('active')) {
        closeConsultation();
      }
    });
  }

  // 3. Consultation Form Submission -> Direct WhatsApp / Email Dispatch
  const consultationForm = document.getElementById('consultationForm');
  if (consultationForm) {
    consultationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('clientName')?.value || 'Client';
      const company = document.getElementById('clientCompany')?.value || 'Not specified';
      const service = document.getElementById('clientService')?.value || 'Corporate Advisory';
      const message = document.getElementById('clientMessage')?.value || 'Inquiry';

      const waText = `Hello OAC Tax & Accounting,%0A%0AMy name is ${encodeURIComponent(name)} from ${encodeURIComponent(company)}.%0AI would like to schedule an executive consultation regarding: *${encodeURIComponent(service)}*.%0A%0ADetails: ${encodeURIComponent(message)}`;
      
      // Redirect to WhatsApp
      window.open(`https://wa.me/2348115450282?text=${waText}`, '_blank');
      closeConsultation();
    });
  }

  // 4. Interactive 3D Card Tilt Effect
  const cards3D = document.querySelectorAll('.service-card-3d, .hero-3d-card, .leadership-card-3d');
  cards3D.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // 5. Interactive Diagnostic Audit Selector
  const diagBtns = document.querySelectorAll('.diagnostic-btn');
  const diagOutput = document.getElementById('diagOutput');

  const diagData = {
    'audit-defense': {
      title: 'Statutory Audit Shielding & FIRS/LIRS Defense',
      desc: 'Comprehensive pre-audit forensic review, reconciliation of VAT/WHT withholding credits, and direct representation before Federal and State tax tribunals.',
      action: 'Request Audit Shield Review'
    },
    'tax-health': {
      title: 'Corporate Tax Health Check & Fiscal Diagnostic',
      desc: 'Systematic examination of 3 to 5 financial years to identify unutilized capital allowances, Pioneer status reliefs, and eliminate exposure to punitive interest penalties.',
      action: 'Schedule Tax Health Check'
    },
    'virtual-cfo': {
      title: 'Virtual CFO & Strategic Financial Controllership',
      desc: 'Senior executive oversight for mid-market and scaling enterprises: board reporting, macroeconomic risk modeling, cash flow architecture, and working capital optimization.',
      action: 'Engage Virtual CFO Advisory'
    },
    'mergers': {
      title: 'Corporate Restructuring, M&A Due Diligence & Valuation',
      desc: 'Transaction structuring, historical liability ring-fencing, post-merger fiscal integration, and formal valuation reports for regulators and institutional capital.',
      action: 'Consult on M&A Transaction'
    }
  };

  diagBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      diagBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const key = btn.getAttribute('data-diag');
      if (diagData[key] && diagOutput) {
        diagOutput.innerHTML = `
          <h4 style="font-family: var(--font-serif); font-size: 1.35rem; color: var(--gold-light); margin-bottom: 0.6rem;">${diagData[key].title}</h4>
          <p style="font-size: 0.95rem; line-height: 1.65; color: var(--text-secondary); margin-bottom: 1.5rem;">${diagData[key].desc}</p>
          <button class="btn btn-gold" data-open-consultation style="font-size: 0.88rem; padding: 0.7rem 1.4rem;">${diagData[key].action} &rarr;</button>
        `;
        // Re-attach modal trigger to newly rendered button
        diagOutput.querySelector('[data-open-consultation]').addEventListener('click', openConsultation);
      }
    });
  });
});
