import { Navbar, Welcome, Footer, Services, Transactions, CryptoImg, MapImg } from "./components";

function App() {
  return (
    <div className="min-h-screen ">
      <div className="gradient-bg-welcome">
        <Navbar />
        <CryptoImg/>
        <Welcome />
      </div>
      <div className='gradient-bg-services'>
      <MapImg/>
      <Services />
      </div>
      <Transactions />
      <Footer />
    </div>
  );
}

export default App;
