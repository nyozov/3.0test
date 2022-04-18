import { useContext } from "react";
import { Navbar, Welcome, Footer, Services, Transactions, CryptoImg, MapImg } from "./components";
import { TransactionContext } from "./context/TransactionContext";

function App() {
  const { connectedAccount } = useContext(TransactionContext)
  return (
    <div className="min-h-screen">
      
      <Navbar />
      
      <div className="gradient-bg-welcome">
        
        <CryptoImg/>
        <Welcome />
      </div>
      <div className='gradient-bg-services'>
   
      {!connectedAccount && <Services />}
      </div>
      <Transactions />
      <Footer />
    </div>
  );
}

export default App;
