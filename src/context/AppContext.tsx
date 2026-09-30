import React, { createContext, useContext, useState } from 'react';
import type {
  Role,
  CustomerTab,
  BeekeeperTab,
  LabTab,
  AdminTab,
  Hive,
  HoneyBatch,
  LabTestReport,
  BlockchainRecord,
  MarketplaceListing,
  SystemNotification,
} from '../types';
import {
  initialHives,
  initialBatches,
  initialLabReports,
  initialBlockchainRecords,
  initialMarketplace,
  initialNotifications,
} from '../data/mockData';

interface AppContextType {
  role: Role;
  setRole: (role: Role) => void;

  customerTab: CustomerTab;
  setCustomerTab: (tab: CustomerTab) => void;

  beekeeperTab: BeekeeperTab;
  setBeekeeperTab: (tab: BeekeeperTab) => void;

  labTab: LabTab;
  setLabTab: (tab: LabTab) => void;

  adminTab: AdminTab;
  setAdminTab: (tab: AdminTab) => void;

  hives: Hive[];
  selectedHiveId: string;
  setSelectedHiveId: (id: string) => void;

  batches: HoneyBatch[];
  selectedBatchId: string;
  setSelectedBatchId: (id: string) => void;

  labReports: Record<string, LabTestReport>;
  blockchainRecords: Record<string, BlockchainRecord>;
  marketplace: MarketplaceListing[];
  notifications: SystemNotification[];

  isMobileFrameView: boolean;
  setIsMobileFrameView: (val: boolean) => void;

  // Actions
  addHive: (newHive: Partial<Hive>) => void;
  createHoneyBatch: (hiveId: string, honeyType: any, quantityKg: number, location: string) => string;
  submitLabTest: (batchId: string, reportData: Partial<LabTestReport>) => void;
  addMarketListing: (batchId: string, price: number, qty: number) => void;
  markNotificationRead: (id: string) => void;
  runDemoStep: (stepNumber: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<Role>('splash');
  const [customerTab, setCustomerTab] = useState<CustomerTab>('home');
  const [beekeeperTab, setBeekeeperTab] = useState<BeekeeperTab>('dashboard');
  const [labTab, setLabTab] = useState<LabTab>('dashboard');
  const [adminTab, setAdminTab] = useState<AdminTab>('dashboard');

  const [hives, setHives] = useState<Hive[]>(initialHives);
  const [selectedHiveId, setSelectedHiveId] = useState<string>('Hive 04');

  const [batches, setBatches] = useState<HoneyBatch[]>(initialBatches);
  const [selectedBatchId, setSelectedBatchId] = useState<string>('HC-2026-001');

  const [labReports, setLabReports] = useState<Record<string, LabTestReport>>(initialLabReports);
  const [blockchainRecords, setBlockchainRecords] = useState<Record<string, BlockchainRecord>>(initialBlockchainRecords);
  const [marketplace, setMarketplace] = useState<MarketplaceListing[]>(initialMarketplace);
  const [notifications, setNotifications] = useState<SystemNotification[]>(initialNotifications);

  const [isMobileFrameView, setIsMobileFrameView] = useState<boolean>(false);

  const addHive = (newHiveData: Partial<Hive>) => {
    const nextId = `Hive 0${hives.length + 1}`;
    const hive: Hive = {
      id: nextId,
      name: newHiveData.name || `${nextId} - New Apiary`,
      location: newHiveData.location || 'Narasaraopet Apiary',
      status: newHiveData.status || 'healthy',
      temperature: newHiveData.temperature || 31.5,
      humidity: newHiveData.humidity || 65,
      weight: newHiveData.weight || 40.0,
      activity: 'High',
      riskScore: 15,
      aiInsight: 'New hive successfully provisioned with smart sensor telemetry.',
      recommendedAction: 'Monitor weight gain weekly.',
      lastInspection: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      apiary: 'Narasaraopet, AP',
    };
    setHives((prev) => [hive, ...prev]);
  };

  const createHoneyBatch = (hiveId: string, honeyType: any, quantityKg: number, location: string): string => {
    const nextBatchNum = batches.length + 1;
    const batchId = `HC-2026-00${nextBatchNum}`;
    const currentDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

    const newBatch: HoneyBatch = {
      id: batchId,
      hiveId: hiveId,
      honeyType: honeyType,
      quantityKg: quantityKg,
      beekeeperName: 'Ravi Kumar',
      location: location || 'Narasaraopet, Andhra Pradesh',
      harvestDate: currentDate,
      extractionLocation: 'Narasaraopet Processing Unit',
      labStatus: 'pending',
      traceabilityStatus: 'Harvested',
      qrCode: batchId,
      steps: [
        {
          id: 's1',
          step: '01',
          title: 'Hive Registered',
          date: currentDate,
          location: location || 'Narasaraopet, AP',
          responsible: 'Ravi Kumar (Beekeeper)',
          status: 'completed',
          description: `Smart Hive ${hiveId} harvested under HONIVA quality guidelines.`,
          imageUrl: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=400&q=80',
        },
        {
          id: 's2',
          step: '02',
          title: 'Honey Harvested',
          date: currentDate,
          location: location || 'Narasaraopet, AP',
          responsible: 'Ravi Kumar',
          status: 'completed',
          description: `Harvested ${quantityKg}kg raw ${honeyType}.`,
          imageUrl: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&w=400&q=80',
        },
        {
          id: 's3',
          step: '03',
          title: 'Laboratory Testing Submitted',
          date: currentDate,
          location: 'NAEL Accredited Lab',
          responsible: 'Dr. Priya',
          status: 'in_progress',
          description: 'Sample sent to NAEL Accredited Laboratory for FSSAI compliance certification.',
        },
      ],
    };

    setBatches((prev) => [newBatch, ...prev]);
    setSelectedBatchId(batchId);

    // Notify Lab Officer
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: 'New Honey Sample Received',
        message: `Batch ${batchId} (${honeyType}, ${quantityKg}kg) submitted by Ravi Kumar. Ready for lab testing.`,
        time: 'Just now',
        type: 'info',
        role: 'lab',
        targetId: batchId,
        read: false,
      },
      ...prev,
    ]);

    return batchId;
  };

  const submitLabTest = (batchId: string, reportData: Partial<LabTestReport>) => {
    const certNo = `NABL/2026/00${Object.keys(labReports).length + 1}`;
    const testDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const blockNum = 18420 + Object.keys(blockchainRecords).length + 1;
    const hash = `d31a5f902c8982bc${Math.floor(Math.random() * 899999 + 100000)}`;

    const fullReport: LabTestReport = {
      batchId: batchId,
      sampleId: `SMP-2026-${Math.floor(Math.random() * 899 + 100)}`,
      moisture: reportData.moisture || 17.2,
      ph: reportData.ph || 4.1,
      hmf: reportData.hmf || 12,
      sugarProfile: reportData.sugarProfile || 'Normal',
      adulterationScreen: reportData.adulterationScreen || 'Passed',
      antibioticResidue: reportData.antibioticResidue || 'Not Detected',
      overallStatus: 'PASSED',
      testedBy: 'Dr. Priya',
      labName: 'HONIVA NAEL Accredited Lab',
      testedOn: testDate,
      certificateNo: certNo,
      notes: 'Sample complies with all FSSAI & international quality specs.',
    };

    setLabReports((prev) => ({ ...prev, [batchId]: fullReport }));

    // Create Blockchain Record
    const blockRec: BlockchainRecord = {
      batchId: batchId,
      blockNumber: blockNum,
      previousHash: '8a92e4b109c3f721a99042b',
      currentHash: hash,
      timestamp: `${testDate} • 11:30 AM`,
      eventName: 'LAB_RESULT_APPROVED',
      digitalSignature: 'VERIFIED_BY_HONIVA_LEDGER',
      status: 'VERIFIED',
    };
    setBlockchainRecords((prev) => ({ ...prev, [batchId]: blockRec }));

    // Update batch status
    setBatches((prev) =>
      prev.map((b) => {
        if (b.id === batchId) {
          return {
            ...b,
            labStatus: 'passed',
            certNumber: certNo,
            blockchainHash: hash,
            traceabilityStatus: 'Lab Tested',
            steps: [
              ...b.steps,
              {
                id: `s-lab-${Date.now()}`,
                step: `0${b.steps.length + 1}`,
                title: 'Lab Tested & Approved',
                date: testDate,
                location: 'NAEL Accredited Lab',
                responsible: 'Dr. Priya',
                status: 'completed',
                description: `Purity score 100%. Moisture ${fullReport.moisture}%, pH ${fullReport.ph}, HMF ${fullReport.hmf}mg/kg.`,
                verifiedBy: `Dr. Priya (Cert: ${certNo})`,
              },
            ],
          };
        }
        return b;
      })
    );

    // Notify Beekeeper & Customer
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: 'Batch Certified & Signed!',
        message: `Batch ${batchId} passed lab testing! Cert #${certNo} issued and written to blockchain block #${blockNum}.`,
        time: 'Just now',
        type: 'success',
        role: 'beekeeper',
        targetId: batchId,
        read: false,
      },
      ...prev,
    ]);
  };

  const addMarketListing = (batchId: string, price: number, qty: number) => {
    const batch = batches.find((b) => b.id === batchId);
    const newListing: MarketplaceListing = {
      id: `m-${Date.now()}`,
      batchId: batchId,
      honeyType: batch?.honeyType || 'Forest Honey',
      pricePerKg: price,
      availableKg: qty,
      isVerified: true,
      isLabTested: batch?.labStatus === 'passed',
      sellerName: batch?.beekeeperName || 'Ravi Kumar',
      location: batch?.location || 'Narasaraopet, AP',
      imageUrl: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=500&q=80',
    };
    setMarketplace((prev) => [newListing, ...prev]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  // Preset quick steps for hackathon demo story
  const runDemoStep = (stepNumber: number) => {
    switch (stepNumber) {
      case 1: // Hive Alert
        setRole('beekeeper');
        setBeekeeperTab('hive_details');
        setSelectedHiveId('Hive 04');
        break;
      case 2: // Create Batch
        setRole('beekeeper');
        setBeekeeperTab('create_batch');
        setSelectedHiveId('Hive 04');
        break;
      case 3: // Lab Testing
        setRole('lab');
        setLabTab('testing');
        setSelectedBatchId('HC-2026-001');
        break;
      case 4: // Blockchain Ledger
        setRole('lab');
        setLabTab('blockchain');
        setSelectedBatchId('HC-2026-001');
        break;
      case 5: // Customer Verification
        setRole('customer');
        setCustomerTab('result');
        setSelectedBatchId('HC-2026-001');
        break;
      case 6: // Traceability Timeline
        setRole('customer');
        setCustomerTab('journey');
        setSelectedBatchId('HC-2026-001');
        break;
      default:
        setRole('role_select');
    }
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        customerTab,
        setCustomerTab,
        beekeeperTab,
        setBeekeeperTab,
        labTab,
        setLabTab,
        adminTab,
        setAdminTab,
        hives,
        selectedHiveId,
        setSelectedHiveId,
        batches,
        selectedBatchId,
        setSelectedBatchId,
        labReports,
        blockchainRecords,
        marketplace,
        notifications,
        isMobileFrameView,
        setIsMobileFrameView,
        addHive,
        createHoneyBatch,
        submitLabTest,
        addMarketListing,
        markNotificationRead,
        runDemoStep,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
