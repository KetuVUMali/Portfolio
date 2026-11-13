/***************************************************
==================== JS INDEX ======================
****************************************************

00. On-demand asset loader (used for Swiper / Magnific Popup)
01. Brand Js
02. Testimonial Js
03. Service Js
04. Marquee Js
06. Testimonial Three Js

****************************************************/

(function ($) {
  "use strict";

  ////////////////////////////////////////////////////
  // 00. On-demand asset loader
  // Swiper (140 KB) and Magnific Popup (20 KB) only drive the testimonial
  // block, which is currently hidden (class "d-none"). Instead of making every
  // visitor download and run them, they are fetched only if a slider/popup is
  // actually visible. Make that block visible later and it still works.
  window.twLoadAssets = function (assets, done) {
    var pending = 0;
    function finished() {
      if (--pending <= 0 && typeof done === "function") done();
    }
    (assets.css || []).forEach(function (href) {
      if (document.querySelector('link[href="' + href + '"]')) return;
      var link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      document.head.appendChild(link);
    });
    var scripts = assets.js || [];
    if (!scripts.length) {
      if (typeof done === "function") done();
      return;
    }
    pending = scripts.length;
    // Load in order (a library may depend on the one before it).
    (function next(i) {
      if (i >= scripts.length) return;
      var el = document.createElement("script");
      el.src = scripts[i];
      el.onload = function () {
        finished();
        next(i + 1);
      };
      el.onerror = function () {
        finished();
        next(i + 1);
      };
      document.head.appendChild(el);
    })(0);
  };

  function isVisible(selector) {
    var el = document.querySelector(selector);
    return !!(el && el.getClientRects().length);
  }

  function initSliders() {
    ////////////////////////////////////////////////////
    // 01. Brand Js
    if (isVisible(".brand-active")) {
      new Swiper(".brand-active", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        speed: 2500,
        autoplay: true,
        breakpoints: {
          380: { slidesPerView: 1 },
          576: { slidesPerView: 2 },
          768: { slidesPerView: 2 },
          992: { slidesPerView: 3 },
          1200: { slidesPerView: 5 },
          1600: { slidesPerView: 6 },
        },
      });
    }

    ////////////////////////////////////////////////////
    // 02. Testimonial Js
    if (isVisible(".testimonial-active")) {
      new Swiper(".testimonial-active", {
        slidesPerView: 3,
        spaceBetween: 10,
        autoplay: true,
        speed: 1500,
        loop: true,
        breakpoints: {
          1200: { slidesPerView: 3 },
          992: { slidesPerView: 2 },
          768: { slidesPerView: 1 },
          576: { slidesPerView: 1 },
          0: { slidesPerView: 1 },
        },
        // Navigation arrows
        navigation: {
          nextEl: ".slider-next",
          prevEl: ".slider-prev",
        },
      });
    }

    ////////////////////////////////////////////////////
    // 03. Service Js
    if (isVisible(".service-active")) {
      new Swiper(".service-active", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        speed: 3500,
        autoplay: true,
        pagination: {
          el: "#paginations",
          type: "custom",
          renderCustom: function (swiper, current, total) {
            return `[${current}/${total}]`;
          },
        },
      });
    }

    ////////////////////////////////////////////////////
    // 06. Testimonial Three Js
    if (isVisible(".testimonial-three-active")) {
      new Swiper(".testimonial-three-active", {
        slidesPerView: 2,
        spaceBetween: 10,
        autoplay: true,
        speed: 1500,
        loop: true,
        breakpoints: {
          1200: { slidesPerView: 2 },
          992: { slidesPerView: 1 },
          768: { slidesPerView: 1 },
          576: { slidesPerView: 1 },
          0: { slidesPerView: 1 },
        },
        // Navigation arrows
        navigation: {
          nextEl: ".slider-next",
          prevEl: ".slider-prev",
        },
      });
    }
  }

  // Only pull Swiper in when at least one slider is on screen.
  var sliderSelectors = [".brand-active", ".testimonial-active", ".service-active", ".testimonial-three-active"];
  if (sliderSelectors.some(isVisible)) {
    window.twLoadAssets(
      {
        css: ["assets/css/swiper-bundle.css"],
        js: ["assets/js/swiper-bundle.min.js"],
      },
      initSliders
    );
  }

  ////////////////////////////////////////////////////
  // 04. Marquee Js
  if ($(".marquee_left").length) {
    $(".marquee_left").marquee({
      speed: 50,
      gap: 0,
      delayBeforeStart: 0,
      direction: $("html").attr("dir") === "rtl" ? "right" : "left",
      duplicated: true,
      pauseOnHover: true,
      startVisible: true,
      direction: "left",
      loop: -1,
    });
  }
})(jQuery);
