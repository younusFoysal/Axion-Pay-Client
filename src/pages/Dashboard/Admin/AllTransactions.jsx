import React, { useEffect, useState } from 'react';
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";

const AllTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const axiosSecure = useAxiosSecure();
    const itemsPerPage = 15;

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axiosSecure.get(`/transactions?page=${currentPage}&limit=${itemsPerPage}`);
                setTransactions(response.data.transactions);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };

        fetchTransactions();
    }, [currentPage]);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    //const filteredtransactions = transactions?.filter(transaction => transaction._id.toLowerCase().includes(searchQuery.toLowerCase()));

    const filteredtransactions = transactions
        ?.filter(transaction => transaction._id
            .toLowerCase()
            .includes(searchQuery.toLowerCase()))
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); // Sort by timestamp in descending order



    return (
        <div className="bg-indigo-100 min-h-screen">
            <div className="pt-10 px-4 md:px-10 pb-4 w-full items-center justify-center">
                <div className="text-center p-4 mb-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-xl shadow-indigo-200">
                    <h1 className="font-bold text-4xl mb-4">All Transactions</h1>
                    <h1 className="text-3xl">Monitor All the Transactions on the System</h1>
                </div>

                <div className="flex flex-col">
                    <div className="-m-1.5 overflow-x-auto">
                        <div className="p-1.5 min-w-full inline-block align-middle">
                            <div className="rounded-lg divide-y divide-gray-200">
                                <div className="py-3 px-4">
                                    <div className="relative max-w-xs">
                                        <label className="sr-only">Search</label>
                                        <input
                                            type="text"
                                            name="hs-table-with-pagination-search"
                                            id="hs-table-with-pagination-search"
                                            value={searchQuery}
                                            onChange={handleSearchChange}
                                            className="py-2 px-3 ps-9 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                                            placeholder="Search by TRXID"
                                        />
                                        <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3">
                                            <svg
                                                className="h-4 w-4 text-gray-400"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <circle cx="11" cy="11" r="8" />
                                                <path d="m21 21-4.3-4.3" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="overflow-hidden rounded-xl shadow-xl shadow-indigo-200">
                                    <table className="min-w-full divide-y divide-gray-100 bg-white rounded-xl shadow-xl shadow-indigo-200">
                                        <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="pl-2 py-3 text-center text-xs font-medium text-gray-500 uppercase">Num</th>
                                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">From</th>
                                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">To</th>
                                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Amount</th>
                                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Type</th>
                                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Date</th>
                                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">TrxID</th>
                                        </tr>
                                        </thead>
                                        <tbody className="divide-y">
                                        {filteredtransactions.map((transaction, index) => (
                                            <tr key={transaction._id}>
                                                <td className="pl-2 text-center py-4 whitespace-nowrap text-sm font-medium text-gray-800">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                                <td className="px-6 py-4 text-center whitespace-nowrap text-sm font-medium text-gray-800">{transaction.fromEmail}</td>
                                                <td className="px-6 py-4 text-center whitespace-nowrap text-sm font-medium text-gray-800">{transaction.toEmail}</td>
                                                <td className="px-6 py-4 text-center whitespace-nowrap text-sm font-medium text-gray-800">{transaction.amount}</td>
                                                <td className="px-6 py-4 text-center whitespace-nowrap text-sm font-medium text-gray-800">{transaction.transType}</td>
                                                <td className="px-6 py-4 text-center whitespace-nowrap text-sm font-medium text-gray-800">{new Date(transaction.timestamp).toLocaleString()}</td>
                                                <td className="px-6 py-4 text-center whitespace-nowrap text-sm font-medium text-gray-800">{transaction._id}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="py-1 px-4">
                                    <nav className="flex items-center space-x-1">
                                        <button
                                            type="button"
                                            onClick={handlePreviousPage}
                                            className="p-2.5 inline-flex items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
                                            disabled={currentPage === 1}
                                        >
                                            <span aria-hidden="true">«</span>
                                            <span className="sr-only">Previous</span>
                                        </button>
                                        {Array.from({ length: totalPages }, (_, index) => (
                                            <button
                                                key={index}
                                                type="button"
                                                onClick={() => handlePageChange(index + 1)}
                                                className={`min-w-[40px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2.5 text-sm rounded-full ${currentPage === index + 1 ? 'bg-gray-200' : ''}`}
                                                aria-current={currentPage === index + 1 ? 'page' : undefined}
                                            >
                                                {index + 1}
                                            </button>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={handleNextPage}
                                            className="p-2.5 inline-flex items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
                                            disabled={currentPage === totalPages}
                                        >
                                            <span className="sr-only">Next</span>
                                            <span aria-hidden="true">»</span>
                                        </button>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllTransactions;
