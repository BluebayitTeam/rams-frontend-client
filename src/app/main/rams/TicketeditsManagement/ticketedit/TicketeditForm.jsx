import TextField from '@mui/material/TextField';
import { getAgencys, getAgents, getAirways, getBranches, getEmployees, getGDSs, getPassengers, getProfessions } from 'app/store/dataSlice';
import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import CustomDatePicker from 'src/app/@components/CustomDatePicker';
import CustomDropdownField from 'src/app/@components/CustomDropdownField';
import CustomTextField from 'src/app/@components/CustomTextField';

function TicketeditForm(props) {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const { control, formState, watch } = methods;
		const passengers = useSelector((state) => state.data.passengers);
    const professions = useSelector((state) => state.data.professions);
    const countries = useSelector((state) => state.data.countries);
    const branches = useSelector((state) => state.data.branches);
    const agencys = useSelector((state) => state.data.agents);
    const GDSs = useSelector((state) => state.data.gdss);

    const employees = useSelector((state) => state.data.employees);
    const airways = useSelector((state) => state.data.airways);
    const currencies = useSelector((state) => state.data.currencies);
    const currentstatuses = useSelector((state) => state.data.currentstatuses);
    const visaAgents = useSelector((state) => state.data.agents);
	const { errors } = formState;

	useEffect(() => {
    dispatch(getProfessions());
    dispatch(getCountries());
    dispatch(getAgents());
    dispatch(getPassengers());
    dispatch(getAgencys());
    dispatch(getBranches());
    dispatch(getEmployees());
    dispatch(getAirways());
    dispatch(getGDSs());

    dispatch(getCurrencies());
    dispatch(getCurrentstatuses());
  }, []);
	return (
    <div>
      <Controller
        name={ticketeditId === 'new' ? 'created_by' : 'updated_by'}
        control={control}
        defaultValue={userID}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              className={classes.hidden}
              label='created by'
              id='created_by'
              error={false}
              helperText=''
              variant='outlined'
              fullWidth
            />
          );
        }}
      />

      <div className='flex md:space-x-12 flex-col md:flex-row'>
        <Controller
          name='branch'
          control={control}
          render={({ field: { onChange, value, name } }) => (
            <Autocomplete
              className='mt-8 mb-16 w-full md:w-6/12'
              freeSolo
              value={value ? branches.find((data) => data.id === value) : null}
              options={branches}
              getOptionLabel={(option) => `${option.name}`}
              onChange={(event, newValue) => {
                // onChange({ id: newValue.id, name: newValue.name });
                onChange(newValue?.id);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder='Select Branch '
                  label='branch'
                  error={!value}
                  helperText={errors?.branch?.message}
                  variant='outlined'
                  autoFocus
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                  // onKeyDown={handleSubmitOnKeyDownEnter}
                />
              )}
            />
          )}
        />

        <Controller
          name='customer'
          control={control}
          render={({ field: { onChange, value, name } }) => (
            <Autocomplete
              className='mt-8 mb-16 w-full md:w-6/12'
              freeSolo
              value={value ? agencys.find((data) => data.id == value) : null}
              options={agencys}
              getOptionLabel={(option) =>
                `${option.first_name} ${option.last_name}`
              }
              onChange={(event, newValue) => {
                // onChange({ id: newValue.id, name: newValue.first_name });
                onChange(newValue?.id);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder='Select Customer'
                  label='Customer'
                  error={!value}
                  required
                  helperText={errors?.agency?.message}
                  variant='outlined'
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />
          )}
        />
      </div>

      <div className='flex md:space-x-12 flex-col md:flex-row'>
        <Controller
          name='ticket_agency'
          control={control}
          render={({ field: { onChange, value, name } }) => (
            <Autocomplete
              className='mt-8 mb-16 w-full md:w-6/12'
              freeSolo
              value={value ? agencys.find((data) => data.id == value) : null}
              options={agencys}
              getOptionLabel={(option) =>
                `${option.first_name} ${option.last_name}`
              }
              onChange={(event, newValue) => {
                onChange(newValue?.id); // onChange({ id: newValue.id, name: newValue.first_name });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder='Select Ticket Agency'
                  label='Agency'
                  error={!value}
                  required
                  helperText={errors?.agency?.message}
                  variant='outlined'
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />
          )}
        />

        <Controller
          name='issue_person'
          control={control}
          render={({ field: { onChange, value, name } }) => (
            <Autocomplete
              className='mt-8 mb-16 w-full md:w-6/12'
              freeSolo
              value={value ? employees.find((data) => data.id == value) : null}
              options={employees}
              getOptionLabel={(option) =>
                `${option.first_name} ${option.last_name}`
              }
              onChange={(event, newValue) => {
                // onChange({ id: newValue.id, name: newValue.first_name });
                onChange(newValue?.id);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder='Select Issue Person'
                  label='Issue Person'
                  // error={!value}
                  // required
                  helperText={errors?.employees?.message}
                  variant='outlined'
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />
          )}
        />
      </div>

      <div className='flex md:space-x-12 flex-col md:flex-row'>
        <Controller
          name='passenger'
          control={control}
          render={({ field: { onChange, value, name } }) => (
            <Autocomplete
              className='mt-8 mb-16 w-full md:w-6/12'
              freeSolo
              value={
                value ? passengers.find((data) => data.id === value) : null
              }
              options={passengers}
              getOptionLabel={(option) => `${option.passenger_name}`}
              onChange={(event, newValue) => {
                onChange(newValue?.id);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder='Select Passenger Name'
                  label='Passenger'
                  error={!value}
                  variant='outlined'
                  autoFocus
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                  // onKeyDown={handleSubmitOnKeyDownEnter}
                />
              )}
            />
          )}
        />
        <Controller
          name='pax_name'
          control={control}
          render={({ field }) => {
            return (
              <TextField
                {...field}
                className='mt-8 mb-16 w-full md:w-6/12'
                // error={!!errors.purchase_amount}
                // required
                helperText={errors?.ticket_fare?.message}
                label='Pax Name'
                id='passenger'
                // error={!field.value}
                checked={false}
                Mltchecked={false}
                variant='outlined'
                InputLabelProps={field.value && { shrink: true }}
                fullWidth
                onKeyDown={handleSubmitOnKeyDownEnter}
              />
            );
          }}
        />
      </div>

      <div className='flex md:space-x-12 flex-col md:flex-row'>
        <FormControlLabel
          control={<Checkbox checked={checked} onChange={handleChange} />}
          label='Other'
          className='mt-8 mb-16 w-full md:w-6/12'
        />
        {/* <FormControlLabel
					control={<Checkbox Mltchecked={Mltchecked} onChange={handleChange2} />}
					label="Mult TKT NO"
					className="mt-8 mb-16 w-full md:w-6/12"
				/> */}
      </div>

      <div className='flex md:space-x-12 flex-col md:flex-row'>
        <Controller
          name='current_airway'
          control={control}
          render={({ field: { onChange, value, name } }) => (
            <Autocomplete
              className='mt-8 mb-16 w-full md:w-6/12'
              freeSolo
              value={value ? airways.find((data) => data.id === value) : null}
              options={airways}
              getOptionLabel={(option) => `${option.name}`}
              onChange={(event, newValue) => {
                // onChange({ id: newValue.id, name: newValue.name });
                onChange(newValue?.id);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder='Select Carrier Airway'
                  label='Carrier Airway'
                  error={!value}
                  required
                  helperText={errors?.airways?.message}
                  variant='outlined'
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />
          )}
        />
        <Controller
          name='flight_no'
          control={control}
          render={({ field }) => {
            return (
              <TextField
                {...field}
                className='mt-8 mb-16 w-full md:w-6/12'
                // error={!!errors.flight_no || !field.value}
                helperText={errors?.flight_no?.message}
                label='Flight No'
                id='Flight_no'
                // required
                variant='outlined'
                InputLabelProps={field.value && { shrink: true }}
                fullWidth
                onKeyDown={handleSubmitOnKeyDownEnter}
              />
            );
          }}
        />
      </div>

      <div
        className='flex md:space-x-12 flex-col md:flex-row'
        style={{
          display: Mltchecked ? 'none' : '',
        }}>
        <Controller
          name='passport_no'
          control={control}
          render={({ field }) => {
            return (
              <TextField
                {...field}
                className='mt-8 mb-16 w-full md:w-6/12'
                // error={!!errors.purchase_amount}
                // required
                helperText={errors?.passport_no?.message}
                label='Passport No'
                id='passport_no'
                type='number'
                // error={!field.value}
                variant='outlined'
                InputLabelProps={field.value && { shrink: true }}
                fullWidth
                onKeyDown={handleSubmitOnKeyDownEnter}
              />
            );
          }}
        />
        <Controller
          name='ticket_no'
          control={control}
          render={({ field }) => {
            return (
              <TextField
                {...field}
                className='mt-8 mb-16 w-full md:w-6/12'
                error={
                  !!errors.ticket_no ||
                  !field.value ||
                  getValues().ticket_no?.length != 10
                }
                // required
                helperText={errors?.ticket_no?.message}
                label='Ticket No'
                id='ticket_no'
                checked={false}
                Mltchecked={false}
                // error={!field.value}
                variant='outlined'
                InputLabelProps={field.value && { shrink: true }}
                fullWidth
                onKeyDown={handleSubmitOnKeyDownEnter}
              />
            );
          }}
        />
      </div>

      <div className='flex md:space-x-12 flex-col md:flex-row'>
        <Controller
          name='flight_date'
          control={control}
          render={({ field }) => (
            <CustomDatePicker
              field={field}
              checked={false}
              Mltchecked={false}
              label='Flight Date'
              className='mt-8 mb-16 w-full md:w-6/12'
              // required
            />
          )}
        />

        <Controller
          name='issue_date'
          control={control}
          render={({ field }) => (
            <CustomDatePicker
              field={field}
              label='Issue Date'
              className='mt-8 mb-16 w-full md:w-6/12'
              // required
            />
          )}
        />
      </div>

      <div className='flex md:space-x-12 flex-col md:flex-row'>
        <Controller
          name='_class'
          control={control}
          render={({ field }) => {
            return (
              <TextField
                {...field}
                className='mt-8 mb-16 w-full md:w-6/12'
                // error={!!errors.class_name || !field.value}
                // required
                helperText={errors?.class_name?.message}
                label='Class Name'
                id='Class_name'
                variant='outlined'
                InputLabelProps={field.value && { shrink: true }}
                onKeyDown={handleSubmitOnKeyDownEnter}
              />
            );
          }}
        />
        <Controller
          name='sector'
          control={control}
          render={({ field }) => {
            return (
              <TextField
                {...field}
                className='mt-8 mb-16 w-full md:w-6/12'
                // error={!!errors.sector_name || !field.value}
                // required
                helperText={errors?.sector_name?.message}
                label='Sector Name'
                id='sector_name'
                variant='outlined'
                InputLabelProps={field.value && { shrink: true }}
                onKeyDown={handleSubmitOnKeyDownEnter}
              />
            );
          }}
        />
      </div>

      <div className='flex md:space-x-12 flex-col md:flex-row'>
        <Controller
          name='flight_time'
          control={control}
          render={({ field }) => {
            return (
              <TextField
                {...field}
                className='mt-8 mb-16 w-full md:w-6/12'
                error={!!errors.flight_time}
                helperText={errors?.flight_time?.message}
                label='Flight Time'
                id='flight_time'
                variant='outlined'
                InputLabelProps={field.value && { shrink: true }}
                fullWidth
                onKeyDown={handleSubmitOnKeyDownEnter}
              />
            );
          }}
        />

        <Controller
          name='arrived_time'
          control={control}
          render={({ field }) => {
            return (
              <TextField
                {...field}
                className='mt-8 mb-16 w-full md:w-6/12'
                error={!!errors.arrival_time}
                helperText={errors?.arrival_time?.message}
                label='Arrival Time'
                id='arrival_time'
                variant='outlined'
                InputLabelProps={field.value && { shrink: true }}
                fullWidth
                onKeyDown={handleSubmitOnKeyDownEnter}
              />
            );
          }}
        />
      </div>

      <div className='flex md:space-x-12 flex-col md:flex-row'>
        <Controller
          name='airline_pnr'
          control={control}
          render={({ field }) => {
            return (
              <TextField
                {...field}
                className='mt-8 mb-16 w-full md:w-6/12'
                error={!!errors.airline_pnr}
                helperText={errors?.airline_pnr?.message}
                label='Airline PNR'
                id='airline_pnr'
                variant='outlined'
                InputLabelProps={field.value && { shrink: true }}
                fullWidth
                onKeyDown={handleSubmitOnKeyDownEnter}
              />
            );
          }}
        />
        <Controller
          name='return_flight_date'
          control={control}
          render={({ field }) => (
            <CustomDatePicker
              field={field}
              label='Return Flight Date'
              className='mt-8 mb-16 w-full md:w-6/12'
              // required
            />
          )}
        />
      </div>

      <div
        className='flex md:space-x-12 flex-col md:flex-row'
        style={{
          display: checked ? '' : 'none',
        }}>
        <Controller
          name='sales_amount'
          control={control}
          render={({ field }) => {
            return (
              <TextField
                {...field}
                className='mt-8 mb-16 w-full md:w-6/12'
                // error={!!errors.purchase_amount}
                // required
                helperText={errors?.ticket_fare?.message}
                label='Sales Amount'
                id='ticket_Fare'
                type='number'
                checked={false}
                Mltchecked={false}
                // error={!field.value}
                variant='outlined'
                InputLabelProps={field.value && { shrink: true }}
                fullWidth
                onKeyDown={handleSubmitOnKeyDownEnter}
              />
            );
          }}
        />
        <Controller
          name='purchase_amount'
          control={control}
          render={({ field }) => {
            return (
              <TextField
                {...field}
                className='mt-8 mb-16 w-full md:w-6/12'
                // error={!!errors.purchase_amount}
                // required
                helperText={errors?.ticket_tax?.message}
                label='Enter Purchase NET'
                id='XT_Other_Tax'
                type='number'
                checked={false}
                Mltchecked={false}
                // error={!field.value}
                variant='outlined'
                InputLabelProps={field.value && { shrink: true }}
                fullWidth
                onKeyDown={handleSubmitOnKeyDownEnter}
              />
            );
          }}
        />
      </div>

      <div
        className='flex md:space-x-12 flex-col md:flex-row '
        style={{
          display: checked ? 'none' : '',
        }}>
        <Controller
          name='gds'
          control={control}
          render={({ field: { onChange, value, name } }) => (
            <Autocomplete
              className='mt-8 mb-16 w-full md:w-6/12'
              freeSolo
              value={value ? GDSs.find((data) => data.id == value) : null}
              options={GDSs}
              getOptionLabel={(option) => `${option.name}`}
              onChange={(event, newValue) => {
                onChange(newValue?.id);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder='Select GDS'
                  label='GDS'
                  error={!!errors.gds}
                  helperText={errors?.gds?.message}
                  variant='outlined'
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />
          )}
        />

        <Controller
          name='gds_pnr'
          control={control}
          render={({ field }) => {
            return (
              <TextField
                {...field}
                className='mt-8 mb-16 w-full md:w-6/12'
                // error={!!errors.purchase_amount}
                // required
                helperText={errors?.ticket_tax?.message}
                label='GDS PNR'
                id='gds_pnr'
                type='number'
                checked={false}
                Mltchecked={false}
                // error={!field.value}
                variant='outlined'
                InputLabelProps={field.value && { shrink: true }}
                fullWidth
                onKeyDown={handleSubmitOnKeyDownEnter}
              />
            );
          }}
        />
      </div>

      <div
        className='flex md:space-x-12 flex-col md:flex-row '
        style={{
          display: checked ? 'none' : '',
        }}>
        <Controller
          name='fare_amount'
          control={control}
          render={({ field }) => {
            return (
              <TextField
                {...field}
                className='mt-8 mb-16 w-full md:w-6/12'
                // error={!!errors.purchase_amount}
                // required
                helperText={errors?.ticket_fare?.message}
                label='Ticket Fare'
                id='ticket_Fare'
                type='number'
                // error={!field.value}
                checked={false}
                Mltchecked={false}
                variant='outlined'
                InputLabelProps={field.value && { shrink: true }}
                fullWidth
                onBlur={handleTicketFareAmount}
                // onChange={(e)=>{
                // 	handleTicketFareAmount(e)
                // 	field.onChange(e)
                // }}

                onKeyDown={handleSubmitOnKeyDownEnter}
              />
            );
          }}
        />
        <Controller
          name='tax_amount'
          control={control}
          render={({ field }) => {
            return (
              <TextField
                {...field}
                className='mt-8 mb-16 w-full md:w-6/12'
                // error={!!errors.purchase_amount}
                // required
                helperText={errors?.ticket_tax?.message}
                label='XT & Other Tax'
                id='XT_Other_Tax'
                type='number'
                checked={false}
                Mltchecked={false}
                // error={!field.value}
                variant='outlined'
                onBlur={handleTaxAmount}
                InputLabelProps={field.value && { shrink: true }}
                fullWidth
                onKeyDown={handleSubmitOnKeyDownEnter}
              />
            );
          }}
        />
      </div>

      <div
        className='flex md:space-x-12 flex-col md:flex-row'
        style={{
          display: checked ? 'none' : '',
        }}>
        <Controller
          name='customer_commission_rate'
          control={control}
          render={({ field }) => {
            return (
              <TextField
                {...field}
                className='mt-8 mb-16 w-full md:w-2/12'
                // error={!!errors.purchase_amount}
                // required
                helperText={errors?.ticket_tax?.message}
                label='Customer Comission%'
                id='customer_comission'
                type='number'
                // error={!field.value}
                variant='outlined'
                InputLabelProps={field.value && { shrink: true }}
                fullWidth
                onBlur={handleCustomerComission}
                onKeyDown={handleSubmitOnKeyDownEnter}
              />
            );
          }}
        />
        <Controller
          name='customer_commission_amount'
          control={control}
          render={({ field }) => {
            return (
              <TextField
                {...field}
                className='mt-8 mb-16 w-full md:w-4/12'
                // error={!!errors.purchase_amount}
                // required
                helperText={errors?.ticket_tax?.message}
                label='BDT'
                id='customer_comission_bdt'
                type='number'
                // error={!field.value}
                style={{
                  display: checked ? 'none' : '',
                }}
                checked={false}
                Mltchecked={false}
                variant='outlined'
                InputLabelProps={field.value && { shrink: true }}
                fullWidth
                onBlur={handleCustomerComissionAmount}
                onKeyDown={handleSubmitOnKeyDownEnter}
              />
            );
          }}
        />

        <Controller
          name='airline_commission_rate'
          control={control}
          render={({ field }) => {
            return (
              <TextField
                {...field}
                className='mt-8 mb-16 w-full md:w-2/12'
                // error={!!errors.purchase_amount}
                // required
                helperText={errors?.ticket_tax?.message}
                label='Airline Comission%'
                id='airline_comission'
                type='number'
                checked={false}
                Mltchecked={false}
                // error={!field.value}
                variant='outlined'
                onBlur={handleAirlineCommisionRate}
                InputLabelProps={field.value && { shrink: true }}
                fullWidth
                onKeyDown={handleSubmitOnKeyDownEnter}
              />
            );
          }}
        />
        <Controller
          name='airline_commission_amount'
          control={control}
          render={({ field }) => {
            return (
              <TextField
                {...field}
                className='mt-8 mb-16 w-full md:w-4/12'
                // error={!!errors.purchase_amount}
                // required
                helperText={errors?.ticket_tax?.message}
                label='BDT'
                id='airline_comission_bdt'
                type='number'
                checked={false}
                Mltchecked={false}
                // error={!field.value}
                variant='outlined'
                InputLabelProps={field.value && { shrink: true }}
                fullWidth
                onBlur={handleAirlineComissionAmount}
                onKeyDown={handleSubmitOnKeyDownEnter}
              />
            );
          }}
        />
      </div>

      <div
        className='flex md:space-x-12 flex-col md:flex-row'
        style={{
          display: checked ? 'none' : '',
        }}>
        <Controller
          name='currency'
          control={control}
          render={({ field: { onChange, value, name } }) => (
            <Autocomplete
              className='mt-8 mb-16 w-full md:w-6/12'
              freeSolo
              value={value ? currencies.find((data) => data.id == value) : null}
              options={currencies}
              getOptionLabel={(option) => `${option.name}`}
              onChange={(event, newValue) => {
                onChange(newValue?.id);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder='Currency'
                  label='Currency'
                  // error={!value}
                  // required
                  helperText={errors?.agency?.message}
                  variant='outlined'
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />
          )}
        />

        <Controller
          name='dollar_rate'
          control={control}
          render={({ field }) => {
            return (
              <TextField
                {...field}
                className='mt-8 mb-16 w-full md:w-6/12'
                // error={!!errors.purchase_amount}
                // required
                helperText={errors?.ticket_no?.message}
                label='Dollar Rate'
                id='dollar_rate'
                type='number'
                checked={false}
                Mltchecked={false}
                // error={!field.value}
                variant='outlined'
                InputLabelProps={field.value && { shrink: true }}
                fullWidth
                onKeyDown={handleSubmitOnKeyDownEnter}
              />
            );
          }}
        />
      </div>

      <div
        className='flex md:space-x-12 flex-col md:flex-row'
        style={{
          display: checked ? 'none' : '',
        }}>
        <Controller
          name='service_charge'
          control={control}
          render={({ field }) => {
            return (
              <TextField
                {...field}
                className='mt-8 mb-16 w-full md:w-6/12'
                // error={!!errors.purchase_amount}
                // required
                helperText={errors?.ticket_no?.message}
                label='Service Charge'
                id='service_charge'
                type='number'
                checked={false}
                Mltchecked={false}
                onBlur={handleServiceCharge}
                // error={!field.value}
                variant='outlined'
                InputLabelProps={field.value && { shrink: true }}
                fullWidth
                onKeyDown={handleSubmitOnKeyDownEnter}
              />
            );
          }}
        />

        <Controller
          name='govt_vat_rate'
          control={control}
          render={({ field }) => {
            return (
              <TextField
                {...field}
                className='mt-8 mb-16 w-full md:w-2/12'
                // error={!!errors.purchase_amount}
                // required
                helperText={errors?.ticket_tax?.message}
                label='Govt Vat'
                id='govt_vat'
                checked={false}
                Mltchecked={false}
                type='number'
                // error={!field.value}
                variant='outlined'
                onBlur={handlegovtVatrate}
                InputLabelProps={field.value && { shrink: true }}
                fullWidth
                onKeyDown={handleSubmitOnKeyDownEnter}
              />
            );
          }}
        />
        <Controller
          name='tax_amount'
          control={control}
          render={({ field }) => {
            return (
              <TextField
                {...field}
                className='mt-8 mb-16 w-full md:w-4/12'
                // error={!!errors.purchase_amount}
                // required
                helperText={errors?.ticket_tax?.message}
                label='BDT'
                id='govt_vat_bdt'
                type='number'
                checked={false}
                Mltchecked={false}
                // error={!field.value}
                variant='outlined'
                InputLabelProps={field.value && { shrink: true }}
                fullWidth
                onKeyDown={handleSubmitOnKeyDownEnter}
              />
            );
          }}
        />
      </div>

      <div
        className='flex md:space-x-12 flex-col md:flex-row'
        style={{
          display: checked ? 'none' : '',
        }}>
        <div className='mt-8 mb-16 w-full md:w-6/12'>
          <p checked={false} Mltchecked={false}>
            SA : {Customer_Amount}{' '}
          </p>
        </div>
        <div className='mt-8 mb-16 w-full md:w-6/12'>
          <p checked={false} Mltchecked={false}>
            {' '}
            PA: {purchase_amount}{' '}
          </p>
        </div>
      </div>

      <div className='flex md:space-x-12 flex-col md:flex-row'>
        <Controller
          name='ticket_status'
          control={control}
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              className='mt-8 mb-16 w-full md:w-6/12'
              freeSolo
              value={
                value
                  ? ticketSalesTicketStatus.find((data) => data.id == value)
                  : null
              }
              options={ticketSalesTicketStatus}
              getOptionLabel={(option) => `${option.name}`}
              onChange={(event, newValue) => {
                onChange(newValue?.id);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder='Select Ticket Status'
                  label='Ticket Status'
                  error={!!errors.ticket_status}
                  helperText={errors?.ticket_status?.message}
                  variant='outlined'
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />
          )}
        />

        <Controller
          name='detail'
          control={control}
          render={({ field }) => {
            return (
              <TextField
                {...field}
                className='mt-8 mb-16 w-full md:w-6/12'
                error={!!errors.ticket_status}
                helperText={errors?.ticket_status?.message}
                label='Details'
                id='Details'
                variant='outlined'
                InputLabelProps={field.value && { shrink: true }}
                fullWidth
                onKeyDown={handleSubmitOnKeyDownEnter}
              />
            );
          }}
        />
      </div>

      <div
        className='flex md:space-x-12 flex-col md:flex-row'
        style={{
          display: Mltchecked ? '' : 'none',
        }}>
        <Controller
          name='tkt_num'
          control={control}
          render={({ field: { onChange, value, name } }) => (
            <Autocomplete
              className='mt-8 mb-16 w-full md:w-6/12'
              freeSolo
              value={value ? currencies.find((data) => data.id == value) : null}
              options={currencies}
              getOptionLabel={(option) => `${option.name}`}
              onChange={(event, newValue) => {
                onChange(newValue?.id);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder='Ticket Num'
                  label='Ticket Num'
                  // error={!value}
                  onBlur={handleMltTicketNumber}
                  Mltchecked={false}
                  helperText={errors?.agency?.message}
                  variant='outlined'
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />
          )}
        />

        <Controller
          name='qty'
          id='ticketQuantity'
          control={control}
          render={({ field }) => {
            return (
              <TextField
                {...field}
                className='mt-8 mb-16 w-full md:w-5/12'
                // error={!!errors.purchase_amount}

                helperText={errors?.ticket_no?.message}
                label='QTY'
                type='number'
                Mltchecked={false}
                // error={!field.value}
                onBlur={handleMltTicketqty}
                variant='outlined'
                InputLabelProps={field.value && { shrink: true }}
                fullWidth
                onKeyDown={handleSubmitOnKeyDownEnter}
              />
            );
          }}
        />

        <Button
          className=' '
          variant='contained'
          color='secondary'
          onClick={createMLTticketTable}
          // startIcon={<Icon className="hidden sm:flex">Create</Icon>}
          style={{
            backgroundColor: '#ea5b78',
            color: 'white',
            padding: '13px',
            height: '40px',
            marginTop: '13px',
            marginLeft: '30px',
          }}>
          Create
        </Button>
      </div>

      {/* <div id="mLtTicket"></div> */}

      <div className='flex md:space-x-12 flex-col md:flex-row'>
        <File
          name='ticket_copy'
          label='Ticket'
          className='mt-8 mb-16 w-full md:w-6/12'
        />
        <br />
        <File
          name='passport_copy'
          label='Passport'
          className='mt-8 mb-16 w-full md:w-6/12'
        />
      </div>
    </div>
  );
}

export default TicketeditForm;
