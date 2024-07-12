function MakeListColumnForm(props) {
  // const {
  //   control,
  //   formState: { errors },
  //   setValue,
  //   getValues,
  //   reset,
  // } = useFormContext();
  // const [columnValue, setColumnValue] = useState(false);
  // console.log('propsShuva', props);

  // useEffect(() => {
  // 	reset({ ...getValues(), items: props?.columns });

  // 	if (!columnValue) {
  // 		// Set default values when columns prop change
  // 		props?.columns.forEach((column) => {
  // 			setValue(`columns.${column?.id}.isChecked`, column.isChecked);
  // 			setValue(`columns.${column?.id}.serial`, column.isChecked ? column.serial : null);
  // 			setValue(`columns.${column?.id}.key`, column.key);
  // 		});
  // 		setColumnValue(true);
  // 	}
  // }, [props?.columns, setValue, getValues, reset, columnValue]);

  return (
    <div className='grid grid-cols-3 grid-flow-row gap-1'>
      {/* {props?.columns?.map((clm) => (
        <div key={clm.id} style={{ flex: '1 0 30%', display: 'flex' }}>
          <Controller
            name={`columns.${clm.id}.serial`}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                variant='outlined'
                className='w-48 mx-5'
                size='small'
                margin='normal'
                InputLabelProps={{ shrink: true }}
              />
            )}
          />
          <FormControlLabel
            control={
              <Controller
                name={`columns.${clm.id}.isChecked`}
                control={control}
                render={({ field }) => (
                  <Checkbox
                    {...field}
                    checked={field.value ? field.value : false}
                  />
                )}
              />
            }
            label={clm.label}
          />
        </div>
      ))} */}

      <h2>Test page</h2>
    </div>
  );
}

export default MakeListColumnForm;
