// import { ordersData } from './ordersData';
// import { accountsData } from './accountsData';

// // Generate monthly order reports
// export const monthlyOrderReports = [
//   {
//     id: 'RPT-2024-10',
//     month: 'October 2024',
//     year: 2024,
//     monthNumber: 10,
//     totalOrders: ordersData.length,
//     totalRevenue: ordersData.reduce((sum, order) => sum + order.total, 0),
//     orders: ordersData,
//     generatedDate: new Date().toISOString().split('T')[0],
//   },
//   {
//     id: 'RPT-2024-09',
//     month: 'September 2024',
//     year: 2024,
//     monthNumber: 9,
//     totalOrders: 12,
//     totalRevenue: 2450.75,
//     orders: [
//       { id: 'ORD-0901', date: '2024-09-15', customer: 'David', total: 320.50, status: 'Delivered' },
//       { id: 'ORD-0902', date: '2024-09-18', customer: 'Emma', total: 150.25, status: 'Shipped' },
//       { id: 'ORD-0903', date: '2024-09-20', customer: 'Frank', total: 890.00, status: 'Delivered' },
//     ],
//     generatedDate: '2024-10-01',
//   },
//   {
//     id: 'RPT-2024-08',
//     month: 'August 2024',
//     year: 2024,
//     monthNumber: 8,
//     totalOrders: 8,
//     totalRevenue: 1890.00,
//     orders: [
//       { id: 'ORD-0801', date: '2024-08-05', customer: 'Grace', total: 450.00, status: 'Delivered' },
//       { id: 'ORD-0802', date: '2024-08-12', customer: 'Henry', total: 240.00, status: 'Delivered' },
//     ],
//     generatedDate: '2024-09-01',
//   },
// ];

// // Generate account summary reports
// export const accountSummaryReports = [
//   {
//     id: 'RPT-ACC-2024-Q4',
//     title: 'Account Summary - Q4 2024',
//     period: 'October - December 2024',
//     totalAccounts: accountsData.length,
//     totalBalance: accountsData.reduce((sum, acc) => sum + acc.balance, 0),
//     totalPending: accountsData.reduce((sum, acc) => sum + acc.pending, 0),
//     accounts: accountsData,
//     generatedDate: new Date().toISOString().split('T')[0],
//   },
// ];
// Generate monthly order reports - June to October only
export const monthlyOrderReports = [
  {
    id: 'RPT-2025-10',
    month: 'October 2025',
    year: 2025,
    monthNumber: 10,
    totalOrders: 12,
    totalRevenue: 9705.29,
    orders: [
      {
        id: 'ORD-1001',
        date: '2025-10-01',
        customer: 'Alice Johnson',
        total: 245.50,
        status: 'Delivered',
        items: [
          { name: 'Pizza Margherita', qty: 2, price: 45.00 },
          { name: 'Garlic Bread', qty: 3, price: 15.50 },
          { name: 'Family Pasta Box', qty: 1, price: 124.00 }
        ]
      },
      {
        id: 'ORD-1002',
        date: '2025-10-03',
        customer: 'Bob Smith',
        total: 567.00,
        status: 'Shipped',
        items: [
          { name: 'Sushi Deluxe Platter', qty: 1, price: 189.00 },
          { name: 'Ramen Bowl Set', qty: 1, price: 249.00 },
          { name: 'Edamame & Gyoza', qty: 1, price: 129.00 }
        ]
      },
      {
        id: 'ORD-1003',
        date: '2025-10-05',
        customer: 'Carol Williams',
        total: 1250.00,
        status: 'Processing',
        items: [
          { name: 'Catering Party Platter', qty: 2, price: 625.00 }
        ]
      },
      {
        id: 'ORD-1004',
        date: '2025-10-07',
        customer: 'David Brown',
        total: 89.99,
        status: 'Delivered',
        items: [
          { name: 'Gourmet Burger Meal', qty: 1, price: 89.99 }
        ]
      },
      {
        id: 'ORD-1005',
        date: '2025-10-10',
        customer: 'Emma Davis',
        total: 345.75,
        status: 'Delivered',
        items: [
          { name: 'BBQ Ribs Family Pack', qty: 1, price: 199.99 },
          { name: 'Coleslaw & Fries', qty: 2, price: 72.88 }
        ]
      },
      {
        id: 'ORD-1006',
        date: '2025-10-12',
        customer: 'Frank Miller',
        total: 678.50,
        status: 'Shipped',
        items: [
          { name: 'Lobster Dinner Special', qty: 1, price: 499.00 },
          { name: 'Caesar Salad & Soup', qty: 1, price: 179.50 }
        ]
      },
      {
        id: 'ORD-1007',
        date: '2025-10-15',
        customer: 'Grace Wilson',
        total: 156.25,
        status: 'Processing',
        items: [
          { name: 'Breakfast Burrito', qty: 3, price: 19.99 },
          { name: 'Fresh Fruit Smoothie', qty: 5, price: 19.26 }
        ]
      },
      {
        id: 'ORD-1008',
        date: '2025-10-18',
        customer: 'Henry Moore',
        total: 2100.00,
        status: 'Delivered',
        items: [
          { name: 'Premium Steak Dinner', qty: 1, price: 1899.00 },
          { name: 'Wine & Dessert Pairing', qty: 1, price: 201.00 }
        ]
      },
      {
        id: 'ORD-1009',
        date: '2025-10-20',
        customer: 'Ivy Taylor',
        total: 445.80,
        status: 'Shipped',
        items: [
          { name: 'Thai Curry Feast', qty: 1, price: 399.00 },
          { name: 'Spring Rolls & Satay', qty: 1, price: 46.80 }
        ]
      },
      {
        id: 'ORD-1010',
        date: '2025-10-22',
        customer: 'Jack Anderson',
        total: 89.50,
        status: 'Delivered',
        items: [
          { name: 'Fish & Chips Combo', qty: 1, price: 89.50 }
        ]
      },
      {
        id: 'ORD-1011',
        date: '2025-10-25',
        customer: 'Kate Thomas',
        total: 734.25,
        status: 'Processing',
        items: [
          { name: 'Tapas Sharing Platter', qty: 1, price: 399.99 },
          { name: 'Paella for Two', qty: 3, price: 111.42 },
          { name: 'Sangria Pitcher', qty: 1, price: 222.84 }
        ]
      },
      {
        id: 'ORD-1012',
        date: '2025-10-28',
        customer: 'Liam Jackson',
        total: 1567.90,
        status: 'Shipped',
        items: [
          { name: 'Holiday Meal Box', qty: 1, price: 1299.00 },
          { name: 'Artisan Bread Basket', qty: 1, price: 129.90 },
          { name: 'Gourmet Cheese Board', qty: 1, price: 139.00 }
        ]
      }
    ],
    generatedDate: '2025-10-31',
  },
  {
    id: 'RPT-2025-09',
    month: 'September 2025',
    year: 2025,
    monthNumber: 9,
    totalOrders: 10,
    totalRevenue: 8450.75,
    orders: [
      { 
        id: 'ORD-0901', 
        date: '2025-09-05', 
        customer: 'David Martinez', 
        total: 320.50, 
        status: 'Delivered',
        items: [
          { name: 'Chicken Wings Platter', qty: 2, price: 45.00 },
          { name: 'Nachos Supreme', qty: 1, price: 275.50 }
        ]
      },
      { 
        id: 'ORD-0902', 
        date: '2025-09-08', 
        customer: 'Emma Rodriguez', 
        total: 1150.25, 
        status: 'Delivered',
        items: [
          { name: 'Seafood Paella Party Size', qty: 1, price: 1150.25 }
        ]
      },
      { 
        id: 'ORD-0903', 
        date: '2025-09-12', 
        customer: 'Frank Garcia', 
        total: 890.00, 
        status: 'Delivered',
        items: [
          { name: 'Dim Sum Deluxe Set', qty: 1, price: 890.00 }
        ]
      },
      { 
        id: 'ORD-0904', 
        date: '2025-09-15', 
        customer: 'Grace Lee', 
        total: 456.80, 
        status: 'Delivered',
        items: [
          { name: 'Mini Quiche Assortment', qty: 100, price: 456.80 }
        ]
      },
      { 
        id: 'ORD-0905', 
        date: '2025-09-18', 
        customer: 'Henry Kim', 
        total: 2340.00, 
        status: 'Delivered',
        items: [
          { name: 'Wedding Cake 3-Tier', qty: 1, price: 2340.00 }
        ]
      },
      { 
        id: 'ORD-0906', 
        date: '2025-09-20', 
        customer: 'Iris Chen', 
        total: 678.90, 
        status: 'Delivered',
        items: [
          { name: 'Pho Bo Combo', qty: 1, price: 389.00 },
          { name: 'Banh Mi Sandwich Set', qty: 1, price: 289.90 }
        ]
      },
      { 
        id: 'ORD-0907', 
        date: '2025-09-22', 
        customer: 'James Wong', 
        total: 234.50, 
        status: 'Delivered',
        items: [
          { name: 'Donuts Dozen Box', qty: 2, price: 117.25 }
        ]
      },
      { 
        id: 'ORD-0908', 
        date: '2025-09-25', 
        customer: 'Kelly Park', 
        total: 1567.80, 
        status: 'Delivered',
        items: [
          { name: 'Whole Roasted Pig', qty: 1, price: 1567.80 }
        ]
      },
      { 
        id: 'ORD-0909', 
        date: '2025-09-27', 
        customer: 'Lucas Silva', 
        total: 445.00, 
        status: 'Delivered',
        items: [
          { name: 'Falafel Wrap Platter', qty: 1, price: 445.00 }
        ]
      },
      { 
        id: 'ORD-0910', 
        date: '2025-09-30', 
        customer: 'Maya Patel', 
        total: 367.00, 
        status: 'Delivered',
        items: [
          { name: 'Samosa Party Pack', qty: 1, price: 67.00 },
          { name: 'Butter Chicken & Naan', qty: 1, price: 300.00 }
        ]
      }
    ],
    generatedDate: '2025-10-01',
  },
  {
    id: 'RPT-2025-08',
    month: 'August 2025',
    year: 2025,
    monthNumber: 8,
    totalOrders: 8,
    totalRevenue: 6789.50,
    orders: [
      { 
        id: 'ORD-0801', 
        date: '2025-08-02', 
        customer: 'Grace Thompson', 
        total: 450.00, 
        status: 'Delivered',
        items: [
          { name: 'Acai Bowl Trio', qty: 3, price: 150.00 }
        ]
      },
      { 
        id: 'ORD-0802', 
        date: '2025-08-05', 
        customer: 'Henry Clark', 
        total: 1240.00, 
        status: 'Delivered',
        items: [
          { name: 'Prime Rib Dinner', qty: 1, price: 1240.00 }
        ]
      },
      { 
        id: 'ORD-0803', 
        date: '2025-08-10', 
        customer: 'Iris Lewis', 
        total: 890.50, 
        status: 'Delivered',
        items: [
          { name: 'Omakase Sushi Experience', qty: 1, price: 890.50 }
        ]
      },
      { 
        id: 'ORD-0804', 
        date: '2025-08-14', 
        customer: 'Jack Walker', 
        total: 567.00, 
        status: 'Delivered',
        items: [
          { name: 'Gourmet Pizza Duo', qty: 1, price: 567.00 }
        ]
      },
      { 
        id: 'ORD-0805', 
        date: '2025-08-18', 
        customer: 'Karen Hall', 
        total: 2100.00, 
        status: 'Delivered',
        items: [
          { name: 'Chef\'s Tasting Menu', qty: 1, price: 2100.00 }
        ]
      },
      { 
        id: 'ORD-0806', 
        date: '2025-08-22', 
        customer: 'Leo Allen', 
        total: 345.00, 
        status: 'Delivered',
        items: [
          { name: 'Bagel & Cream Cheese', qty: 5, price: 69.00 }
        ]
      },
      { 
        id: 'ORD-0807', 
        date: '2025-08-26', 
        customer: 'Mia Young', 
        total: 789.00, 
        status: 'Delivered',
        items: [
          { name: 'Charcuterie Board XL', qty: 1, price: 789.00 }
        ]
      },
      { 
        id: 'ORD-0808', 
        date: '2025-08-30', 
        customer: 'Noah King', 
        total: 408.00, 
        status: 'Delivered',
        items: [
          { name: 'Poke Bowl Family Pack', qty: 1, price: 408.00 }
        ]
      }
    ],
    generatedDate: '2025-09-01',
  },
  {
    id: 'RPT-2025-07',
    month: 'July 2025',
    year: 2025,
    monthNumber: 7,
    totalOrders: 15,
    totalRevenue: 12450.90,
    orders: [
      { 
        id: 'ORD-0701', 
        date: '2025-07-03', 
        customer: 'Oliver Scott', 
        total: 1234.00, 
        status: 'Delivered',
        items: [
          { name: 'BBQ Smokehouse Feast', qty: 1, price: 1234.00 }
        ]
      },
      { 
        id: 'ORD-0702', 
        date: '2025-07-07', 
        customer: 'Penny Green', 
        total: 567.50, 
        status: 'Delivered',
        items: [
          { name: 'Taco Tuesday Box', qty: 1, price: 567.50 }
        ]
      },
      { 
        id: 'ORD-0703', 
        date: '2025-07-10', 
        customer: 'Quinn Baker', 
        total: 890.00, 
        status: 'Delivered',
        items: [
          { name: 'Korean BBQ Set', qty: 1, price: 890.00 }
        ]
      },
      { 
        id: 'ORD-0704', 
        date: '2025-07-12', 
        customer: 'Rachel Adams', 
        total: 2345.40, 
        status: 'Delivered',
        items: [
          { name: 'Wagyu Beef Dinner', qty: 1, price: 2345.40 }
        ]
      },
      { 
        id: 'ORD-0705', 
        date: '2025-07-15', 
        customer: 'Sam Nelson', 
        total: 678.00, 
        status: 'Delivered',
        items: [
          { name: 'Mediterranean Mezze', qty: 1, price: 678.00 }
        ]
      },
      { 
        id: 'ORD-0706', 
        date: '2025-07-18', 
        customer: 'Tina Carter', 
        total: 456.00, 
        status: 'Delivered',
        items: [
          { name: 'Sandwich Platter', qty: 2, price: 228.00 }
        ]
      },
      { 
        id: 'ORD-0707', 
        date: '2025-07-20', 
        customer: 'Uma Mitchell', 
        total: 1890.00, 
        status: 'Delivered',
        items: [
          { name: 'Caviar & Champagne', qty: 1, price: 1890.00 }
        ]
      },
      { 
        id: 'ORD-0708', 
        date: '2025-07-22', 
        customer: 'Victor Perez', 
        total: 345.00, 
        status: 'Delivered',
        items: [
          { name: 'Croissant Assortment', qty: 5, price: 69.00 }
        ]
      },
      { 
        id: 'ORD-0709', 
        date: '2025-07-24', 
        customer: 'Wendy Roberts', 
        total: 789.00, 
        status: 'Delivered',
        items: [
          { name: 'Pasta Bar Buffet', qty: 1, price: 789.00 }
        ]
      },
      { 
        id: 'ORD-0710', 
        date: '2025-07-26', 
        customer: 'Xavier Turner', 
        total: 567.00, 
        status: 'Delivered',
        items: [
          { name: 'Hot Pot Ingredients', qty: 1, price: 567.00 }
        ]
      },
      { 
        id: 'ORD-0711', 
        date: '2025-07-27', 
        customer: 'Yara Phillips', 
        total: 1234.00, 
        status: 'Delivered',
        items: [
          { name: 'Vegan Meal Prep Week', qty: 1, price: 1234.00 }
        ]
      },
      { 
        id: 'ORD-0712', 
        date: '2025-07-28', 
        customer: 'Zack Campbell', 
        total: 456.00, 
        status: 'Delivered',
        items: [
          { name: 'Ice Cream Sundae Bar', qty: 1, price: 456.00 }
        ]
      },
      { 
        id: 'ORD-0713', 
        date: '2025-07-29', 
        customer: 'Amy Parker', 
        total: 890.00, 
        status: 'Delivered',
        items: [
          { name: 'Gourmet Salad Bowl Set', qty: 1, price: 890.00 }
        ]
      },
      { 
        id: 'ORD-0714', 
        date: '2025-07-30', 
        customer: 'Ben Evans', 
        total: 678.00, 
        status: 'Delivered',
        items: [
          { name: 'Breakfast Catering Box', qty: 1, price: 678.00 }
        ]
      },
      { 
        id: 'ORD-0715', 
        date: '2025-07-31', 
        customer: 'Chloe Edwards', 
        total: 431.00, 
        status: 'Delivered',
        items: [
          { name: 'Soup & Sandwich Combo', qty: 1, price: 431.00 }
        ]
      }
    ],
    generatedDate: '2025-08-01',
  },
  {
    id: 'RPT-2025-06',
    month: 'June 2025',
    year: 2025,
    monthNumber: 6,
    totalOrders: 11,
    totalRevenue: 8934.75,
    orders: [
      { 
        id: 'ORD-0601', 
        date: '2025-06-02', 
        customer: 'Diana Foster', 
        total: 567.00, 
        status: 'Delivered',
        items: [
          { name: 'Cupcake Dozen Variety', qty: 3, price: 189.00 }
        ]
      },
      { 
        id: 'ORD-0602', 
        date: '2025-06-05', 
        customer: 'Edward Hughes', 
        total: 1289.50, 
        status: 'Delivered',
        items: [
          { name: 'Thanksgiving Turkey Meal', qty: 1, price: 1289.50 }
        ]
      },
      { 
        id: 'ORD-0603', 
        date: '2025-06-08', 
        customer: 'Fiona Bennett', 
        total: 445.25, 
        status: 'Delivered',
        items: [
          { name: 'Protein Meal Prep Box', qty: 1, price: 445.25 }
        ]
      },
      { 
        id: 'ORD-0604', 
        date: '2025-06-11', 
        customer: 'George Russell', 
        total: 890.00, 
        status: 'Delivered',
        items: [
          { name: 'Ramen Noodle Bowls', qty: 4, price: 222.50 }
        ]
      },
      { 
        id: 'ORD-0605', 
        date: '2025-06-14', 
        customer: 'Hannah Price', 
        total: 1567.00, 
        status: 'Delivered',
        items: [
          { name: 'Anniversary Dinner Box', qty: 1, price: 1567.00 }
        ]
      },
      { 
        id: 'ORD-0606', 
        date: '2025-06-17', 
        customer: 'Ian Cooper', 
        total: 234.00, 
        status: 'Delivered',
        items: [
          { name: 'Smoothie Bowls', qty: 2, price: 117.00 }
        ]
      },
      { 
        id: 'ORD-0607', 
        date: '2025-06-19', 
        customer: 'Julia Ward', 
        total: 678.00, 
        status: 'Delivered',
        items: [
          { name: 'Fried Chicken Bucket', qty: 1, price: 678.00 }
        ]
      },
      { 
        id: 'ORD-0608', 
        date: '2025-06-22', 
        customer: 'Kevin Morgan', 
        total: 1234.00, 
        status: 'Delivered',
        items: [
          { name: 'Catering Sushi Boat', qty: 1, price: 1234.00 }
        ]
      },
      { 
        id: 'ORD-0609', 
        date: '2025-06-24', 
        customer: 'Laura Bell', 
        total: 456.00, 
        status: 'Delivered',
        items: [
          { name: 'Burrito Bowl Family', qty: 1, price: 456.00 }
        ]
      },
      { 
        id: 'ORD-0610', 
        date: '2025-06-27', 
        customer: 'Martin Hayes', 
        total: 789.00, 
        status: 'Delivered',
        items: [
          { name: 'Stir Fry Combo Pack', qty: 1, price: 789.00 }
        ]
      },
      { 
        id: 'ORD-0611', 
        date: '2025-06-29', 
        customer: 'Nina Coleman', 
        total: 785.00, 
        status: 'Delivered',
        items: [
          { name: 'Peking Duck Dinner', qty: 1, price: 785.00 }
        ]
      }
    ],
    generatedDate: '2025-07-01',
  }
];

