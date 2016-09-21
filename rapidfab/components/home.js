import React                    from 'react'
import Chart, { SeriesStyle }   from 'rapidfab/components/chart'
import * as BS                  from 'react-bootstrap'
import Error                    from 'rapidfab/components/error'
import Fa                       from 'react-fontawesome'

const RunsByStatusChart = ({ data }) => {
  const datasets = [{
    label: "Status",
    backgroundColor: [
      SeriesStyle.Warning.color,
      SeriesStyle.Info.color,
      SeriesStyle.Default.color,
      SeriesStyle.Primary.color,
      SeriesStyle.Danger.color,
      SeriesStyle.Success.color,
    ],
    hoverBackgroundColor: [
      SeriesStyle.Warning.hover,
      SeriesStyle.Info.hover,
      SeriesStyle.Default.hover,
      SeriesStyle.Primary.hover,
      SeriesStyle.Danger.hover,
      SeriesStyle.Success.hover,
    ],
    data
  }]
  return <Chart
    title="Run Status"
    type="bar"
    data={{
      labels: ["Pending", "Queued", "Printing", "Post Processing", "Error", "Complete"],
      datasets
    }}
  />
}

const Home = ({ fetching, apiErrors, chartData }) => (
  <BS.Grid fluid>
    <BS.Row>
      <BS.Col xs={12}>
        <Error errors={apiErrors}/>
      </BS.Col>
    </BS.Row>
    {(() => {
      if(fetching) {
        return (
          <BS.Row>
            <BS.Col xs={12}>
              <div style={{ textAlign: "center" }}>
                <Fa name="spinner" spin size='2x' />
              </div>
            </BS.Col>
          </BS.Row>
        )
      } else {
        return (
          <BS.Row>
            <BS.Col xs={6}>
            </BS.Col>
            <BS.Col xs={6}>
              <RunsByStatusChart data={chartData.runStatus}/>
            </BS.Col>
          </BS.Row>
        )
      }
    })()}
  </BS.Grid>
)

export default Home
