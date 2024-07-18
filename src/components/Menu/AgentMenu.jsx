import {Link} from "react-router-dom";
import {TbBrandGoogleHome} from "react-icons/tb";
import { FaSackDollar} from "react-icons/fa6";
import {FaFileInvoiceDollar} from "react-icons/fa";

const AgentMenu = () => {



    return (
        <div className="bg-white rounded-xl shadow-lg mb-6 px-6 py-4">

            <Link to={'/'}>
                <div className="flex ml-4 items-center text-gray-600 hover:text-black my-4 w-full">
                    <TbBrandGoogleHome className="mr-4"/>
                    Home
                </div>
            </Link>

            <Link to={'/ManageTransactions'}>
                <div className="flex ml-4  items-center text-gray-600 hover:text-black my-4 w-full">
                    <FaFileInvoiceDollar className="mr-4"/>
                    Transaction Management
                </div>
            </Link>

            <Link to={'/balance'}>
                <div className="flex ml-4  items-center text-gray-600 hover:text-black my-4 w-full">
                    <FaSackDollar className="mr-4"/>
                    Balance Inquiry
                </div>
            </Link>


        </div>
    );
};

export default AgentMenu;