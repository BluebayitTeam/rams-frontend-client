import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import TicketSaleHeader from './TicketSaleHeader';
import TicketSaleModel from './models/TicketSaleModel';
import { useGetTicketSaleQuery } from '../TicketSalesApi';
import TicketSaleForm from './TicketSaleForm';
import { hasPermission } from 'src/app/constant/permission/permissionList';
/**
 * Form Validation Schema
 */
const schema = z.object({
  country: z
    .string()
    .nonempty('You must enter a ticketSale name')
    .min(5, 'The ticketSale name must be at least 5 characters'),
});

function TicketSale() {
  const emptyValue = {
    airline_commission_amount: 0,
    airline_commission_rate: 7,
    airline_pnr: 0,
    arrived_time: '',
    branch: '',
    items: [],
    check_tax: '',
    currency: '',
    current_airway: '',
    customer: '',
    customer_commission_amount: 0,
    customer_commission_rate: 7,
    detail: '',
    dollar_amount: 0,
    dollar_rate: 0,
    fare_amount: 0,
    final_passenger: '',
    flight_date: '',
    flight_no: '',
    flight_time: '',
    gds: '',
    gds_pnr: '',
    govt_vat_rate: 7,
    invoice_no: '',
    issue_date: '',
    issue_person: '',
    passenger: '',
    passport_copy: '',
    passport_no: '',
    pax_name: '',
    purchase_amount: 0,
    return_flight_date: '',
    sales_amount: 0,
    sector: '',
    service_charge: 0,
    tax_amount: 0,
    ticket_agency: '',
    ticket_copy: '',
    ticket_no: '',
    ticket_status: 'active',
    _class: '',
  };
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  const routeParams = useParams();
  const { ticketSaleId } = routeParams;

  const {
    data: ticketSale,
    isLoading,
    isError,
  } = useGetTicketSaleQuery(ticketSaleId, {
    skip: !ticketSaleId || ticketSaleId === 'new',
  });
  console.log('ticketSaleId', ticketSale, ticketSaleId);

  const [tabValue, setTabValue] = useState(0);

  console.log('tabValue', tabValue);

  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const { reset, watch } = methods;
  const form = watch();
  useEffect(() => {
    if (ticketSaleId === 'new') {
      reset(TicketSaleModel({}));
    }
  }, [ticketSaleId, reset]);

  useEffect(() => {
    if (ticketSale) {
      reset({ ...ticketSale });
    }
  }, [ticketSale, reset, ticketSale?.id]);

  function handleTabChange(event, value) {
    setTabValue(value);
  }

  if (isLoading) {
    return <FuseLoading />;
  }

  /**
   * Show Message if the requested ticketSale is not exists
   */
  if (isError && ticketSaleId !== 'new') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className='flex flex-col flex-1 items-center justify-center h-full'>
        <Typography color='text.secondary' variant='h5'>
          There is no such ticketSale!
        </Typography>
        <Button
          className='mt-24'
          component={Link}
          variant='outlined'
          to='/apps/ticketSale/ticketSale'
          color='inherit'>
          Go to TicketSales Page
        </Button>
      </motion.div>
    );
  }

  return (
    <FormProvider {...methods}>
      {hasPermission('DEMAND_DETAILS') && (
        <FusePageCarded
          classes={{
            toolbar: 'p-0',
            header: 'min-h-80 h-80',
          }}
          header={<TicketSaleHeader />}
          content={
            <div className='p-16 '>
              <TicketSaleForm ticketSaleId={ticketSaleId} />
            </div>
          }
          innerScroll
        />
      )}
    </FormProvider>
  );
}

export default TicketSale;
