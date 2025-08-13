// Check if the page is in dark mode
const isDarkMode = document.body.classList.contains("bg-dark");

// Initialize the chart with dynamic color based on the mode
var options = {
  chart: {
    height: 350,
    type: "bar",
    toolbar: {
      show: false, // Hide the entire toolbar (removes home, download, etc.)
    },
  },
  series: [
    {
      name: "Usage Percentage",
      data: [12, 8, 45, 78, 65, 32], // Usage percentages
    },
  ],
  xaxis: {
    categories: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
  },
  plotOptions: {
    bar: {
      horizontal: true,
      barHeight: "50%",
    },
  },
  dataLabels: {
    enabled: true,
    formatter: function (val) {
      return val + "%";
    },
    style: {
      fontSize: "14px",
      fontWeight: "bold",
      // Dynamic color based on dark or light mode
      colors: isDarkMode ? ["#fff"] : ["#000"], // White color in dark mode, black in light mode
    },
  },
  colors: ["#007bff"],
  tooltip: {
    y: {
      formatter: function (val) {
        return val + "%";
      },
    },
  },
};

// Select the container where the chart will be rendered
var chart = new ApexCharts(
  document.querySelector("#station_usage_hours"),
  options
);

// Render the chart
chart.render();

// ####################################################################################################

var el = document.getElementById("activity_chart");
var chart = echarts.init(el);

const activePct = 72;
const idlePct = 28;

function optionFor(width) {
  const small = width < 480;

  return {
    color: ["#34C38F", "#E1E4EC"],
    tooltip: {
      trigger: "item",
      backgroundColor: "#000",
      textStyle: { color: "#fff" },
      borderWidth: 0,
      padding: [6, 8],
      formatter: (p) => `<b>${p.name}: ${Math.round(p.value)}%</b>`,
    },
    legend: {
      bottom: 0,
      data: ["Active Time", "Idle Time"],
      textStyle: { color: "#666", fontSize: small ? 10 : 12 },
    },

    // Center group: EMPTY by default (no center text shown)
    graphic: {
      id: "centerGroup",
      type: "group",
      left: "center",
      top: "middle",
      children: [
        {
          id: "centerTop",
          type: "text",
          top: -8,
          style: {
            text: "", // empty initially
            fill: "#34C38F",
            fontSize: small ? 20 : 24,
            fontWeight: 700,
            textAlign: "center",
            textVerticalAlign: "middle",
          },
        },
        {
          id: "centerBottom",
          type: "text",
          top: 14,
          style: {
            text: "", // empty initially
            fill: "#34C38F",
            fontSize: small ? 12 : 14,
            fontWeight: 500,
            textAlign: "center",
            textVerticalAlign: "middle",
          },
        },
      ],
    },

    series: [
      {
        name: "Station Activity Status",
        type: "pie",
        radius: ["55%", "78%"],
        center: ["50%", "50%"],
        labelLine: { show: false },
        data: [
          { value: activePct, name: "Active Time" },
          { value: idlePct, name: "Idle Time" },
        ],
        label: {
          show: true,
          position: "inside",
          formatter: (p) => `${Math.round(p.value)}%`,
          color: "#000", // white text
          fontSize: small ? 11 : 12,
          fontWeight: 600,
        },
        emphasis: { scale: true, scaleSize: 6 },
      },
    ],
  };
}

// render
chart.setOption(optionFor(el.clientWidth));

// On hover → show center value + label in slice color
chart.on("mouseover", (p) => {
  if (p.seriesType !== "pie") return;
  chart.setOption({
    graphic: {
      id: "centerGroup",
      children: [
        {
          id: "centerTop",
          style: { text: `${Math.round(p.value)}%`, fill: p.color },
        },
        { id: "centerBottom", style: { text: p.name, fill: p.color } },
      ],
    },
  });
});

// When not hovering → clear center (show nothing)
chart.on("globalout", () => {
  chart.setOption({
    graphic: {
      id: "centerGroup",
      children: [
        { id: "centerTop", style: { text: "" } },
        { id: "centerBottom", style: { text: "" } },
      ],
    },
  });
});

// responsive
const ro = new ResizeObserver((es) => {
  for (const e of es) {
    chart.resize();
    chart.setOption(optionFor(e.contentRect.width), false, true);
  }
});
ro.observe(el);
window.addEventListener("resize", () => {
  chart.resize();
  chart.setOption(optionFor(el.clientWidth), false, true);
});

// ############################################################################################################

document.addEventListener("DOMContentLoaded", function () {
  const dateRangeSelect = document.getElementById("dateRange");
  const startDateGroup = document.getElementById("startDateGroup");
  const endDateGroup = document.getElementById("endDateGroup");

  // Function to toggle visibility based on "Custom Range"
  function toggleDateRangeFields() {
    if (dateRangeSelect.value === "Custom Range") {
      startDateGroup.style.display = "block"; // Show the start date input
      endDateGroup.style.display = "block"; // Show the end date input
    } else {
      startDateGroup.style.display = "none"; // Hide the start date input
      endDateGroup.style.display = "none"; // Hide the end date input
    }
  }

  // Initialize the display based on the current selection
  toggleDateRangeFields();

  // Add event listener for changes in the date range selection
  dateRangeSelect.addEventListener("change", toggleDateRangeFields);
});
