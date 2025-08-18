!(function (l) {
  "use strict";

  // ---------- helpers ----------
  function ymd(y, m, d) {
    m = String(m).padStart(2, "0");
    d = String(d).padStart(2, "0");
    return y + "-" + m + "-" + d;
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
  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // ---------- app ----------
  function App() {
    this.$body = l("body");
    this.$modal = new bootstrap.Modal(document.getElementById("event-modal"), {
      backdrop: "static",
    });
    this.$calendar = l("#calendar");
    this.$formEvent = l("#form-event");
    this.$btnNewEvent = l("#btn-new-event");
    this.$btnDeleteEvent = l("#btn-delete-event");
    this.$btnSaveEvent = l("#btn-save-event");
    this.$modalTitle = l("#modal-title");
    this.$calendarObj = null;
    this.$selectedEvent = null;
    this.$newEventData = null;
  }

  App.prototype.onEventClick = function (e) {
    this.$formEvent[0].reset();
    this.$formEvent.removeClass("was-validated");
    this.$newEventData = null;
    this.$btnDeleteEvent.show();
    this.$modalTitle.text("Edit Booking");
    this.$modal.show();
    this.$selectedEvent = e.event;
    l("#event-title").val(this.$selectedEvent.title);
    l("#event-category").val(this.$selectedEvent.classNames[0] || "");
    l("#event-name").val(this.$selectedEvent.extendedProps?.name || "");
  };

  App.prototype.onSelect = function (e) {
    this.$formEvent[0].reset();
    this.$formEvent.removeClass("was-validated");
    this.$selectedEvent = null;
    this.$newEventData = e;
    this.$btnDeleteEvent.hide();
    this.$modalTitle.text("Add Booking");
    this.$modal.show();
    this.$calendarObj.unselect();
  };

  App.prototype.init = function () {
    // ----- initial events (like your main.js) -----
    var now = new Date();
    var y = now.getFullYear();
    var m = now.getMonth() + 1;
    var d = now.getDate();

    var initialEvents = [
      {
        title: "DMC-0001",
        start: ymd(y, m, d - 2) + "T13:15:00",
        end: ymd(y, m, d - 2) + "T15:00:00",
        className: "bg-primary",
        extendedProps: { name: "Adam" },
      },
      {
        title: "DMC-9658",
        start: ymd(y, m, d - 1) + "T16:08:00",
        end: ymd(y, m, d - 1) + "T17:45:00",
        className: "bg-success",
        extendedProps: { name: "Roy" },
      },
      {
        title: "DMC-4583",
        start: ymd(y, m, d) + "T17:00:00",
        end: ymd(y, m, d) + "T18:30:00",
        className: "bg-success",
        extendedProps: { name: "Alice" },
      },
      {
        title: "DMC-4783",
        start: ymd(y, m, d) + "T19:00:00",
        end: ymd(y, m, d) + "T21:30:00",
        className: "bg-warning",
        extendedProps: { name: "Jack" },
      },
      {
        title: "DMC-4583",
        start: ymd(y, m, d) + "T11:00:00",
        end: ymd(y, m, d) + "T13:00:00",
        className: "bg-primary",
        extendedProps: { name: "William" },
      },
      {
        title: "DMC-0798",
        start: ymd(y, m, d + 1) + "T18:15:00",
        end: ymd(y, m, d + 1) + "T20:22:00",
        className: "bg-success",
        extendedProps: { name: "Paul" },
      },
      {
        title: "DMC-5685",
        start: ymd(y, m, d + 2) + "T13:15:00",
        end: ymd(y, m, d + 2) + "T15:00:00",
        className: "bg-primary",
        extendedProps: { name: "Bob" },
      },
      {
        title: "DMC-7596",
        start: ymd(y, m, d + 2) + "T16:08:00",
        end: ymd(y, m, d + 2) + "T17:45:00",
        className: "bg-success",
        extendedProps: { name: "Charlie" },
      },
      {
        title: "DMC-5963",
        start: ymd(y, m, d + 2) + "T14:15:00",
        end: ymd(y, m, d + 2) + "T16:00:00",
        className: "bg-warning",
        extendedProps: { name: "Charles" },
      },
      {
        title: "DMC-4863",
        start: ymd(y, m, d + 2) + "T18:08:00",
        end: ymd(y, m, d + 2) + "T20:45:00",
        className: "bg-warning",
        extendedProps: { name: " David" },
      },
      {
        title: "DMC-1563",
        start: ymd(y, m, d + 3) + "T14:15:00",
        end: ymd(y, m, d + 3) + "T16:00:00",
        className: "bg-primary",
        extendedProps: { name: "Dennis" },
      },
      {
        title: "DMC-7563",
        start: ymd(y, m, d + 3) + "T02:08:00",
        end: ymd(y, m, d + 3) + "T09:45:00",
        className: "bg-warning",
        extendedProps: { name: " Gregory" },
      },
      {
        title: "DMC-1598",
        start: ymd(y, m, d + 4) + "T08:15:00",
        end: ymd(y, m, d + 4) + "T10:45:00",
        className: "bg-primary",
        extendedProps: { name: "Billy" },
      },
      {
        title: "DMC-1698",
        start: ymd(y, m, d + 4) + "T13:15:00",
        end: ymd(y, m, d + 4) + "T16:45:00",
        className: "bg-warning",
        extendedProps: { name: "Dennis" },
      },
      {
        title: "DMC-0798",
        start: ymd(y, m, d + 4) + "T19:15:00",
        end: ymd(y, m, d + 4) + "T2:22:00",
        className: "bg-success",
        extendedProps: { name: "Joseph" },
      },
      {
        title: "DMC-007",
        start: ymd(y, m, d + 4) + "T22:15:00",
        end: ymd(y, m, d + 4) + "T23:45:00",
        className: "bg-primary",
        extendedProps: { name: "Thomas" },
      },
      {
        title: "DMC-1298",
        start: ymd(y, m, d + 5) + "T13:15:00",
        end: ymd(y, m, d + 5) + "T16:15:00",
        className: "bg-success",
        extendedProps: { name: "Steve" },
      },
      {
        title: "DMC-1787",
        start: ymd(y, m, d + 5) + "T05:15:00",
        end: ymd(y, m, d + 5) + "T09:45:00",
        className: "bg-primary",
        extendedProps: { name: "Harry" },
      },
    ];

    // external drag source (optional; keep if you use it)
    var external = document.getElementById("external-events");
    if (external) {
      new FullCalendar.Draggable(external, {
        itemSelector: ".external-event",
        eventData: function (el) {
          return { title: el.innerText, className: l(el).data("class") };
        },
      });
    }

    var self = this;

    self.$calendarObj = new FullCalendar.Calendar(self.$calendar[0], {
      themeSystem: "bootstrap",
      initialView: "timeGridWeek",
      headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
      },
      views: {
        dayGridMonth: {
          dayMaxEvents: 2, // show 2 events, then “+N more”
          // (or: dayMaxEventRows: 2)          // either works in month view

          // optional: customize the “more” text
          moreLinkContent: (args) => `+${args.num} more`,
          // optional: what happens when clicking “+N more”
          moreLinkClick: "popover", // 'popover' (default) | 'day' | function
        },
      },

      // show "start – end" on chips & labels
      displayEventEnd: true,
      eventTimeFormat: {
        hour: "numeric",
        minute: "2-digit",
        meridiem: "short",
        omitZeroMinute: true,
      },
      slotLabelFormat: {
        hour: "numeric",
        minute: "2-digit",
        meridiem: "short",
        omitZeroMinute: true,
      },

      selectable: true,
      editable: true,
      handleWindowResize: true,
      height: l(window).height() - 200,

      initialEvents: initialEvents,

      dateClick: function (e) {
        self.onSelect(e);
      },
      eventClick: function (e) {
        self.onEventClick(e);
      },

      // ----- tooltip on hover (time on first line, title + name on second) -----
      eventDidMount: function (info) {
        var start = formatTime(info.event.start);
        var end = formatTime(info.event.end);
        var timeRange = start && end ? start + " – " + end : start || "";

        var name =
          info.event.extendedProps && info.event.extendedProps.name
            ? " — " + esc(info.event.extendedProps.name)
            : "";

        var html =
          '<div class="fw-semibold">' +
          esc(timeRange) +
          "</div>" +
          "<div>" +
          esc(info.event.title) +
          name +
          "</div>";

        var tip = new bootstrap.Tooltip(info.el, {
          title: html,
          html: true,
          placement: "top",
          container: "body",
          trigger: "hover",
        });
        info.el._fcTip = tip;

        if (info.event.classNames && info.event.classNames.length) {
          info.el.classList.add(info.event.classNames[0]);
        }
      },

      eventWillUnmount: function (info) {
        if (info.el && info.el._fcTip) {
          info.el._fcTip.dispose();
          delete info.el._fcTip;
        }
      },
    });

    self.$calendarObj.render();

    // add new event button
    this.$btnNewEvent.on("click", function () {
      self.onSelect({ date: new Date(), allDay: true });
    });

    // form submit: create/update event (supports "name")
    this.$formEvent.on("submit", function (ev) {
      ev.preventDefault();
      var form = self.$formEvent[0];
      if (!form.checkValidity()) {
        ev.stopPropagation();
        form.classList.add("was-validated");
        return;
      }

      var titleVal = l("#event-title").val();
      var classVal = l("#event-category").val();
      var nameVal = l("#event-name").val();

      if (self.$selectedEvent) {
        self.$selectedEvent.setProp("title", titleVal);
        self.$selectedEvent.setProp("classNames", classVal ? [classVal] : []);
        self.$selectedEvent.setExtendedProp("name", nameVal || undefined);
      } else {
        var evt = {
          title: titleVal,
          start: self.$newEventData.date,
          allDay: self.$newEventData.allDay,
          className: classVal,
          extendedProps: {},
        };
        if (nameVal) evt.extendedProps.name = nameVal;
        self.$calendarObj.addEvent(evt);
      }
      self.$modal.hide();
    });

    // delete event
    this.$btnDeleteEvent.on("click", function () {
      if (self.$selectedEvent) {
        self.$selectedEvent.remove();
        self.$selectedEvent = null;
        self.$modal.hide();
      }
    });

    // keep height tidy
    window.addEventListener("resize", function () {
      self.$calendarObj.setOption("height", l(window).height() - 200);
    });
  };

  l.CalendarApp = new App();
  l.CalendarApp.Constructor = App;
})(window.jQuery);

(function () {
  "use strict";
  window.jQuery.CalendarApp.init();
})();
