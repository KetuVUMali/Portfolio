if ($("body").not(".is-mobile").hasClass("tw-magic-cursor")) {
  $(".tw-magnetic-item").wrap('<div class="tw-magnetic-wrap"></div>');

  if ($("a.tw-magnetic-item").length) {
    $("a.tw-magnetic-item").addClass("not-hide-cursor");
  }

  var $mouse = { x: 0, y: 0 }; // Cursor position
  var $pos = { x: 0, y: 0 }; // Cursor position
  var $ratio = 0.15; // delay follow cursor
  var $active = false;
  var $ball = $("#ball");

  var $ballWidth = 5; // Ball default width
  var $ballHeight = 5; // Ball default height
  var $ballScale = 1; // Ball default scale
  var $ballOpacity = 1; // Ball default opacity
  var $ballBorderWidth = 1; // Ball default border width

  gsap.set($ball, {
    // scale from middle and style ball
    xPercent: -50,
    yPercent: -50,
    width: $ballWidth,
    height: $ballHeight,
    borderWidth: $ballBorderWidth,
    opacity: $ballOpacity,
  });

  // Performance: the follow-the-mouse loop only runs while the ball is still
  // catching up with the pointer (it used to run on every animation frame
  // forever), and the cursor is only faded in when it was actually hidden
  // (it used to create a brand-new GSAP tween on every single mousemove
  // event, i.e. hundreds per second while scrolling with the mouse).
  var $cursorShown = false;
  var $following = false;

  function showCursor() {
    if ($cursorShown) return;
    $cursorShown = true;
    gsap.to("#magic-cursor", { duration: 0.3, autoAlpha: 1, overwrite: "auto" });
  }

  function hideCursor() {
    $cursorShown = false;
    gsap.to("#magic-cursor", { duration: 0.3, autoAlpha: 0, overwrite: "auto" });
  }

  document.addEventListener("mousemove", mouseMove, { passive: true });

  function mouseMove(e) {
    $mouse.x = e.clientX;
    $mouse.y = e.clientY;
    showCursor();
    if (!$following) {
      $following = true;
      gsap.ticker.add(updatePosition);
    }
  }

  function updatePosition() {
    if (!$active) {
      var dx = $mouse.x - $pos.x;
      var dy = $mouse.y - $pos.y;
      if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
        // Caught up: snap, then stop ticking until the mouse moves again.
        $pos.x = $mouse.x;
        $pos.y = $mouse.y;
        gsap.set($ball, { x: $pos.x, y: $pos.y });
        gsap.ticker.remove(updatePosition);
        $following = false;
        return;
      }
      $pos.x += dx * $ratio;
      $pos.y += dy * $ratio;

      gsap.set($ball, { x: $pos.x, y: $pos.y });
    }
  }

  // Show/hide magic cursor //

  // Hide on hover//
  $("a, button, .tw-cart-minus, .tw-cart-plus") // class "hide-cursor" is for global use.
    .not(".cursor-hide") // omit from selection.
    .on("mouseenter", function () {
      gsap.to($ball, { duration: 0.3, scale: 0, opacity: 0 });
    })
    .on("mouseleave", function () {
      gsap.to($ball, {
        duration: 0.3,
        scale: $ballScale,
        opacity: $ballOpacity,
      });
    });

  // Hide on click//
  $("a")
    .not('[target="_blank"]') // omit from selection.
    .not(".cursor-hide") // omit from selection.
    .not('[href^="#"]') // omit from selection.
    .not('[href^="mailto"]') // omit from selection.
    .not('[href^="tel"]') // omit from selection.
    .not(".lg-trigger") // omit from selection.
    .not(".tw-btn-disabled a") // omit from selection.
    .on("click", function () {
      gsap.to($ball, { duration: 0.3, scale: 1.3, autoAlpha: 0 });
    });

  // Show/hide on document leave/enter//
  $(document)
    .on("mouseleave", function () {
      hideCursor();
    })
    .on("mouseenter", function () {
      showCursor();
    });

  // (Showing the cursor as the mouse moves is handled in mouseMove above.)

  // Cursor view on hover (data attribute "data-cursor="...").
  $("[data-cursor]").each(function () {
    $(this)
      .on("mouseenter", function () {
        $("#ball").addClass("with-blur");
        $ball.append('<div class="ball-view"></div>');
        $(".ball-view").append($(this).attr("data-cursor"));
        gsap.to(ball, {
          duration: 0.3,
          yPercent: -75,
          width: 140,
          height: 140,
          opacity: 1,
          borderWidth: 1,
          zIndex: 1,
          backdropFilter: "blur(14px)",
          backgroundColor: "#ff6644",
          boxShadow: "0px 1px 3px 0px rgba(18, 20, 32, 0.14)",
        });
        gsap.to(".ball-view", { duration: 0.3, scale: 1, autoAlpha: 1 });
      })
      .on("mouseleave", function () {
        gsap.to(ball, {
          duration: 0.3,
          yPercent: -50,
          width: $ballWidth,
          height: $ballHeight,
          opacity: $ballOpacity,
          borderWidth: $ballBorderWidth,
          backgroundColor: "#1c1d21",
        });
        gsap.to(".ball-view", {
          duration: 0.3,
          scale: 0,
          autoAlpha: 0,
          clearProps: "all",
        });
        $ball.find(".ball-view").remove();
      });
    $(this).addClass("not-hide-cursor");
  });
}
