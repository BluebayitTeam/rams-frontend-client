import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TablePagination,
} from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import EmployeesTableHead from './EmployeesTableHead';

const BASE_URL = 'https://example.com/'; // Replace with your actual base URL

const EmployeeTable = ({
  employees,
  order,
  selected,
  handleSelectAllClick,
  handleRequestSort,
  handleUpdateEmployee,
  handlePagination,
  rowsPerPageOptions,
  totalPages,
  totalElements,
  rowsPerPage,
  page,
  classes,
  UserPermissions,
  EMPLOYEE_UPDATE,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [imgUrl, setImgUrl] = useState('');

  const showImage = (url) => {
    setImgUrl(url);
    setOpenModal(true);
  };

  return (
    <div className='w-full flex flex-col'>
      {/* Image Modal */}
      <Modal
        open={openModal}
        className={classes.modal}
        onClose={() => {
          setOpenModal(false);
          setImgUrl('');
        }}>
        <div className='imgContainer'>
          <CloseIcon
            className='closeIcon'
            fontSize='large'
            onClick={() => {
              setOpenModal(false);
              setImgUrl('');
            }}
          />
          <img
            src={imgUrl || '/assets/images/userImg/user.png'}
            alt='Employee'
          />
        </div>
      </Modal>

      {/* Employee Table */}
      <FuseScrollbars className='flex-grow overflow-x-auto'>
        <Table stickyHeader className='min-w-xl' aria-labelledby='tableTitle'>
          <TicketeditsTableHead
            selectedTicketeditIds={selected}
            tableOrder={tableOrder}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={ticketedits.length}
            onMenuItemClick={handleDeselect}
          />
          <TableBody>
            {_.orderBy(
              ticketedits,
              [tableOrder.id],
              [tableOrder.direction]
            ).map((n) => {
              const isSelected = selected.indexOf(n.id) !== -1;
              return (
                <TableRow
                  className='h-72 cursor-pointer border-t-1  border-gray-200'
                  hover
                  role='checkbox'
                  aria-checked={isSelected}
                  tabIndex={-1}
                  key={n.id}
                  selected={isSelected}>
                  {/* <TableCell className="w-40 md:w-64 text-center" padding="none">
										<Checkbox
											checked={isSelected}
											onClick={ticketeditEvent => ticketeditEvent.stopPropagation()}
											onChange={ticketeditEvent => handleCheck(ticketeditEvent, n.id)}
										/>
									</TableCell> */}

                  <TableCell
                    className='w-40 md:w-64 border-t-1  border-gray-200'
                    component='th'
                    scope='row'>
                    {pageAndSize.page * pageAndSize.size -
                      pageAndSize.size +
                      serialNumber++}
                  </TableCell>
                  <TableCell
                    className='p-4 md:p-16 border-t-1  border-gray-200'
                    component='th'
                    scope='row'>
                    {moment(new Date(n.issue_date)).format('YYYY-MM-DD')}
                  </TableCell>

                  <TableCell
                    className='p-4 md:p-16 border-t-1  border-gray-200'
                    component='th'
                    scope='row'>
                    {n.invoice_no}
                  </TableCell>
                  <TableCell
                    className='p-4 md:p-16 border-t-1  border-gray-200'
                    component='th'
                    scope='row'>
                    {`${n.issue_person?.first_name} ${n.issue_person?.last_name}`}
                  </TableCell>

                  <TableCell
                    className='p-4 md:p-16 border-t-1  border-gray-200'
                    component='th'
                    scope='row'>
                    {n.final_passenger}
                  </TableCell>

                  <TableCell
                    className='p-4 md:p-16 border-t-1  border-gray-200'
                    component='th'
                    scope='row'>
                    {`${n.ticket_agency?.first_name} ${n.ticket_agency?.last_name}`}
                  </TableCell>

                  <TableCell
                    className='p-4 md:p-16 border-t-1  border-gray-200'
                    component='th'
                    scope='row'>
                    {moment(new Date(n.flight_date)).format('YYYY-MM-DD')}
                  </TableCell>

                  <TableCell
                    className='p-4 md:p-16 border-t-1  border-gray-200'
                    component='th'
                    scope='row'>
                    {n.gds?.name}
                  </TableCell>
                  <TableCell
                    className='p-4 md:p-16 border-t-1  border-gray-200'
                    component='th'
                    scope='row'>
                    {n.gds_pnr}
                  </TableCell>
                  <TableCell
                    className='p-4 md:p-16 border-t-1  border-gray-200'
                    component='th'
                    scope='row'>
                    {n.airline_pnr}
                  </TableCell>
                  <TableCell
                    className='p-4 md:p-16 border-t-1  border-gray-200'
                    component='th'
                    scope='row'>
                    {moment(new Date(n.return_flight_date)).format(
                      'YYYY-MM-DD'
                    )}
                  </TableCell>
                  <TableCell
                    className='p-4 md:p-16 border-t-1  border-gray-200'
                    component='th'
                    scope='row'>
                    {n.ticket_no}
                  </TableCell>
                  <TableCell
                    className='p-4 md:p-16 border-t-1  border-gray-200'
                    component='th'
                    scope='row'>
                    {n.sector}
                  </TableCell>

                  <TableCell
                    className='p-4 md:p-16 border-t-1  border-gray-200'
                    component='th'
                    scope='row'>
                    {n.current_airway?.name}
                  </TableCell>

                  <TableCell
                    className='p-4 md:p-16 border-t-1  border-gray-200'
                    component='th'
                    scope='row'>
                    {n.flight_no}
                  </TableCell>

                  <TableCell
                    className='p-4 md:p-16 border-t-1  border-gray-200'
                    component='th'
                    scope='row'>
                    {n._class}
                  </TableCell>

                  <TableCell
                    className='p-4 md:p-16 border-t-1  border-gray-200'
                    component='th'
                    scope='row'>
                    {n.fare_amount}
                  </TableCell>
                  <TableCell
                    className='p-4 md:p-16 border-t-1  border-gray-200'
                    component='th'
                    scope='row'>
                    {n.airline_commission_amount}
                  </TableCell>
                  <TableCell
                    className='p-4 md:p-16 border-t-1  border-gray-200'
                    component='th'
                    scope='row'>
                    {n.customer_commission_amount}
                  </TableCell>
                  <TableCell
                    className='p-4 md:p-16 border-t-1  border-gray-200'
                    component='th'
                    scope='row'>
                    {n.tax_amount}
                  </TableCell>
                  <TableCell
                    className='p-4 md:p-16 border-t-1  border-gray-200'
                    component='th'
                    scope='row'>
                    {n.service_charge}
                  </TableCell>
                  <TableCell
                    className='p-4 md:p-16 border-t-1  border-gray-200'
                    component='th'
                    scope='row'>
                    {n.purchase_amount}
                  </TableCell>
                  <TableCell
                    className='p-4 md:p-16 border-t-1  border-gray-200'
                    component='th'
                    scope='row'>
                    {n.sales_amount}
                  </TableCell>

                  <TableCell
                    className='p-4 md:p-16 border-t-1  border-gray-200'
                    align='center'
                    component='th'
                    scope='row'>
                    <div>
                      {/* {UserPermissions?.includes(IATATICKET_UPDATE) && ( */}
                      <Edit
                        onClick={(ticketeditEvent) => handleUpdateTicketedit(n)}
                        className='cursor-pointer custom-edit-icon-style'
                      />
                      {/* )} */}
                      {/* {UserPermissions?.includes(IATATICKET_DELETE) && ( */}
                      <Delete
                        onClick={(event) => handleDeleteTicketedit(n, 'Delete')}
                        className='cursor-pointer'
                        style={{
                          color: 'red',
                          visibility:
                            user_role === 'ADMIN' || user_role === 'admin'
                              ? 'visible'
                              : 'hidden',
                        }}
                      />
                      {/* )} */}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </FuseScrollbars>

      {/* Pagination */}
      <div className={classes.root}>
        <Pagination
          count={totalData?.total_pages}
          page={page + 1}
          defaultPage={1}
          color='primary'
          showFirstButton
          showLastButton
          variant='outlined'
          shape='rounded'
          onChange={handlePagination}
        />

        <TablePagination
          component='div'
          rowsPerPageOptions={rowsPerPageOptions}
          count={totalData?.total_pages}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
};

export default EmployeeTable;
