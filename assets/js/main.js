/***************************************************
==================== JS INDEX ======================
****************************************************

01. PreLoader Js
02. Sticky Js
03. Menu Controls JS
04. offcanvas Menu JS
05. offcanvas two Menu JS
06. Sidebar Js
07. AOS Js
08. Backtotop Js
09. Magnific Popup Js
10. Counter Js
11. Feature Widget Animation Js
12. Service Two Images Hover Animation Js
13. Bg Image For Attribute  Js
14. Mouse active Js





****************************************************/

(function ($) {
  "use strict";

  ////////////////////////////////////////////////////
  // 00. Security - Disable Right Click, Copy, and Content Protection
  ////////////////////////////////////////////////////

  // Disable Right Click Context Menu
  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
    return false;
  });

  // Disable Text Selection
  document.addEventListener("selectstart", function (e) {
    e.preventDefault();
    return false;
  });

  document.addEventListener("mousedown", function (e) {
    e.preventDefault();
    return false;
  }, true);

  // Disable Keyboard Shortcuts (Ctrl+C, Ctrl+V, Ctrl+X, Ctrl+S, Ctrl+A, Ctrl+U, F12)
  document.addEventListener("keydown", function (e) {
    // Ctrl+C - Copy
    if ((e.ctrlKey || e.metaKey) && e.keyCode === 67) {
      e.preventDefault();
      return false;
    }
    // Ctrl+V - Paste
    if ((e.ctrlKey || e.metaKey) && e.keyCode === 86) {
      e.preventDefault();
      return false;
    }
    // Ctrl+X - Cut
    if ((e.ctrlKey || e.metaKey) && e.keyCode === 88) {
      e.preventDefault();
      return false;
    }
    // Ctrl+A - Select All
    if ((e.ctrlKey || e.metaKey) && e.keyCode === 65) {
      e.preventDefault();
      return false;
    }
    // Ctrl+S - Save
    if ((e.ctrlKey || e.metaKey) && e.keyCode === 83) {
      e.preventDefault();
      return false;
    }
    // Ctrl+U - View Page Source
    if ((e.ctrlKey || e.metaKey) && e.keyCode === 85) {
      e.preventDefault();
      return false;
    }
    // F12 - Developer Tools
    if (e.keyCode === 123) {
      e.preventDefault();
      return false;
    }
    // Right Click - Context Menu (alternative)
    if (e.keyCode === 93) {
      e.preventDefault();
      return false;
    }
  });

  // Disable Drag and Drop
  document.addEventListener("dragstart", function (e) {
    e.preventDefault();
    return false;
  });

  document.addEventListener("drop", function (e) {
    e.preventDefault();
    return false;
  });

  // Disable Copy from paste event
  document.addEventListener("copy", function (e) {
    e.preventDefault();
    return false;
  });

  // Disable Cut from cut event
  document.addEventListener("cut", function (e) {
    e.preventDefault();
    return false;
  });

  // Disable Paste from paste event
  document.addEventListener("paste", function (e) {
    e.preventDefault();
    return false;
  });

  // Detect Developer Tools (F12, Ctrl+Shift+I, Ctrl+Shift+C, Ctrl+Shift+J)
  document.addEventListener("keydown", function (e) {
    // Ctrl+Shift+I - Developer Tools Inspector
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.keyCode === 73) {
      e.preventDefault();
      return false;
    }
    // Ctrl+Shift+C - Inspector Element
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.keyCode === 67) {
      e.preventDefault();
      return false;
    }
    // Ctrl+Shift+J - Console
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.keyCode === 74) {
      e.preventDefault();
      return false;
    }
    // Ctrl+Shift+K - Console (Firefox)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.keyCode === 75) {
      e.preventDefault();
      return false;
    }
  });

  // Additional protection - Disable Image saving
  document.addEventListener("contextmenu", (e) => {
    if (e.target.tagName === "IMG") {
      e.preventDefault();
      return false;
    }
  });

  ////////////////////////////////////////////////////
  // 01. PreLoader Js
  document.addEventListener("DOMContentLoaded", () => {
    // Create GSAP timeline
    const tl = gsap.timeline();
    const svg = document.getElementById("preloaderSvg");
    const curve = "M0 502S175 272 500 272s500 230 500 230V0H0Z";
    const flat = "M0 2S175 1 500 1s500 1 500 1V0H0Z";
    // Text animation
    tl.to(".preloader-heading .load-text, .preloader-heading .cont", {
      delay: 1,
      y: -80,
      opacity: 0,
      duration: 0.6,
    })
      // SVG curve animation
      .to(svg, {
        duration: 0.6,
        attr: { d: curve },
        ease: "power2.inOut",
      })
      // Flatten SVG
      .to(svg, {
        duration: 0.6,
        attr: { d: flat },
        ease: "power2.inOut",
      })
      // Slide preloader up
      .to(".preloader", {
        y: "-130%",
        duration: 0.8,
        ease: "power4.inOut",
      })
      // Remove from DOM flow
      .set(".preloader", {
        display: "none",
        zIndex: -1,
      });
  });

  ////////////////////////////////////////////////////
  // 02. Sticky Js
  $(window).on("scroll", function () {
    if ($(window).scrollTop() >= 260) {
      $(".header").addClass("fixed-header");
    } else {
      $(".header").removeClass("fixed-header");
    }
  });

  ////////////////////////////////////////////////////
  // 03. Menu Controls JS
  $(".tw-hamburger-toggle").on("click", function () {
    $(".tw-header-side-menu").slideToggle("tw-header-side-menu");
  });
  if ($(".tw-main-menu-content").length && $(".tw-main-menu-mobile").length) {
    let navContent = document.querySelector(".tw-main-menu-content").outerHTML;
    let mobileNavContainer = document.querySelector(".tw-main-menu-mobile");
    mobileNavContainer.innerHTML = navContent;

    // This portfolio is a single page, so the "Home" mega-menu preview grid
    // and the "Work"/"Experience"/"Services" multi-page dropdown link lists
    // (leftover from the original multi-page theme template) don't apply -
    // they were opening as an unwanted inline submenu/popup when tapped in
    // the offcanvas menu. Strip them from the cloned mobile nav only; the
    // (hidden, d-none) source nav that feeds this clone is untouched.
    $(mobileNavContainer).find(".tw-submenu").remove();
    $(mobileNavContainer).find(".has-dropdown").removeClass("has-dropdown p-static");

    let arrow = $(".tw-main-menu-mobile .has-dropdown > a");
    arrow.each(function () {
      let self = $(this);
      let arrowBtn = document.createElement("BUTTON");
      arrowBtn.classList.add("dropdown-toggle-btn");
      arrowBtn.innerHTML = "<i class='ph ph-caret-right'></i>";
      self.append(function () {
        return arrowBtn;
      });
      self.find("button").on("click", function (e) {
        e.preventDefault();
        let self = $(this);
        self.toggleClass("dropdown-opened");
        self.parent().toggleClass("expanded");
        self
          .parent()
          .parent()
          .addClass("dropdown-opened")
          .siblings()
          .removeClass("dropdown-opened");
        self.parent().parent().children(".tw-submenu").slideToggle();
      });
    });

    // Every remaining link in the mobile nav is now a genuine single-page
    // anchor (Home, About, Services, Work, Experience, Contact). Clicking
    // one should close the offcanvas and let the browser's native anchor
    // navigation scroll to that section - not leave the menu panel open
    // on top of the destination content.
    $(mobileNavContainer).on("click", "a", function () {
      $(".tw-offcanvas-2-area").removeClass("opened");
      setTimeout(() => {
        $(".tw-text-hover-effect-word").removeClass("animated-text");
      }, 300);
    });
  }

  ////////////////////////////////////////////////////
  // 03a. Smooth In-Page Anchor Navigation
  // GSAP ScrollSmoother (see custom-gsap.js) manages the page's real scroll
  // position via its own transform, so a plain native browser anchor jump
  // (href="#section") can end up out of sync with it - the page can jump
  // to the wrong spot and then visibly "correct" itself, which reads as
  // something odd happening rather than a clean scroll to the section.
  // Route every real in-page section link (offcanvas menu, footer quick
  // links, hero CTA, logo, back-to-top) through the smoother's own
  // scrollTo so navigation always lands smoothly and reliably, with the
  // sticky header's height accounted for so the heading isn't hidden
  // underneath it.
  var HEADER_SCROLL_OFFSET = 100;
  function smoothScrollToTarget(target) {
    if (!target) return;
    if (window.twSmoother && typeof window.twSmoother.scrollTo === "function") {
      var currentScroll = window.twSmoother.scrollTop();
      var targetTop = target.getBoundingClientRect().top + currentScroll;
      window.twSmoother.scrollTo(Math.max(targetTop - HEADER_SCROLL_OFFSET, 0), true);
    } else {
      var top = target.getBoundingClientRect().top + window.pageYOffset - HEADER_SCROLL_OFFSET;
      window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
    }
  }
  $(document).on("click", 'a[href^="#"]:not([href="#"])', function (e) {
    var hash = this.getAttribute("href");
    var target;
    try {
      target = document.querySelector(hash);
    } catch (err) {
      target = null;
    }
    if (!target) return; // not a real in-page section id, let default happen
    e.preventDefault();
    smoothScrollToTarget(target);
  });
  $(".footer-three-back-to-top").on("click", function (e) {
    e.preventDefault();
    if (window.twSmoother && typeof window.twSmoother.scrollTo === "function") {
      window.twSmoother.scrollTo(0, true);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });

  ////////////////////////////////////////////////////
  // 04. offcanvas Menu JS
  $(".tw-offcanvas-open-btn").on("click", function () {
    $(".tw-offcanvas-2-area").addClass("opened");

    setTimeout(() => {
      $(".tw-text-hover-effect-word").addClass("animated-text");
    }, 900);
  });

  ////////////////////////////////////////////////////
  // 05. offcanvas two Menu JS
  $(".tw-offcanvas-2-close-btn").on("click", function () {
    setTimeout(() => {
      $(".tw-text-hover-effect-word").removeClass("animated-text");
    }, 1200);

    $(".tw-offcanvas-2-area").removeClass("opened");
    $(".body-overlay").removeClass("opened");
  });

  ////////////////////////////////////////////////////
  // 06. Sidebar Js
  $(".tw-menu-bar").on("click", function () {
    $(".twoffcanvas").addClass("opened");
    $(".body-overlay").addClass("apply");
  });
  $(".close-btn").on("click", function () {
    $(".twoffcanvas").removeClass("opened");
    $(".body-overlay").removeClass("apply");
  });
  $(".body-overlay").on("click", function () {
    $(".twoffcanvas").removeClass("opened");
    $(".body-overlay").removeClass("apply");
  });

  ////////////////////////////////////////////////////
  // 07. AOS Js
  // Project cards repeat in a three-column grid. Give every card the same
  // internal reveal sequence and only stagger cards within their own row.
  // Setting these attributes before AOS initializes keeps the timing stable
  // even when cards or technologies are added later.
  document.querySelectorAll(".react-project-card").forEach(function (card, index) {
    var setAos = function (element, animation, duration, delay) {
      if (!element) return;
      element.setAttribute("data-aos", animation);
      element.setAttribute("data-aos-duration", duration);
      element.setAttribute("data-aos-delay", delay);
    };
    var stagger = (index % 3) * 120;
    setAos(card, "fade-up", 800, stagger);

    var preview = card.querySelector(".react-project-preview");
    var body = card.querySelector(".react-project-card-body");
    setAos(preview, "zoom-in", 650, 80);
    setAos(card.querySelector(".react-project-browser-bar"), "fade-down", 500, 110);
    setAos(card.querySelector(".react-project-iframe-wrap"), "fade-up", 650, 150);
    setAos(card.querySelector(".react-project-preview-label"), "fade-up", 500, 200);
    setAos(body, "fade-up", 650, 160);
    setAos(card.querySelector(".react-project-meta"), "fade-right", 500, 220);
    setAos(card.querySelector("h3"), "fade-up", 550, 270);
    setAos(body && body.querySelector("p"), "fade-up", 550, 320);
    setAos(card.querySelector(".react-project-tags"), "fade-up", 500, 370);
    card.querySelectorAll(".react-project-tags li").forEach(function (tag, tagIndex) {
      setAos(tag, "fade-up", 450, 400 + tagIndex * 30);
    });
    setAos(card.querySelector(".react-project-link"), "fade-up", 500, 460);
  });

  // Portfolio cards use a two-column layout, so restart the small stagger on
  // each row and reveal the card's content in reading order.
  document.querySelectorAll(".portfolio-three-wrapper").forEach(function (wrapper) {
    var setPortfolioAos = function (element, animation, duration, delay) {
      if (!element) return;
      element.setAttribute("data-aos", animation);
      element.setAttribute("data-aos-duration", duration);
      element.setAttribute("data-aos-delay", delay);
    };
    setPortfolioAos(wrapper, "fade-up", 800, 0);

    wrapper.querySelectorAll(".portfolio-three-item").forEach(function (card, index) {
      var stagger = (index % 2) * 140;
      setPortfolioAos(card, "fade-up", 800, stagger);
      setPortfolioAos(card.querySelector(".portfolio-three-wrap"), "fade-up", 650, 100);
      setPortfolioAos(card.querySelector("h2"), "fade-up", 600, 170);
      setPortfolioAos(card.querySelector(".portfolio-three-list"), "fade-up", 500, 230);
      card.querySelectorAll(".portfolio-three-list li").forEach(function (tag, tagIndex) {
        setPortfolioAos(tag, "fade-up", 450, 270 + tagIndex * 50);
      });
      setPortfolioAos(card.querySelector(".portfolio-three-button"), "zoom-in", 500, 260);
      setPortfolioAos(card.querySelector(".portfolio-thumb"), "zoom-in", 700, 350);
    });
  });

  // Experience entries are stacked. Keep each row as one animation rather
  // than nesting several AOS transforms; nested transforms can leave text
  // visually delayed. These rows replay whenever the section is revisited.
  document.querySelectorAll(".feature-three-wrapper").forEach(function (wrapper) {
    var setFeatureAos = function (element, animation, duration, delay) {
      if (!element) return;
      element.setAttribute("data-aos", animation);
      element.setAttribute("data-aos-duration", duration);
      element.setAttribute("data-aos-delay", delay);
    };
    var clearFeatureAos = function (element) {
      if (!element) return;
      ["data-aos", "data-aos-duration", "data-aos-delay", "data-aos-once", "data-aos-mirror"].forEach(function (attribute) {
        element.removeAttribute(attribute);
      });
    };
    clearFeatureAos(wrapper);

    wrapper.querySelectorAll(".feature-three-single").forEach(function (card, index) {
      setFeatureAos(card, "fade-up", 700, index * 1000);
      card.setAttribute("data-aos-once", "false");
      card.setAttribute("data-aos-mirror", "true");

      clearFeatureAos(card.querySelector(".feature-three-item"));
      card.querySelectorAll(".feature-three-text, .experience-details-toggle").forEach(clearFeatureAos);
    });
  });

  // Skill logos reveal independently as each card enters the viewport.
  document.querySelectorAll(".skills-grid").forEach(function (grid) {
    grid.querySelectorAll(".skill-logo").forEach(function (logo) {
      logo.setAttribute("data-aos", "fade-up");
      logo.setAttribute("data-aos-duration", "600");
      logo.setAttribute("data-aos-delay", "0");
      logo.setAttribute("data-aos-anchor-placement", "top-bottom");
      logo.setAttribute("data-aos-offset", "80");
    });
  });

  AOS.init({
    // Reveal each section slightly before it reaches the viewport centre.
    // This keeps the staggered delays readable without making visitors wait.
    once: false,
    offset: 90,
    duration: 800,
    easing: "ease-out-cubic",
    anchorPlacement: "top-bottom",
    disable: function () {
      // Respect users who prefer reduced motion: skip AOS animation
      // entirely for them so content is immediately visible.
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    },
  });

  // ScrollSmoother, web fonts, and project previews can change element
  // positions after the first paint. Refreshing once the page is complete
  // keeps every AOS trigger aligned without changing the page UI.
  window.addEventListener("load", function () {
    window.requestAnimationFrame(function () {
      AOS.refreshHard();
    });
  });

  // 08. Backtotop Js
  function back_to_top() {
    var btn = $("#back_to_top");
    var btn_wrapper = $(".back-to-top-wrapper");
    function updateBackToTop() {
      if (window.scrollY > 300 || document.documentElement.scrollTop > 300) {
        btn_wrapper.addClass("back-to-top-btn-show");
      } else {
        btn_wrapper.removeClass("back-to-top-btn-show");
      }
    }

    window.addEventListener("scroll", updateBackToTop, { passive: true });
    updateBackToTop();

    btn.on("click", function (e) {
      e.preventDefault();
      $("html, body").animate({ scrollTop: 0 }, 300);
    });
  }
  back_to_top();

  $(".experience-details-toggle").on("click", function () {
    var button = $(this);
    var details = $("#" + button.attr("aria-controls"));
    var isExpanded = button.attr("aria-expanded") === "true";
    button.attr("aria-expanded", String(!isExpanded));
    if (isExpanded) {
      details.stop(true, true).slideUp(300, function () {
        details.prop("hidden", true);
      });
    } else {
      details.prop("hidden", false).hide().slideDown(300);
    }
  });

  ////////////////////////////////////////////////////
  // 09. Magnific Popup Js
  $(".open-popup").magnificPopup({
    type: "iframe",
    removalDelay: 300,
    mainClass: "mfp-fade",
  });

  ////////////////////////////////////////////////////
  // 10. Counter Js
  new PureCounter();
  new PureCounter({
    filesizing: true,
    selector: ".filesizecount",
    pulse: 2,
  });

  ////////////////////////////////////////////////////
  // 11. Feature Widget Animation Js
  function service_animation() {
    var active_bg = $(".feature-widget .active-bg");
    var element = $(".feature-widget .current");
    $(".feature-widget .feature-2-item").on("mouseenter", function () {
      var e = $(this);
      activeService(active_bg, e);
    });
    $(".feature-widget").on("mouseleave", function () {
      element = $(".feature-widget .current");
      activeService(active_bg, element);
      element.closest(".feature-2-item").siblings().removeClass("mleave");
    });
    activeService(active_bg, element);
  }
  service_animation();
  function activeService(active_bg, e) {
    if (!e.length) {
      return false;
    }
    var topOff = e.offset().top;
    var height = e.outerHeight();
    var menuTop = $(".feature-widget").offset().top;
    e.closest(".feature-2-item").removeClass("mleave");
    e.closest(".feature-2-item").siblings().addClass("mleave");
    active_bg.css({ top: topOff - menuTop + "px", height: height + "px" });
  }
  $(".feature-widget .feature-2-item").on("click", function () {
    $(".feature-widget .feature-2-item").removeClass("current");
    $(this).addClass("current");
  });

  ////////////////////////////////////////////////////
  // 12. Service Two Images Hover Animation Js
  $(".service-two-list-wrap .service-two-list-item").on(
    "mouseenter",
    function () {
      $("#service-two-thumb").removeClass().addClass($(this).attr("rel"));
      $(this).addClass("active").siblings().removeClass("active");
    },
  );

  ////////////////////////////////////////////////////
  // 13. Bg Image For Attribute  Js
  $(".bg-img").each(function () {
    var img = $(this).data("background-image");
    if (img) {
      $(this).css("background-image", "url('" + img + "')");
    }
  });

  ////////////////////////////////////////////////////
  // 14. Mouse active Js
  $(document).ready(function () {
    $(".service-ip-wrapper").on("mouseenter", function () {
      $(this).addClass("active").siblings().removeClass("active");
    });

    $(".service-ip-wrapper").on("mouseenter", function () {
      $(this).addClass("active");
      $(this)
        .parent()
        .siblings()
        .find(".service-ip-wrapper")
        .removeClass("active");
    });
  });

  ////////////////////////////////////////////////////
  // 15. Portfolio Chatbot
  ////////////////////////////////////////////////////
  document.addEventListener("DOMContentLoaded", function () {
    const chatbot = document.querySelector("[data-chatbot]");
    if (!chatbot) return;

    const launcher = chatbot.querySelector(".portfolio-chatbot-launcher");
    const panel = chatbot.querySelector(".portfolio-chatbot-panel");
    const closeButton = chatbot.querySelector(".portfolio-chatbot-close");
    const form = chatbot.querySelector(".portfolio-chatbot-form");
    const input = chatbot.querySelector("#portfolio-chatbot-input");
    const messages = chatbot.querySelector(".portfolio-chatbot-messages");

   const answers = [
  {
    terms: ["specialize", "skill", "technology", "tech", "stack", "expertise"],
    answer:
      "Ketan specializes in Frontend UI Development, with hands-on experience in Angular, React.js, TypeScript, JavaScript, HTML5, CSS3, Bootstrap 5, Figma-to-code conversion, responsive design, basic REST API integration, and AOS/GSAP animations."
  },

  {
    terms: ["experience", "career", "years", "work history", "background"],
    answer:
      "Ketan has 2+ years of hands-on frontend/UI development experience, building responsive web applications, dashboards, CRM/HRM systems, and FinTech and Insurance/SaaS interfaces."
  },

  {
    terms: ["role", "position", "job title", "designation"],
    answer:
      "Ketan is a Frontend UI Developer specializing in Angular, React.js, TypeScript, JavaScript, Bootstrap, and responsive, pixel-perfect web interfaces."
  },

  {
    terms: ["angular"],
    answer:
      "Ketan has practical Angular experience including component-based development, reusable components, routing, data binding, and responsive Angular UI. At WebPlat Technologies he converted 15+ Figma designs into responsive Angular interfaces for FinTech workflows."
  },

  {
    terms: ["react", "react.js", "reactjs"],
    answer:
      "Ketan has practical React.js experience from New Icon Technology, where he built reusable components, dashboards, and admin panels for CRM, HRM, e-commerce, and service-booking applications."
  },

  {
    terms: ["typescript", "type script"],
    answer:
      "Ketan uses TypeScript mainly in Angular-oriented development, including types, interfaces, and component-based application work."
  },

  {
    terms: ["javascript", "js"],
    answer:
      "Ketan has hands-on JavaScript (ES6+) experience for DOM manipulation, dynamic UI behavior, data handling, and frontend interactions."
  },

  {
    terms: ["bootstrap", "bootstrap css"],
    answer:
      "Ketan has practical experience with Bootstrap 5 for building responsive grids, components, navbars, forms, and utility-based layouts, often combined with custom CSS/SCSS for precise design matching."
  },

  {
    terms: ["css", "css3", "scss", "sass"],
    answer:
      "CSS is one of Ketan's strongest areas — he works with CSS3, Flexbox, Grid, media queries, and SCSS to convert visual designs into pixel-perfect, responsive interfaces."
  },

  {
    terms: ["html", "html5"],
    answer:
      "Ketan has a strong HTML5 foundation, building semantic, structured, and reusable page sections for forms, tables, navigation, cards, and dashboards."
  },

  {
    terms: ["figma", "design to code", "figma to code", "pixel perfect"],
    answer:
      "Figma-to-code is one of Ketan's strongest skills. He studies the design, identifies reusable components, implements the structure, matches spacing/typography/alignment, and makes it fully responsive."
  },

  {
    terms: ["responsive", "responsive design", "mobile", "tablet"],
    answer:
      "Responsive UI is one of Ketan's core strengths. He builds interfaces that work consistently across desktop, tablet, and mobile using CSS, Flexbox, Grid, and Bootstrap."
  },

  {
    terms: ["accessibility", "wcag", "accessible"],
    answer:
      "Ketan applies basic accessibility-aware markup and semantic HTML practices as part of his frontend development workflow."
  },

  {
    terms: ["performance", "optimization", "speed", "fast website"],
    answer:
      "Ketan focuses on practical frontend performance improvements, responsive testing, and clean, reusable code as part of his development process."
  },

  {
    terms: ["api", "rest api", "rest", "backend integration"],
    answer:
      "Ketan's REST API experience is practical and frontend-focused — consuming JSON responses, rendering dynamic data with Fetch/Axios, and debugging API-related frontend issues using Postman and browser DevTools."
  },

  {
    terms: ["component", "component architecture", "reusable components"],
    answer:
      "Ketan builds reusable UI components, layouts, forms, tables, and dashboard modules across both Angular and React projects to keep frontend code maintainable."
  },

  {
    terms: ["project", "projects", "recent", "recent work", "portfolio"],
    answer:
      "Ketan's work includes the Xintra CRM Analytics Dashboard, FinTech Payments workflows (DMT/BBPS/KYC/UPI), an Automobile Multi-Seller E-commerce & Service Booking platform, and CRM/HRM admin dashboards from his jobs, plus 10 live practice projects on GitHub Pages: Banking, Banking Landing Page, Finto (FinTech clone), Moxcash, Makaan (Real Estate), Crypto, Klean, Kid Kinder, iStudio, and Startup. Each one is embedded live in the Frontend Projects section above."
  },

  {
    terms: ["banking", "banking website"],
    answer:
      "Ketan built a responsive Banking website UI demonstrating structured sections and professional financial interface design. It's live at ketuvumali.github.io/Banking, along with a dedicated landing page variant."
  },

  {
    terms: ["finto", "fintech clone", "fintech ui"],
    answer:
      "Finto is a FinTech UI clone project Ketan built to demonstrate real-world visual replication and responsive frontend implementation, live at ketuvumali.github.io/Finto-Fintech-Clone."
  },

  {
    terms: ["moxcash"],
    answer:
      "Moxcash is a financial-services style website UI Ketan built, demonstrating modern web layout and fully responsive design, live at ketuvumali.github.io/Moxcash."
  },

  {
    terms: ["makaan", "real estate"],
    answer:
      "Makaan is a real-estate website UI project Ketan built, focused on property listings, structured sections, and responsive design, live at ketuvumali.github.io/Makaan."
  },

  {
    terms: ["crypto", "cryptocurrency"],
    answer:
      "Ketan built a Cryptocurrency UI project demonstrating a modern financial dashboard-style layout with responsive styling, live at ketuvumali.github.io/crypto."
  },

  {
    terms: ["klean"],
    answer:
      "Klean is a service-oriented website UI Ketan built, demonstrating reusable page sections and responsive design, live at ketuvumali.github.io/Klean."
  },

  {
    terms: ["kid kinder", "kindergarten", "school website"],
    answer:
      "Kid Kinder is an education/kids-oriented website UI Ketan built, demonstrating a friendly visual structure and responsive frontend development, live at ketuvumali.github.io/Kid_Kinder."
  },

  {
    terms: ["istudio", "studio website"],
    answer:
      "iStudio is a business/studio website UI Ketan built, demonstrating clean layout and responsive presentation, live at ketuvumali.github.io/iStudio."
  },

  {
    terms: ["startup"],
    answer:
      "Startup is a business/startup landing-page UI Ketan built, demonstrating clear messaging and responsive design, live at ketuvumali.github.io/Startup."
  },

  {
    terms: ["xintra", "crm dashboard", "analytics dashboard"],
    answer:
      "The Xintra CRM Analytics Dashboard is an Angular-based, fully responsive dashboard UI covering Sales, Analytics, E-commerce, CRM, and HRM modules, with charts, filters, and dynamic JSON-driven data."
  },

  {
    terms: ["automobile", "e-commerce", "ecommerce", "multi-seller"],
    answer:
      "At New Icon Technology, Ketan worked on a React-based automobile multi-seller e-commerce and service-booking platform covering seller CRM, products, deliveries, job cards, accounting, GST/CA reports, and stock management."
  },

  {
    terms: ["crm", "hrm", "admin panel", "dashboard"],
    answer:
      "Ketan has built CRM and HRM admin-panel interfaces with responsive dashboards, role-based screens, tables, and forms, focusing on usability and clear information presentation."
  },

  {
    terms: ["zipxpress", "travel", "cab"],
    answer:
      "ZipXpress is a cab/travel platform Ketan worked on at New Icon Technology, focusing on responsive UI and reusable frontend sections for a service-oriented experience."
  },

  {
    terms: ["fintech", "payments", "dmt", "bbps", "kyc", "aeps", "upi"],
    answer:
      "At WebPlat Technologies, Ketan worked on FinTech frontend interfaces covering DMT, Recharge, BBPS, KYC, AEPS, and UPI Switch workflows, using Angular, TypeScript, and REST API-driven data."
  },

  {
    terms: ["beyondsure", "current company", "latest company"],
    answer:
      "Ketan currently works as a Frontend UI Developer at BeyondSure Private Limited, an Insurance/SaaS company, where he converts Figma designs into responsive code and fine-tunes existing website pages."
  },

  {
    terms: ["webplat"],
    answer:
      "At WebPlat Technologies, Ketan worked as a Frontend UI Developer on FinTech products, converting 15+ Figma designs into responsive Angular and React applications."
  },

  {
    terms: ["new icon", "newicon", "nit"],
    answer:
      "At New Icon Technology, Ketan worked as an Associate Software Developer on React-based CRM, HRM, automobile e-commerce, and travel/cab platforms."
  },

  {
    terms: ["paarsh", "intern", "internship"],
    answer:
      "Ketan started his career as a Software Developer Intern at Paarsh Infotech Pvt. Ltd., working with Angular and Bootstrap on projects like Invoice Generator, Menu Card Generator, Anvis Cloud Kitchen, and Apnasite CMS Portal."
  },

  {
    terms: ["git", "github", "version control"],
    answer:
      "Ketan uses Git, GitHub, and Bitbucket for source control, branching, pull requests, and code review participation."
  },

  {
    terms: ["jira", "agile", "scrum"],
    answer:
      "Ketan uses Jira to understand tickets, break requirements into implementation steps, and track development tasks in Agile-style workflows."
  },

  {
    terms: ["postman"],
    answer:
      "Ketan uses Postman for basic API/request inspection and understanding frontend data flows."
  },

  {
    terms: ["gsap", "aos", "animation", "animations"],
    answer:
      "Ketan implements AOS for scroll-based reveal animations and GSAP for more controlled, custom animations — always mindful of not reducing usability or performance."
  },

  {
    terms: ["team", "collaboration", "collaborate"],
    answer:
      "Ketan collaborates closely with designers, backend developers, and stakeholders, and has supported junior developers when required."
  },

  {
    terms: ["seo", "search engine", "seo best practices"],
    answer:
      "Ketan applies basic SEO-friendly frontend structure and semantic HTML as part of his development practice."
  },

  {
    terms: ["ui", "ui developer", "user interface"],
    answer:
      "Ketan is a Frontend UI Developer focused on creating clean, responsive, and pixel-perfect interfaces from Figma designs, screenshots, or live references."
  },

  {
    terms: ["ux", "ui ux", "user experience"],
    answer:
      "Ketan focuses on visual accuracy, responsive behavior, and usability — converting designs into interfaces that are consistent and easy to use across devices."
  },

  {
    terms: ["services", "what services", "what do you offer"],
    answer:
      "Ketan's core services include Frontend Development, UI/UX Engineering, Cross-browser & Performance work, and Modern UI Systems using Angular, React, Bootstrap, and SCSS."
  },

  {
    terms: ["frontend service", "frontend development"],
    answer:
      "Ketan provides frontend development using Angular, React.js, TypeScript, JavaScript, reusable component architecture, and modern responsive UI techniques."
  },

  {
    terms: ["hire", "hiring", "available", "job", "opportunity"],
    answer:
      "Ketan is available as an immediate joiner and open to Frontend/UI Developer opportunities. You can contact him through the portfolio contact form or email him directly."
  },

  {
    terms: ["contact", "email", "reach", "phone", "mobile"],
    answer:
      "You can contact Ketan at ketanmali.connect@gmail.com or +91 7038249592. You can also use the contact form at the bottom of the portfolio."
  },

  {
    terms: ["location", "where", "based", "city", "pune"],
    answer:
      "Ketan is based in Pune, Maharashtra, India, and is willing to relocate anywhere in India for the right opportunity."
  },

  {
    terms: ["resume", "cv", "download resume"],
    answer:
      "Ketan's resume is available through the Download CV link in the portfolio header."
  },

  {
    terms: ["education", "qualification", "degree"],
    answer:
      "Ketan holds a Master of Computer Applications (MCA) and a Bachelor of Science in Computer Science, both from K.B.C. North Maharashtra University, Jalgaon."
  },

  {
    terms: ["frontend vs backend", "backend", "full stack"],
    answer:
      "Ketan's primary specialization is frontend/UI development rather than backend engineering. His core expertise is Angular, React.js, TypeScript, JavaScript, responsive UI, and basic/practical API integration."
  },

  {
    terms: ["why hire", "why should we hire", "strength"],
    answer:
      "Ketan's strengths include 2+ years of practical frontend experience, working with both Angular and React, strong Figma-to-code implementation, responsive design, reusable components, and comfort working with existing codebases."
  },

  {
    terms: ["portfolio", "website", "site"],
    answer:
      "This portfolio showcases Ketan's experience, services, technical skills, professional projects, recent frontend work, career history, and contact information."
  },

  {
    terms: ["github"],
    answer:
      "You can find Ketan's code and live project links on GitHub at github.com/KetuVUMali."
  },

  {
    terms: ["linkedin"],
    answer:
      "You can connect with Ketan on LinkedIn at linkedin.com/in/mali-ketan-vijay-4b90a3201."
  }
];

    function addMessage(text, type) {
      const message = document.createElement("div");
      message.className = "portfolio-chatbot-message is-" + type;
      message.textContent = text;
      messages.appendChild(message);
      messages.scrollTop = messages.scrollHeight;
    }

    function addLoader() {
      const loader = document.createElement("div");
      loader.className = "portfolio-chatbot-message is-bot portfolio-chatbot-loader";
      loader.setAttribute("role", "status");
      loader.setAttribute("aria-label", "Ketan's assistant is thinking");
      loader.innerHTML = "<span></span><span></span><span></span>";
      messages.appendChild(loader);
      messages.scrollTop = messages.scrollHeight;
      return loader;
    }

    function getAnswer(question) {
      const normalizedQuestion = question.toLowerCase();
      const match = answers.find(function (entry) {
        return entry.terms.some(function (term) {
          return normalizedQuestion.includes(term);
        });
      });
      return match ? match.answer : "I can answer questions about Ketan’s skills, experience, recent projects, resume, and contact details. Try asking, ‘What does Ketan specialize in?’";
    }

    function setOpen(isOpen) {
      panel.hidden = !isOpen;
      launcher.setAttribute("aria-expanded", String(isOpen));
      chatbot.classList.toggle("is-open", isOpen);
      if (isOpen) input.focus();
    }

    function respondTo(question) {
      const loader = addLoader();
      input.disabled = true;
      form.querySelector("button[type='submit']").disabled = true;
      window.setTimeout(function () {
        loader.remove();
        addMessage(getAnswer(question), "bot");
        input.disabled = false;
        form.querySelector("button[type='submit']").disabled = false;
        input.focus();
      }, 900);
    }

    launcher.addEventListener("click", function () { setOpen(!chatbot.classList.contains("is-open")); });
    closeButton.addEventListener("click", function () { setOpen(false); launcher.focus(); });
    chatbot.querySelectorAll("[data-chatbot-prompt]").forEach(function (prompt) {
      prompt.addEventListener("click", function () {
        const question = prompt.getAttribute("data-chatbot-prompt");
        if (input.disabled) return;
        addMessage(question, "user");
        respondTo(question);
      });
    });
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const question = input.value.trim();
      if (!question) return;
      addMessage(question, "user");
      input.value = "";
      respondTo(question);
    });
  });

  $(document).ready(function () {
    function initRipples() {
      $(".ripple-image").each(function () {
        var $container = $(this);
        var $img = $container.find("img").first();

        if ($img.length === 0) return;

        var img = new Image();
        img.src = $img.attr("src");

        img.onload = function () {
          var imgURL = img.src;

          $container.css({
            "background-image": "url(" + imgURL + ")",
            "background-size": "cover",
            "background-position": "center center",
          });

          // init ripples plugin
          if (typeof $container.ripples === "function") {
            $container.ripples({
              resolution: 400,
              perturbance: 0.03,
              imageUrl: imgURL,
            });
          }

          $img.hide();
        };
      });
    }

    initRipples();
  });

  ////////////////////////////////////////////////////
  // 16. Live Project Iframe Preview Scaling
  // Each .react-project-iframe-wrap holds an iframe rendered at a fixed
  // "desktop" width (1440px) so the real live site shows its normal layout.
  // We scale it down with a CSS custom property so it fits the responsive
  // 16:9 preview box exactly, on load and on resize.
  function scaleProjectIframePreviews() {
    document.querySelectorAll(".react-project-iframe-wrap").forEach(function (wrap) {
      var iframe = wrap.querySelector("iframe");
      if (!iframe) return;
      var baseWidth = parseInt(iframe.getAttribute("data-base-width"), 10) || 1440;
      var scale = wrap.clientWidth / baseWidth;
      if (scale > 0) {
        iframe.style.setProperty("--rp-scale", scale);
      }
    });
  }
  window.addEventListener("load", scaleProjectIframePreviews);
  window.addEventListener("resize", scaleProjectIframePreviews);
  document.addEventListener("DOMContentLoaded", scaleProjectIframePreviews);
  setTimeout(scaleProjectIframePreviews, 600);
  setTimeout(scaleProjectIframePreviews, 1500);
})(jQuery);
