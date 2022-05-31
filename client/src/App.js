import React, { useEffect, useState } from "react";
import NFTMint from "./contracts/NFTMint.json";
import getWeb3 from "./getWeb3";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

const App = () => {

  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState("");
  const [nfts, setNFTs] = useState([]);
  const [mintText, setMintText] = useState("");

  const loadNFTS = async (contract) => {
    const totalSupply = await contract.methods.totalSupply().call();
    let mints = [];
    for (let i = 0; i < totalSupply; ++i){
      let mint = await contract.methods.nfts(i).call();
      mints.push(mint);
    }
    setNFTs(mints);
  }

  const loadWeb3Account = async (web3) => {
    const accounts = await web3.eth.getAccounts(); 
    console.log(accounts)
    if(accounts){
      setAccount(accounts[0]);
    }
  }

  const loadWeb3Contract = async (web3) => {
    const networkId = await web3.eth.net.getId();
    const networkData = NFTMint.networks[networkId];
    if(networkData){
      const abi =  NFTMint.abi;
      const address = networkData.address;
      const contract = new web3.eth.Contract(abi, address);
      setContract(contract);
      //console.log(contract);
      return contract;
    }
  }

  const mint = () => {
    //console.log(mintText);
    contract.methods.mint(mintText).send({ from: account }, (error) => {
      console.log("work");
      if (!error){
        setNFTs([...nfts, mintText]);
        setMintText("");
      }
    });
  }

  //Load Web3 account from metmask
  //Load the contract
  //Load all the NFT

  useEffect(async () => {
    const web3 = await getWeb3();
    await loadWeb3Account(web3);
    let contract = await loadWeb3Contract(web3);
    await loadNFTS(contract);
  }, []);

  return (
    <div>
      <nav class="navbar navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">KMint</a>
        <span><strong>Account Address:</strong> {account}</span>
      </div>
    </nav>
    <div className="container-fluid mt-5">
      <div className="row">
        <div class="col d-flex flex-column align-items-center">
          <img className="mb-4" src="https://avatars.dicebear.com/api/pixel-art/kien.svg" width={72}/>
          <h1 className="display-5 fw-bold">NFT Minting Machine</h1>
          <div className="col-6 text-center mb-3">
            <p className="lead text-center">A phenomenal NFT minting machine that could bring you riches beyond imagination.</p>
            <div>
              <input 
                    type="text"
                    value={mintText}
                    onChange={(e)=>setMintText(e.target.value)}
                    className="form-control mb-2"
                    placeholder="e.g. Kien" />
              <button onClick={mint} className="btn btn-primary">Mint</button>
            </div>
          </div>
          <div className="col-8 d-flex justify-content-center flex-wrap">
            {nfts.map((nft, key)=> <div key={key} className="d-flex flex-column align-items-center">
              <img width="150" src={`https://avatars.dicebear.com/api/pixel-art/${nft}.svg`}></img>
              <span>{nft}</span>
            </div>)}
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}


export default App;
