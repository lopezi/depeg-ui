import { ethers, Signer } from "ethers";
import { SnackbarMessage, OptionsObject, SnackbarKey } from "notistack";
import { BundleData } from "../application/insurance/bundle_data";
import { insuranceApiMock } from "../application/insurance/insurance_api_mock";
import { InsuranceApiSmartContract } from "../application/insurance/insurance_api_smart_contract";
import { PolicyData } from "../application/insurance/policy_data";

export interface InsuranceApi {
    usd1: string;
    usd1Decimals: number;
    usd2: string;
    usd2Decimals: number;
    createTreasuryApproval: 
        (
            walletAddress: string, 
            premium: number,
            beforeWaitCallback?: () => void
        ) => Promise<boolean>;
    policy: 
        (
            walletAddress: string, 
            index: number,
        ) => Promise<PolicyData>;
    policies: 
        (
            walletAddress: string, 
        ) => Promise<Array<PolicyData>>;
    policiesCount
        (
            walletAddress: string,
        ): Promise<number>;
    application: ApplicationApi;
    invest: InvestApi;
}

export interface ApplicationApi {
    insuredAmountMin: number;
    insuredAmountMax: number;
    coverageDurationDaysMin: number;
    coverageDurationDaysMax: number;
    getRiskBundles: 
        () => Promise<Array<BundleData>>,
    calculatePremium: 
        (
            walletAddress: string, 
            insuredAmount: number, 
            coverageDurationDays: number,
            bundles: Array<BundleData>,
        ) => Promise<number>;
    applyForPolicy: 
        (
            walletAddress: string, 
            insuredAmount: number, 
            coverageDurationDays: number,
            premium: number,
            beforeWaitCallback?: () => void
        ) => Promise<boolean>;
}

export interface InvestApi {
    minInvestedAmount: number;
    maxInvestedAmount: number;
    minSumInsured: number;
    maxSumInsured: number;
    minCoverageDuration: number;
    maxCoverageDuration: number;
    annualPctReturn: number;
    maxAnnualPctReturn: number;
    invest: 
        (
            investorWalletAddress: string, 
            investedAmount: number, 
            minSumInsured: number, 
            maxSumInsured: number, 
            minDuration: number, 
            maxDuration: number, 
            annualPctReturn: number,
            beforeWaitCallback?: () => void,
        ) => Promise<boolean>;
    bundleTokenAddress(): Promise<string>;
    bundleCount(): Promise<number>;
    bundle(walletAddress: string, bundleTokenAddress: string, i: number): Promise<BundleData|undefined>;
}

export function getInsuranceApi(
        enqueueSnackbar: (message: SnackbarMessage, options?: OptionsObject) => SnackbarKey, 
        t: (key: string) => string,
        signer?: Signer,
        provider?: ethers.providers.Provider
        ): InsuranceApi {
    
    const depegProductContractAddress = process.env.NEXT_PUBLIC_DEPEG_CONTRACT_ADDRESS;
    if (depegProductContractAddress == null) {
        console.log("Using mock insurance API");
        return insuranceApiMock(enqueueSnackbar);
    } else {
        console.log("Using smart contract", depegProductContractAddress);
        if (signer === undefined || provider === undefined) {
            return new InsuranceApiSmartContract(new ethers.VoidSigner(depegProductContractAddress, provider), depegProductContractAddress);
        } else {
            return new InsuranceApiSmartContract(signer, depegProductContractAddress);
        }
    }
}