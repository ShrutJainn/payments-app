import Appbar from "../components/Appbar";
import Balance from "../components/Balance";
import Users from "../components/Users";

function Dashboard() {
  return (
    <div>
      <Appbar />
      <Balance value={1000} />
      <Users />
    </div>
  );
}

export default Dashboard;
