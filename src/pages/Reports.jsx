// // import React, { useMemo } from 'react';
// import {
//   Box,
//   Container,
//   IconButton,
//   Stack,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
//   Chip,
//   Card,
//   CardContent,
// } from '@mui/material';
// import DownloadIcon from '@mui/icons-material/Download';
// import DescriptionIcon from '@mui/icons-material/Description';
// import { monthlyOrderReports } from '../data/reportsData';

// export default function Reports() {
//   function formatCurrency(amount) {
//     return new Intl.NumberFormat('en-GB', {
//       style: 'currency',
//       currency: 'GBP',
//     }).format(amount);
//   }

//   function generateOrderReportPDF(report) {
//     // Dynamic import for jsPDF
//     import('jspdf').then((jsPDF) => {
//       const { jsPDF: JsPDF } = jsPDF;
//       const doc = new JsPDF();
      
//       // Set font
//       doc.setFontSize(18);
//       doc.text('Monthly Order Report', 14, 20);
      
//       doc.setFontSize(12);
//       doc.text(`Month: ${report.month}`, 14, 30);
//       doc.text(`Report ID: ${report.id}`, 14, 36);
//       doc.text(`Generated: ${report.generatedDate}`, 14, 42);
      
//       // Summary
//       doc.setFontSize(14);
//       doc.text('Summary', 14, 52);
//       doc.setFontSize(11);
//       doc.text(`Total Orders: ${report.totalOrders}`, 14, 60);
//       doc.text(`Total Revenue: ${formatCurrency(report.totalRevenue)}`, 14, 66);
      
//       // Orders table
//       let yPos = 75;
//       doc.setFontSize(12);
//       doc.text('Orders', 14, yPos);
//       yPos += 8;
      
//       // Table header
//       doc.setFontSize(10);
//       doc.setFont(undefined, 'bold');
//       doc.text('Order ID', 14, yPos);
//       doc.text('Date', 45, yPos);
//       doc.text('Customer', 75, yPos);
//       doc.text('Total', 120, yPos);
//       doc.text('Status', 160, yPos);
//       yPos += 6;
      
//       // Table rows
//       doc.setFont(undefined, 'normal');
//       report.orders.forEach((order) => {
//         if (yPos > 270) {
//           doc.addPage();
//           yPos = 20;
//         }
//         doc.text(order.id, 14, yPos);
//         doc.text(order.date, 45, yPos);
//         doc.text(order.customer, 75, yPos);
//         doc.text(formatCurrency(order.total), 120, yPos);
//         doc.text(order.status, 160, yPos);
//         yPos += 6;
//       });
      
//       // Save the PDF
//       doc.save(`${report.month.replace(' ', '_')}_Order_Report.pdf`);
//     });
//   }

//   return (
//     <Container maxWidth="lg">
//       <Stack 
//         direction="row" 
//         alignItems="center" 
//         justifyContent="space-between" 
//         sx={{ 
//           my: 3,
//           p: 3,
//           borderRadius: 2,
//           background: 'linear-gradient(135deg, rgba(91, 50, 180, 0.05) 0%, rgba(124, 79, 207, 0.05) 100%)',
//         }}
//       >
//         <Typography variant="h4" fontWeight={700} sx={{ color: '#1a1a1a' }}>Monthly Order Reports</Typography>
//       </Stack>

//       <Stack spacing={3}>
//         {monthlyOrderReports.map((report) => (
//           <Card key={report.id} elevation={2}>
//             <CardContent>
//               <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
//                 <Stack direction="row" alignItems="center" spacing={2}>
//                   <DescriptionIcon color="primary" />
//                   <Box>
//                     <Typography variant="h6">{report.month}</Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       Total Orders: {report.totalOrders} | Revenue: {formatCurrency(report.totalRevenue)}
//                     </Typography>
//                   </Box>
//                 </Stack>
//                 <Chip label="Monthly Order Report" size="small" color="primary" variant="outlined" />
//               </Stack>

//               <TableContainer>
//                 <Table size="small">
//                   <TableHead>
//                     <TableRow>
//                       <TableCell>Order ID</TableCell>
//                       <TableCell>Date</TableCell>
//                       <TableCell>Customer</TableCell>
//                       <TableCell align="right">Total</TableCell>
//                       <TableCell>Status</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {report.orders.slice(0, 5).map((order) => (
//                       <TableRow key={order.id}>
//                         <TableCell>{order.id}</TableCell>
//                         <TableCell>{order.date}</TableCell>
//                         <TableCell>{order.customer}</TableCell>
//                         <TableCell align="right">{formatCurrency(order.total)}</TableCell>
//                         <TableCell>
//                           <Chip size="small" label={order.status} color={
//                             order.status === 'Delivered' ? 'success' :
//                             order.status === 'Shipped' ? 'info' : 'warning'
//                           } />
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>

//               <Stack direction="row" justifyContent="flex-end" sx={{ mt: 2 }}>
//                 <IconButton
//                   onClick={() => generateOrderReportPDF(report)}
//                   sx={{ 
//                     bgcolor: '#5B32B4',
//                     color: 'white',
//                     minWidth: '44px',
//                     minHeight: '44px',
//                     '&:hover': { bgcolor: '#4A2A95' }
//                   }}
//                 >
//                   <DownloadIcon />
//                 </IconButton>
//               </Stack>
//             </CardContent>
//           </Card>
//         ))}
//       </Stack>
//     </Container>
//   );
// }

import React, { useState } from 'react';
import {
  Box,
  Container,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import DescriptionIcon from '@mui/icons-material/Description';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { monthlyOrderReports } from '../data/reportsData';

export default function Reports() {
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');

  // Get current year and last 5 years
  const currentYear = new Date().getFullYear();
  const availableYears = Array.from({ length: 6 }, (_, i) => currentYear - i);
  
  // Generate months array dynamically
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  const availableMonths = monthNames.map((name, index) => ({
    value: index + 1,
    label: name,
  }));

  // Filter reports based on selected month and year
  const filteredReports = monthlyOrderReports.filter(report => {
    const monthMatch = selectedMonth === 'all' || report.monthNumber === selectedMonth;
    const yearMatch = selectedYear === 'all' || report.year === selectedYear;
    return monthMatch && yearMatch;
  });

  function formatCurrency(amount) {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
    }).format(amount);
  }

  function getStatusColor(status) {
    const statusMap = {
      Delivered: 'success',
      Shipped: 'info',
      Processing: 'warning',
    };
    return statusMap[status] || 'warning';
  }

  // Table column headers
  const tableHeaders = [
    { label: 'Order ID', align: 'left' },
    { label: 'Date', align: 'left' },
    { label: 'Customer', align: 'left' },
    { label: 'Total', align: 'right' },
    { label: 'Status', align: 'left' },
  ];

  function generateOrderReportPDF(report) {
    // Dynamic import for jsPDF
    import('jspdf').then((jsPDF) => {
      const { jsPDF: JsPDF } = jsPDF;
      const doc = new JsPDF();
      
      // Set font
      doc.setFontSize(18);
      doc.text('Monthly Order Report', 14, 20);
      
      doc.setFontSize(12);
      doc.text(`Month: ${report.month}`, 14, 30);
      doc.text(`Report ID: ${report.id}`, 14, 36);
      doc.text(`Generated: ${report.generatedDate}`, 14, 42);
      
      // Summary
      doc.setFontSize(14);
      doc.text('Summary', 14, 52);
      doc.setFontSize(11);
      doc.text(`Total Orders: ${report.totalOrders}`, 14, 60);
      doc.text(`Total Revenue: ${formatCurrency(report.totalRevenue)}`, 14, 66);
      
      // Orders table
      let yPos = 75;
      doc.setFontSize(12);
      doc.text('Orders', 14, yPos);
      yPos += 8;
      
      // Table header
      const columnPositions = [14, 45, 75, 120, 160];
      doc.setFontSize(10);
      doc.setFont(undefined, 'bold');
      tableHeaders.forEach((header, index) => {
        doc.text(header.label, columnPositions[index], yPos);
      });
      yPos += 6;
      
      // Table rows
      doc.setFont(undefined, 'normal');
      report.orders.forEach((order) => {
        if (yPos > 270) {
          doc.addPage();
          yPos = 20;
        }
        const rowData = [order.id, order.date, order.customer, formatCurrency(order.total), order.status];
        rowData.forEach((data, index) => {
          doc.text(data, columnPositions[index], yPos);
        });
        yPos += 6;
      });
      
      // Save the PDF
      doc.save(`${report.month.replace(' ', '_')}_Order_Report.pdf`);
    });
  }

  function handleClearFilters() {
    setSelectedMonth('all');
    setSelectedYear('all');
  }

  return (
    <Container maxWidth="lg">
      <Stack 
        direction="row" 
        alignItems="center" 
        justifyContent="space-between" 
        sx={{ 
          my: 3,
          p: 3,
          borderRadius: 2,
          background: 'linear-gradient(135deg, rgba(91, 50, 180, 0.05) 0%, rgba(124, 79, 207, 0.05) 100%)',
        }}
      >
        <Typography variant="h4" fontWeight={700} sx={{ color: '#1a1a1a' }}>
          Monthly Order Reports
        </Typography>
      </Stack>

      {/* Filter Section */}
      <Card elevation={2} sx={{ mb: 3 }}>
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
            <CalendarMonthIcon color="primary" />
            <Typography variant="h6">Filter Reports</Typography>
          </Stack>
          
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
            <FormControl fullWidth sx={{ minWidth: 200 }}>
              <InputLabel id="month-select-label">Month</InputLabel>
              <Select
                labelId="month-select-label"
                value={selectedMonth}
                label="Month"
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                <MenuItem value="all">All Months</MenuItem>
                {availableMonths.map((month) => (
                  <MenuItem key={month.value} value={month.value}>
                    {month.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ minWidth: 200 }}>
              <InputLabel id="year-select-label">Year</InputLabel>
              <Select
                labelId="year-select-label"
                value={selectedYear}
                label="Year"
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <MenuItem value="all">All Years</MenuItem>
                {availableYears.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {(selectedMonth !== 'all' || selectedYear !== 'all') && (
              <IconButton
                onClick={handleClearFilters}
                sx={{
                  bgcolor: '#f3f4f6',
                  '&:hover': { bgcolor: '#e5e7eb' },
                  minWidth: '44px',
                  minHeight: '44px',
                }}
                title="Clear Filters"
              >
                <Typography variant="body2" sx={{ px: 1 }}>Clear</Typography>
              </IconButton>
            )}
          </Stack>

          {/* Results Summary */}
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Showing {filteredReports.length} report{filteredReports.length !== 1 ? 's' : ''}
              {selectedMonth !== 'all' && ` for ${availableMonths.find(m => m.value === selectedMonth)?.label}`}
              {selectedYear !== 'all' && ` in ${selectedYear}`}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Reports List */}
      {filteredReports.length > 0 ? (
        <Stack spacing={3}>
          {filteredReports.map((report) => (
            <Card key={report.id} elevation={2}>
              <CardContent>
                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <DescriptionIcon color="primary" />
                    <Box>
                      <Typography variant="h6">{report.month}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Total Orders: {report.totalOrders} | Revenue: {formatCurrency(report.totalRevenue)}
                      </Typography>
                    </Box>
                  </Stack>
                  <Chip label="Monthly Order Report" size="small" color="primary" variant="outlined" />
                </Stack>

                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        {tableHeaders.map((header) => (
                          <TableCell key={header.label} align={header.align}>
                            {header.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {report.orders.slice(0, 5).map((order) => (
                        <TableRow key={order.id}>
                          <TableCell>{order.id}</TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>{order.customer}</TableCell>
                          <TableCell align="right">{formatCurrency(order.total)}</TableCell>
                          <TableCell>
                            <Chip size="small" label={order.status} color={getStatusColor(order.status)} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                <Stack direction="row" justifyContent="flex-end" sx={{ mt: 2 }}>
                  <IconButton
                    onClick={() => generateOrderReportPDF(report)}
                    sx={{ 
                      bgcolor: '#5B32B4',
                      color: 'white',
                      minWidth: '44px',
                      minHeight: '44px',
                      '&:hover': { bgcolor: '#4A2A95' }
                    }}
                  >
                    <DownloadIcon />
                  </IconButton>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      ) : (
        <Card elevation={2}>
          <CardContent>
            <Stack alignItems="center" spacing={2} sx={{ py: 4 }}>
              <CalendarMonthIcon sx={{ fontSize: 64, color: '#cbd5e0' }} />
              <Typography variant="h6" color="text.secondary">
                No reports found
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Try adjusting your filters
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      )}
    </Container>
  );
}