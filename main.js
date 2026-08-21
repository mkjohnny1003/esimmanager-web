document.addEventListener('DOMContentLoaded', () => {
  // 1. Feature Tabs Switcher
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const activeContent = document.getElementById(targetTab);
      if (activeContent) {
        activeContent.classList.add('active');
      }
    });
  });

  // 2. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // 3. Mobile Navigation Menu Toggle
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      const isVisible = navLinks.style.display === 'flex';
      navLinks.style.display = isVisible ? 'none' : 'flex';
      if (!isVisible) {
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '72px';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.background = '#ffffff';
        navLinks.style.padding = '20px';
        navLinks.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
      }
    });
  }

  // 4. Partnership Form Mailto Handler
  const partnerForm = document.getElementById('partner-form');
  if (partnerForm) {
    partnerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const type = document.getElementById('partner-type').value;
      const name = document.getElementById('partner-name').value;
      const email = document.getElementById('partner-email').value;
      const details = document.getElementById('partner-details').value;

      const subject = encodeURIComponent(`[eSIMManager 商業合作洽詢] - ${type} - ${name}`);
      const body = encodeURIComponent(
        `合作類型：${type}\n聯絡人／單位名稱：${name}\n聯絡信箱：${email}\n\n合作內容概述：\n${details}\n\n---\n來自 eSIMManager 官方網站洽詢表單`
      );

      window.location.href = `mailto:support.esimmanager@gmail.com?subject=${subject}&body=${body}`;
    });
  }
});
