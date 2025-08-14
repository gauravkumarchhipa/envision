var revenuePerformanceOptions = {
  series: [
    {
      name: "Revenue",
      data: [12000, 8000, 25000, 45000, 38000, 32000], // Revenue values for the different times
    },
  ],
  chart: {
    type: "line", // Change chart type to 'line' for a line chart
    height: 268,
    toolbar: {
      show: false, // Hide the toolbar (including the home icon and other icons)
    },
    title: {
      text: "", // Remove the title from the chart
    },
  },
  colors: ["#0052cc"],
  dataLabels: {
    enabled: false, // Disable data labels on the chart by default
  },
  stroke: {
    show: true,
    curve: "smooth", // Smooth curve for the line chart
    width: 3,
  },
  markers: {
    size: 5,
    colors: "#0052cc",
    strokeColors: "#ffffff",
    strokeWidth: 2,
    fillOpacity: 1,
    shape: "circle",
  },
  grid: {
    borderColor: "#f7f7f7",
    yaxis: { lines: { show: true } },
  },
  xaxis: {
    categories: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
    labels: {
      style: { colors: "#333" },
    },
  },
  tooltip: {
    enabled: true, // Show tooltip on hover
    y: {
      formatter: function (val) {
        return "$" + val.toLocaleString(); // Show the value in tooltip with currency format
      },
    },
  },
  yaxis: {
    labels: {
      show: true,
      formatter: function (val) {
        return "$" + val.toLocaleString();
      },
    },
  },
};

// Initialize the chart

var revenuePerformanceChart = new ApexCharts(
  document.querySelector("#revenue_performance_chart"),
  revenuePerformanceOptions
);
revenuePerformanceChart.render();





var el = document.getElementById("kiosk_status_chart2");
var basicpieChart = echarts.init(el);

var activeValue = 156;
var inactiveValue = 12;

function makeOption(width) {
  const small = width < 480;
  return {
    tooltip: {
      trigger: "item",
      formatter: p => `<b>${p.name}</b>: ${p.value} (${p.percent}%)`,
    },
    legend: {
      bottom: 0,
      orient: "horizontal",
      data: ["Active", "Inactive"],
      textStyle: { color: "#fff", fontSize: small ? 10 : 12 }
    },
    color: ["#057637", "#ada5a5"],
    series: [{
      name: "Kiosk Status",
      type: "pie",
      radius: small ? "65%" : "72%",
      // keep it centered; nudge a bit up to leave room for legend
      center: ["50%", small ? "46%" : "47%"],
      data: [
        { value: activeValue, name: "Active" },
        { value: inactiveValue, name: "Inactive" },
      ],
      label: {
        show: true,
        position: "inside",
        formatter: p => p.value,          // show raw value
        fontSize: small ? 11 : 14,
        fontWeight: "bold",
        color: "#fff"
      },
      emphasis: {
        scale: true,
        label: { show: true, fontSize: small ? 13 : 16, fontWeight: "bold" }
      }
    }]
  };
}

// Initial render
basicpieChart.setOption(makeOption(el.clientWidth));

// Resize with container (best) and window (fallback)
const ro = new ResizeObserver(entries => {
  for (const e of entries) {
    basicpieChart.resize();
    basicpieChart.setOption(makeOption(e.contentRect.width), false, true);
  }
});
ro.observe(el);

window.addEventListener("resize", () => {
  basicpieChart.resize();
  basicpieChart.setOption(makeOption(el.clientWidth), false, true);
});