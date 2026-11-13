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

  // The protections below apply to page content only. Form fields (contact
  // form, chatbot input) must stay fully usable: calling preventDefault on
  // mousedown/selectstart/paste for them made it impossible to click into the
  // fields or paste an email address.
  function isEditableTarget(t) {
    return !!(t && t.closest && t.closest("input, textarea, select, [contenteditable='true']"));
  }

  // Disable Right Click Context Menu
  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
    return false;
  });

  // Disable Text Selection
  document.addEventListener("selectstart", function (e) {
    if (isEditableTarget(e.target)) return;
    e.preventDefault();
    return false;
  });

  document.addEventListener("mousedown", function (e) {
    if (isEditableTarget(e.target)) return;
    e.preventDefault();
    return false;
  }, true);

  // Disable Keyboard Shortcuts (Ctrl+C, Ctrl+V, Ctrl+X, Ctrl+S, Ctrl+A, Ctrl+U, F12)
  document.addEventListener("keydown", function (e) {
    // Let people copy / paste / cut / select-all inside form fields.
    var editable = isEditableTarget(e.target);
    // Ctrl+C - Copy
    if (!editable && (e.ctrlKey || e.metaKey) && e.keyCode === 67) {
      e.preventDefault();
      return false;
    }
    // Ctrl+V - Paste
    if (!editable && (e.ctrlKey || e.metaKey) && e.keyCode === 86) {
      e.preventDefault();
      return false;
    }
    // Ctrl+X - Cut
    if (!editable && (e.ctrlKey || e.metaKey) && e.keyCode === 88) {
      e.preventDefault();
      return false;
    }
    // Ctrl+A - Select All
    if (!editable && (e.ctrlKey || e.metaKey) && e.keyCode === 65) {
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
    if (isEditableTarget(e.target)) return;
    e.preventDefault();
    return false;
  });

  document.addEventListener("drop", function (e) {
    if (isEditableTarget(e.target)) return;
    e.preventDefault();
    return false;
  });

  // Disable Copy from paste event
  document.addEventListener("copy", function (e) {
    if (isEditableTarget(e.target)) return;
    e.preventDefault();
    return false;
  });

  // Disable Cut from cut event
  document.addEventListener("cut", function (e) {
    if (isEditableTarget(e.target)) return;
    e.preventDefault();
    return false;
  });

  // Disable Paste from paste event
  document.addEventListener("paste", function (e) {
    if (isEditableTarget(e.target)) return;
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
  // The animation (text lift -> curve -> flatten -> slide up) is unchanged; the
  // old 1s initial delay and slow segments added ~1.2s of pure waiting before
  // the page could be seen, so they are trimmed.
  function runPreloader() {
    if (!document.querySelector(".preloader")) return;
    // Create GSAP timeline
    const tl = gsap.timeline();
    const svg = document.getElementById("preloaderSvg");
    const curve = "M0 502S175 272 500 272s500 230 500 230V0H0Z";
    const flat = "M0 2S175 1 500 1s500 1 500 1V0H0Z";
    // Text animation
    tl.to(".preloader-heading .load-text, .preloader-heading .cont", {
      delay: 0.2,
      y: -80,
      opacity: 0,
      duration: 0.5,
    })
      // SVG curve animation
      .to(svg, {
        duration: 0.5,
        attr: { d: curve },
        ease: "power2.inOut",
      })
      // Flatten SVG
      .to(svg, {
        duration: 0.5,
        attr: { d: flat },
        ease: "power2.inOut",
      })
      // Curtain starts lifting: start the page's reveal animations now so the
      // hero animates in as it becomes visible.
      .add(function () {
        document.dispatchEvent(new Event("twPreloaderDone"));
      })
      // Slide preloader up
      .to(".preloader", {
        y: "-130%",
        duration: 0.7,
        ease: "power4.inOut",
      })
      // Remove from DOM flow
      .set(".preloader", {
        display: "none",
        zIndex: -1,
      });
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", runPreloader);
  } else {
    runPreloader();
  }

  ////////////////////////////////////////////////////
  // 02. Sticky Js
  (function () {
    var $header = $(".header");
    var isFixed = false;
    var ticking = false;
    function updateHeader() {
      ticking = false;
      var y = window.pageYOffset || document.documentElement.scrollTop || 0;
      var shouldFix = y >= 260;
      if (shouldFix !== isFixed) {
        isFixed = shouldFix;
        $header.toggleClass("fixed-header", shouldFix);
      }
    }
    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          ticking = true;
          window.requestAnimationFrame(updateHeader);
        }
      },
      { passive: true }
    );
    updateHeader();
  })();

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
  // 07. AOS Js  (scroll-reveal animations)
  //
  // How the reveals are organised (one clear rule per kind of element):
  //  - Hero: plays AFTER the preloader lifts (it used to finish behind the
  //    preloader, so visitors never saw it).
  //  - Section headings / text blocks: fade-up (as authored in the HTML).
  //  - Cards (projects, portfolio, services, about column): the CARD animates as
  //    one unit. Nothing inside a card animates on its own any more - 248 of the
  //    323 animated elements used to sit inside another animated element, which
  //    produced doubled, jittery motion (and animated the live-preview iframes).
  //  - Cards in the same row are staggered left -> right.
  //  - Hover effects keep working after the reveal (see "after reveal" below).
  var AOS_REPLAY = false; // true = animations replay when scrolling back up

  function setAos(element, animation, duration, delay) {
    if (!element) return;
    element.setAttribute("data-aos", animation);
    element.setAttribute("data-aos-duration", duration);
    element.setAttribute("data-aos-delay", delay);
  }
  function clearAos(element) {
    ["data-aos", "data-aos-duration", "data-aos-delay", "data-aos-offset", "data-aos-easing"].forEach(function (attribute) {
      element.removeAttribute(attribute);
    });
  }
  // Remove AOS from everything inside the given containers (the container itself keeps its own).
  function flattenAos(selector) {
    document.querySelectorAll(selector).forEach(function (container) {
      container.querySelectorAll("[data-aos]").forEach(clearAos);
    });
  }

  // Project cards: 3-column grid -> stagger within each row (0 / 120 / 240 ms).
  document.querySelectorAll(".react-project-card").forEach(function (card, index) {
    setAos(card, "fade-up", 800, (index % 3) * 120);
  });
  flattenAos(".react-project-card");

  // Portfolio (work) cards: 2-column layout -> stagger 0 / 140 ms per row.
  document.querySelectorAll(".portfolio-three-wrapper").forEach(function (wrapper) {
    clearAos(wrapper);
    wrapper.querySelectorAll(".portfolio-three-item").forEach(function (card, index) {
      setAos(card, "fade-up", 800, (index % 2) * 140);
    });
  });
  flattenAos(".portfolio-three-item");

  // Experience rows: each row is one animation (small settle-in stagger).
  document.querySelectorAll(".feature-three-wrapper").forEach(function (wrapper) {
    clearAos(wrapper);
    wrapper.querySelectorAll(".feature-three-single").forEach(function (row, index) {
      setAos(row, "fade-up", 700, Math.min(index * 120, 360));
    });
  });
  flattenAos(".feature-three-single");

  // Services rows, About text column: unit animations too.
  flattenAos(".service-three-single");
  flattenAos(".about-three-right");

  // Skill logos: independent reveals, staggered by column.
  document.querySelectorAll(".skills-grid").forEach(function (grid) {
    grid.querySelectorAll(".skill-logo").forEach(function (logo, index) {
      var col = index % 4;
      var row = Math.floor(index / 4);
      setAos(logo, "fade-up", 700, 100 + col * 100 + (row % 2) * 50);
      logo.setAttribute("data-aos-offset", "100");
      logo.setAttribute("data-aos-easing", "ease-out-cubic");
    });
  });

  // The reveal waits for the preloader (event fired in section 01 below).
  var hasPreloader = !!document.querySelector(".preloader");
  AOS.init({
    startEvent: hasPreloader ? "twPreloaderDone" : "DOMContentLoaded",
    once: !AOS_REPLAY,
    mirror: AOS_REPLAY,
    offset: 90,
    duration: 800,
    easing: "ease-out-cubic",
    anchorPlacement: "top-bottom",
    // All data-aos nodes exist before init, so the body-wide MutationObserver
    // isn't needed.
    disableMutationObserver: true,
    disable: function () {
      // Respect users who prefer reduced motion: skip AOS animation
      // entirely for them so content is immediately visible.
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    },
  });
  // Safety net: if the preloader timeline never fires (e.g. GSAP blocked),
  // still reveal the page.
  if (hasPreloader) {
    setTimeout(function () {
      document.dispatchEvent(new Event("twPreloaderDone"));
    }, 6000);
  }

  // After reveal: AOS leaves its long duration/delay on the element, which made
  // hover effects (card lift, border colour) sluggish and delayed, and its
  // transform overrode the cards' hover transform. Once a card has finished
  // revealing, hand its transitions back to normal hover timing.
  // (This AOS build has no events, so watch the cards' class list instead.)
  if (window.MutationObserver) {
    var cardObserver = new MutationObserver(function (records) {
      records.forEach(function (record) {
        var node = record.target;
        if (!node.classList.contains("aos-animate") || node.getAttribute("data-reveal-done")) return;
        node.setAttribute("data-reveal-done", "1");
        var total = (parseInt(node.getAttribute("data-aos-duration"), 10) || 800) + (parseInt(node.getAttribute("data-aos-delay"), 10) || 0);
        setTimeout(function () {
          node.style.transitionDelay = "0s";
          node.style.transitionDuration = "0.4s";
          node.style.transitionProperty = "transform, translate, box-shadow, border-color, background-color";
        }, total + 80);
      });
    });
    document
      .querySelectorAll(".react-project-card, .portfolio-three-item, .service-three-single, .feature-three-single")
      .forEach(function (node) {
        cardObserver.observe(node, { attributes: true, attributeFilter: ["class"] });
      });
  }

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
      if (window.twSmoother && typeof window.twSmoother.scrollTo === "function") {
        window.twSmoother.scrollTo(0, true);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
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
  // The only .open-popup links live in the hidden (d-none) testimonial block,
  // so the plugin (JS + CSS) is fetched on demand, only if one becomes visible.
  var popupTriggers = $(".open-popup");
  if (popupTriggers.length && popupTriggers[0].getClientRects().length) {
    window.twLoadAssets(
      {
        css: ["assets/css/magnific-popup.css"],
        js: ["assets/js/magnific-popup.min.js"],
      },
      function () {
        popupTriggers.magnificPopup({
          type: "iframe",
          removalDelay: 300,
          mainClass: "mfp-fade",
        });
      }
    );
  }

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
      "Ketan's strengths include 2.5+ years of practical frontend experience, working with both Angular and React, strong Figma-to-code implementation, responsive design, reusable components, and comfort working with existing codebases."
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
  var scaleQueued = false;
  function queueScaleProjectIframePreviews() {
    if (scaleQueued) return;
    scaleQueued = true;
    window.requestAnimationFrame(function () {
      scaleQueued = false;
      scaleProjectIframePreviews();
    });
  }
  window.addEventListener("load", scaleProjectIframePreviews);
  window.addEventListener("resize", queueScaleProjectIframePreviews, { passive: true });
  document.addEventListener("DOMContentLoaded", scaleProjectIframePreviews);
  setTimeout(scaleProjectIframePreviews, 600);
  setTimeout(scaleProjectIframePreviews, 1500);

  ////////////////////////////////////////////////////
  // 17. Live Project Iframe Loading (the biggest scroll/jank fix)
  // The page embeds 14 complete external websites as live previews. Loading
  // all of them (each with its own CSS, JS, images and animations) and keeping
  // them all running made loading and scrolling stutter on laptops and
  // phones. The previews look exactly the same, but each one is now only
  // loaded while it is on / near the screen, and released again once it is
  // well out of view. At most a handful are alive at once.
  (function () {
    var frames = Array.prototype.slice.call(document.querySelectorAll("iframe[data-src]"));
    if (!frames.length) return;

    var smallScreen = window.matchMedia("(max-width: 767px), (pointer: coarse)").matches;
    var MAX_LIVE = smallScreen ? 3 : 6; // hard cap on simultaneously loaded previews
    var LOAD_AHEAD = 0.6; // start loading when within 60% of a screen height
    var RELEASE_AFTER = 1.4; // release when more than 140% of a screen away

    function setLive(frame, live) {
      var isLive = frame.getAttribute("data-live") === "1";
      if (live && !isLive) {
        frame.removeAttribute("loading"); // we control timing now
        frame.setAttribute("data-live", "1");
        frame.src = frame.getAttribute("data-src");
      } else if (!live && isLive) {
        frame.setAttribute("data-live", "0");
        frame.src = "about:blank"; // frees the page's memory, timers and animations
      }
    }

    function evaluate() {
      var vh = window.innerHeight || document.documentElement.clientHeight;
      var info = frames.map(function (frame) {
        var r = (frame.parentNode || frame).getBoundingClientRect();
        var dist = r.top > vh ? r.top - vh : r.bottom < 0 ? -r.bottom : 0;
        return { frame: frame, dist: dist, live: frame.getAttribute("data-live") === "1" };
      });

      info.forEach(function (it) {
        if (it.dist <= vh * LOAD_AHEAD) setLive(it.frame, true);
        else if (it.dist > vh * RELEASE_AFTER) setLive(it.frame, false);
      });

      // Hard cap: if too many are alive, release the ones farthest from the screen.
      var alive = info.filter(function (it) {
        return it.frame.getAttribute("data-live") === "1";
      });
      if (alive.length > MAX_LIVE) {
        alive
          .sort(function (a, b) {
            return b.dist - a.dist;
          })
          .slice(0, alive.length - MAX_LIVE)
          .forEach(function (it) {
            if (it.dist > 0) setLive(it.frame, false); // never release one that's on screen
          });
      }
    }

    var timer = null;
    var last = 0;
    function schedule() {
      if (timer) return;
      var wait = Math.max(0, 200 - (Date.now() - last));
      timer = setTimeout(function () {
        timer = null;
        last = Date.now();
        evaluate();
      }, wait);
    }

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    // Start after the page has settled so previews never compete with first load.
    var start = function () {
      setTimeout(schedule, 400);
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start);
  })();
})(jQuery);
