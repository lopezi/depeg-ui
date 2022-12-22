import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/app_context";
import { InsuranceApi } from "../../backend/insurance_api";
import { DataGrid, GridColDef, GridRenderCellParams, GridToolbarContainer, GridValueFormatterParams, GridValueGetterParams } from '@mui/x-data-grid';
import { PolicyRowView } from "../../model/policy";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { LinkBehaviour } from "../link_behaviour";
import Link from "@mui/material/Link";
import { PolicyData } from "../../backend/policy_data";
import LinearProgress from "@mui/material/LinearProgress";
import { formatCurrency } from "../../utils/numbers";
import moment from "moment";
import { formatDate } from "../../utils/date";
import { getPolicyEnd, getPolicyState } from "../../utils/product_formatter";
import { format } from "node:path/win32";
import { formatAddress } from "../../utils/address";
import { BigNumber } from "ethers";
import AccountAddress from "../account_address";

export interface PoliciesProps {
    insurance: InsuranceApi;
}

export default function Policies(props: PoliciesProps) {
    const { t } = useTranslation(['policies', 'common']);
    const appContext = useContext(AppContext);

    const [ policies, setPolicies ] = useState<Array<PolicyData>>([]);
    const [ policyRetrievalInProgess , setPolicyRetrievalInProgess ] = useState(false);
    const [ pageSize, setPageSize ] = useState(5);

    const [ showActivePoliciesOnly, setShowActivePoliciesOnly ] = useState<boolean>(false);
    function handleShowActivePoliciesOnlyChange(event: React.ChangeEvent<HTMLInputElement>) {
        setShowActivePoliciesOnly(! showActivePoliciesOnly);
    }

    useEffect(() => {
        async function getPolicies() {
            const walletAddress = await appContext?.data.signer?.getAddress();
            if (walletAddress !== undefined) {
                setPolicyRetrievalInProgess(true);
                setPolicies([]);
                const policiesCount = await props.insurance.policiesCount(walletAddress);
                for (let i = 0; i < policiesCount; i++) {
                    const policy = await props.insurance.policy(walletAddress, i);
                    if (showActivePoliciesOnly && (policy.applicationState !== 2 || policy.policyState !== 0)) {
                        continue;
                    }
                    // const rowView = convertPolicyDataToRowView(policy);
                    setPolicies(policies => [...policies, policy]);
                }
                setPolicyRetrievalInProgess(false);
            } else {
                setPolicies([]);
            }
        }
        getPolicies();
    }, [appContext?.data.signer, props.insurance, showActivePoliciesOnly, t]);

    const columns: GridColDef[] = [
        { 
            field: 'owner', 
            headerName: t('table.header.walletAddress'), 
            flex: 1,
            renderCell: (params: GridRenderCellParams<string>) => 
            (<AccountAddress address={params.value} signer={appContext.data.signer!} iconColor="secondary.main" />)
        },
        { 
            field: 'suminsured', 
            headerName: t('table.header.insuredAmount'), 
            flex: 1,
            valueFormatter: (params: GridValueFormatterParams<BigNumber>) => `${props.insurance.usd1} ${formatCurrency(params.value.toNumber(), props.insurance.usd1Decimals)}`
        },
        { 
            field: 'createdAt', 
            headerName: t('table.header.createdDate'), 
            flex: 1,
            valueFormatter: (params: GridValueFormatterParams<BigNumber>) => formatDate(moment.unix(params.value.toNumber()))
        },
        { 
            field: 'coverageUntil', 
            headerName: t('table.header.coverageUntil'), 
            flex: 1,
            valueGetter: (params: GridValueGetterParams<any, PolicyData>) => params.row,
            valueFormatter: (params: GridValueFormatterParams<PolicyData>) => formatDate(getPolicyEnd(params.value))
        },
        { 
            field: 'applicationState', 
            headerName: t('table.header.status'), 
            flex: 1,
            valueGetter: (params: GridValueGetterParams<any, PolicyData>) => params.row,
            valueFormatter: (params: GridValueFormatterParams<PolicyData>) => t('application_state_' + getPolicyState(params.value), { ns: 'common'})
        },
    ];

    function GridToolbar() {
        return (
            <GridToolbarContainer >
                <Box sx={{ flexGrow: 1 }}>
                    <FormControlLabel 
                        control={
                            <Switch
                                defaultChecked={showActivePoliciesOnly}
                                value={showActivePoliciesOnly} 
                                onChange={handleShowActivePoliciesOnlyChange}
                                sx={{ ml: 1 }}
                                />} 
                        label={t('action.filter_active')} />   
                </Box>
                {/* aligned right beyond here */}
                <Link component={LinkBehaviour} href="/" passHref style={{ textDecoration: 'none' }}>
                    <Button variant="text" color="secondary">
                        {t('action.create_application')}
                    </Button>
                </Link>
            </GridToolbarContainer>
        );
    }

    const loadingBar = policyRetrievalInProgess ? <LinearProgress /> : null;

    return (
        <>
            <Typography variant="h5" mb={2}>{t('title')}</Typography>

            {loadingBar}

            <DataGrid 
                autoHeight
                rows={policies} 
                columns={columns} 
                getRowId={(row) => row.id}
                components={{
                    Toolbar: GridToolbar,
                }}
                initialState={{
                    sorting: {
                        sortModel: [{ field: 'coverageUntil', sort: 'asc' }],
                    },
                }}
                pageSize={pageSize}
                rowsPerPageOptions={[5, 10, 20, 50]}
                onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
                disableSelectionOnClick={true}
                />
        </>
    );
}