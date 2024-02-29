import React, {useMemo} from "react";
import {Box} from "@mui/material";
import ReactApexChart from "react-apexcharts";
import {ApexOptions} from "apexcharts";
import {Parameter} from "../../../../base";
import {useExecutionGraphStepCount, useWidthAndHeight} from "../../../../../hooks";
import {EColor} from "../../../../../constant";
import {createChartSeries} from "../../../../../service/diagram/createChartSeries";
import {IDiagramNodeBaseData, INodeHistory} from "../../../../../interface";
import {ElementParameter} from "./ElementParameter";
import {ChartGridBackground} from "../../../../../assets/svg/ChartGridBackground";
import {nodeChartColorMap} from "../../../../../service";


const options: ApexOptions = {
    xaxis: {
        labels: {
            show: false,
        },
    },
    yaxis: {
        show: false,
    },
    fill: {
        type: "gradient",
        gradient: {
            shade: "light",
            type: "vertical",
            shadeIntensity: 0,
            opacityFrom: 0.7,
            opacityTo: 0.2
        }
    },
    colors: [EColor.darkRed],
    legend: {
        show: true,
        position: 'top',
    },
    tooltip: {
        enabled: false
    },
    chart: {
        type: 'area',
        background: 'transparent',
        // background: EColor.darkMarineLight,
        zoom: {
            enabled: false
        },
        parentHeightOffset: 0,
        toolbar: {
            show: false
        },
        redrawOnParentResize: true,
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        show: true,
        lineCap: 'butt',
        colors: undefined,
        width: 2,
        dashArray: 0,
    },
    grid: {
        // borderColor: EColor.black,
        padding: {
            top: -29,
            right: 1,
            bottom: -13,
            left: 1,
        },
        xaxis: {

            lines: {
                offsetX: 1,
                offsetY: 1,
                show: false
            }
        },
        yaxis: {
            lines: {
                offsetX: 1,
                offsetY: 1,
                show: false
            }
        },
    }
}


export const VariableStatisticsParameter: React.FC<{
    nodeData: IDiagramNodeBaseData & INodeHistory,
}> = ({nodeData}) => {
    const resourcesCountHistory = nodeData.history
    const stepCount = useExecutionGraphStepCount()

    const series = useMemo(() => {
        const chartSeries = createChartSeries(nodeData, 0, stepCount)
        const color = nodeChartColorMap[nodeData.type]
        return  {
            ...chartSeries,
            color,
        }
    }, [nodeData])


    const {elementRef, elementSize} = useWidthAndHeight()

    const avg = resourcesCountHistory && resourcesCountHistory.reduce((acc, b) => acc + b, 0) / resourcesCountHistory.length

    const min = resourcesCountHistory.length > 0 && Math.min(...resourcesCountHistory)
    const max = resourcesCountHistory.length > 0 && Math.max(...resourcesCountHistory)

    const avgFormatted = avg ? avg?.toFixed(2) : ''
    const maxFormatted = max ? max?.toFixed(2) : ''
    const minFormatted = min ? min?.toFixed(2) : ''

    return (
        <Box>
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    height: 137,
                    overflow: 'hidden',
                    borderColor: EColor.grey9,
                    borderWidth: 1,
                    borderRadius: 4,
                    borderStyle: 'solid',
                    boxSizing: 'border-box',
                }}
                ref={elementRef}
            >
                <ReactApexChart
                    width={elementSize.width}
                    height={elementSize.height}
                    options={options}
                    series={[series]}
                    type="area"
                />
                <Box sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,

                }}>
                    <ChartGridBackground/>
                </Box>
            </Box>
            <Box sx={{
                marginTop: '16px',
                paddingTop: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
            }}>

                <ElementParameter label="Max Value:" isRow>
                    <Parameter.Input value={maxFormatted} sx={{
                        background: 'transparent',
                        width: 164,
                    }}/>
                </ElementParameter>
                <ElementParameter label="Average Value:" isRow>
                    <Parameter.Input value={avgFormatted} sx={{
                        background: 'transparent',
                        width: 164,
                    }}/>
                </ElementParameter>

                <ElementParameter label="Minimum Value: " isRow>
                    <Parameter.Input value={minFormatted} sx={{
                        background: 'transparent',
                        width: 164,
                    }}/>
                </ElementParameter>

            </Box>

        </Box>
    )
}
