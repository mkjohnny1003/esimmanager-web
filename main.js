document.addEventListener('DOMContentLoaded', () => {
  // Measure promotion performance without collecting contact-form content or
  // any eSIM information. GA4's automatic page_view is configured in HTML.
  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href]');
    if (!link || typeof window.gtag !== 'function') return;

    const href = link.href;
    const hostname = new URL(href, window.location.origin).hostname;
    const label = (link.textContent || link.getAttribute('aria-label') || 'link')
      .trim().replace(/\s+/g, ' ').slice(0, 100);
    let eventName = null;
    let destination = null;

    if (hostname === 'apps.apple.com') {
      eventName = 'app_store_click';
      destination = 'App Store';
    } else if (hostname === 'shopee.tw') {
      eventName = 'purchase_link_click';
      destination = 'Shopee';
    } else if (hostname.endsWith('klook.com') || hostname.endsWith('kkday.com') || hostname.endsWith('airalo.com') || hostname.endsWith('trip.com')) {
      eventName = 'platform_link_click';
      destination = hostname;
    }

    if (eventName) {
      window.gtag('event', eventName, {
        link_destination: destination,
        link_label: label
      });
    }
  });

  // Manual side rails protect the main reading and affiliate areas from auto-ad insertion.
  // They exist only on wide desktop screens and become visible only when AdSense fills them.
  document.querySelectorAll('[data-adsense-rail]').forEach((rail) => {
    const ad = rail.querySelector('.adsbygoogle');
    if (!ad) return;

    const updateVisibility = () => {
      const isFilled = ad.getAttribute('data-ad-status') === 'filled';
      rail.classList.toggle('is-filled', isFilled);
      rail.setAttribute('aria-hidden', String(!isFilled));
    };

    new MutationObserver(updateVisibility).observe(ad, {
      attributes: true,
      attributeFilter: ['data-ad-status']
    });

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      updateVisibility();
    }
  });

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
        navLinks.style.background = 'var(--bg-card)';
        navLinks.style.padding = '20px';
        navLinks.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
      }
    });
  }

  // The journey cards can be swiped. This control makes that interaction
  // discoverable and advances through the same horizontal carousel by click.
  const journeyStoryboard = document.getElementById('journey-storyboard');
  const journeyScrollControl = document.querySelector('.journey-scroll-control');
  if (journeyStoryboard && journeyScrollControl) {
    journeyScrollControl.addEventListener('click', () => {
      const maxScrollLeft = journeyStoryboard.scrollWidth - journeyStoryboard.clientWidth;
      const nextScrollLeft = journeyStoryboard.scrollLeft >= maxScrollLeft - 8
        ? 0
        : Math.min(
          journeyStoryboard.scrollLeft + Math.round(journeyStoryboard.clientWidth * 0.78),
          maxScrollLeft
        );
      journeyStoryboard.scrollTo({ left: nextScrollLeft, behavior: 'smooth' });
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

      window.location.href = `mailto:mkjohnny@gmail.com?subject=${subject}&body=${body}`;
    });
  }
});
