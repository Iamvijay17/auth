import './App.css';
import Navbar from './layouts/navbar';

function App() {
  return (
    <div className="App">
      <div className="relative w-full h-screen">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
        >
          <source src={require('../src/assets/hero/hero_bg_video.mp4')} type="video/mp4" />
    Your browser does not support the video tag.
        </video>
        <div className="sticky top-0 z-20 bg-opacity-80 backdrop-blur-sm bg-white">
          <Navbar />
          <div className="absolute bottom-0 left-0 w-full h-4 bg-gradient-to-b "></div>
        </div>
        <div className="relative z-10">
    
        </div>
      </div>

    </div>
  );
}

export default App;
