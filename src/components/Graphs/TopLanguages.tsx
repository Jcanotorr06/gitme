import React, { type FC } from "react"
import { Pie } from "react-chartjs-2"

type Props = {
    data: {
        label: string,
        count: number,
        color: string
    }[],
    size: number
}

const TopLanguages:FC<Props> = (props:Props) => {

    const { data, size } = props

    return (
        <div className="chart">
            <header>
                <h2>
                    Top Languages
                </h2>
            </header>
            <main className="chart-container">
                <Pie
                    fallbackContent="No data to display"
                    height={size}
                    width={size}
                    data={{
                        labels: data.map((item) => item.label),
                        datasets: [
                            {
                                data: data.map((item) => item.count),
                                backgroundColor: data.map((item) => item.color),
                                hoverOffset: 4,
                                borderColor: data.map((item) => item.color),
                            }
                        ]
                    }}
                    options={{
                        color: "#93a2b7",
                        plugins: {
                            legend: {
                                display: true,
                                position: "right",
                            },
                            
                        },
                        scales: {
                            y: {
                                display: false,
                            },
                            x: {
                                display: false,
                            }
                        }
                    }}
                />
            </main>
        </div>
    )
}

export default TopLanguages