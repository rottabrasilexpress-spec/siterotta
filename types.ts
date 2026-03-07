export interface FormData {
  name: string;
  whatsapp: string;
  
  originAddress: string;
  originType: 'casa' | 'apartamento' | null;
  originFloor: string;
  originAccess: string;
  
  destAddress: string;
  destType: 'casa' | 'apartamento' | null;
  destFloor: string;
  destAccess: string;
  
  movingDate: string;
  enableWindow: boolean;
  windowDateStart: string;
  windowDateEnd: string;
  
  ownHelp: boolean;
  qtyOrigin: number;
  qtyDest: number;
  
  needDisassembly: boolean;
  disassemblyItems: string;
  
  needAssembly: boolean;
  assemblyItems: string;
  
  hasPackers: boolean;
  packersItems: string;
  
  inventoryList: string;
  boxesAmount: string;
  bagsAmount: string;
  privacyPolicy: boolean;
}

export type FormErrors = Partial<Record<keyof FormData, boolean>>;

export interface StepProps {
  formData: FormData;
  updateData: (data: Partial<FormData>) => void;
  errors: FormErrors;
  clearError: (field: keyof FormData) => void;
  setError: (field: keyof FormData) => void;
  isActive: boolean;
}