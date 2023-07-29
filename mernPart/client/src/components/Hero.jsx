import { Container, Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useEffect } from "react";
import { ethers } from "ethers";
import { contractAddress } from '../components/stuff';
import { abi } from '../components/stuff';
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormContainer from './FormContainer';



const Hero = () => {
  const [isConnected, toggleConnect] = useState(false);
  const [fundAmount, setFundAmount] = useState("");

  async function connect() {
    console.log("we have run connect func");
    if (typeof window.ethereum == "undefined") {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      toggleConnect(false);
    } else {
      try {
        // Specify the chainId to request connection to a specific network (e.g., Ethereum mainnet)
        await window.ethereum.request({
          method: "eth_requestAccounts",
          params: [
            {
              chainId: "0x1", // Replace with the desired chainId for the network
            },
          ],
        });
        toggleConnect(true); // Update isConnected state to true if connected
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    }
  }

  useEffect(() => {
    connect();
  }, []);

  

  async function fund() {
    if (!isConnected) {
      toast.error("Connect to MetaMask first");
      return;
    }
    const ethAmount = fundAmount;
    console.log("Eth amount is" + ethAmount);
    toast(`Funding with ${ethAmount}`);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log("provider is this " + provider);
    const signer = provider.getSigner();
    console.log("signer is this " + signer);
    console.log("abi is this " + abi);
    const contract = new ethers.Contract(contractAddress, abi, signer);
    console.log("contract is this " + contract);
    try {
      const transactionResponse = await contract.fund({
        value: ethers.utils.parseEther(ethAmount),
      });
      console.log(
        "fund happened and transacrion response is this " + transactionResponse
      );
      // listen for the tx to be mined
      await listenForTransactionMine(transactionResponse, provider);
    } catch (error) {
      console.log(error);
    }
  }
  function handleFundAmountChange(event) {
    setFundAmount(event.target.value);
  }

  function listenForTransactionMine(transactionResponse, provider) {
    toast(`Mining ${transactionResponse.hash}...`);
    // return new Promise()
    // create a listener for the blockchain
    return new Promise((resolve, reject) => {
      provider.once(transactionResponse.hash, (transactionReceipt) => {
        toast(
          `Completed with ${transactionReceipt.confirmations} confirmations`
        );
        resolve();
      });
    });
  }

  

  return (
    <FormContainer>
      <h1>Fund the Contract</h1>
      <div className="isConnected">
        You are currently {isConnected ? "connected" : "not connected"} to
        MetaMask
        {!isConnected ? (
          <button className='button' onClick={connect}>Connect to MetaMask</button>
        ) : (
          ""
        )}
        
      </div>
      <div>
        <input onChange={handleFundAmountChange} placeholder="ETH Amount" />
        <button className='button' onClick={fund}>Fund!</button>
      </div>
      <ToastContainer />
    </FormContainer>
  );
};

export default Hero;