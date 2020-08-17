import React from 'react';
import './App.css';
import ReactBarrel from './lib/react-barrel'

let fakeData: data[] = [
  { src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2505874019,523750474&fm=26&gp=0.jpg' },
  { src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597662240239&di=7619679d7ac0c0905a591e41ff973abf&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fblog%2F201412%2F05%2F20141205173541_Rawnk.jpeg' },
  {src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597662310953&di=17f68b382d443d2ee144ed10840b4a50&imgtype=0&src=http%3A%2F%2F07imgmini.eastday.com%2Fmobile%2F20181107%2Fe34e1080d223c33d479fa1783cfba204_wmk.jpeg'},
  {src:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2653113887,1870422411&fm=26&gp=0.jpg"}
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
