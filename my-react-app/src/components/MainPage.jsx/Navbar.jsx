import expenseFun from '../../firebase/expenseFun';
import ExpensePDFGenerator from './ExpensePDFGenerator';
import {Link} from "react-router-dom";
export default function Navbar() {
    const {handleLogout,profileComplete}=expenseFun()
return (
    <header>
            <div className="navbar">
              <h4>Welcome to Expense Tracker</h4>
              <div>
                <div>
                  {profileComplete ? (
                    <div>Your profile is 100% complete</div>
                  ) : (
                    <Link to="/profile"><button>Update Profile</button></Link>
                  )}
                </div>
                <button onClick={handleLogout}>Logout</button>
                <ExpensePDFGenerator/>
              </div>
            </div>
          </header>
  )
}
