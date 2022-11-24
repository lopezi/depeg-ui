import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import LinearProgress from '@mui/material/LinearProgress';
import TextField from '@mui/material/TextField'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import moment from 'moment';
import { useTranslation } from 'next-i18next';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { BundleData } from '../../application/insurance/bundle_data';
import { ApplicationApi } from '../../model/insurance_api';
import { BalanceTooSmallError, NoBundleFoundError } from '../../utils/error';
import { FormNumber } from '../../utils/types';
import CurrencyTextField from '../shared/form/currency_text_field';
import NumericTextField, { INPUT_VARIANT } from '../shared/form/numeric_text_field';
import Premium from './premium';

const formInputVariant = 'outlined';

export interface ApplicationFormProperties {
    disabled: boolean;
    walletAddress: string;
    usd1: string;
    usd1Decimals: number;
    usd2: string;
    usd2Decimals: number;
    applicationApi: ApplicationApi;
    bundles: Array<BundleData>;
    premiumTrxText: string|undefined;
    formReadyForApply: (isFormReady: boolean) => void;
    applyForPolicy: (walletAddress: string, insuredAmount: number, coverageDuration: number, premium: number) => Promise<boolean>;
}

export default function ApplicationForm(props: ApplicationFormProperties) {
    const { t } = useTranslation('application');

    // wallet address
    const [ walletAddress, setWalletAddress ] = useState(props.walletAddress);
    function handleWalletAddressChange(x: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setWalletAddress((x.target as HTMLInputElement).value);
    }
    const [ walletAddressError, setWalletAddressError ] = useState("");
    function validateWalletAddress() {
        if (walletAddress == "") {
            return t('insuredWalletRequired');
        }
        if (walletAddress.length != 42) {
            return t('insuredWalletInvalid');
        }
        return "";
    }

    const [ walletAddressValid, setWalletAddressValid ] = useState(true);
    function validateWalletAddressAndSetError() {
        const error = validateWalletAddress();
        setWalletAddressError(error);
        setWalletAddressValid(error === "");
    }

    useEffect(() => {
        setWalletAddress(props.walletAddress);
    }, [props.walletAddress]);

    // insured amount
    const [ insuredAmount, setInsuredAmount ] = useState(undefined as FormNumber);
    const [ insuredAmountValid, setInsuredAmountValid ] = useState(false);
    const [ insuredAmountMin, setInsuredAmountMin ] = useState(props.applicationApi.insuredAmountMin);
    const [ insuredAmountMax, setInsuredAmountMax ] = useState(props.applicationApi.insuredAmountMax);

    // coverage period (days and date)

    // coverage days
    const [ coverageDays, setCoverageDays ] = useState(props.applicationApi.coverageDurationDaysMin  as FormNumber);
    const [ coverageDaysValid, setCoverageDaysValid ] = useState(true);
    const [ coverageDaysMin, setCoverageDaysMin ] = useState(props.applicationApi.coverageDurationDaysMin);
    const [ coverageDaysMax, setCoverageDaysMax ] = useState(props.applicationApi.coverageDurationDaysMax);

    // coverage until date
    const [ coverageUntil, setCoverageUntil ] = useState<moment.Moment | null>(moment().add(props.applicationApi.coverageDurationDaysMax, 'days'));
    const coverageUntilMin = moment().add(props.applicationApi.coverageDurationDaysMin, 'days');
    const coverageUntilMax = moment().add(props.applicationApi.coverageDurationDaysMax, 'days');
    function handleCoverageUntilChange(t: moment.Moment | null) {
        let date = t;
        if (date == null) {
            date = moment();
        }
        setCoverageUntil(date);
        setCoverageDays(date.startOf('day').diff(moment().startOf('day'), 'days'));
    };

    // premium
    const [ premium, setPremium ] = useState(undefined as FormNumber);
    const [ premiumError, setPremiumError ] = useState("");
    const [ premiumCalculationInProgress, setPremiumCalculationInProgress ] = useState(false);
    const [ showAvailableBundles, setShowAvailableBundles ] = useState(false);

    // check validity of form
    useEffect(() => {
        console.log("walletAddressValid", walletAddressValid, "insuredAmountValid", insuredAmountValid, "coverageDaysValid", coverageDaysValid);
        let valid = true;
        valid = walletAddressValid && valid;
        valid = insuredAmountValid && valid;
        valid = coverageDaysValid && valid;
        console.log(`Form valid ${valid}`);
        setFormValid(valid);
    }, [walletAddressValid, insuredAmountValid, coverageDaysValid]);

    // TODO: when premium cannot be calculated, show list of bundles

    
    // terms accepted and validation
    const [ termsAccepted, setTermsAccepted ] = useState(false);
    function handleTermsAcceptedChange(x: ChangeEvent<any>) {
        setTermsAccepted((x.target as HTMLInputElement).checked);
    }

    // buy button
    const [ formValid, setFormValid ] = useState(true);
    const [ buyButtonDisabled, setBuyButtonDisabled ] = useState(true);
    const [ applicationInProgress, setApplicationInProgress ] = useState(false);


    useEffect(() => {
        let isBuyButtonDisabled = !formValid || !termsAccepted || props.disabled || applicationInProgress;
        setBuyButtonDisabled(isBuyButtonDisabled);
        props.formReadyForApply(!isBuyButtonDisabled);
    }, [formValid, termsAccepted, props.disabled, applicationInProgress, props]);  

    //-------------------------------------------------------------------------
    // update min/max sum insured and coverage period when bundles are available
    useEffect(() => {
        if (props.bundles.length > 0) {
            let minSumInsured = Number.MAX_SAFE_INTEGER;
            let maxSumInsured = 0;
            let minCoverageDays = Number.MAX_SAFE_INTEGER;
            let maxCoverageDays = 0;
            for( let b of props.bundles) {
                if (b.minSumInsured < minSumInsured) {
                    minSumInsured = b.minSumInsured;
                }
                if (b.maxSumInsured > maxSumInsured) {
                    maxSumInsured = b.maxSumInsured;
                }
                if (b.minDuration < minCoverageDays) {
                    minCoverageDays = b.minDuration;
                }
                if (b.maxDuration > maxCoverageDays) {
                    maxCoverageDays = b.maxDuration;
                }
            }
            setInsuredAmountMin(minSumInsured);
            setInsuredAmountMax(maxSumInsured);
            setCoverageDaysMin(minCoverageDays / 86400);
            setCoverageDaysMax(maxCoverageDays / 86400);
            setCoverageDays(minCoverageDays / 86400);
            setCoverageUntil(moment().add(minCoverageDays / 86400, 'days'));
        }
    }, [props.bundles]);

    //-------------------------------------------------------------------------
    // calculate premium via onchain call
    const calculatePremium = useCallback( async () => {
        if (! formValid || props.bundles.length == 0) {
            console.log("Form is invalid, not calculating premium...");
            setPremium(0);
            return;
        }

        console.log("Calculating premium...");
        try {
            setPremiumCalculationInProgress(true);
            setShowAvailableBundles(false);
            setPremium(await props.applicationApi.calculatePremium(walletAddress, insuredAmount || 0, coverageDays || 0, props.bundles));
            setPremiumError("");
        } catch (e) {
            if (e instanceof NoBundleFoundError) {
                console.log("No bundle found for this insurance.");
                setPremiumError(t('error_no_matching_bundle_found'));
                setShowAvailableBundles(true);
            } else if (e instanceof BalanceTooSmallError) {
                console.log("Wallet balance too low");
                setPremiumError(t('error_wallet_balance_too_low', { currency: props.usd2}));
            } else {
                console.log("Error calculating premium: ", e);
            }
            setFormValid(false);
            setPremium(undefined);
        } finally {
            setPremiumCalculationInProgress(false);
        }
        
    }, [formValid, walletAddress, insuredAmount, coverageDays, props.bundles, props.applicationApi, props.usd2, t]);

    async function buy() {
        setApplicationInProgress(true);

        try {
            await props.applyForPolicy(walletAddress, insuredAmount!, coverageDays!, premium!);
        } finally {
            setApplicationInProgress(false);
        }
    }

    const loadingBar = applicationInProgress ? <LinearProgress /> : null;
    
    return (
        <Grid container maxWidth="md" spacing={4} mt={2} sx={{ p: 1, ml: 'auto', mr: 'auto' }} >
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    disabled={props.disabled}
                    variant={INPUT_VARIANT}
                    id="insuredWallet"
                    label={t('insuredWallet')}
                    type="text"
                    value={walletAddress}
                    onChange={handleWalletAddressChange}
                    onBlur={validateWalletAddressAndSetError}
                    required
                    error={walletAddressError !== ""}
                    helperText={walletAddressError || t('insuredWalletHelper')}
                />
            </Grid>
            <Grid item xs={12}>
                <CurrencyTextField
                    required={true}
                    fullWidth={true}
                    disabled={props.disabled}
                    readOnly={premiumCalculationInProgress}
                    id="insuredAmount"
                    label={t('insuredAmount')}
                    inputProps={{
                        startAdornment: <InputAdornment position="start">{props.usd1}</InputAdornment>,
                    }}
                    value={insuredAmount}
                    currency={props.usd1}
                    currencyDecimals={props.usd1Decimals}
                    onChange={setInsuredAmount}
                    onBlur={calculatePremium}
                    minValue={insuredAmountMin}
                    maxValue={insuredAmountMax}
                    onError={(errMsg) => setInsuredAmountValid(errMsg === "")}
                />
            </Grid>
            <Grid item xs={6}>
                <NumericTextField
                    fullWidth={true}
                    required={true}
                    disabled={props.disabled}
                    readOnly={premiumCalculationInProgress}
                    id="coverageDurationDays"
                    label={t('coverageDurationDays')}
                    inputProps={{
                        endAdornment: <InputAdornment position="start">{t('days')}</InputAdornment>,
                    }}
                    value={coverageDays}
                    unit={t('days').toLowerCase()}
                    onChange={(days) => {
                        setCoverageDays(days);
                        setCoverageUntil(moment().add(days, 'days'));
                    }}
                    onBlur={calculatePremium}
                    minValue={coverageDaysMin}
                    maxValue={coverageDaysMax}
                    onError={(errMsg) => setCoverageDaysValid(errMsg === "")}
                />
            </Grid>
            <Grid item xs={6}>
                <DesktopDatePicker
                    disabled={props.disabled}
                    readOnly={premiumCalculationInProgress}
                    label={t('coverageDurationUntil')}
                    inputFormat="MM/DD/YYYY"
                    renderInput={(params) => <TextField {...params} fullWidth />}
                    disablePast={true}
                    value={coverageUntil}
                    onChange={handleCoverageUntilChange}
                    onAccept={calculatePremium}
                    minDate={coverageUntilMin}
                    maxDate={coverageUntilMax}
                    />
                {/* TODO: mobile version */}
                </Grid>
            <Grid item xs={12}>
                <Premium 
                    disabled={props.disabled}
                    premium={premium}
                    currency={props.usd2}
                    currencyDecimals={props.usd2Decimals}
                    error={premiumError}
                    transactionInProgress={(props.premiumTrxText != undefined) || premiumCalculationInProgress}
                    text={props.premiumTrxText || t('premium_calculation_in_progress')}
                    bundles={props.bundles}
                    showBundles={showAvailableBundles}
                    />
            </Grid>
            <Grid item xs={12}>
                <FormControlLabel 
                    control={
                        <Checkbox 
                            defaultChecked={false}
                            value={termsAccepted}
                            onChange={handleTermsAcceptedChange}
                            />
                    } 
                    disabled={props.disabled}
                    label={t('checkbox_t_and_c_label')} />
            </Grid>
            <Grid item xs={12}>
                <Button 
                    variant='contained'
                    disabled={buyButtonDisabled}
                    fullWidth
                    onClick={buy}
                >
                    {t('button_buy')}
                </Button>
                {loadingBar}
            </Grid>
        </Grid>
    );
}