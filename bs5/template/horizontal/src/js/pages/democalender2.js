// main.js
(function () {
  "use strict";

  // ---- Helpers ----
  function ymd(y, m, d) {
    // month is 1-based
    var mm = String(m).padStart(2, "0");
    var dd = String(d).padStart(2, "0");
    return y + "-" + mm + "-" + dd;
  }

  function formatTime(date) {
    if (!date) return "";
    return FullCalendar.formatDate(date, {
      hour: "numeric",
      minute: "2-digit",
      meridiem: "short",
      omitZeroMinute: true,
      timeZone: "local",
    });
  }

  // ---- Seed events (edit as you like) ----
  var now = new Date();
  var y = now.getFullYear();
  var m = now.getMonth() + 1;
  var d = now.getDate();

  var initialEvents = [
    {
      title: "DMC-4583",
      start: ymd(y, m, d) + "T17:00:00",
      end: ymd(y, m, d) + "T18:00:00",
      className: "bg-success",
    },
    {
      title: "DMC-5685",
      start: ymd(y, m, d + 2) + "T13:15:00",
      end: ymd(y, m, d + 2) + "T14:00:00",
      className: "bg-primary",
    },
    {
      title: "DMC-7596",
      start: ymd(y, m, d + 2) + "T16:08:00",
      end: ymd(y, m, d + 2) + "T16:45:00",
      className: "bg-warning",
    },
    {
      title: "DMC-1598",
      start: ymd(y, m, d + 4) + "T18:15:00",
      end: ymd(y, m, d + 4) + "T19:45:00",
      className: "bg-danger",
    },
  ];

  // ---- Build calendar ----
  var calendarEl = document.getElementById("calendar");
  var calendar = new FullCalendar.Calendar(calendarEl, {
    themeSystem: "bootstrap",
    initialView: "dayGridMonth",
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay",
    },

    // Show "start – end" on the event chip
    displayEventEnd: true,
    eventTimeFormat: {
      hour: "numeric",
      minute: "2-digit",
      meridiem: "short",
      omitZeroMinute: true,
    },
    // Match time-grid labels too
    slotLabelFormat: {
      hour: "numeric",
      minute: "2-digit",
      meridiem: "short",
      omitZeroMinute: true,
    },

    selectable: true,
    editable: true,
    handleWindowResize: true,
    height: window.innerHeight - 200,

    initialEvents: initialEvents,

    // ----- Tooltip on hover: line1 time, line2 title -----
    eventDidMount: function (info) {
      // compute "5pm – 6pm"
      var start = formatTime(info.event.start);
      var end = formatTime(info.event.end);
      var timeRange = start && end ? start + " – " + end : start;

      // escape title for HTML (tiny util)
      function esc(s) {
        return String(s)
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;");
      }

      // Tooltip content: two lines (time on first, title on second)
      var html =
        '<div class="fw-semibold">' +
        esc(timeRange) +
        "</div>" +
        "<div>" +
        esc(info.event.title) +
        "</div>";

      // Bootstrap 5 tooltip
      var tip = new bootstrap.Tooltip(info.el, {
        title: html,
        html: true,
        placement: "top",
        container: "body",
        trigger: "hover",
      });
      // Keep a reference to dispose later
      info.el._fcTip = tip;

      // Optional: keep Bootstrap bg-* class if provided
      if (info.event.classNames && info.event.classNames.length) {
        info.el.classList.add(info.event.classNames[0]);
      }
    },

    // Clean up tooltip when event DOM is removed
    eventWillUnmount: function (info) {
      if (info.el && info.el._fcTip) {
        info.el._fcTip.dispose();
        delete info.el._fcTip;
      }
    },
  });

  calendar.render();

  // Keep map height tidy on resize
  window.addEventListener("resize", function () {
    calendar.setOption("height", window.innerHeight - 200);
  });
})();
