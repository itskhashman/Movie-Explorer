import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="row py-3 bg-secondary">
      <div className="col-12 d-flex justify-content-center gap-5">
        <div className="navbars" onClick={() => navigate('/')}>Home</div>
        <div className="navbars" onClick={() => navigate('/favorites')}>Favorites</div>
      </div>
    </div>
  );
};

export default Navbar;
