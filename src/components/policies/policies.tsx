import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { BackendApi } from "../../backend/backend_api";
import { DataGrid, GridColDef, gridNumberComparator, GridRenderCellParams, gridStringOrNumberComparator, GridToolbarContainer, GridValueFormatterParams, GridValueGetterParams } from '@mui/x-data-grid';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { LinkBehaviour } from "../link_behaviour";
import Link from "@mui/material/Link";
import { PolicyData } from "../../backend/policy_data";
import LinearProgress from "@mui/material/LinearProgress";
import { formatCurrency } from "../../utils/numbers";
import { getPolicyExpiration, getPolicyState } from "../../utils/product_formatter";
import { BigNumber } from "ethers";
import Address from "../address";
import Timestamp from "../timestamp";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { bigNumberComparator } from "../../utils/bignumber";
import { addPolicy, finishLoading, reset, startLoading } from "../../redux/slices/policies";

export interface PoliciesProps {
    insurance: BackendApi;
}

export default function Policies(props: PoliciesProps) {
    const { t } = useTranslation(['policies', 'common']);
    const signer = useSelector((state: RootState) => state.chain.signer);

    const dispatch = useDispatch();
    const policies = useSelector((state: RootState) => state.policies.policies);
    const isLoading = useSelector((state: RootState) => state.policies.isLoading);

    const [ pageSize, setPageSize ] = useState(8);

    const [ showActivePoliciesOnly, setShowActivePoliciesOnly ] = useState<boolean>(false);
    function handleShowActivePoliciesOnlyChange(event: React.ChangeEvent<HTMLInputElement>) {
        setShowActivePoliciesOnly(! showActivePoliciesOnly);
    }

    useEffect(() => {
        async function getPolicies() {
            const walletAddress = await signer?.getAddress();
            if (walletAddress !== undefined) {
                dispatch(startLoading());
                dispatch(reset());
                const policiesCount = await props.insurance.policiesCount(walletAddress);
                for (let i = 0; i < policiesCount; i++) {
                    const policy = await props.insurance.policy(walletAddress, i);
                    if (showActivePoliciesOnly && (policy.applicationState !== 2 || policy.policyState !== 0)) {
                        continue;
                    }
                    dispatch(addPolicy(policy));
                }
                dispatch(finishLoading());
            } else {
                dispatch(finishLoading());
            }
        }
        getPolicies();
    }, [signer, props.insurance, showActivePoliciesOnly, t, dispatch]);

    const columns: GridColDef[] = [
        { 
            field: 'id', 
            headerName: t('table.header.policyId'), 
            flex: 1,
            renderCell: (params: GridRenderCellParams<string>) => 
                (<Address address={params.value ?? ""} iconColor="secondary.main" />),
            sortComparator: gridStringOrNumberComparator,
        },
        { 
            field: 'owner', 
            headerName: t('table.header.walletAddress'), 
            flex: 1,
            renderCell: (params: GridRenderCellParams<string>) => 
                (<Address address={params.value ?? ""} iconColor="secondary.main" />),
            sortComparator: gridStringOrNumberComparator,
        },
        { 
            field: 'suminsured', 
            headerName: t('table.header.insuredAmount'), 
            flex: 1,
            valueFormatter: (params: GridValueFormatterParams<BigNumber>) => `${props.insurance.usd1} ${formatCurrency(params.value.toNumber(), props.insurance.usd1Decimals)}`,
            sortComparator: (v1: BigNumber, v2: BigNumber) => bigNumberComparator(v1, v2),
        },
        { 
            field: 'createdAt', 
            headerName: t('table.header.createdDate'), 
            flex: 1,
            renderCell: (params: GridRenderCellParams<BigNumber>) => <Timestamp at={params?.value?.toNumber() ?? 0} />,
            sortComparator: gridNumberComparator,
        },
        { 
            field: 'coverageUntil', 
            headerName: t('table.header.coverageUntil'), 
            flex: 1,
            valueGetter: (params: GridValueGetterParams<any, PolicyData>) => getPolicyExpiration(params.row),
            renderCell: (params: GridRenderCellParams<number>) => {
                return (<Timestamp at={params.value!} />);
            },
            sortComparator: gridNumberComparator,
        },
        { 
            field: 'applicationState', 
            headerName: t('table.header.status'), 
            flex: 1,
            valueGetter: (params: GridValueGetterParams<any, PolicyData>) => getPolicyState(params.row),
            valueFormatter: (params: GridValueFormatterParams<number>) => {
                return t('application_state_' + params.value, { ns: 'common'})
            },
            sortComparator: gridStringOrNumberComparator,
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

    const loadingBar = isLoading ? <LinearProgress /> : null;

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
                disableColumnMenu={true}
                />
        </>
    );
}