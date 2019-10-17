import React from 'react';
import './App.css';
import ReactBarrel from './react-barrel'

let fakeData: data[] = [
  { src: 'http://yy.aijk.xyz/rs/img//1/1/1-2_0_0.jpg' },
  { src: 'http://yy.aijk.xyz/rs/img//1/1/1-2_0_0.jpg' },
  { src: 'http://yy.aijk.xyz/rs/img//1/1/1-2_0_0.jpg' },
  { src: 'http://yy.aijk.xyz/rs/img//1/1/1-2_0_0.jpg' },
  { src: 'http://yy.aijk.xyz/rs/img//1/1/1-2_0_0.jpg' },
];
interface data {
  src?: string;
  width?: number;
  height?: number;
}

const App: React.FC = () => {
  return (
    <div className="App">
      <ReactBarrel
        data={fakeData}
      />
    </div>
  );
}

export default App;
