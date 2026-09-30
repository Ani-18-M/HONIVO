export type Role = 'splash' | 'role_select' | 'customer' | 'beekeeper' | 'lab' | 'admin';

export type CustomerTab = 'login' | 'home' | 'scan' | 'result' | 'journey' | 'lab_report' | 'learn' | 'profile';

export type BeekeeperTab = 
  | 'login'
  | 'dashboard' 
  | 'hives' 
  | 'hive_details' 
  | 'analytics' 
  | 'ai_health' 
  | 'yield' 
  | 'create_batch' 
  | 'batches' 
  | 'market' 
  | 'alerts' 
  | 'profile';

export type LabTab = 
  | 'login'
  | 'dashboard' 
  | 'samples' 
  | 'testing' 
  | 'result' 
  | 'blockchain' 
  | 'tracking' 
  | 'certificate' 
  | 'profile';

export type AdminTab = 
  | 'login'
  | 'dashboard' 
  | 'beekeepers' 
  | 'hives' 
  | 'batches' 
  | 'labs' 
  | 'alerts' 
  | 'blockchain' 
  | 'analytics' 
  | 'settings';

export type HiveStatus = 'healthy' | 'attention' | 'critical';

export interface Hive {
  id: string;
  name: string;
  location: string;
  status: HiveStatus;
  temperature: number; // °C
  humidity: number; // %
  weight: number; // kg
  activity: 'Low' | 'Medium' | 'High';
  riskScore: number; // 0-100
  aiInsight: string;
  recommendedAction: string;
  lastInspection: string;
  apiary: string;
}

export interface TraceabilityStep {
  id: string;
  step: string;
  title: string;
  date: string;
  location: string;
  responsible: string;
  status: 'completed' | 'in_progress' | 'pending';
  description: string;
  verifiedBy?: string;
  documentUrl?: string;
  imageUrl?: string;
}

export interface HoneyBatch {
  id: string; // e.g. HC-2026-001
  hiveId: string;
  honeyType: 'Forest Honey' | 'Multi Floral Honey' | 'Acacia Honey' | 'Eucalyptus Honey';
  quantityKg: number;
  beekeeperName: string;
  location: string;
  harvestDate: string;
  extractionLocation: string;
  labStatus: 'pending' | 'passed' | 'failed';
  traceabilityStatus: 'Harvested' | 'Lab Tested' | 'Packaged' | 'Distributed' | 'At Store';
  qrCode: string;
  certNumber?: string;
  blockchainHash?: string;
  imageUrl?: string;
  steps: TraceabilityStep[];
}

export interface LabTestReport {
  batchId: string;
  sampleId: string;
  moisture: number; // % (e.g. 17.2)
  ph: number; // e.g. 4.1
  hmf: number; // mg/kg (e.g. 12)
  sugarProfile: 'Normal' | 'Elevated' | 'Low';
  adulterationScreen: 'Passed' | 'Failed';
  antibioticResidue: 'Not Detected' | 'Detected';
  overallStatus: 'PASSED' | 'FAILED' | 'PENDING';
  testedBy: string;
  labName: string;
  testedOn: string;
  certificateNo: string;
  notes?: string;
}

export interface BlockchainRecord {
  batchId: string;
  blockNumber: number;
  previousHash: string;
  currentHash: string;
  timestamp: string;
  eventName: string; // e.g. 'LAB_RESULT_APPROVED', 'BATCH_CREATED'
  digitalSignature: string;
  status: 'VERIFIED' | 'PENDING';
}

export interface MarketplaceListing {
  id: string;
  batchId: string;
  honeyType: string;
  pricePerKg: number;
  availableKg: number;
  isVerified: boolean;
  isLabTested: boolean;
  sellerName: string;
  location: string;
  imageUrl: string;
}

export interface EducationalArticle {
  id: string;
  title: string;
  category: 'Benefits' | 'Types' | 'FAQs' | 'Storage';
  readTime: string;
  summary: string;
  content: string;
  imageUrl: string;
}

export interface SystemNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'critical' | 'attention' | 'info' | 'success';
  role: Role;
  targetId?: string;
  read: boolean;
}
