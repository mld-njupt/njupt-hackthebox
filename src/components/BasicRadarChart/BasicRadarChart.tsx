import * as echarts from "echarts/core";
import "./BasicRadarChart.scss";
import {
  RadarChart,
  BarChart,
  // 系列类型的定义后缀都为 SeriesOption
  BarSeriesOption,
  LineChart,
  LineSeriesOption,
} from "echarts/charts";
import {
  TitleComponent,
  // 组件类型的定义后缀都为 ComponentOption
  TitleComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
  // 数据集组件
  DatasetComponent,
  DatasetComponentOption,
  // 内置数据转换器组件 (filter, sort)
  TransformComponent,
  ToolboxComponent,
  VisualMapComponent,
  LegendComponent,
} from "echarts/components";
import { LabelLayout, UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import { useEffect } from "react";
interface chartProp {
  title: string;
  series: string[];
}

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = echarts.ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
>;

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  RadarChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
  LineChart,
  ToolboxComponent,
  VisualMapComponent,
  LegendComponent,
]);

const BasicRadarChart = (props: chartProp) => {
  const option: ECOption = {
    backgroundColor: "#1a2332",
    // title: {
    //   text: "Basic Radar Chart",
    // },
    legend: {
      data: ["personal-score"],
    },
    radar: {
      // shape: 'circle',
      indicator: [
        { name: "Web", max: 100 },
        { name: "Pwn", max: 100 },
        { name: "Misc", max: 100 },
        { name: "Ppc", max: 100 },
        { name: "Crypto", max: 100 },
      ],
    },
    series: [
      {
        //@ts-ignore
        type: "radar",
        color: "#9fef00",
        data: [
          {
            value: props.series,
            name: "personal-score",
          },
        ],
      },
    ],
  };
  useEffect(() => {
    let chart: echarts.ECharts;
    chart = echarts.init(
      document.getElementById("chart-container") as HTMLElement,
      "dark",
      {
        width: 400,
        height: 400,
      }
    );
    chart.setOption(option);
    window.addEventListener("resize", (e: any) => {
      chart.resize();
    });
    return () => {
      chart.clear();
      chart.dispose();
      window.removeEventListener("resize", () => {});
    };
  }, [props]);
  return (
    <div style={{ width: "100%", height: "100%" }} id="chart-container"></div>
  );
};
export default BasicRadarChart;
