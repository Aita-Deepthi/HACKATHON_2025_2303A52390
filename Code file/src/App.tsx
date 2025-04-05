import React, { useState } from 'react';
import { Guitar as Hospital, Bed, Clock, Users, Pill as Pills, Warehouse, Search, Menu } from 'lucide-react';

type Tab = 'queue' | 'beds' | 'inventory';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('queue');
  const [searchQuery, setSearchQuery] = useState('');

  const queueData = [
    { id: 1, name: 'John Doe', department: 'Cardiology', waitTime: '15 mins' },
    { id: 2, name: 'Jane Smith', department: 'Orthopedics', waitTime: '25 mins' },
    { id: 3, name: 'Mike Johnson', department: 'Pediatrics', waitTime: '10 mins' },
  ];

  const bedData = [
    { ward: 'General', total: 50, available: 15 },
    { ward: 'ICU', total: 20, available: 3 },
    { ward: 'Emergency', total: 30, available: 8 },
    { ward: 'Pediatric', total: 25, available: 12 },
  ];

  const inventoryData = [
    { item: 'Paracetamol', stock: 1500, unit: 'tablets' },
    { item: 'Bandages', stock: 500, unit: 'rolls' },
    { item: 'Syringes', stock: 2000, unit: 'pieces' },
    { item: 'Surgical Masks', stock: 5000, unit: 'pieces' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Hospital className="h-8 w-8 text-blue-600" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">
                City Hospital Management
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <button className="p-2 rounded-lg hover:bg-gray-100">
                <Menu className="h-6 w-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          <button
            className={"flex items-center px-4 py-2 rounded-lg " + 
              (activeTab === 'queue'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
              )}
            onClick={() => setActiveTab('queue')}
          >
            <Clock className="h-5 w-5 mr-2" />
            OPD Queue
          </button>
          <button
            className={"flex items-center px-4 py-2 rounded-lg " + 
              (activeTab === 'beds'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
              )}
            onClick={() => setActiveTab('beds')}
          >
            <Bed className="h-5 w-5 mr-2" />
            Bed Management
          </button>
          <button
            className={"flex items-center px-4 py-2 rounded-lg " + 
              (activeTab === 'inventory'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
              )}
            onClick={() => setActiveTab('inventory')}
          >
            <Warehouse className="h-5 w-5 mr-2" />
            Inventory
          </button>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow">
          {activeTab === 'queue' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Current Queue Status
                </h2>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-600">
                    {queueData.length} patients waiting
                  </span>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Patient Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Department
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Estimated Wait Time
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {queueData.map((patient) => (
                      <tr key={patient.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {patient.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {patient.department}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {patient.waitTime}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'beds' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Bed Availability
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {bedData.map((ward) => (
                  <div
                    key={ward.ward}
                    className="bg-white p-6 rounded-lg border border-gray-200"
                  >
                    <h3 className="text-lg font-medium text-gray-900">
                      {ward.ward} Ward
                    </h3>
                    <div className="mt-2 flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500">Available</p>
                        <p className="text-2xl font-semibold text-blue-600">
                          {ward.available}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Total</p>
                        <p className="text-2xl font-semibold text-gray-900">
                          {ward.total}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'inventory' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Inventory Management
                </h2>
                <div className="flex items-center space-x-2">
                  <Pills className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-600">Current Stock Levels</span>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Item
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Current Stock
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Unit
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {inventoryData.map((item) => (
                      <tr key={item.item}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.item}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.stock}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.unit}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;