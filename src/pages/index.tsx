import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useWriteContract, useReadContract, useAccount, useWaitForTransactionReceipt } from 'wagmi';
import { ESUSU_ADDRESS, ESUSU_ABI, MOCK_USDC_ADDRESS, ERC20_ABI } from '../constants';
import { parseUnits, formatUnits } from 'viem';

const Home: NextPage = () => {
  const { address, isConnected } = useAccount();
  const [activeTab, setActiveTab] = useState<'home' | 'esusu' | 'vault'>('home');

  // --- FORM STATES ---
  const [circleAmount, setCircleAmount] = useState('');
  const [maxMembers, setMaxMembers] = useState('5'); // Default 5 members
  const [joinId, setJoinId] = useState('');
  
  const [savingsAmount, setSavingsAmount] = useState('');
  const [viewCircleId, setViewCircleId] = useState(''); 

  // --- DATA READING ---
  
  // 1. User Balance
  const { data: tokenBalance, refetch: refetchToken } = useReadContract({
    address: MOCK_USDC_ADDRESS,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: [address || '0x0000000000000000000000000000000000000000'],
  });

  // 2. Vault Stats
  const { data: vaultStats, refetch: refetchVault } = useReadContract({
    address: ESUSU_ADDRESS,
    abi: ESUSU_ABI,
    functionName: 'personalVaults',
    args: [address || '0x0000000000000000000000000000000000000000'],
  });

  // 3. Next Circle ID (To show "Latest Created")
  const { data: nextId } = useReadContract({
    address: ESUSU_ADDRESS,
    abi: ESUSU_ABI,
    functionName: 'nextCircleId',
    query: { refetchInterval: 3000 } 
  });

  // 4. Circle Details (For the Viewer)
  const { data: circleDetails } = useReadContract({
    address: ESUSU_ADDRESS,
    abi: ESUSU_ABI,
    functionName: 'getCircleDetails',
    args: [viewCircleId ? BigInt(viewCircleId) : BigInt(0)],
    query: { refetchInterval: 3000 }
  });

  // --- TRANSACTIONS ---
  const { data: hash, writeContract, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    if (isConfirmed) {
        refetchToken();
        refetchVault();
        // Clear forms on success
        setCircleAmount('');
        setJoinId('');
    }
  }, [isConfirmed]);

  // --- HANDLERS ---

  // A. Create: Amount + Max Members
  const handleCreateCircle = () => {
    if (!circleAmount || !maxMembers) return;
    writeContract({
      address: ESUSU_ADDRESS,
      abi: ESUSU_ABI,
      functionName: 'createCircle',
      args: [parseUnits(circleAmount, 18), BigInt(maxMembers)],
    });
  };

  // B. Join: Just the ID
  const handleJoinCircle = () => {
    if (!joinId) return;
    writeContract({
      address: ESUSU_ADDRESS,
      abi: ESUSU_ABI,
      functionName: 'joinCircle',
      args: [BigInt(joinId)],
    });
  };

  // C. Vault Handlers
  const handleVaultApprove = () => {
    if (!savingsAmount) return;
    writeContract({
      address: MOCK_USDC_ADDRESS,
      abi: ERC20_ABI,
      functionName: 'approve',
      args: [ESUSU_ADDRESS, parseUnits(savingsAmount, 18)],
    });
  };

  const handleVaultDeposit = () => {
     if (!savingsAmount) return;
     writeContract({
      address: ESUSU_ADDRESS,
      abi: ESUSU_ABI,
      functionName: 'depositPersonal',
      args: [parseUnits(savingsAmount, 18), BigInt(60)], 
    });
  };

  const handleVaultWithdraw = () => {
     if (!vaultStats) return;
     writeContract({
      address: ESUSU_ADDRESS,
      abi: ESUSU_ABI,
      functionName: 'withdrawPersonal',
      args: [vaultStats[0]], 
    });
  };

  // --- RENDERERS ---

  const renderHome = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full animate-fade-in">
        <button 
            onClick={() => setActiveTab('esusu')}
            className="bg-white p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all border-l-8 border-blue-600 flex flex-col items-center text-center group"
        >
            <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">🔵</div>
            <h2 className="text-3xl font-bold text-gray-800">Esusu Circles</h2>
            <p className="text-gray-500 mt-2">Create a group, get an ID, and share it with friends.</p>
        </button>

        <button 
            onClick={() => setActiveTab('vault')}
            className="bg-white p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all border-l-8 border-green-600 flex flex-col items-center text-center group"
        >
            <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">💰</div>
            <h2 className="text-3xl font-bold text-gray-800">Personal Vault</h2>
            <p className="text-gray-500 mt-2">Lock savings for 2% yield. 2-Step process: Approve & Deposit.</p>
        </button>
    </div>
  );

  const renderEsusu = () => (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* LEFT: CREATE */}
        <div className="bg-white p-8 rounded-2xl shadow-xl">
            <button onClick={() => setActiveTab('home')} className="mb-4 text-blue-500 hover:underline">← Back</button>
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Create New Circle</h2>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-bold text-gray-700">Contribution Amount</label>
                    <input 
                        type="number" placeholder="e.g. 50"
                        className="w-full p-3 border rounded-xl bg-gray-50"
                        value={circleAmount} onChange={(e) => setCircleAmount(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700">Max Members</label>
                    <input 
                        type="number" placeholder="e.g. 5"
                        className="w-full p-3 border rounded-xl bg-gray-50"
                        value={maxMembers} onChange={(e) => setMaxMembers(e.target.value)}
                    />
                </div>
                <button 
                    onClick={handleCreateCircle} disabled={isPending}
                    className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50"
                >
                    {isPending ? 'Creating...' : 'Create Circle'}
                </button>
            </div>
            {/* Show Result */}
            <div className="mt-6 p-4 bg-blue-50 rounded-xl text-center">
                <p className="text-gray-600 text-sm">Latest Created ID:</p>
                <p className="text-4xl font-bold text-blue-800">{nextId ? Number(nextId) - 1 : '-'}</p>
                <p className="text-xs text-gray-500">Share this ID with friends!</p>
            </div>
        </div>

        {/* RIGHT: JOIN & VIEW */}
        <div className="space-y-8">
            {/* JOIN BOX */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Join a Circle</h2>
                <div className="flex gap-2">
                    <input 
                        type="number" placeholder="Enter Circle ID"
                        className="flex-1 p-3 border rounded-xl bg-gray-50"
                        value={joinId} onChange={(e) => setJoinId(e.target.value)}
                    />
                    <button 
                        onClick={handleJoinCircle} disabled={isPending}
                        className="bg-indigo-600 text-white px-6 rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-50"
                    >
                        {isPending ? '...' : 'Join'}
                    </button>
                </div>
            </div>

            {/* VIEWER BOX */}
            <div className="bg-gray-100 p-6 rounded-2xl border border-gray-300">
                <h3 className="font-bold text-gray-700 mb-2">🔎 Check Circle Status</h3>
                <input 
                    type="number" placeholder="Search ID..."
                    className="w-full p-2 border rounded-lg mb-4"
                    value={viewCircleId} onChange={(e) => setViewCircleId(e.target.value)}
                />
                {circleDetails && Number(circleDetails[1]) > 0 ? (
                    <div className="bg-white p-4 rounded-lg text-sm space-y-2">
                        <p><strong>ID:</strong> {circleDetails[0].toString()}</p>
                        <p><strong>Amount:</strong> {formatUnits(circleDetails[1], 18)} USDC</p>
                        <p><strong>Members:</strong> {circleDetails[3].toString()} / {circleDetails[2].toString()}</p>
                        <p><strong>Status:</strong> {circleDetails[4] ? "🟢 Active (Started)" : "🟡 Waiting for Members"}</p>
                    </div>
                ) : <p className="text-gray-400 text-center">Enter a valid ID to see details</p>}
            </div>
        </div>
    </div>
  );

  const renderVault = () => {
    const balance = vaultStats ? formatUnits(vaultStats[0], 18) : '0';
    const unlockTime = vaultStats ? Number(vaultStats[1]) : 0;
    const now = Math.floor(Date.now() / 1000);
    const isLocked = unlockTime > now;

    return (
        <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-xl mx-auto">
            <button onClick={() => setActiveTab('home')} className="mb-6 text-green-600 hover:underline">← Back to Dashboard</button>
            <h2 className="text-3xl font-bold text-green-900 mb-2">Personal Vault</h2>
            
            <div className="bg-green-50 p-6 rounded-xl border border-green-200 mb-6 text-center">
                <p className="text-green-800 text-sm font-semibold">CURRENT VAULT BALANCE</p>
                <p className="text-4xl font-extrabold text-green-900 mt-2">{balance} <span className="text-lg text-green-700">USDC</span></p>
                {isLocked ? <p className="text-red-500 text-xs mt-2">🔒 Locked until {new Date(unlockTime * 1000).toLocaleTimeString()}</p> : <p className="text-blue-500 text-xs mt-2">🔓 Unlocked - Free to withdraw</p>}
            </div>

            <div className="space-y-4">
                <input type="number" placeholder="Amount" className="w-full p-4 border rounded-xl" value={savingsAmount} onChange={(e) => setSavingsAmount(e.target.value)} />
                <div className="grid grid-cols-2 gap-4">
                    <button onClick={handleVaultApprove} className="bg-gray-800 text-white py-3 rounded-xl font-semibold">1. Approve</button>
                    <button onClick={handleVaultDeposit} className="bg-green-600 text-white py-3 rounded-xl font-semibold">2. Deposit</button>
                </div>
                {Number(balance) > 0 && (
                    <div className="mt-6 pt-6 border-t">
                        {isLocked && <div className="text-red-600 text-sm mb-2 font-bold text-center">⚠️ Early Withdrawal Penalty: 2%</div>}
                        <button onClick={handleVaultWithdraw} className="w-full border-2 border-red-500 text-red-600 py-3 rounded-xl font-bold hover:bg-red-50">
                            Withdraw All
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center py-10 px-4">
      <Head><title>DeFi Esusu</title></Head>
      
      {/* HEADER */}
      <div className="w-full max-w-5xl flex justify-between items-center mb-10 bg-white p-4 rounded-xl shadow-sm">
        <h1 className="text-2xl font-bold text-indigo-900">DeFi Esusu</h1>
        <div className="flex items-center gap-4">
            <span className="hidden md:block text-sm font-bold text-gray-500">
                Bal: {tokenBalance ? formatUnits(tokenBalance, 18) : '0'} USDC
            </span>
            <ConnectButton />
        </div>
      </div>

      {isConfirming && <div className="fixed top-24 bg-yellow-100 px-6 py-2 rounded-full font-bold shadow animate-bounce z-50">⏳ Processing...</div>}
      {isConfirmed && <div className="fixed top-24 bg-green-100 text-green-800 px-6 py-2 rounded-full font-bold shadow z-50">✅ Success!</div>}

      {!isConnected ? <div className="text-xl font-bold text-gray-400 mt-20">Connect Wallet to Begin</div> : (
        <div className="w-full max-w-5xl">
            {activeTab === 'home' && renderHome()}
            {activeTab === 'esusu' && renderEsusu()}
            {activeTab === 'vault' && renderVault()}
        </div>
      )}
    </div>
  );
};

export default Home;