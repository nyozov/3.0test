import { Navbar, Welcome, Footer, Services, Transactions, CryptoImg, MapImg } from "./components";

function App() {
  return (
    <div className="min-h-screen">
      
      <Navbar />
      
      <div className="gradient-bg-welcome">
        
        <CryptoImg/>
        <Welcome />
      </div>
      <div className='gradient-bg-services'>
   
      <Services />
      </div>
      <Transactions />
      <Footer />
    </div>
  );
}

export default App;
