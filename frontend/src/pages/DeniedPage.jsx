import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Button from '../Components/Button';

function DeniedPage() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-9xl font-extrabold text-primary tracking-widest animate-float">
        403
      </h1>
      <div className="bg-black text-white p-4 text-sm rounded animate-float">
        Access Denied
      </div>
      <Button color="secondary" className='mt-8' to='/'>Go Back</Button>
    </div>
  );
}

export default DeniedPage;
