import React, { type FC } from "react"
import { Bar } from "react-chartjs-2"

type Props = {
    data: {
        label: string,
        count: number,
        color: string
    }[],
    size: number
}


const MostStarred:FC<Props> = (props:Props) => {

    const { data, size } = props

    return (
        <div className="chart">
                <header>
                    <h2>
                        Most Starred
                    </h2>
                </header>
                <main className="chart-container">
                    <Bar
                        fallbackContent="No data to display"
                        height={size}
                        width={size}
                        data={{
                            labels: data.map((item) => item.label),
                            datasets: [
                                {
                                    data: data.map((item) => item.count),
                                    backgroundColor: data.map((item) => item.color),
                                    borderColor: data.map((item) => item.color),
                                }
                            ]
                        }}
                        options={{
                            color: "#93a2b7",
                            plugins: {
                                legend: {
                                    display: false,
                                },
                                
                            },
                            scales: {
                                y: {
                                    display: true,
                                },
                                x: {
                                    display: true,
                                }
                            }
                        }}
                    />
                </main>
            </div>
    )
}

export default MostStarred