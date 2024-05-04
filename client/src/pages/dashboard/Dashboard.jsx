import React from 'react';
import { Button } from 'react-bootstrap';

const Dashboard = () => {
  const { data, loading } = userQuery(GET_USER);
  console.log('Dashboard data', data);
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const [loginUser, { error }] = useMutation(LOGIN_USER);
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(state);
    const { email, password } = state;
    if (email.trim() !== '' && password.trim() !== '') {
      const { data } = await loginUser({
        data: {
          ...state,
        },
      });
      console.log('data', data);
      locaclStorage.setItem('userToken', JSON.stringify(data.login.token));
      setIsLoggedIn(true);
      setState({
        email: '',
        password: '',
      });
      setSuccessMsg('Registration is successful');
      setTimeout(() => {
        setSuccessMsg('');
        navigate('/dashboard');
      }, 2000);
    }
  };

  return (
    <div>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Enter Email"
        />
      </Form.Group>
    </div>
  );
};

export default Dashboard;
