import React, { useState, useEffect } from 'react';
import '../App.css'; 
import { useNavigate } from 'react-router-dom'; 
const { ethers } = require('ethers');
const {abi} = require("./abi")

const App = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchMemeTokens = async () => {
      try {
        console.log('🔍 Starting to fetch meme tokens...');
        console.log('📡 RPC URL:', process.env.REACT_APP_RPC_URL);
        console.log('📋 Contract Address:', process.env.REACT_APP_CONTRACT_ADDRESS);
      
        const provider = new ethers.JsonRpcProvider(process.env.REACT_APP_RPC_URL)
        console.log('✅ Provider created:', provider);

        const contract = new ethers.Contract(process.env.REACT_APP_CONTRACT_ADDRESS, abi, provider);
        console.log('✅ Contract instance created:', contract);

        const memeTokens = await contract.getAllMemeTokens();
        console.log('📊 Meme tokens fetched:', memeTokens);

        setCards(
          memeTokens.map(token => ({
            name: token.name,
            symbol: token.symbol,
            description: token.description,
            tokenImageUrl: token.tokenImageUrl,
            fundingRaised: ethers.formatUnits(token.fundingRaised, 'ether'), // Format the fundingRaised from Wei to Ether
            tokenAddress: token.tokenAddress,
            creatorAddress: token.creatorAddress,
          }))
        );
        console.log('✅ Cards state updated');
      } catch (error) {
        console.error('❌ Error fetching meme tokens:', error);
        setError('Failed to load tokens: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMemeTokens();
  }, []);

  const connectWallet = async () => {
    try {
      console.log('🔌 Attempting to connect wallet...');
      
      // Check if MetaMask is installed
      if (!window.ethereum) {
        console.log('❌ MetaMask not found');
        setError('MetaMask is not installed. Please install MetaMask and try again.');
        return;
      }

      console.log('✅ MetaMask found, requesting accounts...');
      
      // Request account access
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      
      console.log('📋 Accounts received:', accounts);
      
      if (accounts.length > 0) {
        const account = accounts[0];
        console.log('✅ Wallet connected:', account);
        setWalletAddress(account);
        setWalletConnected(true);
        setError('');
        
        // Check if we're on the correct network
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        console.log('🔗 Current chain ID:', chainId);
        
        if (chainId !== '0x181a6') { // 98866 in hex
          console.log('⚠️ Wrong network detected, requesting switch to Plume...');
          try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0x181a6' }], // Plume chain ID
            });
            console.log('✅ Switched to Plume network');
          } catch (switchError) {
            console.log('❌ Failed to switch network:', switchError);
            setError('Please switch to Plume network in MetaMask');
          }
        }
      }
    } catch (error) {
      console.error('❌ Error connecting wallet:', error);
      setError('Failed to connect wallet: ' + error.message);
    }
  };

  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
  };

  const navigateToTokenDetail = (card) => {
    navigate(`/token-detail/${card.tokenAddress}`, { state: { card } }); // Use tokenAddress for URL
  };

  return (
    <div className="app">
      <nav className="navbar">
        <a href="#" className="nav-link">[moralis]</a>
        <a href="#" className="nav-link">[docs]</a>
        <button 
          className="nav-button" 
          onClick={connectWallet}
          disabled={walletConnected}
        >
          {walletConnected ? `[${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}]` : '[connect wallet]'}
        </button>
      </nav>
      <div className="card-container">
        <h3 className="start-new-coin" onClick={() => navigate('/token-create')}>[start a new coin]</h3>
        <img src="https://pump.fun/_next/image?url=%2Fking-of-the-hill.png&w=256&q=75" alt="Start a new coin" className="start-new-image"/>
        
      
        {cards.length > 0 && (
          <div className="card main-card" onClick={() => navigateToTokenDetail(cards[0])}>
            <div className="card-content">
              <img src={cards[0].tokenImageUrl} alt={cards[0].name} className="card-image"/>
              <div className="card-text">
                <h2>Created by {cards[0].creatorAddress}</h2>
                <p>Funding Raised: {cards[0].fundingRaised} ETH</p>
                <p>{cards[0].name} (ticker: {cards[0].symbol})</p>
                <p>{cards[0].description}</p>
              </div>
            </div>
          </div>
        )}

        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="search for token"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-button" onClick={handleSearch}>Search</button>
        </div>

        {error && (
          <div style={{ color: 'red', padding: '10px', margin: '10px 0', backgroundColor: '#ffebee' }}>
            ❌ {error}
          </div>
        )}
        
        <h4 style={{textAlign:"left", color:"rgb(134, 239, 172)"}}>Terminal</h4>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="card-list">
    
            {cards.slice(1).map((card, index) => (
              <div key={index} className="card" onClick={() => navigateToTokenDetail(card)}>
                <div className="card-content">
                  <img src={card.tokenImageUrl} alt={card.name} className="card-image"/>
                  <div className="card-text">
                    <h2>Created by {card.creatorAddress}</h2>
                    <p>Funding Raised: {card.fundingRaised} ETH</p>
                    <p>{card.name} (ticker: {card.symbol})</p>
                    <p>{card.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
