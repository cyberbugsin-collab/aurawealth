// Types
export interface PortfolioItem {
  id: string;
  name: string;
  symbol: string;
  type: "Stock" | "Mutual Fund" | "Fixed Deposit" | "PMS" | "AIF" | "Bonds" | "Gold" | "Real Estate" | "Other";
  invested: number;
  currentValue: number;
  returns: number;
}

export interface UserData {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  joinedDate: string;
  portfolio: PortfolioItem[];
  netWorthHistory: { month: string; value: number }[];
  summary: {
    totalNetWorth: number;
    totalInvested: number;
    totalGainLoss: number;
    percentageGain: number;
  };
  requests: AdminRequest[];
}

export interface AdminRequest {
  id: string;
  userId: string;
  userName: string;
  type: "update" | "add" | "delete" | "general" | "withdrawal" | "deposit";
  message: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  assetId?: string;
  assetName?: string;
}

export interface JoinRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  message?: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

// Join Requests for signup
export const joinRequests: JoinRequest[] = [
  {
    id: "join-1",
    name: "Vikram Malhotra",
    email: "vikram.malhotra@gmail.com",
    phone: "+91 98765 43210",
    message: "Looking for comprehensive wealth management for my family portfolio of around 5 Crore.",
    status: "pending",
    createdAt: "2026-03-19T10:30:00Z",
  },
  {
    id: "join-2",
    name: "Meera Krishnan",
    email: "meera.k@outlook.com",
    phone: "+91 87654 32109",
    message: "Referred by Rajesh Sharma. Interested in PMS services.",
    status: "pending",
    createdAt: "2026-03-18T15:45:00Z",
  },
];

// Top Performing Funds Data
export const topFunds = [
  { name: "HDFC Flexi Cap Fund", returns: 42.5, aum: 45000000000, category: "Flexi Cap" },
  { name: "SBI Small Cap Fund", returns: 38.2, aum: 28000000000, category: "Small Cap" },
  { name: "Axis Bluechip Fund", returns: 28.7, aum: 35000000000, category: "Large Cap" },
  { name: "Mirae Asset Large Cap", returns: 26.4, aum: 32000000000, category: "Large Cap" },
  { name: "Parag Parikh Flexi Cap", returns: 31.8, aum: 42000000000, category: "Flexi Cap" },
];

// Demo Users Data with Indian context
export const usersData: Record<string, UserData> = {
  "user-001": {
    id: "user-001",
    email: "user@demo.com",
    name: "Rajesh Sharma",
    phone: "+91 98765 12345",
    joinedDate: "2024-06-15",
    portfolio: [
      {
        id: "1",
        name: "Reliance Industries",
        symbol: "RELIANCE",
        type: "Stock",
        invested: 2500000,
        currentValue: 3625000,
        returns: 45.0,
      },
      {
        id: "2",
        name: "HDFC Flexi Cap Fund",
        symbol: "HDFC-FC",
        type: "Mutual Fund",
        invested: 5000000,
        currentValue: 6750000,
        returns: 35.0,
      },
      {
        id: "3",
        name: "Infosys Limited",
        symbol: "INFY",
        type: "Stock",
        invested: 3750000,
        currentValue: 4900000,
        returns: 30.67,
      },
      {
        id: "4",
        name: "SBI Blue Chip Fund",
        symbol: "SBI-BC",
        type: "Mutual Fund",
        invested: 4000000,
        currentValue: 4750000,
        returns: 18.75,
      },
      {
        id: "5",
        name: "ICICI Bank FD",
        symbol: "ICICI-FD",
        type: "Fixed Deposit",
        invested: 2000000,
        currentValue: 2180000,
        returns: 9.0,
      },
      {
        id: "6",
        name: "Motilal Oswal PMS",
        symbol: "MO-PMS",
        type: "PMS",
        invested: 5000000,
        currentValue: 6500000,
        returns: 30.0,
      },
      {
        id: "7",
        name: "Sovereign Gold Bond",
        symbol: "SGB-2024",
        type: "Gold",
        invested: 1500000,
        currentValue: 1927500,
        returns: 28.5,
      },
      {
        id: "8",
        name: "IIFL AIF",
        symbol: "IIFL-AIF",
        type: "AIF",
        invested: 5000000,
        currentValue: 6250000,
        returns: 25.0,
      },
    ],
    netWorthHistory: [
      { month: "Apr", value: 22500000 },
      { month: "May", value: 23250000 },
      { month: "Jun", value: 24100000 },
      { month: "Jul", value: 24750000 },
      { month: "Aug", value: 25500000 },
      { month: "Sep", value: 26250000 },
      { month: "Oct", value: 26900000 },
      { month: "Nov", value: 27600000 },
      { month: "Dec", value: 27250000 },
      { month: "Jan", value: 27900000 },
      { month: "Feb", value: 28600000 },
      { month: "Mar", value: 28450000 },
    ],
    summary: {
      totalNetWorth: 36882500,
      totalInvested: 28750000,
      totalGainLoss: 8132500,
      percentageGain: 28.29,
    },
    requests: [
      {
        id: "req-1",
        userId: "user-001",
        userName: "Rajesh Sharma",
        type: "update",
        message: "Please update my Reliance holdings - I purchased additional 200 shares at ₹2,850",
        status: "pending",
        createdAt: "2026-03-18T10:30:00Z",
        assetId: "1",
        assetName: "Reliance Industries",
      },
      {
        id: "req-4",
        userId: "user-001",
        userName: "Rajesh Sharma",
        type: "withdrawal",
        message: "Need to withdraw ₹10 Lakhs from HDFC Flexi Cap for property down payment",
        status: "pending",
        createdAt: "2026-03-19T09:15:00Z",
        assetId: "2",
        assetName: "HDFC Flexi Cap Fund",
      },
    ],
  },
  "user-002": {
    id: "user-002",
    email: "priya@demo.com",
    name: "Priya Mehta",
    phone: "+91 87654 98765",
    joinedDate: "2023-11-20",
    portfolio: [
      {
        id: "1",
        name: "TCS Limited",
        symbol: "TCS",
        type: "Stock",
        invested: 6000000,
        currentValue: 8250000,
        returns: 37.5,
      },
      {
        id: "2",
        name: "Mirae Asset Large Cap",
        symbol: "MIRAE-LC",
        type: "Mutual Fund",
        invested: 10000000,
        currentValue: 12400000,
        returns: 24.0,
      },
      {
        id: "3",
        name: "HDFC Bank",
        symbol: "HDFCBANK",
        type: "Stock",
        invested: 4500000,
        currentValue: 5598000,
        returns: 24.4,
      },
      {
        id: "4",
        name: "Kotak PMS",
        symbol: "KOTAK-PMS",
        type: "PMS",
        invested: 10000000,
        currentValue: 12800000,
        returns: 28.0,
      },
      {
        id: "5",
        name: "HDFC FD",
        symbol: "HDFC-FD",
        type: "Fixed Deposit",
        invested: 5000000,
        currentValue: 5425000,
        returns: 8.5,
      },
      {
        id: "6",
        name: "Edelweiss AIF",
        symbol: "EDEL-AIF",
        type: "AIF",
        invested: 10000000,
        currentValue: 13200000,
        returns: 32.0,
      },
    ],
    netWorthHistory: [
      { month: "Apr", value: 40000000 },
      { month: "May", value: 41500000 },
      { month: "Jun", value: 43200000 },
      { month: "Jul", value: 44800000 },
      { month: "Aug", value: 46100000 },
      { month: "Sep", value: 47500000 },
      { month: "Oct", value: 49200000 },
      { month: "Nov", value: 51000000 },
      { month: "Dec", value: 53500000 },
      { month: "Jan", value: 55200000 },
      { month: "Feb", value: 56800000 },
      { month: "Mar", value: 57673000 },
    ],
    summary: {
      totalNetWorth: 57673000,
      totalInvested: 45500000,
      totalGainLoss: 12173000,
      percentageGain: 26.75,
    },
    requests: [],
  },
  "user-003": {
    id: "user-003",
    email: "amit@demo.com",
    name: "Amit Patel",
    phone: "+91 99887 76655",
    joinedDate: "2024-01-10",
    portfolio: [
      {
        id: "1",
        name: "NVIDIA (US)",
        symbol: "NVDA",
        type: "Stock",
        invested: 4000000,
        currentValue: 7250000,
        returns: 81.25,
      },
      {
        id: "2",
        name: "ICICI Pru Technology",
        symbol: "ICICI-TECH",
        type: "Mutual Fund",
        invested: 7500000,
        currentValue: 9750000,
        returns: 30.0,
      },
      {
        id: "3",
        name: "Bajaj Finance",
        symbol: "BAJFINANCE",
        type: "Stock",
        invested: 3250000,
        currentValue: 4100000,
        returns: 26.15,
      },
      {
        id: "4",
        name: "ASK PMS",
        symbol: "ASK-PMS",
        type: "PMS",
        invested: 5000000,
        currentValue: 6450000,
        returns: 29.0,
      },
      {
        id: "5",
        name: "Mumbai Property",
        symbol: "REAL-1",
        type: "Real Estate",
        invested: 15000000,
        currentValue: 18750000,
        returns: 25.0,
      },
    ],
    netWorthHistory: [
      { month: "Apr", value: 28000000 },
      { month: "May", value: 29500000 },
      { month: "Jun", value: 32000000 },
      { month: "Jul", value: 34500000 },
      { month: "Aug", value: 36800000 },
      { month: "Sep", value: 38500000 },
      { month: "Oct", value: 39500000 },
      { month: "Nov", value: 40500000 },
      { month: "Dec", value: 39800000 },
      { month: "Jan", value: 41000000 },
      { month: "Feb", value: 41800000 },
      { month: "Mar", value: 46300000 },
    ],
    summary: {
      totalNetWorth: 46300000,
      totalInvested: 34750000,
      totalGainLoss: 11550000,
      percentageGain: 33.24,
    },
    requests: [
      {
        id: "req-2",
        userId: "user-003",
        userName: "Amit Patel",
        type: "add",
        message: "Please add my new investment in Apple (US) stock - invested $30,000 (₹25 Lakhs approx)",
        status: "pending",
        createdAt: "2026-03-19T14:15:00Z",
      },
    ],
  },
  "user-004": {
    id: "user-004",
    email: "sunita@demo.com",
    name: "Sunita Reddy",
    phone: "+91 94432 11223",
    joinedDate: "2023-08-05",
    portfolio: [
      {
        id: "1",
        name: "ITC Limited",
        symbol: "ITC",
        type: "Stock",
        invested: 3000000,
        currentValue: 3900000,
        returns: 30.0,
      },
      {
        id: "2",
        name: "Axis Long Term Equity",
        symbol: "AXIS-ELSS",
        type: "Mutual Fund",
        invested: 5000000,
        currentValue: 6350000,
        returns: 27.0,
      },
      {
        id: "3",
        name: "Titan Company",
        symbol: "TITAN",
        type: "Stock",
        invested: 4000000,
        currentValue: 5120000,
        returns: 28.0,
      },
      {
        id: "4",
        name: "SBI Corporate Bond",
        symbol: "SBI-BOND",
        type: "Bonds",
        invested: 8000000,
        currentValue: 8720000,
        returns: 9.0,
      },
      {
        id: "5",
        name: "Physical Gold",
        symbol: "GOLD-PHY",
        type: "Gold",
        invested: 5000000,
        currentValue: 6500000,
        returns: 30.0,
      },
    ],
    netWorthHistory: [
      { month: "Apr", value: 22000000 },
      { month: "May", value: 22800000 },
      { month: "Jun", value: 23500000 },
      { month: "Jul", value: 24200000 },
      { month: "Aug", value: 25000000 },
      { month: "Sep", value: 25800000 },
      { month: "Oct", value: 26500000 },
      { month: "Nov", value: 27300000 },
      { month: "Dec", value: 28100000 },
      { month: "Jan", value: 29000000 },
      { month: "Feb", value: 29800000 },
      { month: "Mar", value: 30590000 },
    ],
    summary: {
      totalNetWorth: 30590000,
      totalInvested: 25000000,
      totalGainLoss: 5590000,
      percentageGain: 22.36,
    },
    requests: [
      {
        id: "req-3",
        userId: "user-004",
        userName: "Sunita Reddy",
        type: "deposit",
        message: "I want to invest ₹50 Lakhs in a balanced portfolio. Please suggest allocation.",
        status: "pending",
        createdAt: "2026-03-17T16:30:00Z",
      },
    ],
  },
};

// Helper to get all requests across all users
export function getAllRequests(): AdminRequest[] {
  return Object.values(usersData).flatMap((user) => user.requests);
}

// Helper to get aggregate stats for admin
export function getAdminStats() {
  const users = Object.values(usersData);
  const totalAUM = users.reduce((acc, user) => acc + user.summary.totalNetWorth, 0);
  const totalInvested = users.reduce((acc, user) => acc + user.summary.totalInvested, 0);
  const totalGains = users.reduce((acc, user) => acc + user.summary.totalGainLoss, 0);
  const pendingRequests = getAllRequests().filter((r) => r.status === "pending").length;
  const pendingJoinRequests = joinRequests.filter((r) => r.status === "pending").length;

  return {
    totalUsers: users.length,
    totalAUM,
    totalInvested,
    totalGains,
    avgReturn: ((totalGains / totalInvested) * 100).toFixed(2),
    pendingRequests,
    pendingJoinRequests,
  };
}

// Get top clients by AUM
export function getTopClientsByAUM(limit: number = 5) {
  return Object.values(usersData)
    .sort((a, b) => b.summary.totalNetWorth - a.summary.totalNetWorth)
    .slice(0, limit);
}

// Get top performing clients
export function getTopPerformingClients(limit: number = 5) {
  return Object.values(usersData)
    .sort((a, b) => b.summary.percentageGain - a.summary.percentageGain)
    .slice(0, limit);
}

// Legacy exports for backwards compatibility
export const portfolioData = usersData["user-001"].portfolio;
export const netWorthHistory = usersData["user-001"].netWorthHistory;
export const summaryData = usersData["user-001"].summary;
