import NextLink from 'next/link';

import { DataGrid,GridColDef,GridValueGetterParams } from "@mui/x-data-grid";
import { ShopLayout } from "../../components/layouts";
import { Typography,Grid, Chip,Link} from '@mui/material';


const columns:GridColDef[] = [
    { field:'id',headerName:'ID',width:100},
    { field:'fullname',headerName:'Nombre completo',width:300},
    {
        field:'paid',
        headerName:'Pagada',
        description:'Muestra información di está pagada la orden o no ',
        width:200,
        renderCell:(params:GridValueGetterParams)=>{
            return (
                params.row.paid
                    ? <Chip color="success" label='Pagada' variant="outlined"/>
                    : <Chip color="error" label='No Pagada' variant="outlined"/>
            )
        }
    },
    {
        field:'orden',
        headerName:'Ver orden',
        width:200,
        sortable:false,
        renderCell:(params:GridValueGetterParams)=>{
            return (
                <NextLink href={`/orders/${params.row.id}`} passHref legacyBehavior>
                    <Link underline='always'>
                        Ver orden
                    </Link>
                </NextLink>
            )
        }
    }
];

const rows = [
    {id:1,paid:true,fullname:'Eulalio Nava',href:'/orders/1'},
    {id:2,paid:false,fullname:'Yolanda Nava',href:'/orders/1'},
    {id:3,paid:true,fullname:'Maricela Nava',href:'/orders/1'},
    {id:4,paid:false,fullname:'Hilda Nava',href:'/orders/1'},
    {id:5,paid:true,fullname:'Antonio Cruz',href:'/orders/1'},
    {id:6,paid:false,fullname:'Delia Nava',href:'/orders/1'},
]

const HistoryPage = ()=>{
   return(
       <ShopLayout title={"Historial de ordenes"} pageDescription={"Historial de ordenes del cliente"}>
        <Typography variant="h1" component='h1'>Historial de ordenes</Typography>

        <Grid container>
            <Grid item xs={12} sx={{height:650,width:'100%'}}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSizeOptions={[10]}
                    autoPageSize
                />
            </Grid>
        </Grid>
       </ShopLayout>
   )
}


export default HistoryPage;