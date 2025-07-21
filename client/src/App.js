import React, { useEffect, useState } from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';

function App() {
  const [snippet, setSnippet] = useState('');

  useEffect(() => {
    fetch('http://localhost:4000/api/snippet/bar_chart_example')
      .then(res => res.json())
      .then(data => setSnippet(data.snippet));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Live Chart Renderer</h2>
      {snippet ? (
        <LiveProvider code={snippet} scope={getScope()}>
          <div style={{ display: 'flex', gap: 20 }}>
            <div style={{ flex: 1 }}>
              <h4>JSX Editor</h4>
              <LiveEditor />
              <LiveError />
            </div>
            <div style={{ flex: 1 }}>
              <h4>Rendered Chart</h4>
              <LivePreview />
            </div>
          </div>
        </LiveProvider>
      ) : (
        <p>Loading snippet...</p>
      )}
    </div>
  );
}

function getScope() {
  const {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
  } = require('recharts');

  return {
    React,
    ChartContainer: ({ data, chartType, config, height }) => (
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={config.xKey} />
          <YAxis />
          <Tooltip />
          <Bar dataKey={config.yKey} fill={config.colors[0]} />
        </BarChart>
      </ResponsiveContainer>
    ),
  };
}

export default App;
